export type AnalyticsEvent =
  | "finder_started"
  | "model_selected"
  | "scenario_selected"
  | "finder_completed"
  | "settings_copied"
  | "guide_shared"
  | "source_opened"
  | "affiliate_card_viewed"
  | "affiliate_clicked"
  | "email_signup_started"
  | "email_signup_completed"
  | "premium_cta_clicked";

type EventPayload = Record<string, string | number | boolean | undefined>;

function sanitize(payload: EventPayload = {}): EventPayload {
  const clean: EventPayload = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    if (key.toLowerCase().includes("email")) continue;
    if (typeof value === "string" && value.includes("@")) continue;
    clean[key] = value;
  }
  return clean;
}

export function track(event: AnalyticsEvent, payload?: EventPayload): void {
  if (typeof window === "undefined") return;
  const data = { event, ...sanitize(payload), ts: Date.now() };

  // Vendor-neutral: push to dataLayer if present, else console in development.
  const w = window as Window & { dataLayer?: unknown[]; __bicsAnalytics?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(data);
  } else if (process.env.NODE_ENV === "development") {
    w.__bicsAnalytics = w.__bicsAnalytics ?? [];
    w.__bicsAnalytics.push(data);
    console.debug("[analytics]", data);
  } else {
    w.__bicsAnalytics = w.__bicsAnalytics ?? [];
    w.__bicsAnalytics.push(data);
  }
}
