import { accessories, recommendedApps } from "@/../content/accessories";
import { guides, guidesBySlug } from "@/../content/guides";
import { models, modelsById, modelsBySlug } from "@/../content/models";
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
