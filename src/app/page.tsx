import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">Elias Firisa</h1>
        <p className="text-2xl text-gray-600 mb-8">Artificial Intelligence & Computational Neuroscience</p>
        <p className="text-xl mb-12">Welcome to my personal website!</p>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold mb-8">About Me</h2>
        <div className="space-y-6">
          <p>
            I am a 4th-year Bachelor student at <Link href="https://www.kaist.ac.kr/en/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">KAIST</Link>,
            majoring in <Link href="https://bcs.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Brain and Cognitive Science (BCS) </Link>
            with a minor in Artificial Intelligence (AI).
          </p>
          <p>
            My interests lie at the intersection of artificial intelligence and computational neuroscience,
            where I explore how the brain processes information and how we can apply these principles to build more intelligent systems.
          </p>
          <p>
            This website serves as a platform to showcase my projects, share valuable resources, and post mathematically rigorous blogs on topics within my field of study.
          </p>
          <div className="relative p-6 my-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-100 rounded-full"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-100 rounded-full"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-100 rounded-full"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-blue-100 rounded-full"></div>
            
            <p className="relative z-10">
              Outside school stuff, I'm a wannabe footballer and die-hard fan<Link href="https://en.wikipedia.org/wiki/Big_Five_(association_football)" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline"> ⚽🦯</Link> (never miss a match), and I'm also a huge Christopher Nolan enthusiast—<Link href="https://en.wikipedia.org/wiki/Interstellar_(film)" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Interstellar</Link> and <Link href="https://en.wikipedia.org/wiki/Inception" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Inception</Link> rank at the very top for me.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}