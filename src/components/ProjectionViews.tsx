"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
  Least squares as a projection, with three data points so that "data space" is ordinary 3D.

  Left:  the usual picture. Three points (x_i, y_i), a line y = w x + b, and its vertical residuals.
  Right: one axis per data point. The targets form one vector y in R^3. Every line (w, b) gives the
         prediction vector w * (x column) + b * (ones column), a point on the plane spanned by the two
         columns of the design matrix. The best line is the point of that plane closest to y, where the
         residual is perpendicular to the plane.

  Drag the line's handles on the left, or the orange point on the right; drag empty space on the right to turn it.
*/

const XS = [0, 1, 2];
const YS = [0.6, 3, 1.4];
const C1 = XS;
const C2 = [1, 1, 1];
const START = { w: -0.3, b: 2.2 };

const INK = "#171c23";
const DIM = "#6e7783";
const FAINT = "#d6d1c4";
const ORANGE = "#c2410c";
const TEAL = "#0f766e";
const NAVY = "#2a4a8a";
const PURPLE = "#6d4fc2";
const FONT = '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const pred = (w: number, b: number) => [0, 1, 2].map((i) => w * C1[i] + b * C2[i]);

function bestFit() {
  const a11 = dot(C1, C1), a12 = dot(C1, C2), a22 = dot(C2, C2);
  const r1 = dot(C1, YS), r2 = dot(C2, YS);
  const det = a11 * a22 - a12 * a12;
  return { w: (a22 * r1 - a12 * r2) / det, b: (a11 * r2 - a12 * r1) / det };
}
const BEST = bestFit();

function setupCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = c.clientWidth, H = c.clientHeight;
  c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  return { ctx, W, H };
}

function arrow(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string, width = 2) {
  const a = Math.atan2(y1 - y0, x1 - x0), h = 8;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * h * 0.7, y1 - Math.sin(a) * h * 0.7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - h * Math.cos(a - 0.4), y1 - h * Math.sin(a - 0.4));
  ctx.lineTo(x1 - h * Math.cos(a + 0.4), y1 - h * Math.sin(a + 0.4));
  ctx.closePath(); ctx.fill();
}

