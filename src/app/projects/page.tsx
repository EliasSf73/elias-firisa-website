import React from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 4,
      title: 'Modeling Stress, Delay & Noise in Gamma-band Oscillations',
      description: 'I used a simplified Wilson–Cowan excitatory–inhibitory neural circuit to show how three factors—tonic excitatory drive ("stress"), synaptic feedback delay, and background noise—tune cortical rhythms. After validating against Li et al.’s gamma‐oscillation bifurcation map, I demonstrated that increasing "stress" speeds up oscillations, adding delay shifts them from gamma to beta, and moderate noise maximizes coherence via stochastic resonance.',
      focus: 'Focus: mathematical modeling of neural dynamics and stochastic processes.',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project/tree/main/Modeling%20Project',
    },
    {
      id: 2,
      title: 'Modeling Biological Systems with Math & Data',
      description: 'Mini-projects on simulating and analyzing biological systems using differential equations, statistical modeling, and data science. Topics include: ODE models of gene regulation, neuronal dynamics (Hodgkin–Huxley), and calcium signaling, parameter estimation and optimization (e.g. Lotka–Volterra dynamics), statistical analysis of clinical data (ANOVA, survival models), and dimensionality reduction & clustering of single-cell RNA-seq data (PCA, t-SNE, UMAP).',
      focus: 'Focus: mathematical modeling, dynamical systems, and biological data analysis.',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project',
    },
    {
      id: 3,
      title: 'Exploring Neural Dynamics and Information Processing',
      description: 'Mini-projects exploring fundamental concepts in computational and theoretical neuroscience. Topics include: simulating neuron models (Izhikevich, LIF, Hodgkin-Huxley), analyzing neural coding (spike trains, Poisson processes, information entropy), investigating synaptic plasticity (STDP), and understanding neural receptive fields and coupled neuron dynamics.',
      focus: 'Focus: neural modeling, information theory, and computational analysis of brain function.',
      link: 'https://github.com/EliasSf73/computational-neuroscience-mini-projects',
    },
    {
      id: 1,
      title: 'Machine Learning & Generative Modeling Workflows',
      description: 'Mini-projects on building, evaluating, and understanding machine learning and generative models through end-to-end pipelines. Topics include: train/validation/test workflows over multiple distributions and split ratios (with bias–variance and regularization analysis), logistic regression (binary cross-entropy, gradient descent), feed-forward neural networks (forward/backward pass), neural ODEs (adjoint sensitivity method), and diffusion models (denoising score matching).',
      focus: 'Focus: reproducible ML pipelines, statistical model evaluation, and deep generative modeling.',
      link: 'https://github.com/EliasSf73/Machine-Learning-Generative-Modeling',
    },
  ].sort((a, b) => a.id - b.id);

  return (
    <div className="container mx-auto mt-5 p-4 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-8">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col overflow-hidden h-full">
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-baseline mb-3">
                <span className="text-2xl font-semibold mr-3 text-gray-400">{project.id}.</span>
                <h5 className="text-2xl font-semibold">{project.title}</h5>
              </div>
              <div className="flex-grow">
                <p className="text-gray-400 mb-4 whitespace-pre-line">
                  {project.description}
                </p>
                <p className="text-gray-400 mt-4 italic">
                  {project.focus}
                </p>
              </div>
              <div className="mt-auto pt-4">
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  Project Link
                </Link>
                <p className="text-sm text-gray-500 mt-2">(Code & results report included)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;