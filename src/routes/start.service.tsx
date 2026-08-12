import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { Button } from "@/components/ui/button";
import { SERVICES, readFunnel, writeFunnel } from "@/lib/funnel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/start/service")({
  head: () => ({
    meta: [
      { title: "Choose Your Service — Prosper Festors" },
      {
        name: "description",
        content:
          "Select the Prosper Festors service tier that best fits your book: Goodreads Foundation, Goodreads Visibility or Author Visibility.",
      },
      { property: "og:title", content: "Choose Your Prosper Festors Service" },
      {
        property: "og:description",
        content: "Step three of the Prosper Festors book promotion request.",
      },
    ],
  }),
  component: ServiceStep,
});

function ServiceStep() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    const saved = readFunnel();
    if (!saved.goal) {
      void navigate({ to: "/start/book", replace: true });
      return;
    }
    if (saved.service) setSelected(saved.service);
  }, [navigate]);

  const choose = (id: string) => {
    setSelected(id);
    writeFunnel({ ...readFunnel(), service: id });
    void navigate({ to: "/start/review" });
  };

  return (
    <FunnelShell
      step={3}
      eyebrow="Step 03 — Service"
      title="Choose Your PROSPER FESTORS Service"
      subtitle="Each service is designed to improve discoverability and create more opportunities for readers to find your book."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article
            key={service.id}
            className={cn(
              "flex flex-col rounded-3xl border bg-card p-7 shadow-card",
              selected === service.id
                ? "border-accent ring-1 ring-accent/40"
                : service.featured
                  ? "border-accent/40"
                  : "border-border",
            )}
          >
            {service.featured && (
              <span className="mb-4 w-fit rounded-full rule-accent px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-accent-foreground uppercase">
                Most chosen
              </span>
            )}
            <h2 className="font-display text-xl font-semibold">{service.id}</h2>
            <p className="mt-2 text-sm font-medium text-accent">{service.tagline}</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              type="button"
              variant={service.featured ? "accent" : "outline"}
              size="lg"
              className="mt-8 w-full"
              onClick={() => choose(service.id)}
            >
              {service.cta}
            </Button>
          </article>
        ))}
      </div>

      <p className="mt-8 rounded-2xl bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
        Promotional results vary depending on the book, audience, platform activity, and other
        factors. No specific ranking, review count, Listopia placement, or sales result is
        guaranteed.
      </p>

      <div className="mt-8">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => navigate({ to: "/start/goals" })}
        >
          <ArrowLeft /> Back
        </Button>
      </div>
    </FunnelShell>
  );
}
