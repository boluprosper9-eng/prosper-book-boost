import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FunnelShell } from "@/components/funnel/FunnelShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookSchema, readFunnel, writeFunnel, type BookInfo } from "@/lib/funnel";

export const Route = createFileRoute("/start/book")({
  head: () => ({
    meta: [
      { title: "Your Book Details — Prosper Festors" },
      {
        name: "description",
        content:
          "Tell Prosper Festors about your book so we can understand your title, genre and promotional goals.",
      },
      { property: "og:title", content: "Tell Prosper Festors About Your Book" },
      {
        property: "og:description",
        content: "Step one of the Prosper Festors book promotion request.",
      },
    ],
  }),
  component: BookStep,
});

const EMPTY: BookInfo = {
  authorName: "",
  email: "",
  bookTitle: "",
  genre: "",
  goodreadsUrl: "",
  amazonUrl: "",
  bookDescription: "",
};

type Errors = Partial<Record<keyof BookInfo, string>>;

function BookStep() {
  const navigate = useNavigate();
  const [values, setValues] = useState<BookInfo>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const saved = readFunnel();
    setValues((prev) => ({ ...prev, ...saved }));
  }, []);

  const set = (key: keyof BookInfo) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookSchema.safeParse(values);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof BookInfo;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    writeFunnel({ ...readFunnel(), ...result.data });
    void navigate({ to: "/start/goals" });
  };

  return (
    <FunnelShell
      step={1}
      eyebrow="Step 01 — Book"
      title="Tell PROSPER FESTORS About Your Book"
      subtitle="Complete the short form below so we can understand your book and promotional goals."
    >
      <form
        onSubmit={onSubmit}
        noValidate
        className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id="authorName"
            label="Author Name"
            value={values.authorName}
            onChange={set("authorName")}
            error={errors.authorName}
            autoComplete="name"
          />
          <Field
            id="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            autoComplete="email"
          />
          <Field
            id="bookTitle"
            label="Book Title"
            value={values.bookTitle}
            onChange={set("bookTitle")}
            error={errors.bookTitle}
          />
          <Field
            id="genre"
            label="Book Genre"
            value={values.genre}
            onChange={set("genre")}
            error={errors.genre}
            placeholder="e.g. Literary fiction, Memoir, Fantasy"
          />
          <Field
            id="goodreadsUrl"
            label="Goodreads Book URL"
            type="url"
            value={values.goodreadsUrl}
            onChange={set("goodreadsUrl")}
            error={errors.goodreadsUrl}
            placeholder="https://www.goodreads.com/book/..."
            className="sm:col-span-2"
          />
          <Field
            id="amazonUrl"
            label="Amazon Book URL"
            optional
            type="url"
            value={values.amazonUrl}
            onChange={set("amazonUrl")}
            error={errors.amazonUrl}
            placeholder="https://www.amazon.com/dp/..."
            className="sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <Label htmlFor="bookDescription">Book Description</Label>
            <Textarea
              id="bookDescription"
              rows={6}
              maxLength={2000}
              value={values.bookDescription}
              onChange={(e) => set("bookDescription")(e.target.value)}
              aria-invalid={Boolean(errors.bookDescription)}
              aria-describedby={errors.bookDescription ? "bookDescription-error" : undefined}
              placeholder="What is your book about, and who is it for?"
              className="mt-2 min-h-32 rounded-2xl"
            />
            {errors.bookDescription && (
              <p id="bookDescription-error" className="mt-2 text-sm text-destructive">
                {errors.bookDescription}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" variant="accent" size="lg" className="mt-8 w-full sm:w-auto">
          Continue <ArrowRight />
        </Button>
      </form>
    </FunnelShell>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  optional,
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
  optional?: boolean | undefined;
  autoComplete?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-2 text-xs text-muted-foreground">Optional</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 h-12 rounded-2xl"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
