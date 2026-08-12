import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Mail } from "lucide-react";
import { FunnelProgress } from "@/components/funnel/FunnelProgress";
import { Wordmark } from "@/components/site/Wordmark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Prosper Festors" },
      {
        name: "description",
        content:
          "Your book promotion request has been received by Prosper Festors. Here's what happens next.",
      },
      { property: "og:title", content: "Thank You — Request Received" },
      {
        property: "og:description",
        content: "Your book promotion request has been submitted to Prosper Festors.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

type Summary = { bookTitle?: string; service?: string; email?: string };

const NEXT_STEPS = [
  { n: "01", body: "We'll review your book information." },
  { n: "02", body: "We'll evaluate your selected promotional service and goals." },
  { n: "03", body: "We'll contact you with the next steps." },
];

function ThankYouPage() {
  const [summary, setSummary] = useState<Summary>({});

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("pf_submission");
      if (raw) setSummary(JSON.parse(raw) as Summary);
    } catch {
      setSummary({});
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70 bg-background/90">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 lg:px-8">
          <Wordmark />
        </div>
        <div className="mx-auto max-w-4xl px-5 pb-4 lg:px-8">
          <FunnelProgress current={5} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-14 lg:px-8 lg:py-20">
        <div className="surface-ink relative overflow-hidden rounded-[2rem] px-7 py-12 text-center shadow-elevated sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
          />
          <div className="relative">
            <span className="mx-auto grid size-16 place-items-center rounded-full rule-accent shadow-accent">
              <Check className="size-8 text-accent-foreground" />
            </span>
            <h1 className="font-display mt-8 text-3xl font-semibold text-balance text-ink-foreground sm:text-4xl">
              Thank You — Your Request Has Been Received!
            </h1>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-muted">
              Your book promotion request has been successfully submitted to PROSPER FESTORS.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Book", value: summary.bookTitle },
            { label: "Service", value: summary.service },
            { label: "Email", value: summary.email },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <p className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-2 font-medium break-words">{item.value || "—"}</p>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            What happens next?
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <div key={step.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="font-display text-3xl font-semibold text-accent">{step.n}</span>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="accent" size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/services">
              Explore PROSPER FESTORS Services <ArrowRight />
            </Link>
          </Button>
        </div>

        <p className="mt-8 flex items-center gap-3 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          <Mail className="size-4 shrink-0" />
          Please check your email for further communication from our team.
        </p>
      </main>
    </div>
  );
}
