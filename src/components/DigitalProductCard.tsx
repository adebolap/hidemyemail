"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { DigitalProduct } from "@/lib/schemas";
import { track } from "@/lib/analytics";

export function DigitalProductCard({
  product,
  checkoutUrl,
  variant = "default",
}: {
  product: DigitalProduct;
  checkoutUrl?: string;
  variant?: "default" | "compact";
}) {
  useEffect(() => {
    track("digital_product_viewed", { id: product.id, type: product.type });
  }, [product.id, product.type]);

  const href = product.leadMagnet
    ? `/products/${product.slug}`
    : checkoutUrl || `/products/${product.slug}`;

  return (
    <article
      className={
        variant === "compact"
          ? "rounded-[var(--radius)] border border-accent/25 bg-accent-soft/40 p-4"
          : "surface p-5"
      }
    >
      <p className="eyebrow">
        {product.leadMagnet ? "Free download" : "Digital product"}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {product.description}
      </p>
      <p className="mt-3 text-xl font-semibold text-ink">{product.price}</p>
      <ul className="mt-3 space-y-1 text-sm text-ink-muted">
        {product.includes.slice(0, 4).map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
      <Link
        href={href}
        className="btn btn-primary mt-4 no-underline"
        onClick={() =>
          track("digital_product_clicked", {
            id: product.id,
            leadMagnet: product.leadMagnet,
          })
        }
      >
        {product.leadMagnet
          ? "Get free cheat sheet"
          : checkoutUrl
            ? "Buy now"
            : "View pack"}
      </Link>
    </article>
  );
}
