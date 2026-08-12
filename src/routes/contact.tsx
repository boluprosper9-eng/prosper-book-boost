import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowRight, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Prosper Festors" },
      {
        name: "description",
        content:
          "Get in touch with the Prosper Festors team about book promotion, Goodreads visibility and reader discovery strategies.",
      },
      { property: "og:title", content: "Contact Prosper Festors" },
      {
        property: "og:description",
        content: "Questions about promoting your book? Reach the Prosper Festors team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Contact
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold text-balance text-ink-foreground sm:text-5xl">
            Talk to the PROSPER FESTORS team
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            The fastest way to get started is to submit your book details — but if you have a
            question first, we&apos;re glad to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <Mail className="size-5 text-accent" />
            <h2 className="mt-5 text-lg font-semibold">Email us</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Send your question along with your book title and genre, and we&apos;ll point you in
              the right direction.
            </p>
            <a
              href="mailto:hello@prosperfestors.com"
              className="mt-5 inline-block font-medium text-accent underline-offset-4 hover:underline"
            >
              hello@prosperfestors.com
            </a>
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <Clock className="size-5 text-accent" />
            <h2 className="mt-5 text-lg font-semibold">Response times</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We review every enquiry and promotion request personally, and typically respond within
              two business days.
            </p>
          </div>
        </div>

        <div className="surface-ink mt-10 flex flex-col items-start gap-6 rounded-[2rem] p-10 shadow-elevated lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-foreground sm:text-3xl">
              Ready when you are
            </h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Start with the short book form — it takes a few minutes.
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
