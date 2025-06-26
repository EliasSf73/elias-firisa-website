import React from 'react';
import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project Alpha',
      description: 'A brief description of Project Alpha, highlighting its key features and technologies used.',
      link: '#', // Placeholder link
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
              <Link href={project.link} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;