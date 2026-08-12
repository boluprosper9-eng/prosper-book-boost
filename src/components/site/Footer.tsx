import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="surface-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8 lg:py-20">
        <div className="max-w-sm">
          <Wordmark onInk />
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Helping authors create stronger opportunities for book discovery, reader engagement, and
            online visibility.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink-muted uppercase">
            Explore
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { label: "Home", to: "/" as const },
              { label: "How It Works", to: "/how-it-works" as const },
              { label: "Services", to: "/services" as const },
              { label: "About", to: "/about" as const },
              { label: "Contact", to: "/contact" as const },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-ink-foreground/80 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-ink-muted uppercase">
            Get started
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                to="/start/book"
                className="text-ink-foreground/80 transition-colors hover:text-accent"
              >
                Promote My Book
              </Link>
            </li>
            <li>
              <a
                href="mailto:hello@prosperfestors.com"
                className="text-ink-foreground/80 transition-colors hover:text-accent"
              >
                hello@prosperfestors.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-ink-muted lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Prosper Festors. All rights reserved.</p>
          <p className="max-w-xl leading-relaxed">
            Promotional results vary depending on the book, audience, platform activity, and other
            factors. No specific ranking, review count, or sales result is guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
