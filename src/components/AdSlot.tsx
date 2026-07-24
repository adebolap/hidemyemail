export function AdSlot({
  slot,
  label = "Advertisement",
}: {
  slot: string;
  label?: string;
}) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  return (
    <aside
      className="flex min-h-[100px] items-center justify-center rounded-[var(--radius)] border border-dashed border-line bg-bg-muted/60 px-4 py-6"
      aria-label={label}
      data-ad-slot={slot}
    >
      {enabled ? (
        <p className="text-sm text-ink-subtle">
          Ad slot: {slot} (configure ads client to render)
        </p>
      ) : (
        <p className="text-sm text-ink-subtle">
          Reserved ad space · {slot} (disabled until configured)
        </p>
      )}
    </aside>
  );
}
