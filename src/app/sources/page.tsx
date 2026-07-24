import { SourceCitation } from "@/components/SourceCitation";
import { getSources } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sources",
  description:
    "Tiered source library used for iPhone camera capability claims and recommendations.",
  path: "/sources",
});

export default function SourcesPage() {
  const sources = getSources().sort((a, b) => a.tier - b.tier);

  return (
    <div className="container-page py-10">
      <p className="eyebrow">Citations</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
        Sources
      </h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Every factual capability claim should map to one of these records.
        Controlled tests without a public URL are listed as internal Tier 2
        records.
      </p>
      <ul className="mt-8 space-y-4">
        {sources.map((source) => (
          <li key={source.id}>
            <SourceCitation source={source} />
          </li>
        ))}
      </ul>
    </div>
  );
}
