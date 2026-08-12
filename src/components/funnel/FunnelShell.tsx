import type { ReactNode } from "react";
import { FunnelProgress } from "./FunnelProgress";
import { Wordmark } from "@/components/site/Wordmark";
import { Link } from "@tanstack/react-router";

export function FunnelShell({
  step,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Wordmark />
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Exit
          </Link>
        </div>
        <div className="mx-auto max-w-4xl px-5 pb-4 lg:px-8">
          <FunnelProgress current={step} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-12 lg:px-8 lg:py-16">
        <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h1 className="font-display mt-3 text-3xl font-semibold text-balance sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-10">{children}</div>
      </main>
    </div>
  );
}
