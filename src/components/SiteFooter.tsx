import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/sources", label: "Sources" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-bg-elevated">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
            Best iPhone Camera Settings
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Model-aware camera recommendations with setup steps, trade-offs, and
            citations. Ads and affiliate links never block the primary answer.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-3 text-sm">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-muted no-underline hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-ink-subtle sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Best iPhone Camera Settings</p>
          <p>Not affiliated with Apple Inc.</p>
        </div>
      </div>
    </footer>
  );
}
