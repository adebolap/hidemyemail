"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

export function CopySettingsButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("settings_copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="btn btn-primary" onClick={onCopy}>
      {copied ? "Copied" : "Copy settings"}
    </button>
  );
}

export function ShareGuideButton({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [shared, setShared] = useState(false);

  async function onShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      track("guide_shared");
      setTimeout(() => setShared(false), 2000);
    } catch {
      // user cancelled
    }
  }

  return (
    <button type="button" className="btn btn-secondary" onClick={onShare}>
      {shared ? "Shared" : "Share guide"}
    </button>
  );
}

export function SavePlaceholderButton() {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      disabled
      title="Accounts and saved setups are planned for a later release"
    >
      Save (coming soon)
    </button>
  );
}
