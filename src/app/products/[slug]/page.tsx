import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  getLeadMagnet,
  getProductBySlug,
  getPublishedProducts,
  resolveCheckoutUrl,
} from "@/lib/content";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status === "draft") notFound();

  const checkoutUrl = resolveCheckoutUrl(product);
  const leadMagnet = getLeadMagnet();
  const jsonLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.name, path: `/products/${product.slug}` },
  ]);

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: product.name },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <article>
          <p className="eyebrow">
            {product.leadMagnet ? "Lead magnet" : "Digital product"}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold">
            {product.headline}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{product.description}</p>
          <p className="mt-4 text-3xl font-semibold">{product.price}</p>
          <ul className="mt-6 space-y-2 text-ink-muted">
            {product.includes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {!product.leadMagnet ? (
            <div className="mt-8">
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  className="btn btn-primary no-underline"
                  rel="noopener noreferrer"
                >
                  Buy now — {product.price}
                </a>
              ) : (
                <div className="rounded-[var(--radius)] border border-warning/30 bg-warning-soft p-4 text-sm">
                  Checkout link not configured yet. Set{" "}
                  <code>NEXT_PUBLIC_CHECKOUT_*</code> in env, or{" "}
                  <Link href="/contact" className="text-accent">
                    contact us
                  </Link>{" "}
                  to purchase manually.
                </div>
              )}
            </div>
          ) : null}
          <p className="mt-6 text-sm text-ink-subtle">
            Free finder remains available on the{" "}
            <Link href="/" className="text-accent">
              homepage
            </Link>
            . Digital products are optional.
          </p>
        </article>
        <aside>
          {product.leadMagnet || leadMagnet ? (
            <NewsletterForm
              title={
                product.leadMagnet
                  ? product.headline
                  : (leadMagnet?.headline ?? "Get the free cheat sheet")
              }
              description={
                product.leadMagnet
                  ? product.description
                  : (leadMagnet?.description ??
                    "Email me the free pocket cheat sheet.")
              }
              offerId={product.leadMagnet ? product.id : leadMagnet?.id}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
