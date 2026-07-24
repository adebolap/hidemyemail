import type { IPhoneModel, Recommendation } from "@/lib/schemas";

const FEATURE_KEYWORDS: Record<string, string[]> = {
  proRAW: ["proraw", "pro raw"],
  proRes: ["prores", "pro res"],
  appleLog: ["apple log", "log"],
  actionMode: ["action mode"],
  cinematicMode: ["cinematic"],
  nightMode: ["night mode"],
  macro: ["macro"],
  photographicStyles: ["photographic style"],
  spatialVideo: ["spatial video"],
};

function featureEnabled(model: IPhoneModel, feature: string): boolean {
  const value = model.features[feature];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return false;
}

export function modelSupportsFeature(
  model: IPhoneModel,
  feature: string,
): boolean {
  return featureEnabled(model, feature);
}

export function validateRecommendationForModel(
  recommendation: Recommendation,
  model: IPhoneModel,
): { ok: boolean; unsupported: string[] } {
  const unsupported: string[] = [];

  for (const feature of recommendation.requiredFeatures ?? []) {
    if (!modelSupportsFeature(model, feature)) {
      unsupported.push(feature);
    }
  }

  const haystack = [
    recommendation.summary,
    ...recommendation.instructions,
    ...Object.values(recommendation.settings).filter(Boolean),
  ]
    .join(" ")
    .toLowerCase();

  for (const [feature, keywords] of Object.entries(FEATURE_KEYWORDS)) {
    const mentions = keywords.some((k) => haystack.includes(k));
    if (mentions && !modelSupportsFeature(model, feature)) {
      // Allow mentioning absence ("not available") without failing
      const negates = haystack.includes(`not available`) || haystack.includes("do not expect");
      if (!negates && (recommendation.requiredFeatures ?? []).includes(feature)) {
        if (!unsupported.includes(feature)) unsupported.push(feature);
      }
    }
  }

  return { ok: unsupported.length === 0, unsupported };
}

export function assertHighConfidenceEvidence(
  recommendation: Recommendation,
  sourceTiers: Record<string, number>,
): string | null {
  if (recommendation.confidence !== "high") return null;
  const tiers = recommendation.rationale
    .flatMap((r) => r.sourceIds)
    .map((id) => sourceTiers[id])
    .filter((t) => typeof t === "number");
  const hasTier12 = tiers.some((t) => t === 1 || t === 2);
  if (!hasTier12) {
    return `Recommendation ${recommendation.id} has high confidence without Tier 1 or 2 evidence`;
  }
  return null;
}
