import Link from "next/link";
import { featuredProjects, projectArchive } from "@/data/site";

const Projects = () => {
  return (
    <div className="min-h-screen pb-14 pt-10 text-slate-900">
      <section className="max-w-4xl">
        <h1 className="text-5xl font-display text-slate-900 md:text-6xl">
          Things I have built
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-700">
          Code that actually runs. Most of these started as coursework or side projects
          and turned into something worth sharing.
        </p>
      </section>

      <section className="mt-16">
        <div className="space-y-12">
          {featuredProjects.map((project) => (
            <article
              key={project.title}
              className="grid gap-6 border-t border-slate-300/70 pt-8 md:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{project.category}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  {project.tags.join(" · ")}
                </p>
              </div>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-display text-slate-900">{project.title}</h2>
                <p className="mt-4 text-base text-slate-700">{project.summary}</p>
                <p className="mt-4 text-sm text-slate-600">{project.detail}</p>
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-sm font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-950"
                >
                  Open repository
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-display text-slate-900">More explorations</h2>
        </div>
        <div className="mt-8 grid gap-10 xl:grid-cols-2">
          {projectArchive.map((project) => (
            <article key={project.title} className="border-t border-slate-300/60 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{project.category}</p>
              <h3 className="mt-3 text-2xl font-display text-slate-900">{project.title}</h3>
              <p className="mt-4 text-sm text-slate-700">{project.summary}</p>
              <p className="mt-3 text-sm text-slate-600">{project.detail}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                {project.tags.join(" · ")}
              </p>
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-slate-800 underline decoration-slate-400 underline-offset-4 transition hover:text-slate-950"
              >
                Open repository
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
