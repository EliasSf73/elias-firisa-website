"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

/* ═══════════════════════════════════════════
   NEURAL NETWORK
   ═══════════════════════════════════════════ */

const neurons = [
  { x: 8, y: 12 }, { x: 22, y: 8 }, { x: 38, y: 18 }, { x: 52, y: 6 },
  { x: 68, y: 14 }, { x: 82, y: 10 }, { x: 94, y: 20 },
  { x: 5, y: 34 }, { x: 18, y: 42 }, { x: 32, y: 30 }, { x: 48, y: 38 },
  { x: 62, y: 28 }, { x: 76, y: 36 }, { x: 90, y: 32 },
  { x: 12, y: 56 }, { x: 26, y: 52 }, { x: 42, y: 60 }, { x: 56, y: 50 },
  { x: 72, y: 58 }, { x: 86, y: 48 }, { x: 96, y: 54 },
  { x: 6, y: 72 }, { x: 20, y: 78 }, { x: 36, y: 68 }, { x: 50, y: 76 },
  { x: 66, y: 70 }, { x: 80, y: 80 }, { x: 92, y: 74 },
  { x: 14, y: 90 }, { x: 30, y: 86 }, { x: 44, y: 94 }, { x: 60, y: 88 },
  { x: 74, y: 92 }, { x: 88, y: 86 },
];

