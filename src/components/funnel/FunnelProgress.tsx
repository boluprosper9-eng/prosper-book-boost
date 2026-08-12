import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: "01", label: "Book" },
  { n: "02", label: "Goals" },
  { n: "03", label: "Service" },
  { n: "04", label: "Review" },
  { n: "05", label: "Complete" },
] as const;

export function FunnelProgress({ current }: { current: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center gap-2 sm:gap-3">
        {STEPS.map((step, i) => {
          const index = i + 1;
          const done = index < current;
          const active = index === current;
          return (
            <li key={step.n} className="flex min-w-0 flex-1 flex-col gap-2">
              <div
                className={cn(
                  "h-1 w-full rounded-full transition-colors",
                  done && "bg-accent",
                  active && "rule-accent",
                  !done && !active && "bg-border",
                )}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold",
                    done && "bg-accent text-accent-foreground",
                    active && "bg-primary text-primary-foreground",
                    !done && !active && "bg-secondary text-muted-foreground",
                  )}
                  aria-hidden
                >
                  {done ? <Check className="size-3" /> : step.n}
                </span>
                <span
                  className={cn(
                    "truncate text-xs font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="sr-only">{`Step ${step.n}: `}</span>
                  {step.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
