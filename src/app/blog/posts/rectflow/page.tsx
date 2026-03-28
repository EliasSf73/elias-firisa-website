import React from 'react';
import Link from 'next/link';
import { LaTeX } from '@/components/LaTeX';

const basePath = process.env.NODE_ENV === "production" ? "/elias-firisa-website" : "";

export const metadata = {
  title: 'Probabilistic Invertibility of Rectified Flows Beyond Global Monotonicity',
  description: 'A generic-in-time invertibility theory for rectified flow maps via transversality.',
};

const RectFlow = () => {
  return (
    <article className="reading-article mx-auto max-w-4xl rounded-[30px] border border-slate-300/70 bg-[rgba(255,255,255,0.72)] px-6 py-10 shadow-[0_28px_80px_-54px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-8 lg:px-12">
      <h1>Probabilistic Invertibility of Rectified Flows Beyond Global Monotonicity</h1>
      <p className="mb-2 text-sm text-slate-600">Elias Firisa</p>
      <p className="mb-4 text-sm uppercase tracking-[0.18em] text-slate-500">2026 &middot; In preparation</p>
      <p className="mb-8">
        <a
          href={`${basePath}/docs/rectflow_preprint.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-sm font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-950"
        >
          Download PDF
        </a>
      </p>

      <section>
        <h2>Abstract</h2>
        <p>
          Rectified Flow (RF) has recently emerged as an efficient alternative to diffusion-based generative modeling, with a theoretical explanation for fast sampling that hinges on invertibility properties of a rectified transport map. Existing analyses establish global invertibility of an auxiliary map{' '}
          <LaTeX math={String.raw`H_t(\cdot)`} /> under a strong uniform monotonicity condition on the endpoint Jacobian, yielding a sufficient route to straight couplings and quantitative error control. Empirical evidence, however, indicates that this monotonicity condition is frequently violated while invertibility persists for structured targets such as Gaussian mixtures.
        </p>
        <p>
          This preprint develops a complementary &ldquo;generic-in-time&rdquo; theory for the Gaussian-to-Gaussian-mixture regime. The central technical observation is a transversality identity: at any collision point <LaTeX math={String.raw`H_t(x) = H_t(y)`} /> with <LaTeX math={String.raw`x \neq y`} /> and <LaTeX math={String.raw`t \in (0,1)`} />, the time derivative <LaTeX math={String.raw`\partial_t(H_t(x) - H_t(y))`} /> is nonzero and explicitly proportional to <LaTeX math={String.raw`-(x - y)/t`} />. This <em>transversality engine</em> implies that collision sets form a Lebesgue-null subset of <LaTeX math={String.raw`(0,1) \times B_R \times B_R`} /> on any compact domain <LaTeX math={String.raw`B_R`} />, and consequently, for Lebesgue-almost every <LaTeX math={String.raw`t \in (0,1)`} />, collision pairs in <LaTeX math={String.raw`B_R \times B_R`} /> have zero Lebesgue measure.
        </p>
        <p>
          The argument couples (i) strip-wise flow regularity on <LaTeX math={String.raw`t \in [\varepsilon, 1 - \varepsilon]`} /> (supported by explicit mixture-score formulae) with (ii) the transversality identity and (iii) an implicit-function/Fubini slicing argument. This replaces uniform global monotonicity by an almost-sure injectivity statement aligned with the probabilistic manner in which RF is used in practice.
        </p>
      </section>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Rectified Flow (RF) constructs a deterministic probability flow ODE that transports a simple base distribution <LaTeX math={String.raw`\rho_0`} /> (often a standard Gaussian) to a target <LaTeX math={String.raw`\rho_1`} />. In contrast to diffusion models, RF aims to learn (or approximate) velocity fields that generate near-straight trajectories between noise and data, enabling fast generation.
        </p>
        <p>
          A recurring analytical object in RF theory is an auxiliary map <LaTeX math={String.raw`H_t(\cdot)`} /> that interpolates between the identity and the time-1 endpoint of the RF flow. In recent work [1], global invertibility of <LaTeX math={String.raw`H_t(\cdot)`} /> is obtained under a sufficient assumption imposing uniform global monotonicity through the symmetric part of the endpoint Jacobian. That route supports strong structural consequences (e.g., straight couplings under 1-RF) and quantitative error bounds. At the same time, simulations suggest that this assumption is not necessary, and an explicit open problem is raised for Gaussian mixtures.
        </p>

        <h3>Objective</h3>
        <p>
          This note develops a complementary analysis for the regime
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`\rho_0 = \mathcal{N}(0, I_d), \qquad \rho_1 = \sum_{k=1}^{K} \pi_k \, \mathcal{N}(\mu_k, \Sigma_k),`} displayMode={true} />
        </div>
        <p>
          in which the RF drift admits a closed-form score representation. The principal aim is to formalize a probabilistic notion of invertibility: <em>for Lebesgue-almost every <LaTeX math={String.raw`t \in (0,1)`} />, the collision event <LaTeX math={String.raw`H_t(Z_0) = H_t(Z_0')`} /> with <LaTeX math={String.raw`Z_0 \neq Z_0'`} /> occurs with probability zero under <LaTeX math={String.raw`(Z_0, Z_0') \sim \rho_0 \times \rho_0`} />.</em>
        </p>

        <h3>Contributions</h3>
        <ol className="pl-6 list-decimal space-y-3">
          <li>
            <strong>Transversality engine.</strong> A structural identity is established: at any collision point <LaTeX math={String.raw`H_t(x) = H_t(y)`} /> with <LaTeX math={String.raw`x \neq y`} /> and <LaTeX math={String.raw`t \in (0,1)`} />, the derivative <LaTeX math={String.raw`\partial_t(H_t(x) - H_t(y))`} /> is nonzero and equals <LaTeX math={String.raw`-(x - y)/t`} />. This identity is independent of monotonicity or convexity assumptions and isolates time-mixing as the mechanism that destroys persistent collisions.
          </li>
          <li>
            <strong>Generic injectivity on compacts.</strong> Under standard flow regularity on strips <LaTeX math={String.raw`t \in [\varepsilon, 1 - \varepsilon]`} />, the transversality engine implies that collision sets are Lebesgue-null in <LaTeX math={String.raw`(0,1) \times B_R \times B_R`} /> for every radius <LaTeX math={String.raw`R`} />. Consequently, for Lebesgue-almost every <LaTeX math={String.raw`t`} />, the set of collision pairs in <LaTeX math={String.raw`B_R \times B_R`} /> has <LaTeX math={String.raw`2d`} />-dimensional Lebesgue measure zero.
          </li>
          <li>
            <strong>Probabilistic invertibility under Gaussian initialization.</strong> Since <LaTeX math={String.raw`\rho_0`} /> has a smooth density, the preceding Lebesgue-null collision property yields that, for almost every <LaTeX math={String.raw`t`} />, the collision event under <LaTeX math={String.raw`(Z_0, Z_0') \sim \rho_0 \times \rho_0`} /> has probability zero on each <LaTeX math={String.raw`B_R`} /> and hence in the limit as <LaTeX math={String.raw`R \to \infty`} />.
          </li>
        </ol>
      </section>

      <section>
        <h2>2. Mathematical Setup</h2>

        <h3>Independent coupling, interpolation, and RF drift</h3>
        <p>
          Let <LaTeX math={String.raw`(X_0, X_1) \sim \rho_0 \times \rho_1`} /> with <LaTeX math={String.raw`\rho_0 = \mathcal{N}(0, I_d)`} />. Define the linear interpolation
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`X_t := (1 - t)X_0 + tX_1, \qquad t \in [0, 1].`} displayMode={true} />
        </div>
        <p>
          Denote by <LaTeX math={String.raw`p_t`} /> the density of <LaTeX math={String.raw`X_t`} /> and by <LaTeX math={String.raw`s_t(x) := \nabla_x \log p_t(x)`} /> its score. The RF velocity field is
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`v_t(x) := \mathbb{E}[X_1 - X_0 \mid X_t = x], \qquad t \in (0, 1).`} displayMode={true} />
        </div>
        <p>
          The RF sampling ODE is
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`\frac{d}{dt} Z_t = v_t(Z_t), \qquad Z_0 = z_0.`} displayMode={true} />
        </div>
        <p>
          The endpoint map is <LaTeX math={String.raw`Z_1 : \mathbb{R}^d \to \mathbb{R}^d`} />, <LaTeX math={String.raw`Z_1(z_0) := Z_{t=1}(z_0)`} />.
        </p>

        <h3>The rectified map <LaTeX math={String.raw`H_t`} /></h3>
        <p>
          Following [1], define for each <LaTeX math={String.raw`t \in [0, 1]`} /> the auxiliary map
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`H_t(z_0) := (1 - t)z_0 + t \, Z_1(z_0).`} displayMode={true} />
        </div>
        <p>
          Invertibility of <LaTeX math={String.raw`H_t(\cdot)`} /> plays a central role in straightness arguments in [1].
        </p>

        <h3>Gaussian-mixture targets</h3>
        <p>
          Let the target be a (nondegenerate) Gaussian mixture
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`\rho_1(x) = \sum_{k=1}^{K} \pi_k \, \varphi(x; \mu_k, \Sigma_k), \qquad \pi_k > 0, \ \sum_{k=1}^{K} \pi_k = 1, \ \Sigma_k \succ 0.`} displayMode={true} />
        </div>
        <p>
          In this regime, [1] derives a Tweedie-type identity expressing <LaTeX math={String.raw`v_t`} /> in terms of the score:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`v_t(x) = \frac{x}{t} + \frac{1 - t}{t} s_t(x), \qquad t \in (0, 1),`} displayMode={true} />
        </div>
        <p>
          and provides an explicit responsibility-weighted affine form for <LaTeX math={String.raw`s_t`} /> (general covariance) as well as an explicit expression for <LaTeX math={String.raw`\nabla_x v_t`} /> on time strips. These explicit formulae imply real-analytic dependence on <LaTeX math={String.raw`x`} /> for each fixed <LaTeX math={String.raw`t \in (0,1)`} />.
        </p>

        <h3>Existence, uniqueness, and non-explosion</h3>
        <p>
          The vector field in the Tweedie identity exhibits an apparent singularity at <LaTeX math={String.raw`t = 0`} />. The RF analysis in [1] establishes existence and uniqueness of solutions on <LaTeX math={String.raw`[0, 1]`} /> under an Osgood non-explosion criterion and a mild moment condition. In the Gaussian mixture regime, the Osgood condition is verified explicitly for general mixtures, yielding global well-posedness of the ODE. The present work takes this well-posedness as the foundation for the endpoint map <LaTeX math={String.raw`Z_1(\cdot)`} />.
        </p>
      </section>

      <section>
        <h2>3. A General Transversality Theorem for Rectified Maps</h2>
        <p>
          Recall <LaTeX math={String.raw`H_t(z) = (1 - t)z + tZ_1(z)`} />, where <LaTeX math={String.raw`Z_1`} /> is the time-1 endpoint map of the RF ODE. For <LaTeX math={String.raw`t \in (0, 1)`} /> and <LaTeX math={String.raw`(x, y) \in \mathbb{R}^d \times \mathbb{R}^d`} />, define
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math={String.raw`F(t, x, y) := H_t(x) - H_t(y).`} displayMode={true} />
        </div>
        <p>
          A collision at time <LaTeX math={String.raw`t`} /> is a pair <LaTeX math={String.raw`(x, y)`} /> with <LaTeX math={String.raw`x \neq y`} /> such that <LaTeX math={String.raw`F(t, x, y) = 0`} />.
        </p>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-700">
          <strong>Definition (Collision sets on compacts).</strong>{' '}
          For <LaTeX math={String.raw`R > 0`} />, let <LaTeX math={String.raw`B_R := \{x \in \mathbb{R}^d : \|x\| \le R\}`} /> and <LaTeX math={String.raw`\Delta := \{(x, x) : x \in B_R\}`} />. Define the collision slice at time <LaTeX math={String.raw`t`} /> by
          <div className="text-center mt-3 mb-1">
            <LaTeX math={String.raw`\mathcal{C}_{t,R} := \{(x, y) \in (B_R \times B_R) \setminus \Delta : H_t(x) = H_t(y)\}.`} displayMode={true} />
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-700">
          <strong>Assumption (Strip-wise regularity).</strong>{' '}
          For every <LaTeX math={String.raw`\varepsilon \in (0, 1/2)`} /> and <LaTeX math={String.raw`R > 0`} />, the mapping <LaTeX math={String.raw`(t, x) \mapsto H_t(x)`} /> is <LaTeX math={String.raw`C^1`} /> on <LaTeX math={String.raw`[\varepsilon, 1 - \varepsilon] \times B_R`} />.
        </div>

        <div className="mt-6 rounded-[24px] border border-sky-200/70 bg-sky-50/70 p-5 text-sm text-slate-700">
          <strong>Lemma (Transversality engine).</strong>{' '}
          Let <LaTeX math={String.raw`t \in (0, 1)`} /> and <LaTeX math={String.raw`x \neq y`} />. If <LaTeX math={String.raw`H_t(x) = H_t(y)`} />, then
          <div className="text-center mt-3 mb-3">
            <LaTeX math={String.raw`\partial_t\bigl(H_t(x) - H_t(y)\bigr) = -\frac{1}{t}(x - y) \neq 0.`} displayMode={true} />
          </div>
          <em>Proof.</em> Since <LaTeX math={String.raw`H_t(z) = (1 - t)z + tZ_1(z)`} />, one has
          <div className="text-center mt-2 mb-2">
            <LaTeX math={String.raw`H_t(x) - H_t(y) = (1 - t)(x - y) + t(Z_1(x) - Z_1(y)).`} displayMode={true} />
          </div>
          At a collision, <LaTeX math={String.raw`(1 - t)(x - y) + t(Z_1(x) - Z_1(y)) = 0`} />, hence <LaTeX math={String.raw`Z_1(x) - Z_1(y) = -(1 - t)(x - y)/t`} />. Differentiating in <LaTeX math={String.raw`t`} /> and substituting yields <LaTeX math={String.raw`-(x - y) - (1 - t)(x - y)/t = -(x - y)/t \neq 0`} />.
        </div>

        <div className="mt-6 rounded-[24px] border border-amber-200/70 bg-amber-50/70 p-5 text-sm text-slate-700">
          <strong>Theorem (Generic injectivity on compact sets).</strong>{' '}
          Under the strip-wise regularity assumption, for every <LaTeX math={String.raw`R > 0`} /> and for Lebesgue-almost every <LaTeX math={String.raw`t \in (0, 1)`} />,
          <div className="text-center mt-3 mb-3">
            <LaTeX math={String.raw`\mathrm{Leb}_{2d}\bigl(\mathcal{C}_{t,R}\bigr) = 0.`} displayMode={true} />
          </div>
          Consequently, if <LaTeX math={String.raw`\rho_0`} /> admits a density with respect to Lebesgue measure, then for Lebesgue-almost every <LaTeX math={String.raw`t`} />,
          <div className="text-center mt-3 mb-1">
            <LaTeX math={String.raw`(\rho_0 \times \rho_0)\bigl(\mathcal{C}_{t,R}\bigr) = 0.`} displayMode={true} />
          </div>
        </div>

        <div className="mt-4 pl-4 border-l-2 border-slate-300 text-sm text-slate-600">
          <em>Proof sketch.</em> Fix <LaTeX math={String.raw`\varepsilon \in (0, 1/2)`} /> and consider <LaTeX math={String.raw`D_{\varepsilon,R} := [\varepsilon, 1 - \varepsilon] \times ((B_R \times B_R) \setminus \Delta)`} />. By the strip-wise regularity assumption, <LaTeX math={String.raw`F`} /> is <LaTeX math={String.raw`C^1`} /> on <LaTeX math={String.raw`D_{\varepsilon,R}`} />. The transversality lemma implies that on the zero set <LaTeX math={String.raw`\{F = 0\} \subset D_{\varepsilon,R}`} />, the partial derivative <LaTeX math={String.raw`\partial_t F`} /> is nonzero. The implicit function theorem therefore implies that near each point of <LaTeX math={String.raw`\{F = 0\}`} />, the solution set can be represented as a <LaTeX math={String.raw`C^1`} /> graph <LaTeX math={String.raw`t = \tau(x, y)`} /> over <LaTeX math={String.raw`(x, y)`} />. Hence the full collision set in <LaTeX math={String.raw`(t, x, y)`} /> has <LaTeX math={String.raw`(2d + 1)`} />-dimensional Lebesgue measure zero on <LaTeX math={String.raw`D_{\varepsilon,R}`} />. Fubini&apos;s theorem yields <LaTeX math={String.raw`\mathrm{Leb}_{2d}(\mathcal{C}_{t,R}) = 0`} /> for a.e. <LaTeX math={String.raw`t \in [\varepsilon, 1 - \varepsilon]`} />. Letting <LaTeX math={String.raw`\varepsilon \downarrow 0`} /> along a sequence and intersecting full-measure sets completes the proof. Absolute continuity of <LaTeX math={String.raw`\rho_0 \times \rho_0`} /> implies the probabilistic statement.
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-700">
          <strong>Remark (Beyond specific targets).</strong>{' '}
          The theorem separates the transversality mechanism from distribution-specific verification of the regularity assumption. In particular, for <LaTeX math={String.raw`\rho_0 = \mathcal{N}(0, I)`} /> and general <LaTeX math={String.raw`\rho_1`} />, the intermediate density <LaTeX math={String.raw`p_t`} /> is a Gaussian convolution of a scaled version of <LaTeX math={String.raw`\rho_1`} />, suggesting strip-wise smoothness of score-based drifts under mild tail control.
        </div>
      </section>

      <section>
        <h2>4. Verification for Gaussian Mixture Targets</h2>

        <div className="mt-4 rounded-[24px] border border-amber-200/70 bg-amber-50/70 p-5 text-sm text-slate-700">
          <strong>Corollary (Gaussian mixtures satisfy strip-wise regularity).</strong>{' '}
          Let <LaTeX math={String.raw`\rho_0 = \mathcal{N}(0, I_d)`} /> and let <LaTeX math={String.raw`\rho_1`} /> be a nondegenerate Gaussian mixture. Then the strip-wise regularity assumption holds. Consequently, the generic injectivity theorem implies that for every <LaTeX math={String.raw`R > 0`} />, <LaTeX math={String.raw`\mathrm{Leb}_{2d}(\mathcal{C}_{t,R}) = 0`} /> for Lebesgue-almost every <LaTeX math={String.raw`t \in (0, 1)`} />, and <LaTeX math={String.raw`(\rho_0 \times \rho_0)(\mathcal{C}_{t,R}) = 0`} /> for almost every <LaTeX math={String.raw`t`} />.
        </div>

        <div className="mt-4 pl-4 border-l-2 border-slate-300 text-sm text-slate-600">
          <em>Proof sketch.</em> In the Gaussian-to-GMM regime, the RF drift admits an explicit score representation and its spatial derivatives are explicit and smooth on every time strip <LaTeX math={String.raw`[\varepsilon, 1 - \varepsilon]`} />. Moreover, global existence and uniqueness of the RF ODE are ensured by an Osgood non-explosion criterion, which is verified for general mixtures. Standard ODE flow regularity on compact time intervals then yields the <LaTeX math={String.raw`C^1`} /> property required by the regularity assumption.
        </div>
      </section>

      <section>
        <h2>5. Relation to Monotonicity-Based Invertibility Results</h2>
        <p>
          The uniform monotonicity condition in [1] imposes a condition on the symmetric part of the endpoint Jacobian that yields local invertibility and properness of <LaTeX math={String.raw`H_t`} />, and thus global invertibility via classical global inverse function theorems. The present results provide an alternative explanation for the empirical robustness of invertibility in Gaussian-mixture settings: even when monotonicity fails, collisions are structurally transversal in time, which enforces a generic-in-time injectivity property on compacts and an almost-sure collision-free statement under Gaussian initialization.
        </p>
      </section>

      <section>
        <h2>6. Conclusion</h2>
        <p>
          This work develops a generic-in-time invertibility theory for the rectified map <LaTeX math={String.raw`H_t`} /> in the Gaussian-to-Gaussian-mixture regime. The core lemma identifies a transversality mechanism intrinsic to the convex time-mixing structure: at any collision <LaTeX math={String.raw`H_t(x) = H_t(y)`} /> with <LaTeX math={String.raw`x \neq y`} />, the derivative in <LaTeX math={String.raw`t`} /> is explicitly nonzero. Combined with strip-wise regularity of RF flows (supported by analytic mixture-score formulae and global well-posedness under an Osgood criterion), this mechanism yields that, for Lebesgue-almost every time <LaTeX math={String.raw`t`} />, collision sets on any compact domain have Lebesgue measure zero. As a result, for almost every <LaTeX math={String.raw`t`} />, the map <LaTeX math={String.raw`H_t`} /> is injective almost surely under Gaussian initialization, providing a probabilistic notion of invertibility that aligns with the operational regime of rectified flow sampling.
        </p>
        <p>
          Several directions remain natural. Establishing full global invertibility for almost every <LaTeX math={String.raw`t`} /> may be approached by coercivity/properness estimates leveraging Gaussian-mixture tail structure. More broadly, generic-in-time arguments of the present type may inform sharper error bounds that depend on the geometric &ldquo;straightness&rdquo; of learned flows rather than uniform monotonicity.
        </p>
      </section>

      <section>
        <h2>References</h2>
        <ol className="pl-6 list-decimal space-y-2 text-sm text-slate-700">
          <li>V. Bansal, S. Roy, P. Sarkar, and A. Rinaldo. <em>Straightness of Rectified Flow: A Theoretical Insight into Wasserstein Convergence.</em> arXiv:2410.14949, 2024.</li>
          <li>X. Liu, C. Gong, and Q. Liu. <em>Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow.</em> arXiv:2209.03003, 2022.</li>
          <li>Q. Liu. <em>Rectified Flow: A Marginal Preserving Approach to Optimal Transport.</em> arXiv:2209.14577, 2022.</li>
          <li>Y. Lipman, R. T. Q. Chen, H. Ben-Hamu, M. Nickel, and M. Le. <em>Flow Matching for Generative Modeling.</em> arXiv:2210.02747, 2022.</li>
          <li>J. Hertrich, A. Chambolle, J. Delon. <em>On the Relation between Rectified Flows and Optimal Transport.</em> arXiv:2505.19712, 2025.</li>
          <li>J. M. Lee. <em>Introduction to Smooth Manifolds.</em> Springer, 2nd edition, 2012.</li>
          <li>V. Guillemin and A. Pollack. <em>Differential Topology.</em> Prentice-Hall, 1974.</li>
        </ol>
      </section>

      <div className="mt-8">
        <Link
          href="/blog"
          className="inline-flex text-sm font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-950"
        >
          Back to Writing
        </Link>
      </div>
    </article>
  );
};

export default RectFlow;
