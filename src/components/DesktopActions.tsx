import {
  CopySettingsButton,
  SavePlaceholderButton,
  ShareGuideButton,
} from "@/components/ActionButtons";

export function DesktopActions({
  copyText,
  shareTitle,
  shareUrl,
}: {
  copyText: string;
  shareTitle: string;
  shareUrl: string;
}) {
  return (
    <div className="hidden flex-wrap gap-3 md:flex">
      <CopySettingsButton text={copyText} />
      <ShareGuideButton title={shareTitle} url={shareUrl} />
      <SavePlaceholderButton />
    </div>
  );
}
