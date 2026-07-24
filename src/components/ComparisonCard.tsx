import Link from "next/link";
import type { Comparison } from "@/lib/schemas";
import { FreshnessBadge } from "@/components/FreshnessBadge";
import { formatDate } from "@/lib/utils";

export function ComparisonCard({
  comparison,
  compact = false,
}: {
  comparison: Comparison;
  compact?: boolean;
}) {
  return (
    <article className="surface overflow-hidden">
      <div className="border-b border-line bg-bg-muted/50 px-5 py-4">
        <p className="eyebrow">Owned comparison</p>
        <h3 className="mt-1 text-lg font-semibold">
          <Link href={`/comparisons/${comparison.slug}`} className="no-underline hover:text-accent">
            {comparison.title}
          </Link>
        </h3>
        {!compact ? (
          <p className="mt-2 text-sm text-ink-muted">{comparison.description}</p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FreshnessBadge
            lastVerifiedAt={comparison.lastVerifiedAt}
            testedIOS={comparison.testedIOS}
            status={comparison.status}
          />
          <span className="text-xs text-ink-subtle">
            iOS {comparison.testedIOS} · {formatDate(comparison.lastVerifiedAt)}
          </span>
        </div>
      </div>
      <div className="grid gap-0 sm:grid-cols-2">
        <ComparisonSide side={comparison.defaultSide} tone="default" />
        <ComparisonSide side={comparison.optimizedSide} tone="optimized" />
      </div>
      <div className="border-t border-line px-5 py-4">
        <p className="text-sm font-semibold text-ink">
          Result: {comparison.winner === "tie" ? "Tie / context-dependent" : comparison.winner}
        </p>
        <p className="mt-1 text-sm text-ink-muted">{comparison.winnerSummary}</p>
        {!compact ? (
          <dl className="mt-4 grid gap-2 sm:grid-cols-3">
            {comparison.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="rounded-[var(--radius-sm)] bg-bg px-3 py-2">
                <dt className="text-xs text-ink-subtle">{metric.label}</dt>
                <dd className="mt-1 text-sm font-medium">
                  {metric.defaultValue} → {metric.optimizedValue}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <Link
          href={`/comparisons/${comparison.slug}`}
          className="mt-4 inline-block text-sm font-medium text-accent"
        >
          Open full comparison
        </Link>
      </div>
    </article>
  );
}

function ComparisonSide({
  side,
  tone,
}: {
  side: Comparison["defaultSide"];
  tone: "default" | "optimized";
}) {
  return (
    <div
      className={
        tone === "optimized"
          ? "border-t border-line px-5 py-4 sm:border-l sm:border-t-0"
          : "px-5 py-4"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        {side.label}
      </p>
      <p className="mt-2 text-sm font-medium text-ink">{side.settingsSummary}</p>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-muted">
        {side.observations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
