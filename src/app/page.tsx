import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto mt-5 p-4">
      <section className="text-center my-5">
        <h1 className="text-5xl font-bold">Elias Firisa</h1>
        <p className="text-xl text-gray-400">Computational Neuroscience & AI</p>
        <p className="mt-4">Welcome to my personal website!</p>
      </section>

      <section className="my-5">
        <h2 className="text-center text-3xl font-semibold mb-4">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="mb-3">
            I am a 4th-year Bachelor student at <Link href="https://www.kaist.ac.kr/en/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">KAIST</Link>,
            majoring in <Link href="https://bcs.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Brain and Cognitive Science</Link>
            with a minor in AI.
          </p>
          <p className="mb-3">
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