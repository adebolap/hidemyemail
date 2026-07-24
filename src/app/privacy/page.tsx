import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for Best iPhone Camera Settings.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="container-page prose-content py-10">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">
        Privacy Policy
      </h1>
      <p>Effective date: July 15, 2026</p>
      <p>
        This site may collect basic analytics events (for example, finder
        completions and affiliate clicks). We do not send email addresses to
        analytics tools.
      </p>
      <p>
        If you join the newsletter, your email is processed by the configured
        newsletter provider solely to send updates you consented to receive. You
        can unsubscribe at any time.
      </p>
      <p>
        We do not upload or store your photos in this MVP. Contact us at{" "}
        <a href="mailto:adebolap@gmail.com">adebolap@gmail.com</a> for privacy
        requests.
      </p>
    </div>
  );
}
