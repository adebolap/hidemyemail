import { getPublishedGuides } from "@/lib/content";
import { absoluteUrl, getSiteName, getSiteUrl } from "@/lib/seo";

export async function GET() {
  const guides = getPublishedGuides();
  const items = guides
    .map(
      (guide) => `
    <item>
      <title><![CDATA[${guide.title}]]></title>
      <link>${absoluteUrl(`/guides/${guide.slug}`)}</link>
      <guid>${absoluteUrl(`/guides/${guide.slug}`)}</guid>
      <description><![CDATA[${guide.description}]]></description>
      <pubDate>${new Date(guide.lastVerifiedAt).toUTCString()}</pubDate>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${getSiteName()}</title>
    <link>${getSiteUrl()}</link>
    <description>iPhone camera settings guides and updates</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
