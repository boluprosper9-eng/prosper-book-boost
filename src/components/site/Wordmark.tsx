import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  onInk = false,
}: {
  className?: string;
  onInk?: boolean;
}) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-3", className)}>
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg rule-accent font-display text-lg font-semibold text-accent-foreground shadow-accent"
      >
        P
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-[0.18em] uppercase sm:text-lg",
            onInk ? "text-ink-foreground" : "text-foreground",
          )}
        >
          Prosper Festors
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium tracking-[0.24em] uppercase",
            onInk ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          Book Promotion
        </span>
      </span>
    </Link>
  );
}
