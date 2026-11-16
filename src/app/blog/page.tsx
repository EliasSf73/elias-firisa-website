import Link from "next/link";
import { writings } from "@/data/site";

const basePath = process.env.NODE_ENV === "production" ? "/elias-firisa-website" : "";

const Blog = () => {
  return (
    <div className="min-h-screen pb-14 pt-10 text-slate-100">
      <section className="max-w-4xl">
        <h1 className="text-5xl font-display text-slate-100 md:text-6xl">
          Writing
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Longer explanations, open notes on diffusion and flow models, and the recorded sessions that go with them.
        </p>
      </section>

      <section className="mt-16 space-y-10">
        {writings.map((post) => (
          <article key={post.title} className="max-w-4xl border-t border-slate-700/70 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{post.kind}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{post.date}</p>
            </div>
            <h2 className="mt-4 text-3xl font-display text-slate-100">{post.title}</h2>
            <p className="mt-4 max-w-2xl text-base text-slate-300">{post.summary}</p>
            {post.image && (
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={post.action ?? post.title}
                className="group relative mt-6 block max-w-2xl overflow-hidden rounded-lg border border-slate-700/70"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${post.image.src}`}
                  alt={post.image.alt}
                  width={1200}
                  height={446}
                  loading="lazy"
                  className="block h-auto w-full transition duration-200 group-hover:opacity-90"
                />
                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                  <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/60 transition group-hover:bg-black/80">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5 fill-white" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </a>
            )}
            <Link
              href={post.href}
              target={post.external ? "_blank" : undefined}
              rel={post.external ? "noopener noreferrer" : undefined}
              className="mt-5 inline-flex text-sm font-semibold text-slate-200 underline decoration-slate-500 underline-offset-4 transition hover:text-slate-50"
            >
              {post.action ?? "Read article"}
              {post.external ? " \u2197" : ""}
            </Link>
          </article>
        ))}
      </section>

    </div>
  );
};

export default Blog;
