import { models } from "@/../content/models";
import { recommendations } from "@/../content/recommendations";
import { scenarios } from "@/../content/scenarios";
import { guides } from "@/../content/guides";
import { sources } from "@/../content/sources";
import {
  guideSchema,
  iPhoneModelSchema,
  recommendationSchema,
  scenarioSchema,
  sourceSchema,
} from "@/lib/schemas";
import { assertHighConfidenceEvidence } from "@/lib/capability-validator";
import { modelsById } from "@/../content/models";
import { validateRecommendationForModel } from "@/lib/capability-validator";
import { isIndexableStatus } from "@/lib/content";

export type ValidationIssue = {
  level: "error" | "warning";
  message: string;
};

export function validateContent(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sourceIds = new Set(sources.map((s) => s.id));
  const modelIds = new Set(models.map((m) => m.id));
  const scenarioIds = new Set(scenarios.map((s) => s.id));
  const guideSlugs = new Set(guides.map((g) => g.slug));
  const sourceTiers = Object.fromEntries(sources.map((s) => [s.id, s.tier]));
  const seenUrls = new Set<string>();

  for (const source of sources) {
    const parsed = sourceSchema.safeParse(source);
    if (!parsed.success) {
      issues.push({
        level: "error",
        message: `Invalid source ${source.id}: ${parsed.error.message}`,
      });
    }
  }

  for (const model of models) {
    const parsed = iPhoneModelSchema.safeParse(model);
    if (!parsed.success) {
      issues.push({
        level: "error",
        message: `Invalid model ${model.id}: ${parsed.error.message}`,
      });
    }
    for (const sid of model.sourceIds) {
      if (!sourceIds.has(sid)) {
        issues.push({
          level: "error",
          message: `Model ${model.id} references unknown source ${sid}`,
        });
      }
    }
    if (isIndexableStatus(model.status) && !model.lastVerifiedAt) {
      issues.push({
        level: "error",
        message: `Indexable model ${model.id} missing lastVerifiedAt`,
      });
    }
  }

  for (const scenario of scenarios) {
    const parsed = scenarioSchema.safeParse(scenario);
    if (!parsed.success) {
      issues.push({
        level: "error",
        message: `Invalid scenario ${scenario.id}: ${parsed.error.message}`,
      });
    }
    for (const slug of scenario.relatedGuideSlugs) {
      if (!guideSlugs.has(slug)) {
        issues.push({
          level: "error",
          message: `Scenario ${scenario.id} references unknown guide ${slug}`,
        });
      }
    }
  }

  for (const guide of guides) {
    const parsed = guideSchema.safeParse(guide);
    if (!parsed.success) {
      issues.push({
        level: "error",
        message: `Invalid guide ${guide.slug}: ${parsed.error.message}`,
      });
    }
    for (const sid of guide.sourceIds) {
      if (!sourceIds.has(sid)) {
        issues.push({
          level: "error",
          message: `Guide ${guide.slug} references unknown source ${sid}`,
        });
      }
    }
    for (const related of guide.relatedGuides) {
      if (!guideSlugs.has(related)) {
        issues.push({
          level: "error",
          message: `Guide ${guide.slug} references unknown related guide ${related}`,
        });
      }
    }
    if (isIndexableStatus(guide.status) && !guide.lastVerifiedAt) {
      issues.push({
        level: "error",
        message: `Indexable guide ${guide.slug} missing lastVerifiedAt`,
      });
    }
  }

  for (const rec of recommendations) {
    const parsed = recommendationSchema.safeParse(rec);
    if (!parsed.success) {
      issues.push({
        level: "error",
        message: `Invalid recommendation ${rec.id}: ${parsed.error.message}`,
      });
    }

    if (!scenarioIds.has(rec.scenario)) {
      issues.push({
        level: "error",
        message: `Recommendation ${rec.id} references unknown scenario ${rec.scenario}`,
      });
    }

    for (const mid of rec.modelIds) {
      if (!modelIds.has(mid)) {
        issues.push({
          level: "error",
          message: `Recommendation ${rec.id} references unknown model ${mid}`,
        });
      } else {
        const model = modelsById[mid];
        const validation = validateRecommendationForModel(rec, model);
        if (!validation.ok && rec.status !== "draft") {
          issues.push({
            level: "error",
            message: `Recommendation ${rec.id} requires unsupported features on ${mid}: ${validation.unsupported.join(", ")}`,
          });
        }
      }
    }

    for (const rationale of rec.rationale) {
      for (const sid of rationale.sourceIds) {
        if (!sourceIds.has(sid)) {
          issues.push({
            level: "error",
            message: `Recommendation ${rec.id} references unknown source ${sid}`,
          });
        }
      }
    }

    const confidenceError = assertHighConfidenceEvidence(rec, sourceTiers);
    if (confidenceError) {
      issues.push({ level: "error", message: confidenceError });
    }

    if (isIndexableStatus(rec.status) && !rec.lastVerifiedAt) {
      issues.push({
        level: "error",
        message: `Indexable recommendation ${rec.id} missing lastVerifiedAt`,
      });
    }

    for (const mid of rec.modelIds) {
      const url = `/iphone/${mid}/${rec.scenario}`;
      const key = `${url}:${rec.mediaType}:${rec.lighting.join(",")}:${rec.outputGoals.join(",")}`;
      if (seenUrls.has(key) && isIndexableStatus(rec.status)) {
        issues.push({
          level: "warning",
          message: `Potential duplicate canonical coverage for ${key}`,
        });
      }
      seenUrls.add(key);
    }
  }

  const publishedRecs = recommendations.filter((r) =>
    isIndexableStatus(r.status),
  );
  if (publishedRecs.length < 12) {
    issues.push({
      level: "error",
      message: `Expected at least 12 published/reviewed recommendations, found ${publishedRecs.length}`,
    });
  }

  return issues;
}
