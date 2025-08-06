import React from 'react';
import Link from 'next/link';

interface DescriptionProps {
  content: string;
}

const Description = ({ content }: DescriptionProps) => {
  // Split the content into text and links
  const parts = content.split(/\[(.*?)\]\((.*?)\)/);
  
  return (
    <p className="text-gray-400 mb-4">
      {parts.map((part, index) => {
        if (index % 3 === 1) { // This is the link text
          const url = parts[index + 1];
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};

export default Description;
