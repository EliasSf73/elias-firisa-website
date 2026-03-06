// Server component for static export - no 'use client'

import React from 'react';
import katex from 'katex';

interface LaTeXProps {
  math: string;
  displayMode?: boolean;
}

export const LaTeX: React.FC<LaTeXProps> = ({ math, displayMode = false }) => {
  let html = '';
  try {
    html = katex.renderToString(math, {
      displayMode,
      throwOnError: false,
      trust: true,
      strict: false,
      output: 'html', // Fix for duplicate rendering (suppresses MathML/text)
    });
  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return <span style={{ color: 'red' }}>Error rendering equation</span>;
  }

  if (displayMode) {
    return <div className="katex-display-container" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span className="katex-inline" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
};
