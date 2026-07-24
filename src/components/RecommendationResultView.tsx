import { AccessoryCard } from "@/components/AccessoryCard";
import { AlternativeRecommendation } from "@/components/AlternativeRecommendation";
import { DesktopActions } from "@/components/DesktopActions";
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
import type { Accessory, AppRecommendation, Guide, Source } from "@/lib/schemas";

export function RecommendationResultView({
  modelName,
  result,
  sources,
  accessories,
  apps,
  relatedGuides,
  sharePath,
}: {
  modelName: string;
  result: EngineResult;
  sources: Source[];
  accessories: Accessory[];
  apps: AppRecommendation[];
  relatedGuides: Guide[];
  sharePath: string;
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
          <RelatedGuides guides={relatedGuides} />
        </div>
        <aside className="space-y-6">
          <AdSlot slot="result-sidebar" />
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
          <NewsletterForm />
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
