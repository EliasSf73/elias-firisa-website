'use client';

import Link from 'next/link';
import { FC } from 'react';
import type { CSSProperties } from 'react';

const Navbar: FC = () => {
  const navStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem'
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  };

  const linkStyle: CSSProperties = {
    color: '#666',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'color 0.2s ease'
  };

  const logoStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link href="/" style={logoStyle}>Elias Firisa</Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/projects" style={linkStyle}>Projects</Link>
          <Link href="/coursework" style={linkStyle}>Coursework</Link>
          <Link href="/blog" style={linkStyle}>Blog</Link>
          <Link href="/resources" style={linkStyle}>Resources</Link>
          <a href="/elias-firisa-website/docs/Resume_Elias_Firisa.pdf" target="_blank" rel="noopener noreferrer" style={linkStyle}>CV</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;