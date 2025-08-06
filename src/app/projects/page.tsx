import React from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Modeling Stress, Delay & Noise in Gamma-band Oscillations',
      description: 'I used a simplified Wilson–Cowan excitatory–inhibitory neural circuit to show how three factors—tonic excitatory drive ("stress"), synaptic feedback delay, and background noise—tune cortical rhythms. After validating against Li et al.’s gamma‐oscillation bifurcation map, I demonstrated that increasing "stress" speeds up oscillations, adding delay shifts them from gamma to beta, and moderate noise maximizes coherence via stochastic resonance.\n\nFocus: mathematical modeling of neural dynamics and stochastic processes.',
      link: 'https://github.com/EliasSf73/Gamma-Oscillation-Modeling',
    },
    {
      id: 2,
      title: 'Modeling Biological Systems with Math & Data',
      description: 'Mini-projects on simulating and analyzing biological systems using differential equations, statistical modeling, and data science. Topics include: ODE models of gene regulation, neuronal dynamics (Hodgkin–Huxley), and calcium signaling, parameter estimation and optimization (e.g. Lotka–Volterra dynamics), statistical analysis of clinical data (ANOVA, survival models), and dimensionality reduction & clustering of single-cell RNA-seq data (PCA, t-SNE, UMAP).\n\nFocus: mathematical modeling, dynamical systems, and biological data analysis.',
      link: 'https://github.com/EliasSf73/Modeling-Biological-Systems',
    },
    {
      id: 3,
      title: 'Exploring Neural Dynamics and Information Processing',
      description: 'Mini-projects exploring fundamental concepts in computational and theoretical neuroscience. Topics include: simulating neuron models (Izhikevich, LIF, Hodgkin-Huxley), analyzing neural coding (spike trains, Poisson processes, information entropy), investigating synaptic plasticity (STDP), and understanding neural receptive fields and coupled neuron dynamics.\n\nFocus: neural modeling, information theory, and computational analysis of brain function.',
      link: 'https://github.com/EliasSf73/Neural-Dynamics-and-Information-Processing',
    },
    {
      id: 4,
      title: 'Machine Learning & Generative Modeling Workflows',
      description: 'Mini-projects on building, evaluating, and understanding machine learning and generative models through end-to-end pipelines. Topics include: train/validation/test workflows over multiple distributions and split ratios (with bias–variance and regularization analysis), logistic regression (binary cross-entropy, gradient descent), feed-forward neural networks (forward/backward pass), neural ODEs (adjoint sensitivity method), and diffusion models (denoising score matching).\n\nFocus: reproducible ML pipelines, statistical model evaluation, and deep generative modeling.',
      link: 'https://github.com/EliasSf73/Machine-Learning-Generative-Modeling',
    },
  ];

  return (
    <div className="container mx-auto mt-5 p-4 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-baseline mb-2">
                <span className="text-gray-400 mr-2">{project.id}. </span>
                <h5 className="text-2xl font-semibold">{project.title}</h5>
              </div>
              <p className="text-gray-400 mb-4 whitespace-pre-line flex-grow">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4">
                <Link href={project.link} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Project Link
                </Link>
                <p className="text-sm text-gray-400">(Code & results report included)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;