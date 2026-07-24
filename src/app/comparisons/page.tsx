import Link from "next/link";
import { ComparisonCard } from "@/components/ComparisonCard";
import { getPublishedComparisons } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Controlled camera comparisons",
  description:
    "Owned before/after iPhone camera tests with settings, observations, and storage trade-offs.",
  path: "/comparisons",
});

export default function ComparisonsIndexPage() {
  const comparisons = getPublishedComparisons();

  return (
    <div className="container-page py-10">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow">Evidence library</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
          Controlled comparisons
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Side-by-side results from our own tests — the moat behind the
          recommendations, not recycled generic tips.
        </p>
      </header>
      <div className="space-y-6">
        {comparisons.map((comparison) => (
          <ComparisonCard key={comparison.id} comparison={comparison} />
        ))}
      </div>
      <p className="mt-10 text-sm text-ink-muted">
        See also{" "}
        <Link href="/methodology" className="text-accent">
          methodology
        </Link>{" "}
        and{" "}
        <Link href="/products" className="text-accent">
          cheat sheets
        </Link>
        .
      </p>
    </div>
  );
}
