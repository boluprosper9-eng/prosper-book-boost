import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import readingLight from "@/assets/reading-light.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Prosper Festors Book Promotion" },
      {
        name: "description",
        content:
          "A three-step process: book assessment, visibility strategy and promotional support, designed around your title and its readership.",
      },
      { property: "og:title", content: "How Prosper Festors Works" },
      {
        property: "og:description",
        content:
          "Book assessment, visibility strategy and promotional support for authors who want their books discovered.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const STEPS = [
  {
    n: "01",
    title: "Book Assessment",
    body: "We review your book, genre, current online presence, positioning, and potential readership.",
  },
  {
    n: "02",
    title: "Visibility Strategy",
    body: "We identify relevant opportunities for improving your book's discoverability and reader visibility.",
  },
  {
    n: "03",
    title: "Promotional Support",
    body: "We implement the agreed promotional strategy and provide updates throughout the process.",
  },
];

function HowItWorksPage() {
  return (
    <SiteLayout>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            The Process
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold text-balance text-ink-foreground sm:text-5xl">
            How PROSPER FESTORS Works
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            A structured, transparent approach to strengthening how readers find and engage with
            your book.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.n}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card"
            >
              <span className="font-display text-5xl font-semibold text-accent">{step.n}</span>
              <h2 className="mt-5 text-lg font-semibold">{step.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 rounded-[2rem] border border-border bg-card p-8 shadow-card lg:grid-cols-2 lg:p-12">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Built around your book, not a template
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every title has a different audience, genre context and starting point. We begin by
              understanding those specifics, then focus on the opportunities most likely to help
              readers find your work.
            </p>
            <div className="mt-8">
              <Button asChild variant="accent" size="lg">
                <Link to="/start/book">
                  Start My Book Assessment <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={readingLight}
              alt="Open book pages fanned in soft natural light"
              loading="lazy"
              width={1280}
              height={864}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <p className="mt-10 flex items-start gap-3 rounded-2xl bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          Promotional results vary depending on the book, audience, platform activity, and other
          factors. No specific ranking, review count, or sales result is guaranteed.
        </p>
      </section>
    </SiteLayout>
  );
}
