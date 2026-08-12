import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

export const GOALS = [
  "Increase Goodreads visibility",
  "Reach more relevant readers",
  "Improve book discoverability",
  "Promote a new release",
  "Increase reader engagement",
  "Build a stronger author presence",
  "Other",
] as const;

export const SERVICES = [
  {
    id: "Goodreads Foundation",
    tagline: "Designed to improve discoverability.",
    description:
      "A structured review of how your book currently appears to readers, with a clear plan for strengthening it.",
    features: [
      "Goodreads presence review",
      "Book positioning assessment",
      "Reader audience research",
      "Goodreads optimization recommendations",
      "Promotional strategy",
    ],
    cta: "Choose Foundation",
  },
  {
    id: "Goodreads Visibility",
    tagline: "Designed to increase opportunities for reader discovery.",
    description:
      "Everything in Foundation plus active visibility work and reader-facing promotional materials.",
    features: [
      "Goodreads Foundation",
      "Relevant Listopia research",
      "Goodreads visibility strategy",
      "Reader-facing promotional materials",
      "Campaign guidance",
      "Progress updates",
    ],
    cta: "Choose Visibility",
    featured: true,
  },
  {
    id: "Author Visibility",
    tagline: "Designed to strengthen your book's online visibility.",
    description:
      "A broader, cross-platform programme for authors building long-term presence around their work.",
    features: [
      "Goodreads visibility strategy",
      "Book positioning",
      "Reader discovery strategy",
      "Cross-platform promotional recommendations",
      "Campaign planning",
      "Ongoing promotional support",
    ],
    cta: "Choose Author Visibility",
  },
] as const;

export const bookSchema = z.object({
  authorName: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  bookTitle: z.string().trim().min(1, "Please enter your book title").max(200),
  genre: z.string().trim().min(2, "Please enter your book genre").max(100),
  goodreadsUrl: z.string().trim().url("Enter a valid URL").max(500),
  amazonUrl: z.union([z.string().trim().url("Enter a valid URL").max(500), z.literal("")]),
  bookDescription: z
    .string()
    .trim()
    .min(30, "Please give us at least a couple of sentences")
    .max(2000, "Please keep this under 2000 characters"),
});

export type BookInfo = z.infer<typeof bookSchema>;

export type FunnelData = Partial<BookInfo> & {
  goal?: string;
  service?: string;
};

const KEY = "pf_funnel_v1";

export function readFunnel(): FunnelData {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FunnelData) : {};
  } catch {
    return {};
  }
}

export function writeFunnel(data: FunnelData) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(data));
}

export function clearFunnel() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}

export function useFunnel() {
  const [data, setData] = useState<FunnelData>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(readFunnel());
    setHydrated(true);
  }, []);

  const update = useCallback((patch: FunnelData) => {
    setData((prev) => {
      const next = { ...prev, ...patch };
      writeFunnel(next);
      return next;
    });
  }, []);

  return { data, update, hydrated };
}
