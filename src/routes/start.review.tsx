import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { Button } from "@/components/ui/button";
import { bookSchema, clearFunnel, readFunnel, type FunnelData } from "@/lib/funnel";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/start/review")({
  head: () => ({
    meta: [
      { title: "Review Your Request — Prosper Festors" },
      {
        name: "description",
        content:
          "Review your book promotion request before submitting it to the Prosper Festors team.",
      },
      { property: "og:title", content: "Review Your Book Promotion Request" },
      {
        property: "og:description",
        content: "Step four of the Prosper Festors book promotion request.",
      },
    ],
  }),
  component: ReviewStep,
});

function ReviewStep() {
  const navigate = useNavigate();
  const [data, setData] = useState<FunnelData>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = readFunnel();
    if (!saved.service || !saved.goal || !saved.bookTitle) {
      void navigate({ to: "/start/book", replace: true });
      return;
    }
    setData(saved);
  }, [navigate]);

  const submit = async () => {
    const parsed = bookSchema.safeParse(data);
    if (!parsed.success || !data.goal || !data.service) {
      toast.error("Some details are missing. Please review your information.");
      void navigate({ to: "/start/book" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("book_promotion_requests").insert({
      author_name: parsed.data.authorName,
      email: parsed.data.email,
      book_title: parsed.data.bookTitle,
      genre: parsed.data.genre,
      goodreads_url: parsed.data.goodreadsUrl,
      amazon_url: parsed.data.amazonUrl || null,
      book_description: parsed.data.bookDescription,
      promotion_goal: data.goal,
      selected_service: data.service,
    });

    if (error) {
      setSubmitting(false);
      toast.error("We couldn't submit your request. Please try again.");
      return;
    }

    const summary = {
      bookTitle: parsed.data.bookTitle,
      service: data.service,
      email: parsed.data.email,
    };
    window.sessionStorage.setItem("pf_submission", JSON.stringify(summary));
    clearFunnel();
    toast.success("Request submitted successfully");
    void navigate({ to: "/thank-you", replace: true });
  };

  const rows: { label: string; value?: string }[] = [
    { label: "Author Name", value: data.authorName },
    { label: "Book Title", value: data.bookTitle },
    { label: "Genre", value: data.genre },
    { label: "Email", value: data.email },
    { label: "Promotion Goal", value: data.goal },
    { label: "Selected Service", value: data.service },
  ];

  return (
    <FunnelShell
      step={4}
      eyebrow="Step 04 — Review"
      title="Review Your Book Promotion Request"
      subtitle="Check that everything looks right before sending it to our team."
    >
      <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
        <dl className="divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
              <dt className="w-56 shrink-0 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {row.label}
              </dt>
              <dd className="font-medium break-words">{row.value || "—"}</dd>
            </div>
          ))}
        </dl>

        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => navigate({ to: "/start/book" })}
        >
          <Pencil /> Edit Information
        </Button>
      </div>

      <div className="surface-ink mt-8 rounded-3xl p-8 shadow-elevated sm:p-10">
        <h2 className="font-display text-2xl font-semibold text-ink-foreground sm:text-3xl">
          Ready to Submit Your Request?
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">
          Submit your request to PROSPER FESTORS and our team will review your information and
          contact you about the next steps.
        </p>
        <Button
          type="button"
          variant="accent"
          size="lg"
          className="mt-8 w-full sm:w-auto"
          disabled={submitting}
          onClick={() => void submit()}
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" /> Submitting…
            </>
          ) : (
            <>
              Submit Request <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </FunnelShell>
  );
}
