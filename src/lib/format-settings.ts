import type { Recommendation } from "@/lib/schemas";

export function formatSettingsCopy(
  modelName: string,
  recommendation: Recommendation,
): string {
  const lines = [
    `Best iPhone Camera Settings — ${modelName}`,
    recommendation.summary,
    "",
    ...Object.entries(recommendation.settings)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`),
    "",
    "Instructions:",
    ...recommendation.instructions.map((step, i) => `${i + 1}. ${step}`),
    "",
    `Confidence: ${recommendation.confidence}`,
    `Verified: ${recommendation.lastVerifiedAt}`,
  ];
  return lines.join("\n");
}
