import type { Metadata } from "next";
import "./globals.css";
import { display, mono, sans } from "@/lib/fonts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, getSiteName, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: getSiteName(),
    description:
      "Find the best camera settings for your iPhone model, scenario, lighting, and output — with clear instructions and sourced evidence.",
    path: "/",
  }),
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bestiphonecamerasettings.com",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = websiteJsonLd();

  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
