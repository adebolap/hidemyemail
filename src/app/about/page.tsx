import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "About Best iPhone Camera Settings — a mobile-first knowledge engine for iPhone photo and video setups.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page prose-content py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        About
      </h1>
      <p>
        Best iPhone Camera Settings helps you choose practical Camera app setups
        for your exact iPhone model, scenario, lighting, and output goal.
      </p>
      <p>
        The site is independently operated and is not affiliated with Apple Inc.
        Apple, iPhone, and related marks are trademarks of Apple Inc.
      </p>
      <p>
        We monetize with relevant affiliate accessories, app recommendations,
        optional email updates, and stable ad placements that never interrupt the
        primary recommendation.
      </p>
    </div>
  );
}
