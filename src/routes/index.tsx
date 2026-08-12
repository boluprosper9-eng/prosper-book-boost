import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Compass, Sparkles, ArrowRight, Users, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import heroBooks from "@/assets/hero-books.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prosper Festors — Book Promotion & Goodreads Visibility" },
      {
        name: "description",
        content:
          "Prosper Festors helps authors strengthen their Goodreads presence, improve book discoverability and build professional promotional strategies.",
      },
      { property: "og:title", content: "Prosper Festors — Help Your Book Get Discovered" },
      {
        property: "og:description",
        content:
          "Professional book promotion strategies designed to connect books with relevant readers.",
      },
    ],
  }),
  component: LandingPage,
});

const WHY_CARDS = [
  {
    icon: Compass,
    title: "Discoverability",
    body: "Put your book in front of readers actively looking for their next read.",
  },
  {
    icon: Users,
    title: "Reader Engagement",
    body: "Create more opportunities for readers to interact with and discover your book.",
  },
  {
    icon: TrendingUp,
    title: "Book Visibility",
    body: "Build a stronger online presence around your title and its target readership.",
  },
];

function LandingPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="surface-ink relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-32 size-[36rem] rounded-full bg-accent/12 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 px-4 py-1.5 text-xs font-medium tracking-[0.16em] text-accent uppercase">
              <Sparkles className="size-3.5" />
              Author book promotion
            </span>

            <h1 className="font-display mt-7 text-4xl leading-[1.05] font-semibold text-balance text-ink-foreground sm:text-5xl lg:text-6xl">
              Help Your Book Get <span className="text-gradient-accent">Discovered</span> by More
              Readers
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              PROSPER FESTORS helps authors strengthen their Goodreads presence, improve book
              discoverability, and create professional promotional strategies designed to connect
              books with relevant readers.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <Link to="/start/book">
                  Promote My Book <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="onInk" size="lg">
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-ink-muted">
              Built for authors who want their books to be discovered.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-ink-foreground/10 shadow-elevated">
              <img
                src={heroBooks}
                alt="A stack of elegant hardcover books lit by warm light"
                width={1280}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden max-w-[15rem] rounded-2xl border border-ink-foreground/10 bg-ink-soft/95 p-5 shadow-elevated backdrop-blur sm:block">
              <BookOpen className="size-5 text-accent" />
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground">
                Strategy, positioning and visibility work — built around your title.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY GOODREADS */}
      <section className="surface-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Why Goodreads?
            </span>
            <h2 className="font-display mt-4 text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
              Why Goodreads Matters for Authors
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Goodreads is a reader-focused platform where people discover books, track what they
              want to read, share recommendations with other readers, review the titles they
              finish, and explore new books based on genres, themes and personal reading interests.
              For authors, that makes it one of the most meaningful places for a book to be present,
              accurately positioned and easy to find.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WHY_CARDS.map((card) => (
              <article
                key={card.title}
                className="group rounded-3xl border border-border bg-card p-8 shadow-card transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <card.icon className="size-5" />
                </span>
                <h3 className="mt-6 text-xs font-semibold tracking-[0.18em] uppercase">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Button asChild variant="accent" size="lg">
              <Link to="/start/book">
                Improve My Book&apos;s Visibility <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="surface-ink flex flex-col items-start gap-8 rounded-[2rem] px-8 py-14 shadow-elevated lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-ink-foreground sm:text-4xl">
              Ready to strengthen your book&apos;s visibility?
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Share a few details about your book and we&apos;ll review your positioning, audience
              and discoverability opportunities.
            </p>
          </div>
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
