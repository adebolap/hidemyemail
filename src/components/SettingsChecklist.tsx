import type { Recommendation } from "@/lib/schemas";

const labels: Record<string, string> = {
  mode: "Camera mode",
  lens: "Lens / zoom",
  format: "Format",
  resolution: "Resolution",
  frameRate: "Frame rate",
  hdr: "HDR",
  nightMode: "Night mode",
  flash: "Flash",
  exposure: "Exposure",
  focus: "Focus",
  stabilization: "Stabilization",
  photographicStyle: "Photographic Style",
};

export function SettingsChecklist({
  settings,
}: {
  settings: Recommendation["settings"];
}) {
  const entries = Object.entries(settings).filter(([, value]) => Boolean(value));

  return (
    <section className="surface p-6" aria-labelledby="checklist-heading">
      <h2 id="checklist-heading" className="text-xl font-semibold">
        Recommended setup
      </h2>
      <dl className="mt-4 divide-y divide-line">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4"
          >
            <dt className="text-sm font-medium text-ink-subtle">
              {labels[key] ?? key}
            </dt>
            <dd className="font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
