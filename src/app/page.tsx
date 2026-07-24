import Link from "next/link";
import { SettingsFinder } from "@/components/SettingsFinder";
import { RelatedGuides } from "@/components/RelatedGuides";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ComparisonCard } from "@/components/ComparisonCard";
import { DigitalProductCard } from "@/components/DigitalProductCard";
import {
  getLeadMagnet,
  getLightingOptions,
  getOutputGoals,
  getPublishedComparisons,
  getPublishedGuides,
  getPublishedModels,
  getPublishedProducts,
  getScenarios,
  resolveCheckoutUrl,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Find the best camera settings for your iPhone",
  description:
    "Pick your iPhone model, scenario, lighting, and output to get exact Camera app settings, setup steps, trade-offs, and evidence.",
  path: "/",
});

export default function HomePage() {
  const models = getPublishedModels();
  const scenarios = getScenarios();
  const lighting = getLightingOptions();
  const outputs = getOutputGoals();
  const guides = getPublishedGuides().slice(0, 4);
  const comparisons = getPublishedComparisons().slice(0, 2);
  const leadMagnet = getLeadMagnet();
  const featuredProduct = getPublishedProducts().find((p) => !p.leadMagnet);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,118,110,0.12),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(28,25,23,0.08),transparent_40%)]" />
        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-20">
          <div className="animate-rise">
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Best iPhone Camera Settings
            </p>
            <h1 className="mt-5 max-w-xl text-2xl font-medium leading-snug text-ink sm:text-3xl">
              Find the best camera settings for your iPhone
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              Model-aware recommendations with exact setup steps, controlled-test
              proof, and cheat sheets — usually in under a minute.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#finder" className="btn btn-primary no-underline">
                Start the finder
              </a>
              <Link href="/comparisons" className="btn btn-secondary no-underline">
                See our tests
              </Link>
            </div>
          </div>
          <div className="animate-rise-delay relative min-h-[240px] overflow-hidden rounded-[var(--radius)] border border-line bg-[linear-gradient(160deg,#134e4a,#0f766e_45%,#99f6e4)] shadow-[var(--shadow)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">
                Owned evidence
              </p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
                Tests before tips
              </p>
              <p className="mt-2 max-w-sm text-sm text-white/85">
                Recommendations link to controlled comparisons and stay marked
                fresh against the current iOS train.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page space-y-12 py-12">
        <div className="animate-rise-delay-2">
          <SettingsFinder
            models={models.map((m) => ({ id: m.id, name: m.name }))}
            scenarios={scenarios.map((s) => ({
              id: s.id,
              name: s.name,
              description: s.description,
              mediaTypes: s.mediaTypes,
            }))}
            lighting={lighting.map((l) => ({
              id: l.id,
              name: l.name,
              description: l.description,
            }))}
            outputs={outputs.map((o) => ({
              id: o.id,
              name: o.name,
              description: o.description,
            }))}
            modelSlugs={Object.fromEntries(models.map((m) => [m.id, m.slug]))}
            scenarioSlugs={Object.fromEntries(
              scenarios.map((s) => [s.id, s.slug]),
            )}
          />
        </div>

        <AdSlot slot="home-mid" />

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Proof</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
                Controlled comparisons
              </h2>
            </div>
            <Link href="/comparisons" className="text-sm text-accent">
              View all
            </Link>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {comparisons.map((comparison) => (
              <ComparisonCard
                key={comparison.id}
                comparison={comparison}
                compact
              />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <p className="eyebrow">Upgrade path</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
              Free sheet, paid packs
            </h2>
            <p className="mt-3 max-w-xl text-ink-muted">
              Keep the finder free. Monetize with a lead magnet and scenario
              cheat sheets after the answer — never before it.
            </p>
            {featuredProduct ? (
              <div className="mt-6">
                <DigitalProductCard
                  product={featuredProduct}
                  checkoutUrl={resolveCheckoutUrl(featuredProduct)}
                />
              </div>
            ) : null}
          </div>
          {leadMagnet ? (
            <NewsletterForm
              title={leadMagnet.headline}
              description={leadMagnet.description}
              offerId={leadMagnet.id}
            />
          ) : (
            <NewsletterForm />
          )}
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Browse by model</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
                iPhone hubs
              </h2>
            </div>
            <Link href="/methodology" className="text-sm text-accent">
              Research policy
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <li key={model.id}>
                <Link
                  href={`/iphone/${model.slug}`}
                  className="surface block p-4 no-underline hover:border-accent"
                >
                  <h3 className="font-semibold">{model.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {model.releaseYear} · Family {model.family}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <RelatedGuides guides={guides} />
      </div>
    </div>
  );
}
