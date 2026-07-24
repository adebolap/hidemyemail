import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Best iPhone Camera Settings.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-page prose-content py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Contact
      </h1>
      <p>
        Corrections, source suggestions, and partnership inquiries:{" "}
        <a href="mailto:adebolap@gmail.com">adebolap@gmail.com</a>
      </p>
      <p>
        Please include your iPhone model, iOS version, and the page URL when
        reporting a settings issue.
      </p>
    </div>
  );
}
