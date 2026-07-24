import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Best iPhone Camera Settings.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-page prose-content py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Terms of Use
      </h1>
      <p>
        Content is provided for educational purposes. Camera behavior can change
        with iOS updates. Always verify controls on your device.
      </p>
      <p>
        Recommendations are not professional photography or legal advice. Apple
        product names are used for identification only.
      </p>
    </div>
  );
}
