import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { Button } from "@/components/ui/button";
import { GOALS, readFunnel, writeFunnel } from "@/lib/funnel";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/start/goals")({
  head: () => ({
    meta: [
      { title: "Your Promotion Goals — Prosper Festors" },
      {
        name: "description",
        content:
          "Choose what you would most like to achieve with your book promotion campaign at Prosper Festors.",
      },
      { property: "og:title", content: "Your Book Promotion Goals" },
      {
        property: "og:description",
        content: "Step two of the Prosper Festors book promotion request.",
      },
    ],
  }),
  component: GoalsStep,
});

function GoalsStep() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<string>("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = readFunnel();
    if (!saved.bookTitle) {
      void navigate({ to: "/start/book", replace: true });
      return;
    }
    if (saved.goal) setGoal(saved.goal);
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) {
      setError(true);
      return;
    }
    writeFunnel({ ...readFunnel(), goal });
    void navigate({ to: "/start/service" });
  };

  return (
    <FunnelShell
      step={2}
      eyebrow="Step 02 — Goals"
      title="What would you most like to achieve?"
      subtitle="Pick the outcome that matters most right now. We'll build the strategy around it."
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <fieldset
          className="grid gap-3 sm:grid-cols-2"
          aria-invalid={error}
          aria-describedby={error ? "goal-error" : undefined}
        >
          <legend className="sr-only">Promotional goal</legend>
          {GOALS.map((option) => {
            const selected = goal === option;
            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-5 text-sm font-medium transition-all",
                  selected
                    ? "border-accent bg-card shadow-accent ring-1 ring-accent/40"
                    : "border-border bg-card hover:border-foreground/20",
                )}
              >
                <span>{option}</span>
                <input
                  type="radio"
                  name="goal"
                  value={option}
                  checked={selected}
                  onChange={() => {
                    setGoal(option);
                    setError(false);
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border",
                    selected ? "rule-accent border-transparent" : "border-border",
                  )}
                >
                  {selected && <Check className="size-3 text-accent-foreground" />}
                </span>
              </label>
            );
          })}
        </fieldset>

        {error && (
          <p id="goal-error" className="text-sm text-destructive">
            Please choose a promotional goal to continue.
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate({ to: "/start/book" })}
          >
            <ArrowLeft /> Back
          </Button>
          <Button type="submit" variant="accent" size="lg">
            Continue <ArrowRight />
          </Button>
        </div>
      </form>
    </FunnelShell>
  );
}
