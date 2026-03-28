"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const basePath = process.env.NODE_ENV === "production" ? "/elias-firisa-website" : "";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/docs/Elias_CV.pdf", label: "CV", external: true },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[rgba(251,248,242,0.88)] backdrop-blur-md">
      <div className="border-b border-slate-300/70 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`${basePath}/images/profilepic.jpg`}
              alt="Elias Firisa"
              width={68}
              height={68}
              className="rounded-full object-cover ring-2 ring-slate-200/80"
              style={{ width: 68, height: 68 }}
            />
            <Link href="/" className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Elias Firisa
            </Link>
          </div>
          <ul className="flex flex-wrap items-center gap-y-3 text-[0.98rem] font-medium text-slate-600">
            {links.map((link, index) => (
              <li key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`transition ${
                    !link.external && isActive(link.href)
                      ? "text-slate-900 underline decoration-slate-400 underline-offset-[0.45rem]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
                {index < links.length - 1 ? (
                  <span aria-hidden="true" className="px-4 text-slate-300">
                    /
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
