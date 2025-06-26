import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <section className="text-center">
        <h1 className="text-5xl font-bold mb-4">Elias Firisa</h1>
        <p className="text-2xl text-gray-600 mb-8">Computational Neuroscience & AI</p>
        <p className="text-xl mb-12">Welcome to my personal website!</p>
      </section>

      <section className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold mb-8">About Me</h2>
        <div className="space-y-6">
          <p>
            I am a 4th-year Bachelor student at <Link href="https://www.kaist.ac.kr/en/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">KAIST</Link>,
            majoring in <Link href="https://bcs.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Brain and Cognitive Science (BCS) </Link>
            with a minor in AI.

          </p>
          <p>
            My interests lie at the intersection of computational neuroscience and artificial intelligence,
            where I explore how the brain processes information and how we can apply these principles to build more intelligent systems.
          </p>
          <p>
            This website serves as a platform to showcase my projects, share valuable resources,
            and publish mathematically rigorous blogs on topics within my field of study.
          </p>
        </div>
      </section>
    </div>
  );
}