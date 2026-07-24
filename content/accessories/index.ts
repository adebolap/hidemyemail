import type { Accessory, AppRecommendation } from "@/lib/schemas";

export const accessories: Accessory[] = [
  {
    id: "tripod-compact",
    tag: "tripod",
    name: "Compact travel tripod",
    description: "Keeps Night mode and long exposures sharp when you cannot brace the phone.",
    category: "Stability",
    fallbackUrl: "https://www.amazon.com/s?k=iphone+tripod",
    priceHint: "$25–$80",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "magsafe-grip",
    tag: "MagSafe grip",
    name: "MagSafe camera grip",
    description: "Steadier handheld shots and easier one-handed video.",
    category: "Handling",
    fallbackUrl: "https://www.amazon.com/s?k=magsafe+camera+grip",
    priceHint: "$40–$120",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "gimbal-entry",
    tag: "gimbal",
    name: "Entry smartphone gimbal",
    description: "Smoother walking shots for YouTube and travel video.",
    category: "Video",
    fallbackUrl: "https://www.amazon.com/s?k=smartphone+gimbal",
    priceHint: "$80–$180",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "mic-wireless",
    tag: "microphone",
    name: "Wireless clip-on mic",
    description: "Clearer dialogue for TikTok, YouTube, and interviews.",
    category: "Audio",
    fallbackUrl: "https://www.amazon.com/s?k=wireless+iphone+microphone",
    priceHint: "$50–$200",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "portable-light",
    tag: "portable light",
    name: "Pocket LED light",
    description: "Fill light for food, selfies, and indoor portraits.",
    category: "Lighting",
    fallbackUrl: "https://www.amazon.com/s?k=iphone+led+light",
    priceHint: "$20–$70",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "nd-filter",
    tag: "ND filter",
    name: "Clip-on ND filter kit",
    description: "Useful for bright outdoor video when you want cinematic motion blur.",
    category: "Optics",
    fallbackUrl: "https://www.amazon.com/s?k=iphone+nd+filter",
    priceHint: "$30–$90",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "anamorphic-lens",
    tag: "lens",
    name: "Moment-style lens adapter",
    description: "Optional creative lens for wide or anamorphic looks—not required for native quality.",
    category: "Optics",
    fallbackUrl: "https://www.amazon.com/s?k=iphone+moment+lens",
    priceHint: "$80–$200",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "power-bank",
    tag: "power bank",
    name: "MagSafe power bank",
    description: "Keeps recording sessions alive for travel and events.",
    category: "Power",
    fallbackUrl: "https://www.amazon.com/s?k=magsafe+power+bank",
    priceHint: "$40–$100",
    regions: ["US", "GLOBAL"],
  },
  {
    id: "external-storage",
    tag: "external storage",
    name: "USB-C SSD",
    description: "Offloads ProRes and ProRAW when internal storage fills quickly.",
    category: "Storage",
    fallbackUrl: "https://www.amazon.com/s?k=usb-c+ssd+iphone",
    priceHint: "$70–$200",
    regions: ["US", "GLOBAL"],
  },
];

export const recommendedApps: AppRecommendation[] = [
  {
    id: "halide",
    tag: "manual-photo",
    name: "Halide",
    description: "Manual controls and depth capture when the native app is not enough.",
    fallbackUrl: "https://apps.apple.com/app/halide-mark-ii-pro-camera/id885697368",
  },
  {
    id: "blackmagic-camera",
    tag: "manual-video",
    name: "Blackmagic Camera",
    description: "Pro video controls including manual exposure and monitoring tools.",
    fallbackUrl: "https://apps.apple.com/app/blackmagic-camera/id6449978026",
  },
  {
    id: "lightroom",
    tag: "edit-photo",
    name: "Adobe Lightroom",
    description: "Strong ProRAW and HEIF editing with portable presets.",
    fallbackUrl: "https://apps.apple.com/app/adobe-lightroom-photo-editor/id878783584",
  },
  {
    id: "final-cut-camera",
    tag: "pro-video",
    name: "Final Cut Camera",
    description: "Useful when you want more logging and multicam-friendly capture.",
    fallbackUrl: "https://apps.apple.com/app/final-cut-camera/id6462950573",
  },
  {
    id: "capcut",
    tag: "social-edit",
    name: "CapCut",
    description: "Fast vertical edits for TikTok and Reels workflows.",
    fallbackUrl: "https://apps.apple.com/app/capcut-video-editor/id1500855883",
  },
];

export const accessoriesByTag = accessories.reduce<Record<string, Accessory[]>>(
  (acc, item) => {
    acc[item.tag] = acc[item.tag] ? [...acc[item.tag], item] : [item];
    return acc;
  },
  {},
);

export const appsByTag = recommendedApps.reduce<
  Record<string, AppRecommendation[]>
>((acc, item) => {
  acc[item.tag] = acc[item.tag] ? [...acc[item.tag], item] : [item];
  return acc;
}, {});