function buildConnections() {
  const conns: { from: number; to: number; dist: number }[] = [];
  for (let i = 0; i < neurons.length; i++) {
    const distances = neurons
      .map((n, j) => ({
        j,
        d: Math.hypot(n.x - neurons[i].x, n.y - neurons[i].y),
      }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3);

    for (const { j, d } of distances) {
      if (!conns.some((c) => (c.from === j && c.to === i))) {
        conns.push({ from: i, to: j, dist: d });
      }
    }
  }
  return conns;
}

const connections = buildConnections();

/* ═══════════════════════════════════════════
   PAGE-SPECIFIC EQUATIONS
   ═══════════════════════════════════════════ */

type EqItem = { content: React.ReactNode; large?: boolean };
type EqColumn = { left: string; width: string; delay: string; reverse: boolean; items: EqItem[] };

/* ── Home: neuroscience + diffusion SDEs + representation learning ── */
const homeEquations: EqColumn[] = [
  {
    left: "3%", width: "20%", delay: "0s", reverse: false,
    items: [
      { content: <>dx = f(x,t)dt + g(t)dW</>, large: true },
      { content: <>∇<sub>x</sub> log p<sub>t</sub>(x)</> },
      { content: <>dV/dt = (I − g<sub>L</sub>(V − E<sub>L</sub>))/C</> },
      { content: <>x<sub>t</sub> = α<sub>t</sub>x<sub>0</sub> + σ<sub>t</sub>ε</>, large: true },
      { content: <>Δw<sub>ij</sub> = η · x<sub>i</sub> · y<sub>j</sub></> },
      { content: <>p(z|x) = 𝒩(μ<sub>θ</sub>, σ<sub>θ</sub><sup>2</sup>)</> },
    ],
  },
  {
    left: "25%", width: "22%", delay: "-12s", reverse: true,
    items: [
      { content: <>KL(q(z|x) ∥ p(z))</>, large: true },
      { content: <>τ dm/dt = −m + φ(Wm + I)</> },
      { content: <>s<sub>θ</sub>(x,t) ≈ ∇ log p<sub>t</sub>(x)</> },
      { content: <>𝔼[∥ε − ε<sub>θ</sub>(x<sub>t</sub>,t)∥<sup>2</sup>]</> },
      { content: <>p(θ|D) ∝ p(D|θ)p(θ)</>, large: true },
      { content: <>ELBO = 𝔼[log p(x|z)] − KL</> },
    ],
  },
  {
    left: "50%", width: "22%", delay: "-6s", reverse: false,
    items: [
      { content: <>Cẋ = −g<sub>L</sub>(x − E<sub>L</sub>) + I(t)</>, large: true },
      { content: <>dx/dt = v<sub>θ</sub>(x,t)</> },
      { content: <>r = φ(Wx + b)</> },
      { content: <>ẋ = Ax + Bu</>, large: true },
      { content: <>λ = max Re eig(J)</> },
      { content: <>x<sub>1</sub> = x<sub>0</sub> + ∫v<sub>θ</sub>dt</> },
    ],
  },
  {
    left: "75%", width: "22%", delay: "-18s", reverse: true,
    items: [
      { content: <>H(X) = −Σ p(x) log p(x)</>, large: true },
      { content: <>I(X;Y) = H(X) − H(X|Y)</> },
      { content: <>∫ p(x|z)p(z)dz</> },
      { content: <>β<sub>t</sub> = β<sub>min</sub> + t(β<sub>max</sub> − β<sub>min</sub>)</> },
      { content: <>𝔼[ε] = 0</>, large: true },
      { content: <>ẋ = f(x) − ½g<sup>2</sup>∇log p</> },
    ],
  },
];

/* ── Projects: linear algebra, optimization, ML training ── */
const projectsEquations: EqColumn[] = [
  {
    left: "3%", width: "20%", delay: "0s", reverse: false,
    items: [
      { content: <>w* = (X<sup>⊤</sup>X)<sup>−1</sup>X<sup>⊤</sup>y</>, large: true },
      { content: <>∥y − Xw∥<sup>2</sup> + λ∥w∥<sup>2</sup></> },
      { content: <>θ<sub>t+1</sub> = θ<sub>t</sub> − α∇L(θ<sub>t</sub>)</> },
      { content: <>Σ = UΛU<sup>⊤</sup></>, large: true },
      { content: <>det(A − λI) = 0</> },
      { content: <>L = −Σ y log ŷ</> },
    ],
  },
  {
    left: "25%", width: "22%", delay: "-10s", reverse: true,
    items: [
      { content: <>argmin<sub>θ</sub> 𝔼[L(f<sub>θ</sub>(x), y)]</>, large: true },
      { content: <>∂L/∂w = −2X<sup>⊤</sup>(y − Xw)</> },
      { content: <>σ(z) = 1/(1 + e<sup>−z</sup>)</> },
      { content: <>p(y|x,w) = 𝒩(w<sup>⊤</sup>x, σ<sup>2</sup>)</>, large: true },
      { content: <>E[(x − μ)(x − μ)<sup>⊤</sup>]</> },
      { content: <>∇<sup>2</sup>L ≻ 0</> },
    ],
  },
  {
    left: "50%", width: "22%", delay: "-5s", reverse: false,
    items: [
      { content: <>A = QR</>, large: true },
      { content: <>tr(AB) = tr(BA)</> },
      { content: <>∥Ax − b∥ → min</> },
      { content: <>rank(A) = dim(col(A))</>, large: true },
      { content: <>x<sub>k+1</sub> = x<sub>k</sub> − H<sup>−1</sup>∇f</> },
      { content: <>SVD: A = UΣV<sup>⊤</sup></> },
    ],
  },
  {
    left: "75%", width: "22%", delay: "-16s", reverse: true,
    items: [
      { content: <>FID = ∥μ<sub>r</sub> − μ<sub>g</sub>∥<sup>2</sup> + tr(…)</>, large: true },
      { content: <>BN(x) = γ(x − μ)/σ + β</> },
      { content: <>Attention = softmax(QK<sup>⊤</sup>/√d)V</> },
      { content: <>m<sub>t</sub> = β<sub>1</sub>m<sub>t−1</sub> + (1−β<sub>1</sub>)g<sub>t</sub></>, large: true },
      { content: <>∇<sub>θ</sub> 𝔼[R] = 𝔼[R ∇log π]</> },
      { content: <>||w||<sub>1</sub> → sparsity</> },
    ],
  },
];

/* ── Writing: Fourier, statistics, probability, information theory ── */
const writingEquations: EqColumn[] = [
  {
    left: "3%", width: "20%", delay: "0s", reverse: false,
    items: [
      { content: <>f(x) = Σ a<sub>n</sub>cos(nωx) + b<sub>n</sub>sin(nωx)</>, large: true },
      { content: <>F(ω) = ∫f(t)e<sup>−iωt</sup>dt</> },
      { content: <>f * g = ∫f(τ)g(t−τ)dτ</> },
      { content: <>F[f * g] = F[f] · F[g]</>, large: true },
      { content: <>a<sub>n</sub> = (2/T)∫f(t)cos(nωt)dt</> },
      { content: <>δ(t) = (1/2π)∫e<sup>iωt</sup>dω</> },
    ],
  },
  {
    left: "25%", width: "22%", delay: "-11s", reverse: true,
    items: [
      { content: <>p(θ|D) ∝ p(D|θ)p(θ)</>, large: true },
      { content: <>Var(X) = 𝔼[X<sup>2</sup>] − (𝔼[X])<sup>2</sup></> },
      { content: <>P(A|B) = P(B|A)P(A)/P(B)</> },
      { content: <>X ~ 𝒩(μ, σ<sup>2</sup>)</>, large: true },
      { content: <>ℒ(θ) = Π p(x<sub>i</sub>|θ)</> },
      { content: <>MLE: ∂ log ℒ/∂θ = 0</> },
    ],
  },
  {
    left: "50%", width: "22%", delay: "-7s", reverse: false,
    items: [
      { content: <>H(X) = −Σ p(x) log p(x)</>, large: true },
      { content: <>I(X;Y) = H(X) − H(X|Y)</> },
      { content: <>DFT: X<sub>k</sub> = Σ x<sub>n</sub>e<sup>−i2πkn/N</sup></> },
      { content: <>Parseval: Σ|x<sub>n</sub>|<sup>2</sup> = Σ|X<sub>k</sub>|<sup>2</sup>/N</>, large: true },
      { content: <>KL(p ∥ q) = Σ p log(p/q)</> },
      { content: <>∇ × E = −∂B/∂t</> },
    ],
  },
  {
    left: "75%", width: "22%", delay: "-15s", reverse: true,
    items: [
      { content: <>Laplace: F(s) = ∫f(t)e<sup>−st</sup>dt</>, large: true },
      { content: <>z = F(s) poles → dynamics</> },
      { content: <>W(ω) = |F(ω)|<sup>2</sup></> },
      { content: <>CLT: S<sub>n</sub> → 𝒩(0,1)</>, large: true },
      { content: <>χ<sup>2</sup> = Σ(O−E)<sup>2</sup>/E</> },
      { content: <>e<sup>iθ</sup> = cos θ + i sin θ</> },
    ],
  },
];

const equationSets: Record<string, EqColumn[]> = {
  home: homeEquations,
  projects: projectsEquations,
  writing: writingEquations,
  default: homeEquations,
};

/* ═══════════════════════════════════════════ */

export default function BackgroundScene() {
  const pathname = usePathname();

  const activeScene = pathname === "/"
    ? "home"
    : pathname.startsWith("/projects")
      ? "projects"
      : pathname.startsWith("/blog")
        ? "writing"
        : "default";

  const equationColumns = equationSets[activeScene];

  const firingData = useMemo(() => {
    return connections.map((conn, i) => {
      const duration = 1.8 + (conn.dist / 20) * 0.6;
      const delay = (i * 0.47) % 8;
      const totalCycle = duration + 3 + (i % 3) * 1.5;
      return { ...conn, duration, delay, totalCycle };
    });
  }, []);

  return (
    <div aria-hidden="true" className="site-background">
      {/* ── Neural network ── */}
      <div className="neural-layer">
        <svg
          className="neural-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="neuron-glow">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ap-glow">
              <feGaussianBlur stdDeviation="0.3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dendrite connections */}
          {firingData.map((conn, i) => {
            const from = neurons[conn.from];
            const to = neurons[conn.to];
            return (
              <line
                key={`dendrite-${i}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                className="dendrite"
              />
            );
          })}

          {/* Action potentials */}
          {firingData.map((conn, i) => {
            const from = neurons[conn.from];
            const to = neurons[conn.to];
            return (
              <circle
                key={`ap-${i}`}
                r="0.8"
                className="action-potential"
                filter="url(#ap-glow)"
                style={{
                  animationDuration: `${conn.totalCycle}s`,
                  animationDelay: `-${conn.delay}s`,
                  offsetPath: `path('M${from.x} ${from.y} L${to.x} ${to.y}')`,
                }}
              />
            );
          })}

          {/* Synapse sparks — flash at target when AP arrives */}
          {firingData.map((conn, i) => {
            const to = neurons[conn.to];
            return (
              <circle
                key={`spark-${i}`}
                cx={to.x}
                cy={to.y}
                r="2.5"
                className="synapse-spark"
                style={{
                  animationDuration: `${conn.totalCycle}s`,
                  animationDelay: `-${conn.delay}s`,
                }}
              />
            );
          })}

          {/* Neuron cell bodies */}
          {neurons.map((n, i) => (
            <g key={`neuron-${i}`}>
              <circle
                cx={n.x} cy={n.y} r="3"
                className="fire-ripple"
                style={{ animationDelay: `-${(i * 1.1) % 7}s` }}
              />
              <circle
                cx={n.x} cy={n.y}
                r={1.2 + (i % 3) * 0.25}
                className="neuron-membrane"
                style={{ animationDelay: `-${(i * 0.8) % 5}s` }}
              />
              <circle
                cx={n.x} cy={n.y}
                r={0.6 + (i % 3) * 0.15}
                className="neuron-soma"
                filter="url(#neuron-glow)"
                style={{ animationDelay: `-${(i * 0.6) % 4}s` }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* ── Equations (page-specific) ── */}
      <div className="equation-layer" key={activeScene}>
        {equationColumns.map((col, ci) => (
          <div
            key={ci}
            className={`eq-col ${col.reverse ? "is-reverse" : ""}`}
            style={{ left: col.left, width: col.width }}
          >
            <div className="eq-track" style={{ animationDelay: col.delay }}>
              {[...col.items, ...col.items].map((item, i) => (
                <div key={i} className={`eq-item ${item.large ? "is-large" : ""}`}>
                  {item.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Page-specific color scenes ── */}
      <div className={`color-scene scene-home ${activeScene === "home" ? "is-active" : ""}`}>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="glow glow-c" />
      </div>

      <div className={`color-scene scene-projects ${activeScene === "projects" ? "is-active" : ""}`}>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="glow glow-c" />
      </div>

      <div className={`color-scene scene-writing ${activeScene === "writing" ? "is-active" : ""}`}>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="glow glow-c" />
      </div>

      <div className={`color-scene scene-default ${activeScene === "default" ? "is-active" : ""}`}>
        <div className="glow glow-a" />
        <div className="glow glow-b" />
      </div>
    </div>
  );
}
