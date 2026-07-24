import type { Confidence } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const labels: Record<Confidence, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  experimental: "Experimental",
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold",
        confidence === "high" && "bg-success-soft text-success",
        confidence === "medium" && "bg-warning-soft text-warning",
        confidence === "experimental" && "bg-danger-soft text-danger",
      )}
    >
      <span
        className={cn(
          "mr-2 inline-block h-2.5 w-2.5 rounded-full",
          confidence === "high" && "bg-success",
          confidence === "medium" && "bg-warning",
          confidence === "experimental" && "bg-danger",
        )}
        aria-hidden
      />
      {labels[confidence]}
    </span>
  );
}
