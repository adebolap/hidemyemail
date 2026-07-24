import {
  freshnessLabel,
  getFreshnessState,
  type FreshnessState,
} from "@/lib/freshness";
import { cn } from "@/lib/utils";

const styles: Record<FreshnessState, string> = {
  fresh: "bg-success-soft text-success",
  aging: "bg-warning-soft text-warning",
  stale: "bg-warning-soft text-warning",
  "needs-update": "bg-danger-soft text-danger",
};

export function FreshnessBadge({
  lastVerifiedAt,
  testedIOS,
  status,
}: {
  lastVerifiedAt: string;
  testedIOS?: string;
  status?: string;
}) {
  const state = getFreshnessState({ lastVerifiedAt, testedIOS, status });
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-full px-2.5 text-xs font-semibold",
        styles[state],
      )}
    >
      {freshnessLabel(state)}
      {testedIOS ? ` · iOS ${testedIOS}` : ""}
    </span>
  );
}
