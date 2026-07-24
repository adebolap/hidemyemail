import { modelsById } from "@/../content/models";
import { recommendations } from "@/../content/recommendations";
import { sourcesById } from "@/../content/sources";
import {
  assertHighConfidenceEvidence,
  validateRecommendationForModel,
} from "@/lib/capability-validator";
import type {
  FinderInput,
  Recommendation,
  RecommendationAlternative,
} from "@/lib/schemas";

export type EngineResult = {
  primary: Recommendation;
  matchType: "exact" | "family" | "scenario-default" | "safe-fallback";
  alternative?: RecommendationAlternative;
  warnings: string[];
  compatibilityNotes: string[];
  confidence: Recommendation["confidence"];
  evidence: string[];
  unsupportedRejected: string[];
};

function scoreMatch(rec: Recommendation, input: FinderInput): number {
  let score = 0;
  if (rec.mediaType !== input.mediaType) return -1;
  if (rec.scenario !== input.scenario) return -1;

  const model = modelsById[input.modelId];
  if (!model) return -1;

  const exactModel = rec.modelIds.includes(input.modelId);
  const familyMatch = rec.familyIds?.includes(model.family) ?? false;
  if (!exactModel && !familyMatch) return -1;

  if (exactModel) score += 50;
  else if (familyMatch) score += 35;

  if (rec.lighting.includes(input.lighting)) score += 20;
  if (rec.outputGoals.includes(input.outputGoal)) score += 20;

  if (input.iosVersion && rec.minimumIOS) {
    if (compareIos(input.iosVersion, rec.minimumIOS) < 0) return -1;
  }
  if (input.iosVersion && rec.maximumIOS) {
    if (compareIos(input.iosVersion, rec.maximumIOS) > 0) return -1;
  }

  if (rec.status === "draft") score -= 100;
  if (rec.confidence === "high") score += 5;
  if (rec.confidence === "medium") score += 2;

  return score;
}

function compareIos(a: string, b: string): number {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const da = pa[i] ?? 0;
    const db = pb[i] ?? 0;
    if (da !== db) return da - db;
  }
  return 0;
}

function safeFallback(input: FinderInput): Recommendation {
  const model = modelsById[input.modelId];
  const isPro = model?.features.proRAW === true;
  return {
    id: `fallback-${input.modelId}-${input.mediaType}-${input.scenario}`,
    modelIds: [input.modelId],
    mediaType: input.mediaType,
    scenario: input.scenario,
    lighting: [input.lighting],
    outputGoals: [input.outputGoal],
    summary:
      input.mediaType === "photo"
        ? "Use Photo mode at 1x with HEIF High Efficiency. Tap to focus, keep flash off unless needed, and prefer available light."
        : "Use Video mode at 1x with HEVC. Prefer 4K30 or 1080p30 depending on storage, and lock exposure when lighting is stable.",
    settings: {
      mode: input.mediaType === "photo" ? "Photo" : "Video",
      lens: "1x",
      format: input.mediaType === "photo" ? "HEIF High Efficiency" : "HEVC High Efficiency",
      resolution: input.mediaType === "video" ? "4K or 1080p" : isPro ? "12MP or 24MP" : "Default",
      frameRate: input.mediaType === "video" ? "30 fps" : undefined,
      flash: "Off",
      photographicStyle: "Standard",
    },
    instructions: [
      "Open the native Camera app.",
      input.mediaType === "photo"
        ? "Select Photo mode and set zoom to 1x."
        : "Select Video mode and confirm resolution in Settings → Camera.",
      "Tap your subject to set focus and exposure.",
      "Avoid recommending features your model does not list in Camera settings.",
    ],
    rationale: [
      {
        claim: "Native Camera baselines follow Apple’s Camera user guidance.",
        sourceIds: ["apple-camera-user-guide"],
      },
    ],
    alternatives: [
      {
        label: "Save storage",
        reason: "Smaller files for quick sharing.",
        settingsSummary: "HEIF/HEVC · lower resolution · Live Photos off",
        tradeoff: "Less edit and crop flexibility.",
      },
    ],
    mistakes: [
      "Using digital zoom instead of moving closer.",
      "Leaving the lens dirty.",
    ],
    warnings: [
      "This is a safe fallback because no exact reviewed recommendation matched every selector.",
    ],
    requiredFeatures: [],
    accessoryTags: ["MagSafe grip"],
    appTags: ["edit-photo"],
    confidence: "experimental",
    evidence: ["Safe fallback · capability-aware defaults"],
    status: "reviewed",
    lastVerifiedAt: "2026-07-15",
  };
}

