import React from 'react';
import Link from 'next/link';

const Resources = () => {
  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-4xl font-bold mb-6">Useful Resources</h1>
      <div className="max-w-2xl mx-auto">
        <ul className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700">
          <li className="p-4">
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-lg font-semibold">Resource Link 1 (Placeholder)</Link>
            <p className="text-gray-400 text-sm">Brief description of the resource.</p>
          </li>
          <li className="p-4">
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-lg font-semibold">Resource Link 2 (Placeholder)</Link>
            <p className="text-gray-400 text-sm">Brief description of the resource.</p>
          </li>
          <li className="p-4">
            <Link href="#" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-lg font-semibold">Resource Link 3 (Placeholder)</Link>
            <p className="text-gray-400 text-sm">Brief description of the resource.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;