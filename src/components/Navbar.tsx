import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#2c3e50'
        }}>Elias Firisa</Link>
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            color: '#666',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>Home</Link>
          <Link href="/projects" style={{
            color: '#666',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>Projects</Link>
          <Link href="/blog" style={{
            color: '#666',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>Blog</Link>
          <Link href="/resources" style={{
            color: '#666',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>Resources</Link>
          <a href="/docs/cv.pdf" download style={{
            color: '#666',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>CV</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;