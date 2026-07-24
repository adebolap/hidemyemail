import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import {
  getPublishedModels,
  getRelatedGuides,
  getScenarioBySlug,
  getScenarios,
} from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ scenario: string }> };

export async function generateStaticParams() {
  return getScenarios().map((scenario) => ({ scenario: scenario.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { scenario: slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) return {};
  return buildMetadata({
    title: `Best iPhone settings for ${scenario.name}`,
    description: scenario.description,
    path: `/settings/${scenario.slug}`,
  });
}

export default async function ScenarioHubPage({ params }: Props) {
  const { scenario: slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) notFound();
  const models = getPublishedModels();
  const relatedGuides = getRelatedGuides(scenario.relatedGuideSlugs, 4);
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: scenario.name, path: `/settings/${scenario.slug}` },
  ]);

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: scenario.name }]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow">Scenario hub</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
          {scenario.name} settings by iPhone
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{scenario.description}</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <li key={model.id}>
            <Link
              href={`/iphone/${model.slug}/${scenario.slug}`}
              className="surface block p-4 no-underline hover:border-accent"
            >
              <h2 className="font-semibold">{model.name}</h2>
              <p className="mt-1 text-sm text-ink-muted">Open recommendation</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <RelatedGuides guides={relatedGuides} />
      </div>
    </div>
  );
}
