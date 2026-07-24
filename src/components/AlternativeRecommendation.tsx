import type { RecommendationAlternative } from "@/lib/schemas";

export function AlternativeRecommendation({
  alternative,
}: {
  alternative?: RecommendationAlternative;
}) {
  if (!alternative) return null;
  return (
    <section className="surface p-6" aria-labelledby="alt-heading">
      <h2 id="alt-heading" className="text-xl font-semibold">
        Alternative: {alternative.label}
      </h2>
      <p className="mt-2 text-ink-muted">{alternative.reason}</p>
      <p className="mt-4 rounded-[var(--radius-sm)] bg-bg-muted px-4 py-3 text-sm font-medium">
        {alternative.settingsSummary}
      </p>
      <p className="mt-3 text-sm text-ink-subtle">
        Trade-off: {alternative.tradeoff}
      </p>
    </section>
  );
}
