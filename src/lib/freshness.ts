/** Site-wide content freshness helpers for iOS-sensitive advice. */

export const CURRENT_TARGET_IOS = "18.5";

/** Mark records older than this many days as stale for review prompts. */
export const FRESHNESS_WINDOW_DAYS = 180;

export type FreshnessState = "fresh" | "aging" | "stale" | "needs-update";

export function daysSince(isoDate: string, now = new Date()): number {
  const then = new Date(isoDate);
  const ms = now.getTime() - then.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function getFreshnessState(options: {
  lastVerifiedAt: string;
  status?: string;
  testedIOS?: string;
  targetIOS?: string;
  now?: Date;
}): FreshnessState {
  if (options.status === "needs-update") return "needs-update";
  const age = daysSince(options.lastVerifiedAt, options.now ?? new Date());
  const target = options.targetIOS ?? CURRENT_TARGET_IOS;
  if (options.testedIOS && options.testedIOS !== target) {
    // Still usable, but prompt review when major train differs
    const testedMajor = options.testedIOS.split(".")[0];
    const targetMajor = target.split(".")[0];
    if (testedMajor !== targetMajor) return "needs-update";
  }
  if (age > FRESHNESS_WINDOW_DAYS) return "stale";
  if (age > Math.floor(FRESHNESS_WINDOW_DAYS / 2)) return "aging";
  return "fresh";
}

export function freshnessLabel(state: FreshnessState): string {
  switch (state) {
    case "fresh":
      return "Up to date";
    case "aging":
      return "Due for re-check";
    case "stale":
      return "Verification aging";
    case "needs-update":
      return "Needs update after iOS changes";
  }
}
