"use client";

import { CopySettingsButton, SavePlaceholderButton, ShareGuideButton } from "@/components/ActionButtons";

export function StickyMobileActions({
  copyText,
  shareTitle,
  shareUrl,
}: {
  copyText: string;
  shareTitle: string;
  shareUrl: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-[color-mix(in_srgb,var(--bg-elevated)_92%,white)] p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <CopySettingsButton text={copyText} />
        <ShareGuideButton title={shareTitle} url={shareUrl} />
        <SavePlaceholderButton />
      </div>
    </div>
  );
}
