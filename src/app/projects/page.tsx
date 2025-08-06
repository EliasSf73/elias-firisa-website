import React from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 2,
      title: 'Modeling Biological Systems with Math & Data',
      description: 'Mini-projects on simulating and analyzing biological systems using differential equations, statistical modeling, and data science.\n\nTopics include:\n\n• ODE models of gene regulation, neuronal dynamics (Hodgkin–Huxley), and calcium signaling\n• Parameter estimation and optimization (e.g. Lotka–Volterra dynamics)\n• Statistical analysis of clinical data (ANOVA, survival models)\n• Dimensionality reduction & clustering of single-cell RNA-seq data (PCA, t-SNE, UMAP)\n\n🧠 Focus: mathematical modeling, dynamical systems, and biological data analysis',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project',
    },
    {
      id: 1,
      title: 'Modeling Stress, Delay & Noise in Gamma-band Oscillations',
      description: 'I used a simplified Wilson–Cowan excitatory–inhibitory neural circuit to show how three factors—tonic excitatory drive (“stress”), synaptic feedback delay, and background noise—tune cortical rhythms. After validating against Li et al.’s gamma‐oscillation bifurcation map, I demonstrated that increasing “stress” speeds up oscillations, adding delay shifts them from gamma to beta, and moderate noise maximizes coherence via stochastic resonance.',
      link: 'https://github.com/EliasSf73/Mathematical-modeling-project/tree/main/Modeling%20Project',
    },
    {
      id: 2,
      title: 'Project Beta',
      description: 'This project involved [specific details], demonstrating [relevant skills].',
      link: '#', // Placeholder link
    },
    {
      id: 3,
      title: 'Project Gamma',
      description: 'An in-depth look at Project Gamma, focusing on the challenges faced and solutions implemented.',
      link: '#', // Placeholder link
    },
  ];

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-4xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h5 className="text-2xl font-semibold mb-2">{project.title}</h5>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <Link href={project.link} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Project Link
                </Link>
                <p className="text-sm text-gray-400">(Code & paper-like report included)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;