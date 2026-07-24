import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonCard } from "@/components/ComparisonCard";
import { DigitalProductCard } from "@/components/DigitalProductCard";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SourceCitation } from "@/components/SourceCitation";
import {
  getComparisonBySlug,
  getLeadMagnet,
  getPublishedComparisons,
  getPublishedProducts,
  getRelatedGuides,
  getSourceById,
  resolveCheckoutUrl,
} from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};
  return buildMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/comparisons/${comparison.slug}`,
    type: "article",
  });
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison || comparison.status === "draft") notFound();

  const sources = comparison.sourceIds
    .map((id) => getSourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSourceById>>[];
  const relatedGuides = getRelatedGuides(
    ["low-light-guide", "best-overall-settings", "video-settings-guide", "proraw-guide"],
    3,
  );
  const products = getPublishedProducts()
    .filter((p) => !p.leadMagnet)
    .slice(0, 2)
    .map((p) => ({ ...p, resolvedCheckoutUrl: resolveCheckoutUrl(p) }));
  const leadMagnet = getLeadMagnet();

  const schemas = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Comparisons", path: "/comparisons" },
      { name: comparison.title, path: `/comparisons/${comparison.slug}` },
    ]),
    articleJsonLd({
      title: comparison.title,
      description: comparison.description,
      path: `/comparisons/${comparison.slug}`,
      dateModified: comparison.lastVerifiedAt,
    }),
  ];

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Comparisons", href: "/comparisons" },
          { name: comparison.title },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <p className="eyebrow">Controlled test</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
          {comparison.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{comparison.description}</p>
        <p className="mt-3 text-sm text-ink-subtle">
          Tested on iOS {comparison.testedIOS} · Verified{" "}
          {formatDate(comparison.lastVerifiedAt)}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-8">
          <ComparisonCard comparison={comparison} />
          <section className="surface p-6">
            <h2 className="text-xl font-semibold">Metrics</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-ink-subtle">
                    <th className="py-2 pr-3 font-medium">Metric</th>
                    <th className="py-2 pr-3 font-medium">Default</th>
                    <th className="py-2 font-medium">Optimized</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.metrics.map((metric) => (
                    <tr key={metric.label} className="border-b border-line/70">
                      <td className="py-3 pr-3 font-medium">{metric.label}</td>
                      <td className="py-3 pr-3 text-ink-muted">{metric.defaultValue}</td>
                      <td className="py-3 text-ink-muted">{metric.optimizedValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          {sources.length ? (
            <section>
              <h2 className="text-xl font-semibold">Sources</h2>
              <ul className="mt-4 space-y-3">
                {sources.map((source) => (
                  <li key={source.id}>
                    <SourceCitation source={source} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <RelatedGuides guides={relatedGuides} />
        </div>
        <aside className="space-y-6">
          {leadMagnet ? (
            <DigitalProductCard product={leadMagnet} />
          ) : null}
          {products.map((product) => (
            <DigitalProductCard
              key={product.id}
              product={product}
              checkoutUrl={product.resolvedCheckoutUrl}
            />
          ))}
          <Link href="/#finder" className="btn btn-secondary w-full no-underline">
            Find my settings
          </Link>
        </aside>
      </div>
    </div>
  );
}
