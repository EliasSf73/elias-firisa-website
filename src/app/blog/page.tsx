import Link from "next/link";
import { writings } from "@/data/site";

const Blog = () => {
  return (
    <div className="min-h-screen pb-14 pt-10 text-slate-100">
      <section className="max-w-4xl">
        <h1 className="text-5xl font-display text-slate-100 md:text-6xl">
          Writing
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300">
          Longer explanations, a preprint, and an open set of notes on diffusion and flow models.
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
