
import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LaTeXProps {
  math: string;
  displayMode?: boolean;
}

export const LaTeX: React.FC<LaTeXProps> = ({ math, displayMode = false }) => {
  try {
    const html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
    });
    
    if (displayMode) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    } else {
      return <span className="inline-block mx-1" dangerouslySetInnerHTML={{ __html: html }} />;
    }

  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return <span className="text-red-500">Error rendering equation</span>;
  }
};
