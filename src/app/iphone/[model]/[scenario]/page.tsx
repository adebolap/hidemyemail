import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RecommendationResultView } from "@/components/RecommendationResultView";
import {
  getAccessoriesByTags,
  getAppsByTags,
  getComparisonsForRecommendation,
  getLeadMagnet,
  getModelBySlug,
  getProductsForScenario,
  getPublishedModels,
  getRelatedGuides,
  getScenarioBySlug,
  getScenarios,
  getSourceById,
  isIndexableStatus,
  resolveCheckoutUrl,
} from "@/lib/content";
import { CURRENT_TARGET_IOS } from "@/lib/freshness";
import { getRecommendation } from "@/lib/recommendation-engine";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  howToJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ model: string; scenario: string }>;
  searchParams: Promise<{
    lighting?: string;
    output?: string;
    media?: string;
  }>;
};

export async function generateStaticParams() {
  const models = getPublishedModels();
  const scenarios = getScenarios();
  return models.flatMap((model) =>
    scenarios.map((scenario) => ({
      model: model.slug,
      scenario: scenario.slug,
    })),
  );
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { model: modelSlug, scenario: scenarioSlug } = await params;
  const query = await searchParams;
  const model = getModelBySlug(modelSlug);
  const scenario = getScenarioBySlug(scenarioSlug);
  if (!model || !scenario) return {};

  const hasQuery = Boolean(query.lighting || query.output || query.media);
  const result = getRecommendation({
    modelId: model.id,
    mediaType: query.media === "video" ? "video" : scenario.mediaTypes[0],
    scenario: scenario.id,
    lighting: query.lighting ?? scenario.defaultLighting,
    outputGoal: query.output ?? scenario.defaultOutput,
  });

  const index =
    !hasQuery &&
    isIndexableStatus(result.primary.status) &&
    result.matchType !== "safe-fallback";

  return buildMetadata({
    title: `${model.name} ${scenario.name} camera settings`,
    description: result.primary.summary.slice(0, 155),
    path: `/iphone/${model.slug}/${scenario.slug}`,
    index,
    type: "article",
  });
}

export default async function ModelScenarioPage({ params, searchParams }: Props) {
  const { model: modelSlug, scenario: scenarioSlug } = await params;
  const query = await searchParams;
  const model = getModelBySlug(modelSlug);
  const scenario = getScenarioBySlug(scenarioSlug);
  if (!model || !scenario) notFound();

  const mediaType =
    query.media === "video"
      ? "video"
      : query.media === "photo"
        ? "photo"
        : scenario.mediaTypes.includes("photo")
          ? "photo"
          : "video";

  const input = {
    modelId: model.id,
    mediaType: mediaType as "photo" | "video",
    scenario: scenario.id,
    lighting: query.lighting ?? scenario.defaultLighting,
    outputGoal: query.output ?? scenario.defaultOutput,
  };

  const result = getRecommendation(input);
  const sourceIds = [
    ...new Set(result.primary.rationale.flatMap((r) => r.sourceIds)),
  ];
  const sources = sourceIds
    .map((id) => getSourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSourceById>>[];

  const accessories = getAccessoriesByTags(result.primary.accessoryTags);
  const apps = getAppsByTags(result.primary.appTags);
  const comparisons = getComparisonsForRecommendation(
    result.primary.id,
    scenario.id,
    model.id,
  );
  const products = getProductsForScenario(scenario.id).map((product) => ({
    ...product,
    resolvedCheckoutUrl: resolveCheckoutUrl(product),
  }));
  const leadMagnet = getLeadMagnet();
  const relatedGuides = getRelatedGuides(
    [
      ...scenario.relatedGuideSlugs,
      "methodology" as unknown as string,
      "best-overall-settings",
      "low-light-guide",
    ].filter((slug) => slug !== "methodology"),
    4,
  );

  const sharePath = `/iphone/${model.slug}/${scenario.slug}?lighting=${input.lighting}&output=${input.outputGoal}&media=${input.mediaType}`;

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: model.name, path: `/iphone/${model.slug}` },
    {
      name: scenario.name,
      path: `/iphone/${model.slug}/${scenario.slug}`,
    },
  ]);
  const article = articleJsonLd({
    title: `${model.name} ${scenario.name} camera settings`,
    description: result.primary.summary,
    path: `/iphone/${model.slug}/${scenario.slug}`,
    dateModified: result.primary.lastVerifiedAt,
  });
  const howTo = howToJsonLd({
    name: `Set up ${model.name} for ${scenario.name}`,
    description: result.primary.summary,
    steps: result.primary.instructions,
  });

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbs, article, howTo]),
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: model.name, href: `/iphone/${model.slug}` },
          { name: scenario.name },
        ]}
      />
      <p className="mb-4 text-sm text-ink-muted">
        Canonical page works without query params. Current selectors:{" "}
        <strong>{mediaType}</strong> · <strong>{input.lighting}</strong> ·{" "}
        <strong>{input.outputGoal}</strong>.{" "}
        <Link href={`/settings/${scenario.slug}`} className="text-accent">
          All phones for this scenario
        </Link>
      </p>
      <RecommendationResultView
        modelName={model.name}
        result={result}
        sources={sources}
        accessories={accessories}
        apps={apps}
        relatedGuides={relatedGuides}
        sharePath={sharePath}
        comparisons={comparisons}
        products={products}
        leadMagnet={leadMagnet}
        testedIOS={CURRENT_TARGET_IOS}
      />
      <p className="mt-10 text-sm text-ink-muted">
        Hub:{" "}
        <Link href={`/iphone/${model.slug}`} className="text-accent">
          {model.name}
        </Link>{" "}
        ·{" "}
        <Link href="/methodology" className="text-accent">
          Methodology
        </Link>
      </p>
    </div>
  );
}
