import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Methodology",
  description:
    "How Best iPhone Camera Settings separates device capabilities from editorial recommendations, scores confidence, and cites evidence.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="container-page prose-content py-10">
      <p className="eyebrow">Research</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Methodology
      </h1>
      <p>
        We separate factual device capabilities from editorial recommendations.
        Capabilities come from Apple documentation and specifications. Scenario
        advice is labeled with confidence and linked to sources.
      </p>
      <h2>Evidence tiers</h2>
      <p>
        Tier 1 is Apple documentation. Tier 2 is controlled original testing with
        recorded model, iOS build, lighting, and observations. Tier 3 is credible
        independent testing. Tier 4 community reports can surface questions but
        are never the sole proof of a technical claim.
      </p>
      <h2>Confidence labels</h2>
      <p>
        High confidence requires a confirmed capability plus strong first-party
        guidance or repeatable testing. Medium confidence means supported
        capability with limited testing. Experimental advice is plausible but not
        definitive — and is never presented as settled.
      </p>
      <h2>What we will not do</h2>
      <p>
        We do not invent Camera controls the native app does not expose, silently
        recommend unsupported features, fabricate reviews or ratings, or place
        ads before the primary answer.
      </p>
      <h2>Settings locations</h2>
      <p>
        Instructions distinguish iOS Settings → Camera, on-screen Camera
        controls, third-party app controls, and automatic computational behavior
        users cannot configure.
      </p>
    </div>
  );
}
