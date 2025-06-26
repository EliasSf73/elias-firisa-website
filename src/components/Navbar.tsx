import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">Elias Firisa</Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/projects" className="text-gray-300 hover:text-white">Projects</Link>
          <Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link>
          <Link href="/resources" className="text-gray-300 hover:text-white">Resources</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;