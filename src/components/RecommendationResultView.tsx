import { AccessoryCard } from "@/components/AccessoryCard";
import { AlternativeRecommendation } from "@/components/AlternativeRecommendation";
import { ComparisonCard } from "@/components/ComparisonCard";
import { DesktopActions } from "@/components/DesktopActions";
import { DigitalProductCard } from "@/components/DigitalProductCard";
import { EvidenceDrawer } from "@/components/EvidenceDrawer";
import { CapabilityWarning, TradeoffNotice } from "@/components/Notices";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PremiumCta } from "@/components/PremiumCta";
import { RecommendationSummary } from "@/components/RecommendationSummary";
import { RecommendedApps } from "@/components/RecommendedApps";
import { RelatedGuides } from "@/components/RelatedGuides";
import { SettingsChecklist } from "@/components/SettingsChecklist";
import { SetupInstructions } from "@/components/SetupInstructions";
import { StickyMobileActions } from "@/components/StickyMobileActions";
import { AdSlot } from "@/components/AdSlot";
import { formatSettingsCopy } from "@/lib/format-settings";
import { absoluteUrl } from "@/lib/seo";
import type { EngineResult } from "@/lib/recommendation-engine";
import type {
  Accessory,
  AppRecommendation,
  Comparison,
  DigitalProduct,
  Guide,
  Source,
} from "@/lib/schemas";

export function RecommendationResultView({
  modelName,
  result,
  sources,
  accessories,
  apps,
  relatedGuides,
  sharePath,
  comparisons = [],
  products = [],
  leadMagnet,
  testedIOS,
}: {
  modelName: string;
  result: EngineResult;
  sources: Source[];
  accessories: Accessory[];
  apps: AppRecommendation[];
  relatedGuides: Guide[];
  sharePath: string;
  comparisons?: Comparison[];
  products?: Array<DigitalProduct & { resolvedCheckoutUrl?: string }>;
  leadMagnet?: DigitalProduct;
  testedIOS?: string;
}) {
  const copyText = formatSettingsCopy(modelName, result.primary);
  const shareUrl = absoluteUrl(sharePath);
  const shareTitle = `Best camera settings for ${modelName}`;

  return (
    <div className="pb-28 md:pb-0">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <RecommendationSummary
            recommendation={result.primary}
            modelName={modelName}
            matchType={result.matchType}
            testedIOS={testedIOS}
          />
          <DesktopActions
            copyText={copyText}
            shareTitle={shareTitle}
            shareUrl={shareUrl}
          />
          <SettingsChecklist settings={result.primary.settings} />
          <SetupInstructions steps={result.primary.instructions} />
          <CapabilityWarning
            warnings={result.warnings}
            compatibilityNotes={result.compatibilityNotes}
          />
          <TradeoffNotice mistakes={result.primary.mistakes} />
          <AlternativeRecommendation alternative={result.alternative} />
          <EvidenceDrawer evidence={result.evidence} sources={sources} />
          {comparisons.length ? (
            <section aria-labelledby="comparisons-heading" className="space-y-4">
              <div>
                <h2 id="comparisons-heading" className="text-xl font-semibold">
                  Proof from our controlled tests
                </h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Owned before/after comparisons — not recycled tips.
                </p>
              </div>
              {comparisons.slice(0, 2).map((comparison) => (
                <ComparisonCard
                  key={comparison.id}
                  comparison={comparison}
                  compact
                />
              ))}
            </section>
          ) : null}
          <RelatedGuides guides={relatedGuides} />
        </div>
        <aside className="space-y-6">
          <AdSlot slot="result-sidebar" />
          {leadMagnet ? (
            <NewsletterForm
              title={leadMagnet.headline}
              description={leadMagnet.description}
              offerId={leadMagnet.id}
              compact
            />
          ) : (
            <NewsletterForm />
          )}
          {products.length ? (
            <section aria-labelledby="products-heading" className="space-y-4">
              <h2 id="products-heading" className="text-xl font-semibold">
                Dig deeper
              </h2>
              {products.slice(0, 2).map((product) => (
                <DigitalProductCard
                  key={product.id}
                  product={product}
                  checkoutUrl={product.resolvedCheckoutUrl}
                  variant="compact"
                />
              ))}
            </section>
          ) : null}
          {accessories.length ? (
            <section aria-labelledby="accessories-heading">
              <h2 id="accessories-heading" className="mb-3 text-xl font-semibold">
                Helpful accessories
              </h2>
              <div className="space-y-4">
                {accessories.slice(0, 3).map((item) => (
                  <AccessoryCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ) : null}
          <RecommendedApps apps={apps.slice(0, 3)} />
          <PremiumCta />
          <p className="text-xs text-ink-subtle">
            <a href="/affiliate-disclosure" className="text-accent">
              Affiliate disclosure
            </a>{" "}
            · Product links are optional and never required to use the settings.
          </p>
        </aside>
      </div>
      <StickyMobileActions
        copyText={copyText}
        shareTitle={shareTitle}
        shareUrl={shareUrl}
      />
    </div>
  );
}
