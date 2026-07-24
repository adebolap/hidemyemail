export function SetupInstructions({ steps }: { steps: string[] }) {
  return (
    <section className="surface p-6" aria-labelledby="instructions-heading">
      <h2 id="instructions-heading" className="text-xl font-semibold">
        Exact setup instructions
      </h2>
      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
              {index + 1}
            </span>
            <p className="pt-1 leading-relaxed text-ink-muted">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
