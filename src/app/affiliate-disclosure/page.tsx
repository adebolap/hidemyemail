import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description:
    "How Best iPhone Camera Settings handles affiliate links and commercial relationships.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-page prose-content py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Affiliate disclosure
      </h1>
      <p>
        Some accessory and app links may be affiliate links. If you buy through
        those links, we may earn a commission at no extra cost to you.
      </p>
      <p>
        We only claim a commercial relationship when affiliate credentials are
        configured. Otherwise we show non-affiliate fallback search or App Store
        links. Recommendations are never sold as guaranteed outcomes.
      </p>
    </div>
  );
}