function label(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, color: string, size = 13, align: CanvasTextAlign = "left", weight = 500) {
  ctx.fillStyle = color; ctx.font = `${weight} ${size}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = "middle";
  ctx.fillText(t, x, y);
}

export default function ProjectionViews() {
  const left = useRef<HTMLCanvasElement>(null);
  const right = useRef<HTMLCanvasElement>(null);
  const [wb, setWb] = useState(START);
  const [view, setView] = useState({ yaw: -1.47, pitch: 0.2 });
  const wbRef = useRef(wb); wbRef.current = wb;
  const viewRef = useRef(view); viewRef.current = view;
  const anim = useRef(0);

  /* ---------- left: the usual picture ---------- */
  const L = { x0: -0.6, x1: 2.8, y0: -0.4, y1: 3.6, pad: 30 };
  const lmap = (W: number, H: number) => ({
    sx: (x: number) => L.pad + ((x - L.x0) / (L.x1 - L.x0)) * (W - L.pad - 12),
    sy: (y: number) => H - L.pad - ((y - L.y0) / (L.y1 - L.y0)) * (H - L.pad - 14),
    ix: (px: number) => L.x0 + ((px - L.pad) / (W - L.pad - 12)) * (L.x1 - L.x0),
    iy: (py: number) => L.y0 + ((H - L.pad - py) / (H - L.pad - 14)) * (L.y1 - L.y0),
  });
  const HANDLES = [-0.4, 2.55];

  const drawLeft = useCallback(() => {
    const c = left.current; if (!c) return;
    const { ctx, W, H } = setupCanvas(c);
    const { sx, sy } = lmap(W, H);
    const { w, b } = wbRef.current;
    ctx.strokeStyle = FAINT; ctx.lineWidth = 1;
    for (let gx = 0; gx <= 2; gx++) { ctx.beginPath(); ctx.moveTo(sx(gx), sy(L.y0)); ctx.lineTo(sx(gx), sy(L.y1)); ctx.stroke(); }
    ctx.strokeStyle = DIM; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(sx(L.x0), sy(0)); ctx.lineTo(sx(L.x1), sy(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx(L.x0), sy(L.y0)); ctx.lineTo(sx(L.x0), sy(L.y1)); ctx.stroke();
    for (let gx = 0; gx <= 2; gx++) label(ctx, String(gx), sx(gx) + (gx === 0 ? 8 : 0), sy(0) + 13, DIM, 12, "center");
    label(ctx, "x", sx(L.x1) - 4, sy(0) - 12, DIM, 13, "right");
    label(ctx, "y", sx(L.x0) + 8, sy(L.y1) + 6, DIM, 13);
    // residuals
    XS.forEach((x, i) => {
      const yh = w * x + b;
      ctx.strokeStyle = TEAL; ctx.lineWidth = 2.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(sx(x), sy(YS[i])); ctx.lineTo(sx(x), sy(yh)); ctx.stroke(); ctx.setLineDash([]);
    });
    // line
    ctx.strokeStyle = ORANGE; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(sx(L.x0), sy(w * L.x0 + b)); ctx.lineTo(sx(L.x1), sy(w * L.x1 + b)); ctx.stroke();
    XS.forEach((x) => { ctx.fillStyle = ORANGE; ctx.beginPath(); ctx.arc(sx(x), sy(w * x + b), 3.5, 0, 7); ctx.fill(); });
    // points
    XS.forEach((x, i) => {
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx(x), sy(YS[i]), 5.5, 0, 7); ctx.fill();
      label(ctx, `point ${i + 1}`, sx(x) + 10, sy(YS[i]) + (YS[i] > w * x + b ? -12 : 12), INK, 12);
    });
    // handles
    HANDLES.forEach((hx) => {
      ctx.fillStyle = "#fff"; ctx.strokeStyle = ORANGE; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(sx(hx), sy(w * hx + b), 7, 0, 7); ctx.fill(); ctx.stroke();
    });
  }, []);

  /* ---------- right: data space, one axis per data point ---------- */
  const CENTRE = [0.63, 0.83, 1.23];
  const project = (p: number[], W: number, H: number) => {
    const { yaw, pitch } = viewRef.current;
    const s = Math.min(W, H) * 0.19;
    const x = p[0] - CENTRE[0], y = p[1] - CENTRE[1], z = p[2] - CENTRE[2];
    const x1 = x * Math.cos(yaw) - y * Math.sin(yaw), y1 = x * Math.sin(yaw) + y * Math.cos(yaw);
    const y2 = y1 * Math.cos(pitch) - z * Math.sin(pitch), z2 = y1 * Math.sin(pitch) + z * Math.cos(pitch);
    return [W / 2 + s * x1, H * 0.5 - s * z2, y2];
  };

  const drawRight = useCallback(() => {
    const c = right.current; if (!c) return;
    const { ctx, W, H } = setupCanvas(c);
    const P = (p: number[]) => project(p, W, H);
    const { w, b } = wbRef.current;
    const p = pred(w, b);
    const r = [0, 1, 2].map((i) => YS[i] - p[i]);
    const yhat = pred(BEST.w, BEST.b);

    // the plane of all predictions, drawn as a sheet: two perpendicular directions inside it
    const e1 = C2.map((v) => v / Math.sqrt(3));
    const t = dot(C1, e1), raw = C1.map((v, i) => v - t * e1[i]), rn = Math.hypot(...raw), e2 = raw.map((v) => v / rn);
    const at = (al: number, be: number) => [0, 1, 2].map((i) => al * e1[i] + be * e2[i]);
    const A0 = -0.3, A1 = 4.0, B0 = -1.7, B1 = 1.7;
    const corner = [[A0, B0], [A1, B0], [A1, B1], [A0, B1]].map(([al, be]) => P(at(al, be)));
    ctx.fillStyle = "rgba(42, 74, 138, 0.08)"; ctx.strokeStyle = "rgba(42, 74, 138, 0.3)"; ctx.lineWidth = 1;
    ctx.beginPath(); corner.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = "rgba(42, 74, 138, 0.1)";
    for (let k = 1; k < 8; k++) {
      const al = A0 + ((A1 - A0) * k) / 8, be = B0 + ((B1 - B0) * k) / 8;
      let a = P(at(al, B0)), e = P(at(al, B1)); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke();
      a = P(at(A0, be)); e = P(at(A1, be)); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(e[0], e[1]); ctx.stroke();
    }
    const pc = [P(at(A0, B0)), P(at(A1, B0)), P(at(A0, B1)), P(at(A1, B1))].sort((u, v) => v[1] - u[1])[0];
    label(ctx, "all possible predictions", Math.min(Math.max(pc[0], 80), W - 80), Math.min(pc[1] + 12, H - 10), NAVY, 11.5, "center");

    // axes, one per data point
    const O = P([0, 0, 0]);
    [[3.2, 0, 0], [0, 3.2, 0], [0, 0, 3.2]].forEach((e, i) => {
      const q = P(e);
      arrow(ctx, O[0], O[1], q[0], q[1], DIM, 1.2);
      const lq = P(e.map((v) => v * 1.08));
      label(ctx, `point ${i + 1}`, Math.min(Math.max(lq[0], 30), W - 30), Math.min(Math.max(lq[1], 10), H - 10), DIM, 11.5, "center");
    });

    // the two columns
    const k1 = P(C1), k2 = P(C2);
    arrow(ctx, O[0], O[1], k1[0], k1[1], PURPLE, 2);
    arrow(ctx, O[0], O[1], k2[0], k2[1], PURPLE, 2);
    const mid = (q: number[], t: number) => [O[0] + (q[0] - O[0]) * t, O[1] + (q[1] - O[1]) * t];
    const m1 = mid(k1, 0.62), m2 = mid(k2, 0.75);
    label(ctx, "x column", m1[0] + 8, m1[1], PURPLE, 12);
    label(ctx, "1 column", m2[0] - 8, m2[1], PURPLE, 12, "right");

    // the target vector y
    const Yp = P(YS);
    arrow(ctx, O[0], O[1], Yp[0], Yp[1], INK, 2.4);
    label(ctx, "y", Yp[0] + 10, Yp[1] - 4, INK, 15, "left", 700);

    // the foot of the perpendicular, faintly
    const F = P(yhat);
    ctx.strokeStyle = ORANGE; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(F[0], F[1], 6, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;

    // residual from the prediction to y
    const Pp = P(p);
    ctx.strokeStyle = TEAL; ctx.lineWidth = 2.5; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(Pp[0], Pp[1]); ctx.lineTo(Yp[0], Yp[1]); ctx.stroke(); ctx.setLineDash([]);

    // right angle at the best fit
    const ortho = Math.abs(dot(r, C1)) < 0.03 && Math.abs(dot(r, C2)) < 0.03;
    if (ortho) {
      const rl = Math.hypot(...r), u = r.map((v) => v / rl);
      const inPlane = C2.map((v) => v / Math.sqrt(3));
      const a = 0.22;
      const m1 = P(p.map((v, i) => v + a * inPlane[i]));
      const m2 = P(p.map((v, i) => v + a * inPlane[i] + a * u[i]));
      const m3 = P(p.map((v, i) => v + a * u[i]));
      ctx.strokeStyle = INK; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(m1[0], m1[1]); ctx.lineTo(m2[0], m2[1]); ctx.lineTo(m3[0], m3[1]); ctx.stroke();
    }

    // the prediction point
    ctx.fillStyle = ORANGE; ctx.beginPath(); ctx.arc(Pp[0], Pp[1], 7, 0, 7); ctx.fill();
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    const leftSide = Yp[0] > Pp[0];
    label(ctx, "prediction X̃w̃", Pp[0] + (leftSide ? -12 : 12), Pp[1] + 16, ORANGE, 12.5, leftSide ? "right" : "left", 600);
  }, []);

  useEffect(() => { drawLeft(); drawRight(); }, [wb, view, drawLeft, drawRight]);
  useEffect(() => {
    const redraw = () => { drawLeft(); drawRight(); };
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [drawLeft, drawRight]);

  /* ---------- interaction ---------- */
  const leftDrag = useRef<number | null>(null);
  const onLeftDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = left.current!; const rect = c.getBoundingClientRect();
    const { sx, sy } = lmap(rect.width, rect.height);
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const { w, b } = wbRef.current;
    let hit: number | null = null;
    HANDLES.forEach((hx, i) => { if (Math.hypot(mx - sx(hx), my - sy(w * hx + b)) < 18) hit = i; });
    if (hit === null && Math.abs(mx - sx(HANDLES[0])) < Math.abs(mx - sx(HANDLES[1]))) hit = 0; else if (hit === null) hit = 1;
    leftDrag.current = hit; c.setPointerCapture(e.pointerId); cancelAnimationFrame(anim.current);
    onLeftMove(e);
  };
  const onLeftMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (leftDrag.current === null) return;
    const c = left.current!; const rect = c.getBoundingClientRect();
    const { iy } = lmap(rect.width, rect.height);
    const yv = Math.max(L.y0, Math.min(L.y1, iy(e.clientY - rect.top)));
    const { w, b } = wbRef.current;
    const h = HANDLES.map((hx) => w * hx + b);
    h[leftDrag.current] = yv;
    const nw = (h[1] - h[0]) / (HANDLES[1] - HANDLES[0]);
    setWb({ w: nw, b: h[0] - nw * HANDLES[0] });
  };

  const rightDrag = useRef<{ kind: "point" | "turn"; x: number; y: number } | null>(null);
  const onRightDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = right.current!; const rect = c.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const Pp = project(pred(wbRef.current.w, wbRef.current.b), rect.width, rect.height);
    rightDrag.current = { kind: Math.hypot(mx - Pp[0], my - Pp[1]) < 20 ? "point" : "turn", x: mx, y: my };
    c.setPointerCapture(e.pointerId); cancelAnimationFrame(anim.current);
  };
  const onRightMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = rightDrag.current; if (!d) return;
    const c = right.current!; const rect = c.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const dx = mx - d.x, dy = my - d.y;
    d.x = mx; d.y = my;
    if (d.kind === "turn") {
      setView((v) => ({ yaw: v.yaw - dx * 0.008, pitch: Math.max(-0.2, Math.min(1.2, v.pitch + dy * 0.006)) }));
      return;
    }
    // move the prediction within the plane: solve screen delta = J [dw, db]
    const W = rect.width, H = rect.height;
    const p0 = project(pred(0, 0), W, H), pw = project(pred(1, 0), W, H), pb = project(pred(0, 1), W, H);
    const j11 = pw[0] - p0[0], j21 = pw[1] - p0[1], j12 = pb[0] - p0[0], j22 = pb[1] - p0[1];
    const det = j11 * j22 - j12 * j21;
    if (Math.abs(det) < 1e-3) return;
    const dw = (j22 * dx - j12 * dy) / det, db = (-j21 * dx + j11 * dy) / det;
    setWb(({ w, b }) => ({ w: Math.max(-1.2, Math.min(1.6, w + dw)), b: Math.max(-0.4, Math.min(2.6, b + db)) }));
  };
  const endDrag = () => { leftDrag.current = null; rightDrag.current = null; };

  const glide = (to: { w: number; b: number }) => {
    cancelAnimationFrame(anim.current);
    const from = wbRef.current, t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 700), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setWb({ w: from.w + (to.w - from.w) * e, b: from.b + (to.b - from.b) * e });
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  };

  const p = pred(wb.w, wb.b);
  const r = [0, 1, 2].map((i) => YS[i] - p[i]);
  const sse = dot(r, r);
  const atBest = Math.abs(dot(r, C1)) < 0.03 && Math.abs(dot(r, C2)) < 0.03;

  return (
    <figure className="projection-views not-prose my-8">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <p className="mb-1 text-center text-xs uppercase tracking-[0.18em] text-slate-500">the usual picture</p>
          <canvas ref={left} className="block h-[320px] w-full touch-none rounded-lg border border-slate-700/60 bg-[var(--plate)]"
            onPointerDown={onLeftDown} onPointerMove={onLeftMove} onPointerUp={endDrag} onPointerCancel={endDrag} />
        </div>
        <div>
          <p className="mb-1 text-center text-xs uppercase tracking-[0.18em] text-slate-500">one axis per data point</p>
          <canvas ref={right} className="block h-[320px] w-full cursor-grab touch-none rounded-lg border border-slate-700/60 bg-[var(--plate)]"
            onPointerDown={onRightDown} onPointerMove={onRightMove} onPointerUp={endDrag} onPointerCancel={endDrag} />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400">
        <span>
          sum of squared residuals <span className="font-semibold text-slate-100 tabular-nums">{sse.toFixed(3)}</span> = squared length of the dashed segment
        </span>
        <span className={atBest ? "font-semibold text-teal-700" : ""}>
          {atBest ? "residual ⟂ both columns: the best fit" : `residual · columns: ${dot(r, C1).toFixed(2)}, ${dot(r, C2).toFixed(2)}`}
        </span>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button type="button" onClick={() => glide(BEST)} className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-slate-50">
          slide to the best fit
        </button>
        <button type="button" onClick={() => glide(START)} className="rounded-full border border-slate-600 px-4 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-slate-400">
          reset
        </button>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-400">
        Three data points, so that data space is ordinary 3D. On the right, each axis is one data point: the three targets
        are one vector <em>y</em>, and every line on the left is one point on the plane spanned by the two columns of the
        design matrix. Drag the orange handles on the left or the orange point on the right; drag the empty space on the
        right to turn it. The two pictures always agree: the vertical gaps on the left are the three coordinates of the
        dashed segment on the right. The best line is the point of the plane closest to <em>y</em>, the foot of the
        perpendicular (the faint ring).
      </figcaption>
    </figure>
  );
}
