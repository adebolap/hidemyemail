import Link from "next/link";

const links = [
  { href: "/#finder", label: "Finder" },
  { href: "/guides/best-overall-settings", label: "Guides" },
  { href: "/methodology", label: "Methodology" },
  { href: "/sources", label: "Sources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[color-mix(in_srgb,var(--bg)_86%,white)] backdrop-blur-md">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="no-underline">
          <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-ink">
            Best iPhone Camera Settings
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted no-underline hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/#finder" className="btn btn-primary text-sm no-underline md:hidden">
          Find settings
        </Link>
      </div>
    </header>
  );
}
