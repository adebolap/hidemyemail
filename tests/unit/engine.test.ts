import { describe, expect, it } from "vitest";
import { getRecommendation } from "@/lib/recommendation-engine";
import {
  assertHighConfidenceEvidence,
  validateRecommendationForModel,
} from "@/lib/capability-validator";
import { modelsById } from "@/../content/models";
import { recommendations } from "@/../content/recommendations";
import { sources } from "@/../content/sources";
import { validateContent } from "@/lib/validate-content";
import { buildMetadata, absoluteUrl } from "@/lib/seo";
import {
  CURRENT_TARGET_IOS,
  getFreshnessState,
} from "@/lib/freshness";
import {
  getComparisonsForRecommendation,
  getLeadMagnet,
  getPublishedComparisons,
  getPublishedProducts,
} from "@/lib/content";

describe("recommendation engine", () => {
  it("returns an exact match for 16 Pro night photography", () => {
    const result = getRecommendation({
      modelId: "iphone-16-pro",
      mediaType: "photo",
      scenario: "night",
      lighting: "night",
      outputGoal: "maximum-quality",
    });
    expect(result.primary.id).toBe("16pro-night-photo");
    expect(result.matchType).toBe("exact");
    expect(result.confidence).toBe("high");
  });

  it("falls back safely for sparse combinations", () => {
    const result = getRecommendation({
      modelId: "iphone-13-mini",
      mediaType: "video",
      scenario: "weddings",
      lighting: "backlight",
      outputGoal: "tiktok",
    });
    expect(result.primary).toBeTruthy();
    expect(["scenario-default", "family", "safe-fallback", "exact"]).toContain(
      result.matchType,
    );
  });

  it("rejects unsupported required features for a model", () => {
    const model = modelsById["iphone-16"];
    const proResRec = recommendations.find((r) => r.id === "youtube-video-pro");
    expect(proResRec).toBeTruthy();
    const validation = validateRecommendationForModel(proResRec!, model);
    expect(validation.ok).toBe(false);
    expect(validation.unsupported).toContain("proRes");
  });
});

describe("confidence validation", () => {
  it("requires tier 1 or 2 evidence for high confidence", () => {
    const tiers = Object.fromEntries(sources.map((s) => [s.id, s.tier]));
    const bad = {
      ...recommendations[0],
      confidence: "high" as const,
      rationale: [
        {
          claim: "unsupported high claim",
          sourceIds: ["dxomark-iphone-camera"],
        },
      ],
    };
    expect(assertHighConfidenceEvidence(bad, tiers)).toMatch(/Tier 1 or 2/);
  });
});

describe("content validation", () => {
  it("passes seed content checks", () => {
    const issues = validateContent().filter((i) => i.level === "error");
    expect(issues).toEqual([]);
  });

  it("includes owned comparisons and a lead magnet", () => {
    expect(getPublishedComparisons().length).toBeGreaterThanOrEqual(3);
    expect(getLeadMagnet()?.leadMagnet).toBe(true);
    expect(getPublishedProducts().some((p) => !p.leadMagnet)).toBe(true);
  });

  it("links night recommendation to a comparison", () => {
    const linked = getComparisonsForRecommendation("16pro-night-photo", "night", "iphone-16-pro");
    expect(linked.length).toBeGreaterThan(0);
  });
});

describe("freshness", () => {
  it("marks recent verifications as fresh on current iOS", () => {
    expect(
      getFreshnessState({
        lastVerifiedAt: "2026-07-10",
        testedIOS: CURRENT_TARGET_IOS,
        now: new Date("2026-07-24"),
      }),
    ).toBe("fresh");
  });

  it("flags major iOS train drift as needs-update", () => {
    expect(
      getFreshnessState({
        lastVerifiedAt: "2026-07-10",
        testedIOS: "17.5",
        targetIOS: "18.5",
      }),
    ).toBe("needs-update");
  });
});

describe("seo helpers", () => {
  it("builds canonical metadata", () => {
    const meta = buildMetadata({
      title: "Test",
      description: "Desc",
      path: "/methodology",
    });
    expect(meta.alternates.canonical).toBe(absoluteUrl("/methodology"));
    expect(meta.robots.index).toBe(true);
  });

  it("can noindex thin pages", () => {
    const meta = buildMetadata({
      title: "Thin",
      description: "Desc",
      path: "/iphone/iphone-16-pro/night-photography",
      index: false,
    });
    expect(meta.robots.index).toBe(false);
  });
});
