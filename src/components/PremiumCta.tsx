"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function PremiumCta() {
  const enabled = process.env.NEXT_PUBLIC_PREMIUM_CTA_ENABLED !== "false";
  if (!enabled) return null;

  return (
    <section className="overflow-hidden rounded-[var(--radius)] border border-accent/20 bg-gradient-to-br from-accent-soft via-bg-elevated to-bg-muted p-6">
      <p className="eyebrow">Coming later</p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
        Analyze My Photo
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
        A future premium tool to review one of your shots and suggest concrete
        setting changes. Not available in this MVP — no uploads yet.
      </p>
      <Link
        href="/contact"
        className="btn btn-primary mt-4 no-underline"
        onClick={() => track("premium_cta_clicked")}
      >
        Get notified
      </Link>
    </section>
  );
}
