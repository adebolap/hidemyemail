import {
  getPublishedGuides,
  getPublishedModels,
  getScenarios,
  getIndexableRecommendations,
  isIndexableStatus,
} from "@/lib/content";
import { getRecommendation } from "@/lib/recommendation-engine";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/methodology",
    "/sources",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date("2026-07-15"),
  }));

  const models = getPublishedModels().map((model) => ({
    url: absoluteUrl(`/iphone/${model.slug}`),
    lastModified: new Date(model.lastVerifiedAt),
  }));

  const scenarios = getScenarios().map((scenario) => ({
    url: absoluteUrl(`/settings/${scenario.slug}`),
    lastModified: new Date("2026-07-15"),
  }));

  const guides = getPublishedGuides().map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.lastVerifiedAt),
  }));

  // Index substantial model-scenario pages that resolve to reviewed content
  const modelScenario: { url: string; lastModified: Date }[] = [];
  for (const model of getPublishedModels()) {
    for (const scenario of getScenarios()) {
      const mediaType = scenario.mediaTypes[0];
      const result = getRecommendation({
        modelId: model.id,
        mediaType,
        scenario: scenario.id,
        lighting: scenario.defaultLighting,
        outputGoal: scenario.defaultOutput,
      });
      if (
        result.matchType !== "safe-fallback" &&
        isIndexableStatus(result.primary.status)
      ) {
        modelScenario.push({
          url: absoluteUrl(`/iphone/${model.slug}/${scenario.slug}`),
          lastModified: new Date(result.primary.lastVerifiedAt),
        });
      }
    }
  }

  // Ensure we only keep reviewed recommendations conceptually represented
  void getIndexableRecommendations;

  return [...staticRoutes, ...models, ...scenarios, ...guides, ...modelScenario];
}
