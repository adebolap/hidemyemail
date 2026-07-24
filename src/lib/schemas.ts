import { z } from "zod";

export const editorialStatusSchema = z.enum([
  "draft",
  "reviewed",
  "published",
  "needs-update",
]);

export const confidenceSchema = z.enum(["high", "medium", "experimental"]);

export const mediaTypeSchema = z.enum(["photo", "video"]);

export const cameraCapabilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["ultra-wide", "wide", "telephoto", "front"]),
  focalLengthMm: z.number().optional(),
  aperture: z.string().optional(),
  megapixels: z.number().optional(),
});

export const iPhoneModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  family: z.string(),
  releaseYear: z.number(),
  supportedIOS: z.array(z.string()),
  cameras: z.array(cameraCapabilitySchema),
  features: z.record(
    z.string(),
    z.union([z.boolean(), z.string(), z.array(z.string())]),
  ),
  sourceIds: z.array(z.string()),
  status: editorialStatusSchema,
  lastVerifiedAt: z.string(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
  createdAt: z.string().optional(),
  changelog: z.array(z.string()).optional(),
});

export const recommendationAlternativeSchema = z.object({
  label: z.string(),
  reason: z.string(),
  settingsSummary: z.string(),
  tradeoff: z.string(),
});

export const recommendationSettingsSchema = z.object({
  mode: z.string(),
  lens: z.string(),
  format: z.string(),
  resolution: z.string().optional(),
  frameRate: z.string().optional(),
  hdr: z.string().optional(),
  nightMode: z.string().optional(),
  flash: z.string().optional(),
  exposure: z.string().optional(),
  focus: z.string().optional(),
  stabilization: z.string().optional(),
  photographicStyle: z.string().optional(),
});

export const recommendationSchema = z.object({
  id: z.string(),
  modelIds: z.array(z.string()),
  familyIds: z.array(z.string()).optional(),
  minimumIOS: z.string().optional(),
  maximumIOS: z.string().optional(),
  mediaType: mediaTypeSchema,
  scenario: z.string(),
  lighting: z.array(z.string()),
  outputGoals: z.array(z.string()),
  summary: z.string(),
  settings: recommendationSettingsSchema,
  instructions: z.array(z.string()),
  rationale: z.array(
    z.object({
      claim: z.string(),
      sourceIds: z.array(z.string()),
    }),
  ),
  alternatives: z.array(recommendationAlternativeSchema),
  mistakes: z.array(z.string()),
  warnings: z.array(z.string()).default([]),
  requiredFeatures: z.array(z.string()).default([]),
  accessoryTags: z.array(z.string()),
  appTags: z.array(z.string()),
  confidence: confidenceSchema,
  evidence: z.array(z.string()),
  status: editorialStatusSchema,
  lastVerifiedAt: z.string(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
  createdAt: z.string().optional(),
  changelog: z.array(z.string()).optional(),
});

export const sourceSchema = z.object({
  id: z.string(),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  publisher: z.string(),
  title: z.string(),
  url: z.string().url().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string(),
  testedModels: z.array(z.string()).optional(),
  testedIOS: z.array(z.string()).optional(),
  supportedClaims: z.array(z.string()),
});

export const scenarioSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  mediaTypes: z.array(mediaTypeSchema),
  defaultLighting: z.string(),
  defaultOutput: z.string(),
  relatedGuideSlugs: z.array(z.string()).default([]),
});

export const lightingOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const outputGoalSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const guideSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: editorialStatusSchema,
  lastVerifiedAt: z.string(),
  readingMinutes: z.number(),
  relatedScenarios: z.array(z.string()).default([]),
  relatedGuides: z.array(z.string()).default([]),
  sourceIds: z.array(z.string()).default([]),
  sections: z.array(
    z.object({
      heading: z.string(),
      body: z.string(),
    }),
  ),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .default([]),
  author: z.string().optional(),
  reviewer: z.string().optional(),
});

export const accessorySchema = z.object({
  id: z.string(),
  tag: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  affiliateUrl: z.string().optional(),
  fallbackUrl: z.string().optional(),
  priceHint: z.string().optional(),
  regions: z.array(z.string()).default(["US", "GLOBAL"]),
});

export const appRecommendationSchema = z.object({
  id: z.string(),
  tag: z.string(),
  name: z.string(),
  description: z.string(),
  platform: z.string().optional(),
  affiliateUrl: z.string().optional(),
  fallbackUrl: z.string().optional(),
});

export const finderInputSchema = z.object({
  modelId: z.string(),
  iosVersion: z.string().optional(),
  mediaType: mediaTypeSchema,
  scenario: z.string(),
  lighting: z.string(),
  outputGoal: z.string(),
});

export const comparisonSideSchema = z.object({
  label: z.string(),
  settingsSummary: z.string(),
  observations: z.array(z.string()),
});

export const comparisonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  modelIds: z.array(z.string()),
  scenarioIds: z.array(z.string()),
  mediaType: mediaTypeSchema,
  testedIOS: z.string(),
  lighting: z.string(),
  defaultSide: comparisonSideSchema,
  optimizedSide: comparisonSideSchema,
  winner: z.enum(["default", "optimized", "tie"]),
  winnerSummary: z.string(),
  metrics: z.array(
    z.object({
      label: z.string(),
      defaultValue: z.string(),
      optimizedValue: z.string(),
      note: z.string().optional(),
    }),
  ),
  sourceIds: z.array(z.string()),
  recommendationIds: z.array(z.string()).default([]),
  productTags: z.array(z.string()).default([]),
  status: editorialStatusSchema,
  lastVerifiedAt: z.string(),
  author: z.string().optional(),
  reviewer: z.string().optional(),
});

export const digitalProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  headline: z.string(),
  description: z.string(),
  price: z.string(),
  priceCents: z.number().int().nonnegative(),
  currency: z.string().default("USD"),
  type: z.enum(["cheat-sheet", "preset-pack", "guide", "lead-magnet"]),
  includes: z.array(z.string()),
  scenarioIds: z.array(z.string()).default([]),
  modelFamilyIds: z.array(z.string()).default([]),
  checkoutUrl: z.string().optional(),
  leadMagnet: z.boolean().default(false),
  status: editorialStatusSchema,
  lastVerifiedAt: z.string(),
});

export type EditorialStatus = z.infer<typeof editorialStatusSchema>;
export type Confidence = z.infer<typeof confidenceSchema>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export type CameraCapability = z.infer<typeof cameraCapabilitySchema>;
export type IPhoneModel = z.infer<typeof iPhoneModelSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type RecommendationAlternative = z.infer<
  typeof recommendationAlternativeSchema
>;
export type Source = z.infer<typeof sourceSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type LightingOption = z.infer<typeof lightingOptionSchema>;
export type OutputGoal = z.infer<typeof outputGoalSchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Accessory = z.infer<typeof accessorySchema>;
export type AppRecommendation = z.infer<typeof appRecommendationSchema>;
export type FinderInput = z.infer<typeof finderInputSchema>;
export type Comparison = z.infer<typeof comparisonSchema>;
export type DigitalProduct = z.infer<typeof digitalProductSchema>;
