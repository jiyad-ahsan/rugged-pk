import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllContent, extractTOC, getRelatedContent } from "@/lib/guides";
import SaveOfflineButton from "@/components/SaveOfflineButton";
import GuideContent from "@/components/guide/GuideContent";
import TableOfContents from "@/components/guide/TableOfContents";
import SketchRenderer from "@/components/guide/SketchRenderer";

const tagColor = {
  essentials: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  comms: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  medical: "text-rose-700 dark:text-rose-400",
  planning: "text-violet-700 dark:text-violet-400",
  resilience: "text-sky-700 dark:text-sky-400",
  environment: "text-teal-700 dark:text-teal-400",
  skills: "text-stone-700 dark:text-stone-400",
};

// Generate SEO metadata
export async function generateMetadata({ params }) {
  const piece = getContentBySlug(params.slug);
  if (!piece) return { title: "Guide Not Found — Rugged" };

  return {
    title: `${piece.title} — Rugged`,
    description: piece.excerpt || piece.subtitle,
    openGraph: {
      title: piece.title,
      description: piece.excerpt || piece.subtitle,
      type: "article",
      siteName: "Rugged",
    },
  };
}

// Pre-generate paths for all content
export async function generateStaticParams() {
  const all = getAllContent();
  return all.map((piece) => ({ slug: piece.slug }));
}

export default async function GuidePage({ params }) {
  const piece = getContentBySlug(params.slug);

  if (!piece) {
    notFound();
  }

  const isFieldCard = piece.type === "field-card";
  const hasContent = piece.content && piece.content.trim().length > 0;

  // Extract table of contents from raw markdown
  let toc = [];

  if (hasContent) {
    toc = extractTOC(piece.content);
  }

  // Get related content
  const relatedCards = getRelatedContent(piece.relatedCards || []);
  const relatedGuides = getRelatedContent(piece.relatedGuides || []);
  const parentGuide = piece.parentGuide ? getContentBySlug(piece.parentGuide) : null;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: piece.title,
    description: piece.excerpt || piece.subtitle,
    datePublished: piece.date ? `${piece.date}-01` : undefined,
    dateModified: piece.lastUpdated ? `${piece.lastUpdated}-01` : undefined,
    author: {
      "@type": "Organization",
      name: "Rugged",
      url: "https://rugged.pk",
    },
    publisher: {
      "@type": "Organization",
      name: "Rugged",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="section-container py-16">
        {/* Breadcrumb */}
        <Link
          href="/guides"
          className="font-mono text-xs text-sand-500 dark:text-sand-600 no-underline
                     hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors mb-8 inline-block"
        >
          ← Back to guides
        </Link>

        {/* Field card badge */}
        {isFieldCard && (
          <span className="ml-3 text-[10px] font-mono bg-rugged-500/10 dark:bg-rugged-400/10
                           text-rugged-500 dark:text-rugged-400 px-2 py-1 rounded-sm uppercase tracking-wider">
            Field Card
          </span>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4 text-xs">
              <span className={`font-medium uppercase tracking-wide ${tagColor[piece.tag] || "text-rugged-500"}`}>
                {piece.tag}
              </span>
              <span className="text-sand-500 dark:text-sand-600 tabular-nums">{piece.date}</span>
              <span className="text-sand-500 dark:text-sand-600">{piece.readTime} read</span>
              {piece.lastUpdated && (
                <span className="text-sand-400 dark:text-sand-700 text-[11px]">
                  Updated {piece.lastUpdated}
                </span>
              )}
            </div>
            <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {piece.title}
            </h1>
            <p className="font-sans text-lg text-sand-600 dark:text-sand-500 mb-6">
              {piece.subtitle}
            </p>

            {/* Use-when for field cards */}
            {isFieldCard && piece.useWhen && (
              <p className="text-sm text-sand-600 dark:text-sand-500 mb-6 italic">
                <strong className="text-neutral-900 dark:text-sand-100 not-italic">Use this when: </strong>
                {piece.useWhen}
              </p>
            )}

            <div className="flex gap-3">
              <SaveOfflineButton slug={params.slug} />
              <button className="btn-outline text-sm">Share guide</button>
            </div>
          </div>

          {piece.sketch && (
            <div className="w-40 h-40 shrink-0 flex items-center justify-center">
              <SketchRenderer sketchKey={piece.sketch} className="w-full h-full text-neutral-700 dark:text-sand-500 opacity-60" />
            </div>
          )}
        </div>

        {/* Parent guide reference for field cards */}
        {parentGuide && (
          <div className="mb-8 text-xs text-sand-500 dark:text-sand-600">
            Part of{" "}
            <Link
              href={`/guides/${parentGuide.slug}`}
              className="text-rugged-500 dark:text-rugged-400 no-underline hover:underline"
            >
              {parentGuide.title}
            </Link>
          </div>
        )}

        {/* Table of contents */}
        {toc.length > 2 && <TableOfContents items={toc} />}

        {/* Guide content */}
        {hasContent ? (
          <GuideContent source={piece.content} />
        ) : (
          /* Placeholder for unwritten guides */
          <div className="max-w-2xl">
            <div className="py-8" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
              <p className="text-sm text-sand-600 dark:text-sand-500 leading-loose mb-6">
                This guide is under development. When complete, it will include
                illustrated step-by-step instructions with the same black and white
                sketched visuals you see throughout the site.
              </p>
              <div className="card p-5 flex gap-4 items-start">
                <span className="text-rugged-500 dark:text-rugged-400 text-lg leading-none mt-0.5">&#9673;</span>
                <div>
                  <p className="text-sm text-neutral-900 dark:text-sand-100 font-medium mb-1">
                    This {isFieldCard ? "field card" : "guide"} is being written
                  </p>
                  <p className="text-xs text-sand-600 dark:text-sand-500 leading-relaxed">
                    We're putting together the full illustrated {isFieldCard ? "card" : "guide"} now.
                    Join the forum to be notified when it's ready, or check back soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Related field cards */}
        {relatedCards.length > 0 && (
          <div className="max-w-2xl mt-12 pt-8" style={{ borderTop: "1px solid rgba(128,128,128,0.12)" }}>
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600 mb-4">
              Related Field Cards
            </p>
            <div className="space-y-2">
              {relatedCards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/guides/${card.slug}`}
                  className="flex items-center gap-3 p-3 rounded-sm no-underline
                             hover:bg-sand-100 dark:hover:bg-sand-800 transition-colors group"
                >
                  <span className="text-[10px] font-mono bg-rugged-500/10 dark:bg-rugged-400/10
                                    text-rugged-500 dark:text-rugged-400 px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0">
                    FC
                  </span>
                  <span className="text-sm text-neutral-900 dark:text-sand-100 group-hover:text-rugged-500
                                   dark:group-hover:text-rugged-400 transition-colors">
                    {card.title}
                  </span>
                  <span className="text-xs text-sand-500 dark:text-sand-600 ml-auto">{card.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <div className="max-w-2xl mt-8 pt-8" style={{ borderTop: "1px solid rgba(128,128,128,0.12)" }}>
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600 mb-4">
              Related Guides
            </p>
            <div className="space-y-2">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="flex items-center gap-3 p-3 rounded-sm no-underline
                             hover:bg-sand-100 dark:hover:bg-sand-800 transition-colors group"
                >
                  <span className="text-sm text-neutral-900 dark:text-sand-100 group-hover:text-rugged-500
                                   dark:group-hover:text-rugged-400 transition-colors">
                    {guide.title}
                  </span>
                  <span className="text-xs text-sand-500 dark:text-sand-600 ml-auto">{guide.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
