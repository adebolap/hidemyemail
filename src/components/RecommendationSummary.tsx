import type { Recommendation } from "@/lib/schemas";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { formatDate } from "@/lib/utils";

export function RecommendationSummary({
  recommendation,
  modelName,
  matchType,
}: {
  recommendation: Recommendation;
  modelName: string;
  matchType: string;
}) {
  return (
    <section className="surface p-6 sm:p-8" aria-labelledby="answer-heading">
      <p className="eyebrow">Primary answer</p>
      <h1
        id="answer-heading"
        className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Best settings for {modelName}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        {recommendation.summary}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <ConfidenceBadge confidence={recommendation.confidence} />
        <p className="text-sm text-ink-subtle">
          Verified {formatDate(recommendation.lastVerifiedAt)} · Match:{" "}
          {matchType.replace("-", " ")}
        </p>
      </div>
    </section>
  );
}
