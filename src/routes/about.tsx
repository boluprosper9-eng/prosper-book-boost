import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Prosper Festors" },
      {
        name: "description",
        content:
          "Prosper Festors is an author-focused book promotion practice helping writers strengthen discoverability, reader engagement and online visibility.",
      },
      { property: "og:title", content: "About Prosper Festors" },
      {
        property: "og:description",
        content: "An author-focused, technology-driven approach to book promotion.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Author-focused",
    body: "Every recommendation starts with your book, your genre and the readers most likely to enjoy it.",
  },
  {
    title: "Transparent",
    body: "We explain what we do, why it matters, and what realistically can and cannot be influenced.",
  },
  {
    title: "Technology-driven",
    body: "Research, positioning and audience analysis inform each strategy we put forward.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            About
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold text-balance text-ink-foreground sm:text-5xl">
            A publishing practice built around book discovery
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Helping authors create stronger opportunities for book discovery, reader engagement, and
            online visibility.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            PROSPER FESTORS works with authors who have finished the hard part — the book — and now
            need it to be found. Publishing a title is only the beginning of its life; readers still
            have to encounter it, understand what it offers, and decide it belongs on their shelf.
          </p>
          <p>
            Our work sits at that intersection. We assess how a book currently presents itself
            online, research the readership it is genuinely suited to, and build a promotional
            strategy that gives the title more chances to be discovered by those readers.
          </p>
          <p>
            We are deliberate about what we promise. Promotion creates opportunity, not certainty,
            and we would rather set accurate expectations than impressive ones.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <div aria-hidden className="h-1 w-10 rounded-full rule-accent" />
              <h2 className="mt-5 text-base font-semibold">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Button asChild variant="accent" size="lg">
            <Link to="/start/book">
              Promote My Book <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
