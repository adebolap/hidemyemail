import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SettingsFinder } from "@/components/SettingsFinder";
import {
  getLightingOptions,
  getModelBySlug,
  getOutputGoals,
  getPublishedModels,
  getRelatedGuides,
  getScenarios,
} from "@/lib/content";
import { RelatedGuides } from "@/components/RelatedGuides";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ model: string }> };

export async function generateStaticParams() {
  return getPublishedModels().map((model) => ({ model: model.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { model: slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};
  return buildMetadata({
    title: `Best camera settings for ${model.name}`,
    description: `Find photo and video camera settings for ${model.name}, including scenario guides, formats, and capability-aware recommendations.`,
    path: `/iphone/${model.slug}`,
  });
}

export default async function ModelHubPage({ params }: Props) {
  const { model: slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const scenarios = getScenarios();
  const models = getPublishedModels();
  const lighting = getLightingOptions();
  const outputs = getOutputGoals();
  const relatedGuides = getRelatedGuides(
    ["best-overall-settings", "heif-vs-jpeg", "video-settings-guide", "low-light-guide"],
    4,
  );

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: model.name, path: `/iphone/${model.slug}` },
  ]);

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: model.name },
        ]}
      />
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow">Model hub</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
          {model.name} camera settings
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Capability-aware recommendations for {model.name}. Features like ProRAW,
          ProRes, and Action mode are only suggested when this model supports them.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="surface p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-subtle">Family</dt>
            <dd className="mt-1 font-medium">{model.family}</dd>
          </div>
          <div className="surface p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-subtle">Release</dt>
            <dd className="mt-1 font-medium">{model.releaseYear}</dd>
          </div>
          <div className="surface p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-subtle">Verified</dt>
            <dd className="mt-1 font-medium">{model.lastVerifiedAt}</dd>
          </div>
        </dl>
      </header>

      <div className="mb-12">
        <SettingsFinder
          models={models.map((m) => ({ id: m.id, name: m.name }))}
          scenarios={scenarios.map((s) => ({
            id: s.id,
            name: s.name,
            description: s.description,
            mediaTypes: s.mediaTypes,
          }))}
          lighting={lighting.map((l) => ({
            id: l.id,
            name: l.name,
            description: l.description,
          }))}
          outputs={outputs.map((o) => ({
            id: o.id,
            name: o.name,
            description: o.description,
          }))}
          modelSlugs={Object.fromEntries(models.map((m) => [m.id, m.slug]))}
          scenarioSlugs={Object.fromEntries(scenarios.map((s) => [s.id, s.slug]))}
          initial={{ modelId: model.id }}
          compact
        />
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold">Scenario guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <Link
                href={`/iphone/${model.slug}/${scenario.slug}`}
                className="surface block h-full p-4 no-underline hover:border-accent"
              >
                <h3 className="font-semibold">{scenario.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{scenario.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RelatedGuides guides={relatedGuides} />
      <p className="mt-8 text-sm text-ink-muted">
        <Link href="/methodology" className="text-accent">
          Methodology
        </Link>{" "}
        ·{" "}
        <Link href="/sources" className="text-accent">
          Sources
        </Link>
      </p>
    </div>
  );
}
