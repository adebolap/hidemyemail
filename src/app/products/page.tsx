import Link from "next/link";
import { DigitalProductCard } from "@/components/DigitalProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  getLeadMagnet,
  getPublishedProducts,
  resolveCheckoutUrl,
} from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "iPhone camera cheat sheets & packs",
  description:
    "Free pocket cheat sheet plus paid scenario packs — practical Camera app setups you can keep on your phone.",
  path: "/products",
});

export default function ProductsIndexPage() {
  const leadMagnet = getLeadMagnet();
  const paid = getPublishedProducts().filter((p) => !p.leadMagnet);

  return (
    <div className="container-page py-10">
      <header className="mb-10 max-w-3xl">
        <p className="eyebrow">Digital products</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
          Cheat sheets & packs
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Higher-margin products that sit on top of the free finder. Start with
          the free sheet, upgrade when you want the full scenario set.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {paid.map((product) => (
            <DigitalProductCard
              key={product.id}
              product={product}
              checkoutUrl={resolveCheckoutUrl(product)}
            />
          ))}
        </div>
        <aside className="space-y-6">
          {leadMagnet ? (
            <NewsletterForm
              title={leadMagnet.headline}
              description={leadMagnet.description}
              offerId={leadMagnet.id}
            />
          ) : null}
          <Link href="/#finder" className="btn btn-secondary w-full no-underline">
            Or use the free finder
          </Link>
        </aside>
      </div>
    </div>
  );
}
