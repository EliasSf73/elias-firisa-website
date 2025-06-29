import React from 'react';
import Link from 'next/link';

const Blog = () => {
  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-4xl font-bold mb-6">My Blog</h1>
      <p className="text-center text-gray-400 mb-8">Mathematically rigorous explorations of computational neuroscience and Machine Learning</p>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <ul className="space-y-8">
            <li>
              <Link href="/blog/posts/slug?slug=latex-version" className="text-xl font-semibold hover:text-blue-600">
                From Least Squares to Likelihood: The True Nature of Linear Regression
              </Link>
              <p className="text-gray-600 mt-2">June 29, 2025</p>
              <p className="text-gray-500 mt-2">
                An introduction to linear regression from a mathematical perspective, exploring the concept of error terms and the probabilistic nature of models.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;