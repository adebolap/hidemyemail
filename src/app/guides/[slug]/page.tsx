import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedGuides } from "@/components/RelatedGuides";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AdSlot } from "@/components/AdSlot";
import {
  getGuideBySlug,
  getPublishedGuides,
  getRelatedGuides,
  getSourceById,
} from "@/lib/content";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { SourceCitation } from "@/components/SourceCitation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    index: guide.status === "published" || guide.status === "reviewed",
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const related = getRelatedGuides(guide.relatedGuides, 4);
  const sources = guide.sourceIds
    .map((id) => getSourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getSourceById>>[];

  const schemas = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides/best-overall-settings" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
    articleJsonLd({
      title: guide.title,
      description: guide.description,
      path: `/guides/${guide.slug}`,
      dateModified: guide.lastVerifiedAt,
    }),
    faqJsonLd(guide.faqs),
  ].filter(Boolean);

  return (
    <div className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/best-overall-settings" },
          { name: guide.title },
        ]}
      />
      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="eyebrow">{guide.category}</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-ink-muted">{guide.description}</p>
          <p className="mt-3 text-sm text-ink-subtle">
            {guide.readingMinutes} min read · Verified{" "}
            {formatDate(guide.lastVerifiedAt)}
          </p>
          <div className="prose-content mt-8">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          {guide.faqs.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              <div className="mt-4 space-y-4">
                {guide.faqs.map((faq) => (
                  <div key={faq.question} className="surface p-4">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-ink-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
          {sources.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Sources</h2>
              <ul className="mt-4 space-y-3">
                {sources.map((source) => (
                  <li key={source.id}>
                    <SourceCitation source={source} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          <p className="mt-8 text-sm text-ink-muted">
            <Link href="/methodology" className="text-accent">
              Methodology
            </Link>
          </p>
        </div>
        <aside className="space-y-6">
          <AdSlot slot="guide-sidebar" />
          <RelatedGuides guides={related} />
          <NewsletterForm />
        </aside>
      </article>
    </div>
  );
}
