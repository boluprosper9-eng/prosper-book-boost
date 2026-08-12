import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/funnel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Prosper Festors Book Promotion Packages" },
      {
        name: "description",
        content:
          "Goodreads Foundation, Goodreads Visibility and Author Visibility services designed to improve book discoverability and reader engagement.",
      },
      { property: "og:title", content: "Prosper Festors Services" },
      {
        property: "og:description",
        content:
          "Three professional service tiers designed to strengthen your book's online visibility.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="surface-ink">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <span className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Services
          </span>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold text-balance text-ink-foreground sm:text-5xl">
            Choose Your PROSPER FESTORS Service
          </h1>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
            Each service is designed to improve discoverability and create more opportunities for
            the right readers to find your book.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className={cn(
                "flex flex-col rounded-3xl border p-8 shadow-card",
                service.featured
                  ? "border-accent/50 bg-card ring-1 ring-accent/30"
                  : "border-border bg-card",
              )}
            >
              {service.featured && (
                <span className="mb-4 w-fit rounded-full rule-accent px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-accent-foreground uppercase">
                  Most chosen
                </span>
              )}
              <h2 className="font-display text-2xl font-semibold">{service.id}</h2>
              <p className="mt-2 text-sm font-medium text-accent">{service.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-7 flex-1 space-y-3 text-sm">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={service.featured ? "accent" : "outline"}
                size="lg"
                className="mt-8 w-full"
              >
                <Link to="/start/book">{service.cta}</Link>
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-10 rounded-2xl bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
          Promotional results vary depending on the book, audience, platform activity, and other
          factors. No specific ranking, review count, review outcome, Listopia placement, or sales
          result is guaranteed.
        </p>

        <div className="mt-12">
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
