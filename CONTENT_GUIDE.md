# Content authoring guide

All camera advice lives in `/content`. Page components must import through `/src/lib/content.ts` and the recommendation engine — never hardcode model-specific settings in UI files.

## Editorial status

| Status | Meaning | Indexed? |
| --- | --- | --- |
| `draft` | Incomplete research | No |
| `reviewed` | Checked, may still need polish | Yes |
| `published` | Ready for production | Yes |
| `needs-update` | Stale after iOS/source changes | Usually noindex until refreshed |

Every indexable record needs `lastVerifiedAt`.

## Add a model

1. Append a record to `content/models/index.ts`.
2. Set `family` so shared recommendations can match siblings.
3. List cameras and `features` booleans/strings accurately from Apple specs.
4. Attach Tier 1 `sourceIds`.
5. Run `npm run validate`.

## Add a scenario

1. Add to `content/scenarios/index.ts` with `id`, `slug`, defaults, and related guides.
2. Link new scenario hubs will generate at `/settings/[slug]` and `/iphone/[model]/[slug]`.

## Add a source

1. Add to `content/sources/index.ts`.
2. Use tiers correctly:
   - `1` Apple
   - `2` Controlled original test
   - `3` Credible independent test
   - `4` Community (discovery only)
3. Fill `supportedClaims` with stable claim keys used by recommendations.

## Add a recommendation

1. Add to `content/recommendations/index.ts`.
2. Include `modelIds` and optional `familyIds`.
3. Set `requiredFeatures` for anything that must exist on the device (e.g. `proRes`, `actionMode`, `appleLog`).
4. Keep `confidence: "high"` only with Tier 1 or Tier 2 rationale sources.
5. Provide instructions, mistakes, alternatives, accessory/app tags, evidence strings, and verification date.
6. Mark unfinished work `draft`.

Matching order:

1. Exact model/media/scenario/lighting/output
2. Family override
3. Scenario default filtered through capabilities
4. Safe fallback with reduced confidence

## Add a guide

1. Add to `content/guides/index.ts`.
2. Keep sections factual; cite `sourceIds`.
3. Link at least two related guides where practical.
4. Visible FAQs may emit `FAQPage` JSON-LD — do not invent FAQs only for schema.

## Validation rules that fail the check

- Unknown model/scenario/source references
- Unsupported required capabilities on listed models
- High confidence without Tier 1/2 evidence
- Missing verification dates on indexable records
- Fewer than 12 published/reviewed recommendations

```bash
npm run validate
npm test
```

## Changelog discipline

When iOS changes camera behavior, mark affected records `needs-update`, refresh sources, re-verify, then return to `reviewed`/`published`.
