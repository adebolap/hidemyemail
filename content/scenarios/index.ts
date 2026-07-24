import type {
  LightingOption,
  OutputGoal,
  Scenario,
} from "@/lib/schemas";

export const scenarios: Scenario[] = [
  {
    id: "everyday",
    name: "Everyday",
    slug: "everyday",
    description: "Quick, reliable photos and videos for daily life.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "daylight",
    defaultOutput: "private-sharing",
    relatedGuideSlugs: ["best-overall-settings", "preserving-settings"],
  },
  {
    id: "portraits",
    name: "Portraits",
    slug: "portraits",
    description: "People photos with flattering depth and skin detail.",
    mediaTypes: ["photo"],
    defaultLighting: "daylight",
    defaultOutput: "instagram",
    relatedGuideSlugs: ["best-overall-settings", "hdr-explained"],
  },
  {
    id: "selfies",
    name: "Selfies",
    slug: "selfies",
    description: "Front-camera setups that look natural on social apps.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "indoor-daylight",
    defaultOutput: "instagram",
    relatedGuideSlugs: ["best-overall-settings", "fixing-blurry-photos"],
  },
  {
    id: "night",
    name: "Night photography",
    slug: "night-photography",
    description: "Low-light stills with Night mode and steady capture.",
    mediaTypes: ["photo"],
    defaultLighting: "night",
    defaultOutput: "maximum-quality",
    relatedGuideSlugs: ["low-light-guide", "proraw-guide"],
  },
  {
    id: "food",
    name: "Food",
    slug: "food",
    description: "Close, appetizing food shots with clean color.",
    mediaTypes: ["photo"],
    defaultLighting: "indoor-daylight",
    defaultOutput: "instagram",
    relatedGuideSlugs: ["best-overall-settings", "heif-vs-jpeg"],
  },
  {
    id: "travel",
    name: "Travel & landscape",
    slug: "travel-landscape",
    description: "Wide scenes, landmarks, and travel documentation.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "daylight",
    defaultOutput: "edit-later",
    relatedGuideSlugs: ["12mp-vs-24mp-vs-48mp", "reducing-file-sizes"],
  },
  {
    id: "kids-pets",
    name: "Kids & pets",
    slug: "kids-pets",
    description: "Fast-moving subjects that need speed over maximum detail.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "daylight",
    defaultOutput: "private-sharing",
    relatedGuideSlugs: ["fixing-blurry-photos", "preserving-settings"],
  },
  {
    id: "sports",
    name: "Sports & action",
    slug: "sports-action",
    description: "Motion-heavy scenes where shutter speed and burst matter.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "daylight",
    defaultOutput: "edit-later",
    relatedGuideSlugs: ["fixing-blurry-photos", "video-settings-guide"],
  },
  {
    id: "instagram",
    name: "Instagram",
    slug: "instagram",
    description: "Feed- and story-ready framing with social compression in mind.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "daylight",
    defaultOutput: "instagram",
    relatedGuideSlugs: ["heif-vs-jpeg", "best-overall-settings"],
  },
  {
    id: "tiktok",
    name: "TikTok",
    slug: "tiktok",
    description: "Vertical video setups optimized for short-form publishing.",
    mediaTypes: ["video"],
    defaultLighting: "indoor-daylight",
    defaultOutput: "tiktok",
    relatedGuideSlugs: ["video-settings-guide", "reducing-file-sizes"],
  },
  {
    id: "youtube",
    name: "YouTube",
    slug: "youtube",
    description: "Cleaner long-form video with editable quality.",
    mediaTypes: ["video"],
    defaultLighting: "indoor-daylight",
    defaultOutput: "youtube",
    relatedGuideSlugs: ["video-settings-guide", "proraw-guide"],
  },
  {
    id: "concerts",
    name: "Concerts",
    slug: "concerts",
    description: "Mixed stage light with handheld video and stills.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "mixed-stage",
    defaultOutput: "private-sharing",
    relatedGuideSlugs: ["low-light-guide", "video-settings-guide"],
  },
  {
    id: "weddings",
    name: "Weddings",
    slug: "weddings",
    description: "Reliable guest photography with flattering people shots.",
    mediaTypes: ["photo", "video"],
    defaultLighting: "mixed-stage",
    defaultOutput: "maximum-quality",
    relatedGuideSlugs: ["best-overall-settings", "hdr-explained"],
  },
];

export const lightingOptions: LightingOption[] = [
  {
    id: "daylight",
    name: "Daylight",
    description: "Bright outdoor sun or open shade.",
  },
  {
    id: "overcast",
    name: "Overcast",
    description: "Soft cloudy light with lower contrast.",
  },
  {
    id: "indoor-daylight",
    name: "Indoor daylight",
    description: "Rooms lit mainly by windows.",
  },
  {
    id: "indoor-low-light",
    name: "Indoor low light",
    description: "Dim interiors without strong window light.",
  },
  {
    id: "night",
    name: "Night",
    description: "Outdoor or indoor scenes after dark.",
  },
  {
    id: "backlight",
    name: "Backlight",
    description: "Subject lit from behind, bright background.",
  },
  {
    id: "mixed-stage",
    name: "Mixed / stage light",
    description: "Uneven, colored, or rapidly changing lights.",
  },
];

export const outputGoals: OutputGoal[] = [
  {
    id: "private-sharing",
    name: "Private sharing",
    description: "Texts, Messages, and family albums.",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Feed, Stories, and Reels.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Vertical short-form video.",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Longer uploads and edits.",
  },
  {
    id: "edit-later",
    name: "Edit later",
    description: "Keep flexibility for desktop or app editing.",
  },
  {
    id: "print",
    name: "Print",
    description: "Larger prints and albums.",
  },
  {
    id: "save-storage",
    name: "Save storage",
    description: "Smaller files and faster uploads.",
  },
  {
    id: "maximum-quality",
    name: "Maximum quality",
    description: "Best detail and future-proof files.",
  },
];

export const scenariosById = Object.fromEntries(scenarios.map((s) => [s.id, s]));
export const scenariosBySlug = Object.fromEntries(
  scenarios.map((s) => [s.slug, s]),
);
export const lightingById = Object.fromEntries(
  lightingOptions.map((l) => [l.id, l]),
);
export const outputGoalsById = Object.fromEntries(
  outputGoals.map((o) => [o.id, o]),
);
