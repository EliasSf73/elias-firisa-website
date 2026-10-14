import Link from "next/link";
import FlowHero from "@/components/FlowHero";
import { contactLinks, cvHref, experience, honors, notesUrl, saiUrl, seriesVideoUrl } from "@/data/site";

const basePath = process.env.NODE_ENV === "production" ? "/elias-firisa-website" : "";

const newsLink = "text-slate-100 font-semibold underline decoration-slate-600 underline-offset-[3px] transition hover:decoration-slate-400";
const label = "text-sm uppercase tracking-[0.24em] text-slate-500";

const newsItems = [
  {
    date: "Oct 2026",
    content: (
      <>
        Posted a{" "}
        <a href={seriesVideoUrl} target="_blank" rel="noopener noreferrer" className={newsLink}>recorded discussion</a>{" "}
        from our study series with friends learning together: Jensen&rsquo;s inequality, KL divergence and the ELBO, on
        the way to DDPM.
      </>
    ),
  },
  {
    date: "Sep 2026",
    content: (
      <>
        Started full-time as an AI Engineer at{" "}
        <a href={saiUrl} target="_blank" rel="noopener noreferrer" className={newsLink}>SAI Technologies</a>, building
        vision models that run on edge devices.
      </>
    ),
  },
  {
    date: "Sep 2026",
    content: (
      <>
        Published{" "}
        <a href={notesUrl} target="_blank" rel="noopener noreferrer" className={newsLink}>Diffusion and Flow Models, from Scratch</a>
        , open notes with derivations, code and interactive figures.
      </>
    ),
  },
  {
    date: "Aug 2026",
    content: <>Graduated from KAIST with a B.S. in Brain &amp; Cognitive Sciences and a minor in Industrial &amp; Systems Engineering.</>,
  },
  {
    date: "2026",
    content: (
      <>
        Preprint:{" "}
        <Link href="/blog/posts/rectflow" className={newsLink}>Probabilistic Invertibility of Rectified Flows Beyond Global Monotonicity</Link>.
      </>
    ),
  },
];

export default function Home() {
  return (
    <div className="pb-10 pt-0 text-slate-100">
      <section className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="max-w-2xl space-y-3">
            <p className="text-[0.95rem] leading-relaxed text-slate-400">
              B.S. Brain &amp; Cognitive Sciences &middot;{" "}
              <a href="https://www.kaist.ac.kr/en/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-400 underline-offset-4 transition hover:text-slate-200 hover:decoration-slate-100">
                KAIST
              </a>{" "}
              &middot; 2026
              <span className="block">(minor in Industrial &amp; Systems Engineering)</span>
            </p>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
              <span className="font-semibold text-slate-100">
                AI Engineer &middot;{" "}
                <a href={saiUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-400 underline-offset-4 transition hover:decoration-slate-100">
                  SAI Technologies
                </a>
                :
              </span>{" "}
              I build vision models that run on small devices.
            </p>
          </div>

          <h1 className="mt-14 text-5xl font-display leading-[0.98] text-balance text-slate-100 md:text-7xl">Making sense of noise</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
            Research interests: generative modeling theory (flow matching, diffusion), representation learning,
            variational inference, and computational neuroscience.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`${basePath}${cvHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              CV
            </a>
            <a
              href={notesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-600 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
            >
              Notes &#8599;
            </a>
            <a
              href="mailto:eliassfirisa@gmail.com"
              className="rounded-full border border-slate-600 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400"
            >
              Email
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[480px]">
          <FlowHero />
        </div>
      </section>

      <section className="border-t border-slate-700/70 pt-8">
        <p className={label}>News</p>
        <ul className="mt-5 space-y-4">
          {newsItems.map((item, i) => (
            <li key={i} className="flex flex-col gap-1 text-base sm:flex-row sm:gap-4">
              <span className="w-24 shrink-0 font-semibold text-slate-500">{item.date}</span>
              <span className="text-slate-300">{item.content}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-10 border-t border-slate-700/70 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className={label}>Teaching</p>
          <h2 className="mt-4 text-3xl text-slate-100 md:text-4xl">Diffusion and Flow Models, from Scratch</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            I am re-learning the foundations properly and writing it down as I go. The notes start from random variables
            and work toward DDPM, score matching and flow matching, with every step derived. Friends and I go through them
            in recorded sessions, questions and mistakes included.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <a href={notesUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 underline decoration-slate-500 underline-offset-4 hover:text-slate-50">
              Read the notes
            </a>
            <a href={seriesVideoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 underline decoration-slate-500 underline-offset-4 hover:text-slate-50">
              Watch a recorded session
            </a>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
            Before that, I tutored KAIST undergraduates in linear algebra, probability, biology and systems neuroscience
            (2024&ndash;2025).
          </p>
        </div>
        <a
          href={seriesVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-2xl border border-slate-700/70"
        >
          <img
            src={`${basePath}/images/series-elbo.png`}
            alt="Recorded discussion: Jensen, KL and the ELBO"
            width={1280}
            height={720}
            className="block h-auto w-full transition duration-500 group-hover:scale-[1.02]"
          />
        </a>
      </section>

      <section className="grid gap-12 border-t border-slate-700/70 pt-8 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className={label}>Experience</p>
          <ul className="mt-5 space-y-3">
            {experience.map((r) => (
              <li key={r.role + r.org} className="flex flex-col gap-0.5 text-base sm:flex-row sm:gap-4">
                <span className="w-44 shrink-0 text-sm text-slate-500 sm:pt-0.5">{r.dates}</span>
                <span className="text-slate-300">
                  <span className="text-slate-100">{r.role}</span>
                  {", "}
                  {r.orgHref ? (
                    <a href={r.orgHref} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-600 underline-offset-4 hover:decoration-slate-400">
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                </span>
              </li>
            ))}
          </ul>
          <a
            href={`${basePath}${cvHref}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-semibold text-slate-200 underline decoration-slate-500 underline-offset-4 hover:text-slate-50"
          >
            Details in my CV &#8599;
          </a>
        </div>

        <div className="space-y-10">
          <div>
            <p className={label}>Education</p>
            <p className="mt-5 text-base text-slate-100">B.S. Brain &amp; Cognitive Sciences, KAIST</p>
            <p className="text-sm text-slate-400">Minor in Industrial &amp; Systems Engineering &middot; 2022 &ndash; 2026</p>
          </div>
          <div>
            <p className={label}>Honors</p>
            <ul className="mt-5 space-y-2">
              {honors.map((h) => (
                <li key={h.title} className="text-[0.97rem] text-slate-300">
                  {h.title} <span className="text-slate-500">&middot; {h.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-700/70 pt-8">
        <p className={label}>Links</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-col rounded-lg border border-slate-700/60 px-4 py-3 text-sm text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{link.label}</span>
              <span className="mt-1 font-semibold">{link.value}</span>
            </Link>
          ))}
        </div>
      </section>

      <blockquote className="border-t border-slate-700/70 pt-8">
        <p className="font-display text-lg italic text-slate-400">&ldquo;The first principle is that you must not fool yourself — and you are the easiest person to fool.&rdquo;</p>
        <footer className="mt-1 text-xs tracking-wide text-slate-500">Richard Feynman</footer>
      </blockquote>
    </div>
  );
}
