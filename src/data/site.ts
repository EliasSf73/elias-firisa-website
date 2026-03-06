export type NewsItem = {
  date: string;
  text: string;
};

export type Project = {
  title: string;
  category: string;
  summary: string;
  detail: string;
  tags: string[];
  href: string;
  featured?: boolean;
};

export type Writing = {
  title: string;
  date: string;
  summary: string;
  href: string;
  kind: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Variance-Preserving Diffusion for Image Generation",
    category: "Generative modeling",
    summary:
      "A VP diffusion model written from scratch: custom noise schedules, forward/reverse processes, and few-step sampling with NFE 1, 2, and 4.",
    detail:
      "Compared consistency-model and ReFlow-style shortcuts to see what actually lowers FID when you only get a handful of function evaluations.",
    tags: ["Diffusion", "PyTorch", "Sampling", "FID"],
    href: "https://github.com/EliasSf73/Variance-Preserving-Diffusion",
    featured: true,
  },
  {
    title: "Stress, Delay & Noise in Gamma-band Oscillations",
    category: "Computational neuroscience",
    summary:
      "A Wilson-Cowan circuit that shows how tonic drive, feedback delay, and noise reshape cortical rhythms.",
    detail:
      "The surprising result: moderate noise increases coherence. The model also reproduces gamma-to-beta shifts seen in stressed cortex.",
    tags: ["Wilson-Cowan", "Dynamical systems", "Stochastic processes"],
    href: "https://github.com/EliasSf73/Mathematical-modeling-project/tree/main/Modeling%20Project",
    featured: true,
  },
  {
    title: "Real-Time Object Counting (YOLOv8 + OpenCV)",
    category: "Applied ML",
    summary:
      "A CLI that counts objects in images, video files, YouTube links, or a live webcam feed.",
    detail:
      "Modular enough to swap detectors. Tuned to run on CPU (macOS) without feeling slow.",
    tags: ["Computer vision", "YOLOv8", "CLI", "OpenCV"],
    href: "https://github.com/EliasSf73/Computer-Vision-Project",
    featured: true,
  },
];

export const projectArchive: Project[] = [
  {
    title: "Diffusion Image Generation Challenge",
    category: "Generative modeling",
    summary:
      "Pitted diffusion against flow-based methods to see which generates better images in under four sampling steps.",
    detail:
      "Most of the gains came from scheduler design and denoising tricks, not architecture changes.",
    tags: ["Diffusion", "Flows", "Image synthesis"],
    href: "https://github.com/EliasSf73/diffusion-image-challenge",
  },
  {
    title: "ML & Generative Modeling Notebooks",
    category: "ML foundations",
    summary:
      "End-to-end experiments: data splits, bias-variance, logistic regression, feedforward nets, neural ODEs, and denoising score matching.",
    detail:
      "Every notebook is self-contained and designed to be re-run without setup pain.",
    tags: ["ML pipelines", "Neural ODEs", "Statistics"],
    href: "https://github.com/EliasSf73/Machine-Learning-Generative-Modeling",
  },
  {
    title: "Mathematical Biology Mini-Projects",
    category: "Biological modeling",
    summary:
      "ODE models, parameter estimation, clinical stats, and single-cell analysis across several small projects.",
    detail:
      "Mixed dynamical systems with dimensionality reduction (PCA, t-SNE, UMAP) to make sense of real data.",
    tags: ["ODEs", "Optimization", "Single-cell data"],
    href: "https://github.com/EliasSf73/Mathematical-modeling-project",
  },
  {
    title: "Neural Dynamics & Information Processing",
    category: "Theoretical neuroscience",
    summary:
      "Neuron models, spike train analysis, STDP, and information-theoretic views of how neurons encode signals.",
    detail:
      "The point was to explain behavior with simple models, not just fit outputs.",
    tags: ["Neural coding", "STDP", "Simulation"],
    href: "https://github.com/EliasSf73/computational-neuroscience-mini-projects",
  },
];

export const writings: Writing[] = [
  {
    title: "Least Squares and Likelihood in Linear Regression",
    date: "June 29, 2025",
    summary:
      "A note on linear regression from the least-squares and likelihood points of view.",
    href: "/blog/posts/slug",
    kind: "Technical essay",
  },
];

export const contactLinks = [
  {
    label: "Email",
    value: "eliassfirisa@gmail.com",
    href: "mailto:eliassfirisa@gmail.com",
  },
  {
    label: "GitHub",
    value: "EliasSf73",
    href: "https://github.com/EliasSf73?tab=repositories",
  },
  {
    label: "LinkedIn",
    value: "elias-firisa",
    href: "https://www.linkedin.com/in/elias-firisa-4ba178231/",
  },
];
