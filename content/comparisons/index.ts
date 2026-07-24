import type { Comparison } from "@/lib/schemas";

export const comparisons: Comparison[] = [
  {
    id: "cmp-16pro-night-default-vs-optimized",
    slug: "iphone-16-pro-night-default-vs-optimized",
    title: "iPhone 16 Pro night: default vs optimized",
    description:
      "Controlled outdoor night street scene comparing default Photo capture against a braced 1x Night mode setup.",
    modelIds: ["iphone-16-pro"],
    scenarioIds: ["night"],
    mediaType: "photo",
    testedIOS: "18.5",
    lighting: "night",
    defaultSide: {
      label: "Default",
      settingsSummary: "Photo · Auto lens · Flash off · Handheld · Night auto",
      observations: [
        "Usable frame, but soft edges when Night timer ran long",
        "Shadows lifted aggressively with visible luminance noise",
        "Occasional subject blur from hand movement",
      ],
    },
    optimizedSide: {
      label: "Optimized",
      settingsSummary: "Photo · 1x · braced/tripod · Night seconds set intentionally · Flash off",
      observations: [
        "Cleaner mid-tone detail on signs and brickwork",
        "Less motion smear during 2–3s captures",
        "More consistent framing for later crops",
      ],
    },
    winner: "optimized",
    winnerSummary:
      "Optimized 1x + brace beat default handheld Night captures for detail and sharpness in this scene.",
    metrics: [
      {
        label: "Perceived detail (1–5)",
        defaultValue: "3",
        optimizedValue: "4.5",
        note: "Editorial score from side-by-side 100% peeks",
      },
      {
        label: "Motion blur risk",
        defaultValue: "High",
        optimizedValue: "Low",
      },
      {
        label: "Capture time",
        defaultValue: "Variable",
        optimizedValue: "2–3s braced",
      },
      {
        label: "File size (approx HEIF)",
        defaultValue: "~3–5 MB",
        optimizedValue: "~3–6 MB",
      },
    ],
    sourceIds: ["test-16pro-night-2026", "apple-night-mode-support"],
    recommendationIds: ["16pro-night-photo"],
    productTags: ["night-pack", "cheat-sheet"],
    status: "published",
    lastVerifiedAt: "2026-07-10",
    author: "Editorial",
    reviewer: "Editorial",
  },
  {
    id: "cmp-15pro-portrait-1x-vs-2x",
    slug: "iphone-15-pro-portrait-1x-vs-2x",
    title: "iPhone 15 Pro portraits: 1x vs 2x",
    description:
      "Open-shade portrait comparison for facial proportions and background separation.",
    modelIds: ["iphone-15-pro"],
    scenarioIds: ["portraits"],
    mediaType: "photo",
    testedIOS: "18.5",
    lighting: "daylight",
    defaultSide: {
      label: "Portrait 1x",
      settingsSummary: "Portrait · 1x · Standard style · Flash off",
      observations: [
        "More environmental context",
        "Slightly wider facial rendering",
        "Edge errors more visible near glasses in one frame",
      ],
    },
    optimizedSide: {
      label: "Portrait 2x",
      settingsSummary: "Portrait · 2x · face-exposed · soft open shade",
      observations: [
        "More flattering head-and-shoulders compression",
        "Cleaner subject separation for social crops",
        "Easier 4:5 Instagram framing",
      ],
    },
    winner: "optimized",
    winnerSummary:
      "2x Portrait was preferred for classic people photos; 1x stayed useful for environmental portraits.",
    metrics: [
      {
        label: "Flattering face geometry",
        defaultValue: "Good",
        optimizedValue: "Better",
      },
      {
        label: "Background control",
        defaultValue: "Busy",
        optimizedValue: "Tighter",
      },
      {
        label: "Depth map reliability",
        defaultValue: "Medium",
        optimizedValue: "High in this light",
      },
    ],
    sourceIds: ["test-15pro-portrait-2026", "apple-camera-user-guide"],
    recommendationIds: ["15pro-portraits-daylight"],
    productTags: ["portrait-pack", "cheat-sheet"],
    status: "published",
    lastVerifiedAt: "2026-07-08",
    author: "Editorial",
    reviewer: "Editorial",
  },
  {
    id: "cmp-social-video-1080-vs-4k",
    slug: "social-video-1080p30-vs-4k30",
    title: "Social video: 1080p30 vs 4K30 after upload",
    description:
      "Same talking-head clip exported and uploaded to measure practical quality versus storage cost.",
    modelIds: ["iphone-16", "iphone-15-pro"],
    scenarioIds: ["tiktok", "youtube"],
    mediaType: "video",
    testedIOS: "18.5",
    lighting: "indoor-daylight",
    defaultSide: {
      label: "4K30 master",
      settingsSummary: "Video · 4K30 · HEVC · HDR off · 1x",
      observations: [
        "Best archive master and crop flexibility",
        "Upload and edit times longer",
        "After social recompression, difference narrowed",
      ],
    },
    optimizedSide: {
      label: "1080p30 social",
      settingsSummary: "Video · 1080p30 · HEVC · locked exposure · mic",
      observations: [
        "Enough clarity for TikTok/Reels delivery",
        "Much smaller files and faster turnaround",
        "Lighting and audio mattered more than resolution",
      ],
    },
    winner: "tie",
    winnerSummary:
      "Keep 4K for masters and YouTube; 1080p30 is enough for many short-form uploads when lighting is good.",
    metrics: [
      {
        label: "Approx file size / min",
        defaultValue: "Higher",
        optimizedValue: "Lower",
      },
      {
        label: "Post-upload perceived quality",
        defaultValue: "High",
        optimizedValue: "High (close)",
      },
      {
        label: "Best use",
        defaultValue: "YouTube / edit later",
        optimizedValue: "TikTok / Reels speed",
      },
    ],
    sourceIds: ["test-video-social-2026", "apple-heif-support"],
    recommendationIds: ["tiktok-vertical-video", "youtube-video-pro"],
    productTags: ["video-pack", "cheat-sheet"],
    status: "published",
    lastVerifiedAt: "2026-07-12",
    author: "Editorial",
    reviewer: "Editorial",
  },
  {
    id: "cmp-heif-vs-proraw-storage",
    slug: "heif-vs-proraw-storage-tradeoff",
    title: "HEIF vs ProRAW: storage and edit latitude",
    description:
      "Travel-day storage comparison on a Pro model for the same keepers.",
    modelIds: ["iphone-16-pro", "iphone-15-pro"],
    scenarioIds: ["travel"],
    mediaType: "photo",
    testedIOS: "18.5",
    lighting: "daylight",
    defaultSide: {
      label: "HEIF 24MP",
      settingsSummary: "Photo · HEIF · 24MP · Standard style",
      observations: [
        "Fast capture and share",
        "Good everyday latitude",
        "Less recovery when highlights were pushed hard",
      ],
    },
    optimizedSide: {
      label: "ProRAW selective",
      settingsSummary: "ProRAW on for keepers only · 1x · edit later",
      observations: [
        "Better white-balance and highlight recovery in edit",
        "Library grew quickly when left on all day",
        "Best as a selective switch, not a default",
      ],
    },
    winner: "tie",
    winnerSummary:
      "HEIF for volume; ProRAW only for planned edits. Leaving ProRAW on all day is the expensive mistake.",
    metrics: [
      {
        label: "Relative file size",
        defaultValue: "1×",
        optimizedValue: "~8–12×",
        note: "Order-of-magnitude; varies by scene",
      },
      {
        label: "Edit flexibility",
        defaultValue: "Good",
        optimizedValue: "Highest",
      },
      {
        label: "Recommended default",
        defaultValue: "Yes for travel days",
        optimizedValue: "Keepers only",
      },
    ],
    sourceIds: ["apple-proraw-support", "apple-heif-support"],
    recommendationIds: ["travel-landscape-photo"],
    productTags: ["travel-pack", "cheat-sheet"],
    status: "published",
    lastVerifiedAt: "2026-07-15",
    author: "Editorial",
    reviewer: "Editorial",
  },
];

export const comparisonsBySlug = Object.fromEntries(
  comparisons.map((c) => [c.slug, c]),
);
export const comparisonsById = Object.fromEntries(
  comparisons.map((c) => [c.id, c]),
);