export function getRecommendation(input: FinderInput): EngineResult {
  const model = modelsById[input.modelId];
  if (!model) {
    throw new Error(`Unknown model: ${input.modelId}`);
  }

  const sourceTiers = Object.fromEntries(
    Object.values(sourcesById).map((s) => [s.id, s.tier]),
  );

  const candidates = recommendations
    .map((rec) => ({ rec, score: scoreMatch(rec, input) }))
    .filter((c) => c.score >= 0)
    .sort((a, b) => b.score - a.score);

  const warnings: string[] = [];
  const compatibilityNotes: string[] = [];
  const unsupportedRejected: string[] = [];

  for (const candidate of candidates) {
    const validation = validateRecommendationForModel(candidate.rec, model);
    if (!validation.ok) {
      unsupportedRejected.push(
        `${candidate.rec.id}:${validation.unsupported.join(",")}`,
      );
      continue;
    }

    const confidenceError = assertHighConfidenceEvidence(
      candidate.rec,
      sourceTiers,
    );
    if (confidenceError) {
      warnings.push(confidenceError);
    }

    let matchType: EngineResult["matchType"] = "scenario-default";
    if (
      candidate.rec.modelIds.includes(input.modelId) &&
      candidate.rec.lighting.includes(input.lighting) &&
      candidate.rec.outputGoals.includes(input.outputGoal)
    ) {
      matchType = "exact";
    } else if (candidate.rec.familyIds?.includes(model.family)) {
      matchType = "family";
    }

    if (!candidate.rec.lighting.includes(input.lighting)) {
      compatibilityNotes.push(
        `Lighting guidance adapted from related conditions (${candidate.rec.lighting.join(", ")}).`,
      );
    }
    if (!candidate.rec.outputGoals.includes(input.outputGoal)) {
      compatibilityNotes.push(
        `Output goal adapted from related goals (${candidate.rec.outputGoals.join(", ")}).`,
      );
    }

    warnings.push(...(candidate.rec.warnings ?? []));

    return {
      primary: candidate.rec,
      matchType,
      alternative: candidate.rec.alternatives[0],
      warnings,
      compatibilityNotes,
      confidence: candidate.rec.confidence,
      evidence: candidate.rec.evidence,
      unsupportedRejected,
    };
  }

  const fallback = safeFallback(input);
  return {
    primary: fallback,
    matchType: "safe-fallback",
    alternative: fallback.alternatives[0],
    warnings: fallback.warnings ?? [],
    compatibilityNotes: [
      "No exact recommendation matched; showing capability-safe defaults.",
    ],
    confidence: "experimental",
    evidence: fallback.evidence,
    unsupportedRejected,
  };
}

export function buildSharePath(input: FinderInput): string {
  const model = modelsById[input.modelId];
  const scenarioSlug =
    input.scenario === "night"
      ? "night-photography"
      : input.scenario === "travel"
        ? "travel-landscape"
        : input.scenario === "sports"
          ? "sports-action"
          : input.scenario === "kids-pets"
            ? "kids-pets"
            : input.scenario;

  const base = `/iphone/${model?.slug ?? input.modelId}/${scenarioSlug}`;
  const params = new URLSearchParams({
    lighting: input.lighting,
    output: input.outputGoal,
    media: input.mediaType,
  });
  return `${base}?${params.toString()}`;
}
