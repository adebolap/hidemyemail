import type { Source } from "@/lib/schemas";

export function SourceCitation({
  source,
  onOpen,
}: {
  source: Source;
  onOpen?: () => void;
}) {
  return (
    <article className="rounded-[var(--radius-sm)] border border-line bg-bg px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
        Tier {source.tier} · {source.publisher}
      </p>
      <h3 className="mt-1 font-medium">{source.title}</h3>
      {source.url ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-accent"
          onClick={onOpen}
        >
          Open source
        </a>
      ) : (
        <p className="mt-2 text-sm text-ink-muted">Internal controlled test record</p>
      )}
      <p className="mt-1 text-xs text-ink-subtle">
        Accessed {source.accessedAt}
        {source.testedModels?.length
          ? ` · Models: ${source.testedModels.join(", ")}`
          : ""}
      </p>
    </article>
  );
}
