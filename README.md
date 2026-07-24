# Best iPhone Camera Settings

Production-ready MVP for [bestiphonecamerasettings.com](https://bestiphonecamerasettings.com): a mobile-first knowledge engine that recommends iPhone camera setups by model, media type, scenario, lighting, and output goal.

## Stack

- Next.js App Router (static generation preferred)
- TypeScript strict mode
- Tailwind CSS
- Zod schemas + versioned TypeScript content
- Vitest unit tests + Playwright e2e
- ESLint

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run validate` | Fail build-style content validation |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright (expects `npm run build` first, or running server) |

## Environment

See `.env.example` for:

- `NEXT_PUBLIC_SITE_URL` / site name
- Analytics provider hooks (vendor-neutral `dataLayer`)
- Newsletter provider (`mock` by default)
- Affiliate tag + ads flags
- Premium CTA / newsletter feature flags

No secrets belong in the repo. Keep API keys in `.env.local` only.

## Architecture

```text
/content/models
/content/scenarios
/content/recommendations
/content/guides
/content/sources
/content/accessories
/src/lib/recommendation-engine.ts
/src/lib/capability-validator.ts
/src/lib/content.ts
/src/lib/seo.ts
/src/lib/analytics.ts
```

Components never hardcode model-specific settings. The deterministic recommendation engine matches content records and capability-validates them before display.

## Authoring

Read [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) to add models, scenarios, sources, recommendations, and guides.

## Deployment

Any Node host that supports Next.js 15 works (Vercel, Netlify, Cloudflare adapters, etc.):

```bash
npm run validate
npm test
npm run build
```

Set production env vars from `.env.example` before go-live.

## Monetization placeholders

- Accessory cards with affiliate or non-affiliate fallback URLs
- Recommended apps
- Newsletter form + **free cheat-sheet lead magnet** (`/api/newsletter`, mock provider by default)
- Paid digital products at `/products` (cheat sheets / packs; checkout via env)
- Owned comparisons at `/comparisons` (evidence moat for SEO + trust)
- Layout-stable `AdSlot` regions (disabled until `NEXT_PUBLIC_ADS_ENABLED=true`)
- Premium “Analyze My Photo” CTA (no uploads in MVP)
- iOS freshness badges on recommendations and comparisons

Ads and signup prompts never appear before the primary recommendation answer.
