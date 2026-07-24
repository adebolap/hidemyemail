import { scenariosById, scenariosBySlug } from "@/../content/scenarios";

export function scenarioIdFromSlug(slug: string): string | undefined {
  return scenariosBySlug[slug]?.id;
}

export function scenarioSlugFromId(id: string): string | undefined {
  return scenariosById[id]?.slug;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
