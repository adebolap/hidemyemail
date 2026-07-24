export function TradeoffNotice({ mistakes }: { mistakes: string[] }) {
  if (!mistakes.length) return null;
  return (
    <section className="surface p-6" aria-labelledby="mistakes-heading">
      <h2 id="mistakes-heading" className="text-xl font-semibold">
        Mistakes to avoid
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
        {mistakes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function CapabilityWarning({
  warnings,
  compatibilityNotes,
}: {
  warnings: string[];
  compatibilityNotes: string[];
}) {
  const items = [...warnings, ...compatibilityNotes];
  if (!items.length) return null;
  return (
    <aside
      className="rounded-[var(--radius)] border border-warning/30 bg-warning-soft p-5"
      role="note"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-warning">
        Storage, compatibility & capture notes
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
