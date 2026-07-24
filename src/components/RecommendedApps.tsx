import type { AppRecommendation } from "@/lib/schemas";

export function RecommendedApps({ apps }: { apps: AppRecommendation[] }) {
  if (!apps.length) return null;
  return (
    <section className="surface p-6" aria-labelledby="apps-heading">
      <h2 id="apps-heading" className="text-xl font-semibold">
        Recommended apps
      </h2>
      <ul className="mt-4 space-y-4">
        {apps.map((app) => {
          const href = app.affiliateUrl ?? app.fallbackUrl;
          return (
            <li key={app.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
              <h3 className="font-semibold">{app.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{app.description}</p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-accent"
                >
                  View on App Store
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
