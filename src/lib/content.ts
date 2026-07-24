import { accessories, recommendedApps } from "@/../content/accessories";
import { comparisons, comparisonsBySlug } from "@/../content/comparisons";
import { guides, guidesBySlug } from "@/../content/guides";
import { models, modelsById, modelsBySlug } from "@/../content/models";
import { digitalProducts, digitalProductsBySlug } from "@/../content/products";
import { recommendations } from "@/../content/recommendations";
import {
  lightingOptions,
  outputGoals,
  scenarios,
  scenariosById,
  scenariosBySlug,
} from "@/../content/scenarios";
import { sources, sourcesById } from "@/../content/sources";
import type {
  Comparison,
  DigitalProduct,
  Guide,
  IPhoneModel,
  Recommendation,
  Scenario,
} from "@/lib/schemas";

export function getModels(): IPhoneModel[] {
  return models;
}

export function getPublishedModels(): IPhoneModel[] {
  return models.filter((m) => m.status === "published" || m.status === "reviewed");
}

export function getModelBySlug(slug: string): IPhoneModel | undefined {
  return modelsBySlug[slug];
}

export function getModelById(id: string): IPhoneModel | undefined {
  return modelsById[id];
}

export function getScenarios(): Scenario[] {
  return scenarios;
}

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return scenariosBySlug[slug];
}

export function getScenarioById(id: string): Scenario | undefined {
  return scenariosById[id];
}

export function getLightingOptions() {
  return lightingOptions;
}

export function getOutputGoals() {
  return outputGoals;
}

export function getRecommendations(): Recommendation[] {
  return recommendations;
}

export function getIndexableRecommendations(): Recommendation[] {
  return recommendations.filter(
    (r) => r.status === "published" || r.status === "reviewed",
  );
}

export function getGuides(): Guide[] {
  return guides;
}

export function getPublishedGuides(): Guide[] {
  return guides.filter((g) => g.status === "published" || g.status === "reviewed");
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guidesBySlug[slug];
}

export function getSources() {
  return sources;
}

export function getSourceById(id: string) {
  return sourcesById[id];
}

export function getAccessories() {
  return accessories;
}

export function getApps() {
  return recommendedApps;
}

export function getAccessoriesByTags(tags: string[]) {
  return accessories.filter((a) => tags.includes(a.tag));
}

export function getAppsByTags(tags: string[]) {
  return recommendedApps.filter((a) => tags.includes(a.tag));
}

export function getRelatedGuides(slugs: string[], limit = 4): Guide[] {
  return slugs
    .map((slug) => guidesBySlug[slug])
    .filter(Boolean)
    .slice(0, limit) as Guide[];
}

export function isIndexableStatus(status: string): boolean {
  return status === "published" || status === "reviewed";
}

export function getComparisons(): Comparison[] {
  return comparisons;
}

export function getPublishedComparisons(): Comparison[] {
  return comparisons.filter((c) => isIndexableStatus(c.status));
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisonsBySlug[slug];
}

export function getComparisonsForRecommendation(
  recommendationId: string,
  scenarioId?: string,
  modelId?: string,
): Comparison[] {
  return getPublishedComparisons().filter((c) => {
    const byRec = c.recommendationIds.includes(recommendationId);
    const byScenario = scenarioId
      ? c.scenarioIds.includes(scenarioId)
      : false;
    const byModel = modelId ? c.modelIds.includes(modelId) : false;
    return byRec || (byScenario && (byModel || !modelId));
  });
}

export function getDigitalProducts(): DigitalProduct[] {
  return digitalProducts;
}

export function getPublishedProducts(): DigitalProduct[] {
  return digitalProducts.filter((p) => isIndexableStatus(p.status));
}

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return digitalProductsBySlug[slug];
}

export function getLeadMagnet(): DigitalProduct | undefined {
  return getPublishedProducts().find((p) => p.leadMagnet);
}

export function getProductsForScenario(scenarioId: string): DigitalProduct[] {
  return getPublishedProducts().filter(
    (p) => !p.leadMagnet && p.scenarioIds.includes(scenarioId),
  );
}

export function resolveCheckoutUrl(product: DigitalProduct): string | undefined {
  if (product.checkoutUrl) return product.checkoutUrl;
  const map: Record<string, string | undefined> = {
    "scenario-cheat-sheets": process.env.NEXT_PUBLIC_CHECKOUT_CHEAT_SHEETS,
    "night-travel-pack": process.env.NEXT_PUBLIC_CHECKOUT_NIGHT_TRAVEL,
  };
  return map[product.id];
}
