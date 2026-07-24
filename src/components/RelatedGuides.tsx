import Link from "next/link";
import type { Guide } from "@/lib/schemas";

export function RelatedGuides({ guides }: { guides: Guide[] }) {
  if (!guides.length) return null;
  return (
    <section aria-labelledby="related-guides-heading">
      <h2 id="related-guides-heading" className="text-xl font-semibold">
        Related guides
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="surface block p-4 no-underline transition hover:border-accent"
            >
              <p className="eyebrow">{guide.category}</p>
              <h3 className="mt-1 font-semibold">{guide.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
