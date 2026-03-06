import Link from "next/link";
import { contactLinks } from "@/data/site";

const newsLink = "text-slate-900 font-semibold underline decoration-slate-300 underline-offset-[3px] transition hover:decoration-slate-500";

const newsItems = [
  {
    date: "Fall 2026",
    content: (
      <>
        Joining{" "}
        <a href="https://www.ualberta.ca/en/engineering/electrical-computer-engineering/index.html" target="_blank" rel="noopener noreferrer" className={newsLink}>University of Alberta</a>
        , Electrical and Computer Engineering for MSc, co-advised by{" "}
        <a href="https://btolooshams.github.io/bahar.html" target="_blank" rel="noopener noreferrer" className={newsLink}>Bahareh Tolooshams</a>
        {" "}and{" "}
        <a href="https://lazaratan.github.io/" target="_blank" rel="noopener noreferrer" className={newsLink}>Lazar Atanackovic</a>.
      </>
    ),
  },
  {
    date: "Summer 2024",
    content: (
      <>
        Research internship at the{" "}
        <a href="https://eps.leeds.ac.uk/computing" target="_blank" rel="noopener noreferrer" className={newsLink}>University of Leeds</a>
        , advised by Professor{" "}
        <a href="https://eps.leeds.ac.uk/computing/staff/548/professor-netta-cohen" target="_blank" rel="noopener noreferrer" className={newsLink}>Netta Cohen</a>.
      </>
    ),
  },
];

export default function Home() {
  return (
    <div className="py-14 text-slate-900">
      <blockquote className="mb-8">
        <p className="font-display text-lg italic text-slate-600">&ldquo;Somewhere, something incredible is waiting to be known.&rdquo;</p>
        <footer className="mt-1 text-xs tracking-wide text-slate-400">Carl Sagan</footer>
      </blockquote>

      <section className="max-w-3xl space-y-7">
        <h1 className="text-5xl font-display leading-[0.98] text-slate-900 md:text-7xl">
          Brains and machines
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-700">
          Undergraduate student in Brain and Cognitive Science at KAIST.
        </p>
      </section>

      <section className="border-t border-slate-300/70 pt-8">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">News</p>
        <ul className="mt-4 space-y-4">
          {newsItems.map((item, i) => (
            <li key={i} className="flex gap-4 text-sm">
              <span className="shrink-0 w-28 font-semibold text-slate-500">{item.date}</span>
              <span className="text-slate-700">{item.content}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-14 border-t border-slate-300/70 pt-8 lg:grid-cols-[1.12fr,0.88fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">About</p>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-700">
            I want to understand how learning happens, especially when data is scarce.
            Why can a child learn a concept from two examples while a neural network needs thousands?
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600">
            I work on efficient learning, disentangled representations, and generative models.
            The questions I keep coming back to: what structure in a model makes learning
            possible from less, and how do diffusion and flow-based methods learn to generate
            without memorizing?
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Current focus</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>Efficient learning and why some representations generalize from less data</li>
              <li>Disentangled representations and the structure that makes them possible</li>
              <li>Diffusion and flow-based generative models</li>
            </ul>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Links</p>
            <div className="mt-4 space-y-3">
              {contactLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-200/40 hover:text-slate-900"
                >
                  <span className="uppercase tracking-[0.18em] text-slate-500">{link.label}</span>
                  <span className="font-semibold">{link.value}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <blockquote className="border-t border-slate-300/70 pt-8">
        <p className="font-display text-lg italic text-slate-600">&ldquo;The first principle is that you must not fool yourself — and you are the easiest person to fool.&rdquo;</p>
        <footer className="mt-1 text-xs tracking-wide text-slate-400">Richard Feynman</footer>
      </blockquote>
    </div>
  );
}
