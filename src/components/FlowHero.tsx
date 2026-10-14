"use client";

import { useEffect, useRef, useState } from "react";

/*
  Gaussian noise carried to a target distribution by the flow-matching ODE.

  Path:    x_t = (1 - t) x0 + t x1,   x0 ~ N(0, I)
  Target:  x1 = y_i + sigma * eps     (a mixture of small Gaussians around centres y_i)

  For this target the marginal velocity E[x1 - x0 | x_t = x] has a closed form.
  With s = 1 - t and var = s^2 + t^2 sigma^2:

    w_i  ∝ exp(-|x - t y_i|^2 / (2 var))
    v    = (s * sum_i w_i y_i - (s - t sigma^2) x) / var

  It stays finite all the way to t = 1, so plain Euler steps land on the target.
*/

type ShapeKey = "spiral" | "moons" | "modes";

const SHAPES: { key: ShapeKey; label: string }[] = [
  { key: "spiral", label: "spiral" },
  { key: "moons", label: "two moons" },
  { key: "modes", label: "eight modes" },
];

const SIGMA = 0.09;
const STEPS = 180;
const VIEW = 3.3;
const LOOKS = {
  dark: {
    bg: "17, 20, 24",
    palette: [
      [79, 209, 197],
      [90, 156, 255],
      [167, 139, 250],
      [224, 168, 74],
    ],
  },
  paper: {
    bg: "248, 245, 238",
    palette: [
      [13, 138, 128],
      [36, 96, 205],
      [118, 82, 210],
      [196, 118, 18],
    ],
  },
};

const isPaper = () => document.documentElement.dataset.theme === "paper";

function gauss() {
  let u = 0;
  while (u === 0) u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
}

function centres(shape: ShapeKey, n: number): Float32Array {
  const c = new Float32Array(2 * n);
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n;
    let x = 0;
    let y = 0;
    if (shape === "spiral") {
      const s = 0.12 + 0.88 * u;
      const a = 3.4 * Math.PI * s;
      x = 2.5 * s * Math.cos(a);
      y = 2.5 * s * Math.sin(a);
    } else if (shape === "moons") {
      const a = Math.PI * ((2 * u) % 1);
      if (u < 0.5) {
        x = Math.cos(a) - 0.5;
        y = Math.sin(a) - 0.25;
      } else {
        x = 0.5 - Math.cos(a);
        y = 0.25 - Math.sin(a);
      }
      x *= 1.75;
      y *= 1.75;
    } else {
      const k = i % 8;
      const a = (k * Math.PI) / 4;
      x = 2.2 * Math.cos(a) + 0.13 * gauss();
      y = 2.2 * Math.sin(a) + 0.13 * gauss();
    }
    c[2 * i] = x;
    c[2 * i + 1] = y;
  }
  return c;
}

function colourFor(x: number, y: number, palette: number[][]): string {
  const f = ((Math.atan2(y, x) / (2 * Math.PI) + 1) % 1) * palette.length;
  const i = Math.floor(f);
  const t = f - i;
  const a = palette[i % palette.length];
  const b = palette[(i + 1) % palette.length];
  const mix = (k: number) => Math.round(a[k] + (b[k] - a[k]) * t);
  return `rgb(${mix(0)}, ${mix(1)}, ${mix(2)})`;
}

