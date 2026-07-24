import type { DigitalProduct } from "@/lib/schemas";

export const digitalProducts: DigitalProduct[] = [
  {
    id: "free-pocket-cheat-sheet",
    slug: "free-pocket-cheat-sheet",
    name: "Free pocket cheat sheet",
    headline: "Get the 1-page iPhone settings cheat sheet",
    description:
      "A printable baseline for Photo, Video, Night, and social exports — delivered by email. No account required.",
    price: "Free",
    priceCents: 0,
    currency: "USD",
    type: "lead-magnet",
    includes: [
      "1-page baseline settings",
      "When to use 12MP vs 24/48MP",
      "Night mode checklist",
      "Social export quick picks",
    ],
    scenarioIds: ["everyday", "night", "instagram", "tiktok"],
    modelFamilyIds: [],
    leadMagnet: true,
    status: "published",
    lastVerifiedAt: "2026-07-15",
  },
  {
    id: "scenario-cheat-sheets",
    slug: "scenario-cheat-sheets",
    name: "Scenario cheat sheet pack",
    headline: "12 scenario cheat sheets for your Camera app",
    description:
      "Printable and phone-friendly sheets for everyday, portraits, night, food, travel, kids/pets, sports, concerts, weddings, Instagram, TikTok, and YouTube.",
    price: "$9",
    priceCents: 900,
    currency: "USD",
    type: "cheat-sheet",
    includes: [
      "12 scenario sheets",
      "Model-family callouts (Pro vs non-Pro)",
      "Mistakes to avoid per scenario",
      "Lifetime PDF updates for this edition",
    ],
    scenarioIds: [
      "everyday",
      "portraits",
      "night",
      "food",
      "travel",
      "kids-pets",
      "sports",
      "concerts",
      "weddings",
      "instagram",
      "tiktok",
      "youtube",
    ],
    modelFamilyIds: [],
    checkoutUrl: undefined,
    leadMagnet: false,
    status: "published",
    lastVerifiedAt: "2026-07-15",
  },
  {
    id: "night-travel-pack",
    slug: "night-and-travel-pack",
    name: "Night & travel settings pack",
    headline: "Night + travel pack with storage-saving presets guidance",
    description:
      "A focused digital pack for low light and trip days: setup cards, ProRAW decision rules, and packing checklist for accessories.",
    price: "$15",
    priceCents: 1500,
    currency: "USD",
    type: "preset-pack",
    includes: [
      "Night mode field cards",
      "Travel storage decision tree",
      "HEIF vs ProRAW rules",
      "Accessory shortlist by trip type",
    ],
    scenarioIds: ["night", "travel"],
    modelFamilyIds: ["iphone-16-pro", "iphone-15-pro", "iphone-14-pro"],
    checkoutUrl: undefined,
    leadMagnet: false,
    status: "published",
    lastVerifiedAt: "2026-07-15",
  },
];

export const digitalProductsBySlug = Object.fromEntries(
  digitalProducts.map((p) => [p.slug, p]),
);
export const digitalProductsById = Object.fromEntries(
  digitalProducts.map((p) => [p.id, p]),
);
