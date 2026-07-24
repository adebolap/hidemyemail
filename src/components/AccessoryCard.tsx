"use client";

import { useEffect } from "react";
import type { Accessory } from "@/lib/schemas";
import { track } from "@/lib/analytics";

function resolveUrl(item: Accessory): string | undefined {
  const tag = process.env.NEXT_PUBLIC_AFFILIATE_TAG;
  if (item.affiliateUrl && tag) {
    return item.affiliateUrl.includes("?")
      ? `${item.affiliateUrl}&tag=${tag}`
      : `${item.affiliateUrl}?tag=${tag}`;
  }
  if (item.affiliateUrl) return item.affiliateUrl;
  return item.fallbackUrl;
}

export function AccessoryCard({ item }: { item: Accessory }) {
  const href = resolveUrl(item);
  const isAffiliate = Boolean(item.affiliateUrl && process.env.NEXT_PUBLIC_AFFILIATE_TAG);

  useEffect(() => {
    track("affiliate_card_viewed", { id: item.id, tag: item.tag });
  }, [item.id, item.tag]);

  return (
    <article className="surface flex h-full flex-col p-5">
      <p className="eyebrow">{item.category}</p>
      <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>
      {item.priceHint ? (
        <p className="mt-3 text-sm font-medium text-ink-subtle">{item.priceHint}</p>
      ) : null}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel={isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          className="btn btn-secondary mt-4 no-underline"
          onClick={() =>
            track("affiliate_clicked", {
              id: item.id,
              affiliate: isAffiliate,
            })
          }
        >
          View option
        </a>
      ) : null}
      <p className="mt-2 text-xs text-ink-subtle">
        {isAffiliate
          ? "Affiliate link — we may earn a commission."
          : "Non-affiliate search link."}
      </p>
    </article>
  );
}
