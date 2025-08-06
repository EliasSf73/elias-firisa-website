import React from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Machine Learning & Generative Modeling Workflows',
      description: 'Mini-projects on building, evaluating, and understanding machine learning and generative models through end-to-end pipelines. Topics include: train/validation/test workflows over multiple distributions and split ratios (with bias–variance and regularization analysis), logistic regression (binary cross-entropy, gradient descent), feed-forward neural networks (forward/backward pass), neural ODEs (adjoint sensitivity method), and diffusion models (denoising score matching).\n\nFocus: reproducible ML pipelines, statistical model evaluation, and deep generative modeling.',
      link: 'https://github.com/EliasSf73/Machine-Learning-Generative-Modeling',
    },
    {
      id: 2,
      title: 'Exploring Neural Dynamics and Information Processing',
      description: 'Mini-projects exploring fundamental concepts in computational and theoretical neuroscience. Topics include: simulating neuron models (Izhikevich, LIF, Hodgkin-Huxley), analyzing neural coding (spike trains, Poisson processes, information entropy), investigating synaptic plasticity (STDP), and understanding neural receptive fields and coupled neuron dynamics.\n\nFocus: neural modeling, information theory, and computational analysis of brain function.',
      link: 'https://github.com/EliasSf73/computational-neuroscience-mini-projects',
    },
    {
      id: 2,
      title: 'Modeling Biological Systems with Math & Data',
      description: 'Mini-projects on simulating and analyzing biological systems using differential equations, statistical modeling, and data science. Topics include: ODE models of gene regulation, neuronal dynamics (Hodgkin–Huxley), and calcium signaling, parameter estimation and optimization (e.g. Lotka–Volterra dynamics), statistical analysis of clinical data (ANOVA, survival models), and dimensionality reduction & clustering of single-cell RNA-seq data (PCA, t-SNE, UMAP).\n\nFocus: mathematical modeling, dynamical systems, and biological data analysis.',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project',
    },
    {
      id: 1,
      title: 'Modeling Stress, Delay & Noise in Gamma-band Oscillations',
      description: 'I used a simplified Wilson–Cowan excitatory–inhibitory neural circuit to show how three factors—tonic excitatory drive ("stress"), synaptic feedback delay, and background noise—tune cortical rhythms. After validating against Li et al.’s gamma‐oscillation bifurcation map, I demonstrated that increasing "stress" speeds up oscillations, adding delay shifts them from gamma to beta, and moderate noise maximizes coherence via stochastic resonance.\n\nFocus: mathematical modeling of neural dynamics and stochastic processes.',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project/tree/main/Modeling%20Project',
    },
  ];

  return (
    <div className="container mx-auto mt-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-8 tracking-tight text-gray-100">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 text-white rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="text-gray-400 text-sm font-medium mr-2">{project.id}. </span>
                <h5 className="text-2xl font-semibold text-gray-100 tracking-tight">{project.title}</h5>
              </div>
              <p className="text-gray-400 text-base leading-relaxed whitespace-pre-line mb-6">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-6">
                <Link href={project.link} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project
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