export default function FlowHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const jumpRef = useRef<(k: number) => void>(() => {});
  const [active, setActive] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 700;
    const P = small ? 520 : 860;
    const N = small ? 180 : 240;

    const x0 = new Float32Array(2 * P);
    const colours = { dark: [] as string[], paper: [] as string[] };
    for (let p = 0; p < P; p++) {
      x0[2 * p] = gauss();
      x0[2 * p + 1] = gauss();
      colours.dark.push(colourFor(x0[2 * p], x0[2 * p + 1], LOOKS.dark.palette));
      colours.paper.push(colourFor(x0[2 * p], x0[2 * p + 1], LOOKS.paper.palette));
    }

    const traj = new Float32Array(2 * P * (STEPS + 1));
    const w = new Float32Array(N);
    let shapeIndex = 0;
    let data = centres(SHAPES[0].key, N);
    let step = 0;
    let phase: "forward" | "hold" | "back" | "rest" = "forward";
    let phaseFrames = 0;
    let visible = true;
    let raf = 0;
    let size = 0;
    let dpr = 1;

    const resetForward = () => {
      traj.set(x0, 0);
      step = 0;
      phase = "forward";
      phaseFrames = 0;
    };

    const advance = () => {
      const t = step / STEPS;
      const dt = 1 / STEPS;
      const s = 1 - t;
      const v = s * s + t * t * SIGMA * SIGMA;
      const inv = 1 / (2 * v);
      const shrink = s - t * SIGMA * SIGMA;
      const from = 2 * P * step;
      const to = from + 2 * P;
      for (let p = 0; p < P; p++) {
        const px = traj[from + 2 * p];
        const py = traj[from + 2 * p + 1];
        let best = Infinity;
        for (let i = 0; i < N; i++) {
          const dx = px - t * data[2 * i];
          const dy = py - t * data[2 * i + 1];
          const d = dx * dx + dy * dy;
          w[i] = d;
          if (d < best) best = d;
        }
        let total = 0;
        let mx = 0;
        let my = 0;
        for (let i = 0; i < N; i++) {
          const e = Math.exp(-(w[i] - best) * inv);
          total += e;
          mx += e * data[2 * i];
          my += e * data[2 * i + 1];
        }
        mx /= total;
        my /= total;
        traj[to + 2 * p] = px + (dt * (s * mx - shrink * px)) / v;
        traj[to + 2 * p + 1] = py + (dt * (s * my - shrink * py)) / v;
      }
      step += 1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${LOOKS[isPaper() ? "paper" : "dark"].bg})`;
      ctx.fillRect(0, 0, size, size);
    };

    const draw = (k: number, fade: number) => {
      const theme = isPaper() ? "paper" : "dark";
      const dots = colours[theme];
      ctx.fillStyle = `rgba(${LOOKS[theme].bg}, ${fade})`;
      ctx.fillRect(0, 0, size, size);
      const scale = size / (2 * VIEW);
      const half = size / 2;
      const r = (size < 400 ? 1.3 : 1.6) * (theme === "paper" ? 1.15 : 1);
      const base = 2 * P * k;
      for (let p = 0; p < P; p++) {
        ctx.fillStyle = dots[p];
        ctx.fillRect(half + traj[base + 2 * p] * scale - r / 2, half - traj[base + 2 * p + 1] * scale - r / 2, r, r);
      }
      if (timeRef.current) timeRef.current.textContent = (k / STEPS).toFixed(2);
    };

    const setShape = (k: number) => {
      shapeIndex = k;
      data = centres(SHAPES[k].key, N);
      setActive(k);
      if (labelRef.current) labelRef.current.textContent = SHAPES[k].label;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      phaseFrames += 1;
      if (phase === "forward") {
        advance();
        draw(step, 0.2);
        if (step === STEPS) {
          phase = "hold";
          phaseFrames = 0;
        }
      } else if (phase === "hold") {
        draw(STEPS, phaseFrames > 30 ? 1 : 0.2);
        if (phaseFrames > 110) {
          phase = "back";
          phaseFrames = 0;
        }
      } else if (phase === "back") {
        step = Math.max(0, step - 2);
        draw(step, 0.2);
        if (step === 0) {
          phase = "rest";
          phaseFrames = 0;
        }
      } else {
        draw(0, phaseFrames > 25 ? 1 : 0.2);
        if (phaseFrames > 40) {
          setShape((shapeIndex + 1) % SHAPES.length);
          resetForward();
        }
      }
    };

    jumpRef.current = (k: number) => {
      setShape(k);
      resetForward();
      if (reduced) {
        while (step < STEPS) advance();
        draw(STEPS, 1);
      }
    };

    resize();
    resetForward();

    if (reduced) {
      while (step < STEPS) advance();
      draw(STEPS, 1);
    } else {
      raf = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const onResize = () => {
      resize();
      if (reduced) draw(STEPS, 1);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <figure className="flow-hero">
      <div className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-[var(--plate)]">
        <canvas ref={canvasRef} className="block aspect-square w-full" aria-label="Animated points flowing from Gaussian noise to a target shape" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-4 py-3 font-mono text-xs text-slate-400">
          <span>
            t = <span ref={timeRef}>0.00</span>
          </span>
          <span>
            noise &rarr; <span ref={labelRef}>{SHAPES[0].label}</span>
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 px-4 py-3">
          {SHAPES.map((shape, k) => (
            <button
              key={shape.key}
              type="button"
              onClick={() => jumpRef.current(k)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                k === active
                  ? "border-slate-400 text-slate-100"
                  : "border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
              }`}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-500">
        Each dot starts as a Gaussian sample and follows the flow-matching ODE{" "}
        <span className="font-mono text-slate-400">dx/dt = v(x, t)</span> to the target. The velocity is computed
        exactly, so paths never cross, and the same ODE run backwards returns every dot to where it began. Colour marks
        where each dot started.
      </figcaption>
    </figure>
  );
}
