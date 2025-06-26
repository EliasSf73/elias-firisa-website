import React from 'react';
import Link from 'next/link';

const Blog = () => {
  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-4xl font-bold mb-6">My Blog</h1>
      <p className="text-center text-gray-400 mb-8">Coming soon: Mathematically rigorous blogs on computational neuroscience and AI!</p>
      {/* Placeholder for blog posts */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg mb-6">
          <div className="p-6">
            <h5 className="text-2xl font-semibold mb-2">First Blog Post (Placeholder)</h5>
            <p className="text-gray-400 mb-4">This is a placeholder for your first blog post. Stay tuned for more content!</p>
            <Link href="#" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;