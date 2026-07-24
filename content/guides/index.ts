import type { Guide } from "@/lib/schemas";

export const guides: Guide[] = [
  {
    slug: "best-overall-settings",
    title: "Best overall iPhone camera settings",
    description:
      "A practical baseline for Photo and Video mode before you specialize by scenario.",
    category: "Fundamentals",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 7,
    relatedScenarios: ["everyday", "instagram", "travel"],
    relatedGuides: ["preserving-settings", "heif-vs-jpeg"],
    sourceIds: ["apple-camera-user-guide", "apple-heif-support"],
    author: "Editorial",
    reviewer: "Editorial",
    sections: [
      {
        heading: "Start with the native Camera app",
        body: "Most people get the best everyday results from Apple’s Camera app with High Efficiency formats, 1x lens, and Smart HDR left on. Third-party apps are useful for manual control, not as a default replacement.",
      },
      {
        heading: "Photo baseline",
        body: "Use Photo mode at 1x. Keep flash off unless you intentionally want direct flash fill. Set Photographic Style to Standard or a mild Vibrant look. Live Photos are optional—turn them off if storage is tight.",
      },
      {
        heading: "Video baseline",
        body: "For general clips, 4K30 is a strong default on recent iPhones. Choose 1080p30 or 1080p60 when you need smaller files or smoother motion for action. Match frame rate to your delivery platform when possible.",
      },
      {
        heading: "Settings app vs Camera controls",
        body: "Formats, video resolution, and Preserve Settings live in iOS Settings → Camera. Exposure, lens, Night mode seconds, and modes live inside Camera. Computational features like Smart HDR often run automatically without a dedicated toggle.",
      },
    ],
    faqs: [
      {
        question: "Should I use 48MP all the time?",
        answer:
          "No. Use higher resolutions when light is strong and you need crop or print flexibility. For everyday sharing, 12MP or 24MP is usually faster and smaller.",
      },
    ],
  },
  {
    slug: "heif-vs-jpeg",
    title: "HEIF vs JPEG on iPhone",
    description:
      "When to keep High Efficiency photos and when Most Compatible JPEG is worth the storage cost.",
    category: "Formats",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 5,
    relatedScenarios: ["everyday", "instagram", "travel"],
    relatedGuides: ["reducing-file-sizes", "proraw-guide"],
    sourceIds: ["apple-heif-support"],
    sections: [
      {
        heading: "What HEIF is",
        body: "HEIF (High Efficiency Image Format) is Apple’s default photo container when High Efficiency is selected. It typically uses less storage than JPEG at similar visual quality.",
      },
      {
        heading: "When JPEG helps",
        body: "Choose Most Compatible if you frequently hand files to older computers, printers, or workflows that still struggle with HEIF. You pay for that compatibility with larger files.",
      },
      {
        heading: "Sharing reality",
        body: "Messages, Instagram, and many apps recompress on upload. Capturing HEIF and letting the share sheet convert is usually better than permanently switching your camera to JPEG.",
      },
    ],
    faqs: [],
  },
  {
    slug: "proraw-guide",
    title: "Apple ProRAW: when to use it",
    description:
      "ProRAW gives edit flexibility on Pro models at the cost of storage and speed.",
    category: "Formats",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 6,
    relatedScenarios: ["travel", "night", "weddings"],
    relatedGuides: ["heif-vs-jpeg", "12mp-vs-24mp-vs-48mp"],
    sourceIds: ["apple-proraw-support", "apple-iphone-16-pro-specs"],
    sections: [
      {
        heading: "Pro models only",
        body: "ProRAW is a Pro-model feature. Non-Pro iPhones should not be told to enable it—the control will not appear in Camera.",
      },
      {
        heading: "Use it for keepers",
        body: "Enable ProRAW when you know you will edit exposure, white balance, or detail later. Leave it off for casual snaps, bursts, and kids/pets action.",
      },
      {
        heading: "Storage warning",
        body: "ProRAW files are much larger than HEIF. On trips, pair it with external storage or selective use so you do not fill the phone mid-day.",
      },
    ],
    faqs: [
      {
        question: "Is ProRAW the same as Night mode?",
        answer:
          "No. Night mode is a capture process for low light. ProRAW is a file format with more editable data. They can be used together on supported phones, but they solve different problems.",
      },
    ],
  },
  {
    slug: "12mp-vs-24mp-vs-48mp",
    title: "12MP vs 24MP vs 48MP",
    description:
      "How to choose resolution on modern iPhone main cameras without wasting storage.",
    category: "Resolution",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 6,
    relatedScenarios: ["travel", "everyday", "instagram"],
    relatedGuides: ["reducing-file-sizes", "best-overall-settings"],
    sourceIds: ["apple-iphone-16-pro-specs", "apple-iphone-15-specs"],
    sections: [
      {
        heading: "Not every iPhone offers the same choices",
        body: "48MP capture depends on the model and lens. Older dual-camera iPhones often stay at 12MP. Always check what your Camera app actually offers.",
      },
      {
        heading: "Practical picks",
        body: "12MP: fastest everyday sharing. 24MP: strong default on many recent phones. 48MP: landscapes, crops, and prints in good light when you can wait for processing.",
      },
      {
        heading: "Low light caveat",
        body: "Higher resolutions can slow capture and struggle when the phone is already stacking frames for Night mode. Prefer a steady 1x frame over chasing megapixels in the dark.",
      },
    ],
    faqs: [],
  },
  {
    slug: "hdr-explained",
    title: "HDR on iPhone photos and video",
    description:
      "What Smart HDR and HDR video actually change—and when to simplify to SDR.",
    category: "Dynamic range",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 5,
    relatedScenarios: ["portraits", "travel", "youtube"],
    relatedGuides: ["best-overall-settings", "video-settings-guide"],
    sourceIds: ["apple-camera-user-guide"],
    sections: [
      {
        heading: "Photos",
        body: "Smart HDR blends multiple exposures automatically. You usually do not toggle it shot-by-shot; good technique is still about exposure taps and avoiding extreme backlight without a plan.",
      },
      {
        heading: "Video",
        body: "HDR video can look great on Apple displays but complicates some edit pipelines and social exports. If your color workflow is simple, SDR delivery is often less surprising.",
      },
    ],
    faqs: [],
  },
  {
    slug: "video-settings-guide",
    title: "iPhone video settings that matter",
    description:
      "Resolution, frame rate, HDR, Action mode, and ProRes—chosen for the job, not max specs.",
    category: "Video",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 8,
    relatedScenarios: ["youtube", "tiktok", "sports"],
    relatedGuides: ["reducing-file-sizes", "best-overall-settings"],
    sourceIds: ["apple-camera-user-guide", "test-video-social-2026"],
    sections: [
      {
        heading: "Set defaults in Settings",
        body: "Video resolution and frame rate defaults live in Settings → Camera → Record Video. Change them before a shoot so Camera opens ready.",
      },
      {
        heading: "Action mode trade-off",
        body: "Action mode stabilizes walking and running footage but crops the frame. Leave it off on a tripod or gimbal.",
      },
      {
        heading: "ProRes and Log",
        body: "These are advanced Pro workflows. They need storage, heat awareness, and a grading plan. They are not better by default for TikTok or casual YouTube.",
      },
    ],
    faqs: [
      {
        question: "Is 4K120 always better?",
        answer:
          "Only when you need slow motion and your model supports it. For normal playback, 4K30 or 4K60 is usually enough and easier to edit.",
      },
    ],
  },
  {
    slug: "low-light-guide",
    title: "Low light and Night mode settings",
    description:
      "How to work with Night mode, flash, and steady support when light disappears.",
    category: "Low light",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 6,
    relatedScenarios: ["night", "concerts", "weddings"],
    relatedGuides: ["fixing-blurry-photos", "proraw-guide"],
    sourceIds: ["apple-night-mode-support", "test-16pro-night-2026"],
    sections: [
      {
        heading: "Let Night mode finish",
        body: "When the moon icon appears, the phone may capture for multiple seconds. Hold still until the progress indicator completes.",
      },
      {
        heading: "Flash is not a Night mode replacement",
        body: "Flash lights nearby subjects harshly and often ruins ambient atmosphere. Prefer Night mode, a small continuous light, or better positioning.",
      },
      {
        heading: "Lens choice",
        body: "The main 1x camera usually gathers the best low-light stills. Ultra Wide and deep digital crops collect less light.",
      },
    ],
    faqs: [],
  },
  {
    slug: "preserving-settings",
    title: "Preserve Camera settings on iPhone",
    description:
      "Stop iOS from resetting mode, filter, and other Camera choices between launches.",
    category: "Workflow",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 4,
    relatedScenarios: ["everyday", "kids-pets"],
    relatedGuides: ["best-overall-settings"],
    sourceIds: ["apple-camera-user-guide"],
    sections: [
      {
        heading: "Where to find it",
        body: "Go to Settings → Camera → Preserve Settings. Enable the controls you want retained, such as Camera Mode, Creative Controls, or Exposure Adjustment depending on your iOS version.",
      },
      {
        heading: "Why it matters",
        body: "If you frequently shoot Video or Portrait, Preserve Settings prevents Camera from bouncing back to Photo every time and missing a moment.",
      },
    ],
    faqs: [],
  },
  {
    slug: "reducing-file-sizes",
    title: "Reduce iPhone photo and video file sizes",
    description:
      "Practical levers: HEIF/HEVC, resolution, Live Photos, ProRAW, and ProRes.",
    category: "Storage",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 5,
    relatedScenarios: ["travel", "tiktok", "everyday"],
    relatedGuides: ["heif-vs-jpeg", "video-settings-guide"],
    sourceIds: ["apple-heif-support", "apple-proraw-support"],
    sections: [
      {
        heading: "Highest-impact switches",
        body: "Use High Efficiency formats, turn off Live Photos when you do not need them, avoid ProRAW/ProRes for casual capture, and drop to 1080p for long social video days.",
      },
      {
        heading: "Do not confuse compression with quality loss forever",
        body: "Social platforms will compress again. Keep a good HEIF/HEVC master when the moment matters, then share a derivative.",
      },
    ],
    faqs: [],
  },
  {
    slug: "fixing-blurry-photos",
    title: "Fix blurry iPhone photos",
    description:
      "Motion blur, miss-focus, dirty lenses, and Night mode movement—plus what you can still salvage.",
    category: "Troubleshooting",
    status: "published",
    lastVerifiedAt: "2026-07-15",
    readingMinutes: 5,
    relatedScenarios: ["kids-pets", "sports", "night"],
    relatedGuides: ["low-light-guide", "best-overall-settings"],
    sourceIds: ["apple-camera-user-guide", "apple-night-mode-support"],
    sections: [
      {
        heading: "Before you shoot",
        body: "Wipe the lens, tap to focus, get more light, and hold elbows in. Most blur is technique or light, not a broken phone.",
      },
      {
        heading: "Moving subjects",
        body: "Use burst, prefer brighter scenes, and avoid long Night mode captures for kids, pets, and sports.",
      },
      {
        heading: "After the fact",
        body: "Photos edits can help mild softness, but true motion blur cannot be fully recovered. Pull a sharper frame from Live Photos when available.",
      },
    ],
    faqs: [],
  },
];

export const guidesBySlug = Object.fromEntries(guides.map((g) => [g.slug, g]));
