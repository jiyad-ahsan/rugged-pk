"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { sketchMap } from "@/components/Sketches";

const allTagsList = [
  "all",
  "essentials",
  "food & water",
  "comms",
  "community",
  "medical",
  "planning",
  "resilience",
  "environment",
  "skills",
];

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

function ContentCard({ piece }) {
  const Sketch = sketchMap[piece.sketch];
  const isFieldCard = piece.type === "field-card";

  return (
    <Link
      href={`/guides/${piece.slug}`}
      className="card flex flex-col md:flex-row no-underline group overflow-hidden"
    >
      {/* Sketch illustration */}
      <div
        className={`
          ${isFieldCard ? "w-full md:w-36" : "w-full md:w-52"} shrink-0
          flex items-center justify-center
          p-6 md:p-0
          bg-sand-50 dark:bg-sand-900
          transition-colors duration-300
          relative
        `}
        style={{ borderRight: "1px solid rgba(128,128,128,0.1)" }}
      >
        {Sketch && (
          <Sketch
            className={`
              ${isFieldCard ? "w-20 h-20" : "w-28 h-28"}
              text-neutral-800 dark:text-sand-400 opacity-70
              group-hover:opacity-100 transition-opacity duration-300
            `}
          />
        )}
        {isFieldCard && (
          <span className="absolute top-2 right-2 text-[9px] font-mono bg-rugged-500/10
                           text-rugged-500 dark:text-rugged-400 px-1.5 py-0.5 rounded-sm
                           uppercase tracking-wider">
            FC
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
        <div>
          {/* Meta row */}
          <div className="flex items-center gap-4 mb-3 text-xs">
            <span className={`font-medium uppercase tracking-wide ${tagColor[piece.tag] || "text-rugged-500"}`}>
              {piece.tag}
            </span>
            <span className="text-sand-500 dark:text-sand-600 tabular-nums">
              {piece.date}
            </span>
            <span className="text-sand-500 dark:text-sand-600">
              {piece.readTime} read
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-sans text-xl font-bold leading-snug tracking-tight mb-0.5
                       text-neutral-900 dark:text-sand-100
                       group-hover:text-rugged-500 dark:group-hover:text-rugged-400 transition-colors"
          >
            {piece.title}
          </h2>
          <p className="font-sans text-sm text-sand-600 dark:text-sand-500 mb-3">
            {piece.subtitle}
          </p>

          {/* Excerpt */}
          {piece.excerpt && !isFieldCard && (
            <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-4">
              {piece.excerpt}
            </p>
          )}

          {/* Section pills (guides only) */}
          {piece.sections && piece.sections.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {piece.sections.map((section) => (
                <span
                  key={section}
                  className="text-[0.65rem] font-mono text-sand-500 dark:text-sand-600
                             px-2 py-0.5 rounded-sm"
                  style={{ background: "rgba(128,128,128,0.08)" }}
                >
                  {section}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom row */}
        <div
          className="flex justify-between items-center mt-5 pt-4 text-xs"
          style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}
        >
          <span className="text-rugged-500 dark:text-rugged-400 font-medium">
            {isFieldCard ? "View card →" : "Read guide →"}
          </span>
          <span
            className="text-rugged-500 dark:text-rugged-400 font-medium opacity-60
                       group-hover:opacity-100 transition-opacity"
          >
            ↓ Save offline
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function GuidesListing({ initialContent = [] }) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Only show tags that have content
  const activeTags = useMemo(() => {
    const tagsInUse = new Set(initialContent.map((c) => c.tag));
    return allTagsList.filter((t) => t === "all" || tagsInUse.has(t));
  }, [initialContent]);

  const hasFieldCards = initialContent.some((c) => c.type === "field-card");

  const filtered = useMemo(() => {
    const result = initialContent.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (activeTag !== "all" && c.tag !== activeTag) return false;
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        c.title?.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.excerpt?.toLowerCase().includes(q) ||
        c.tag?.toLowerCase().includes(q) ||
        c.sections?.some((s) => s.toLowerCase().includes(q))
      );
    });

    // Sort: guides first, then field cards. Within each group, by date desc.
    result.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "guide" ? -1 : 1;
      }
      return (b.date || "").localeCompare(a.date || "");
    });

    return result;
  }, [initialContent, search, activeTag, typeFilter]);

  // Split for section headers
  const filteredGuides = filtered.filter((c) => c.type === "guide");
  const filteredCards = filtered.filter((c) => c.type === "field-card");

  // All content for sidebar (unfiltered, always visible)
  const allGuides = useMemo(
    () => initialContent.filter((c) => c.type === "guide").sort((a, b) => (b.date || "").localeCompare(a.date || "")),
    [initialContent]
  );
  const allFieldCards = useMemo(
    () => initialContent.filter((c) => c.type === "field-card").sort((a, b) => (a.title || "").localeCompare(b.title || "")),
    [initialContent]
  );

  return (
    <div className="section-container py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
          Guides
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Learn first. Buy later.
          <br />
          <span className="text-sand-600 dark:text-sand-500">Or never.</span>
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-lg">
          Every guide is free, no account required. Download them for offline access —
          because the moment you need this information is the moment the internet might not be there.
        </p>
      </div>

      {/* Two-column layout: sidebar + main */}
      <div className="flex gap-10">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-8"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Guides list */}
            <p className="font-mono text-[0.6rem] uppercase tracking-widest text-sand-500 mb-2">
              Guides ({allGuides.length})
            </p>
            <nav className="space-y-0.5 mb-6">
              {allGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="block text-xs text-sand-600 dark:text-sand-500 no-underline
                             hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors
                             py-1.5 leading-snug"
                >
                  {g.title}
                </Link>
              ))}
            </nav>

            {/* Field cards list */}
            {allFieldCards.length > 0 && (
              <>
                <div className="mb-2" style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }} />
                <p className="font-mono text-[0.6rem] uppercase tracking-widest text-sand-500 mb-2 mt-3">
                  Field Cards ({allFieldCards.length})
                </p>
                <nav className="space-y-0.5">
                  {allFieldCards.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/guides/${c.slug}`}
                      className="flex items-center gap-2 text-xs text-sand-600 dark:text-sand-500 no-underline
                                 hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors
                                 py-1.5 leading-snug"
                    >
                      <span className="text-[7px] font-mono text-rugged-500/50 dark:text-rugged-400/50 uppercase tracking-widest shrink-0">
                        FC
                      </span>
                      {c.title}
                    </Link>
                  ))}
                </nav>
              </>
            )}
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-500 dark:text-sand-600 text-sm pointer-events-none">
                &#8981;
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides — try 'water', 'evacuation', 'walkie-talkie'..."
                className="
                  w-full font-mono text-sm
                  bg-sand-100 dark:bg-sand-800
                  text-neutral-900 dark:text-sand-100
                  placeholder-sand-500 dark:placeholder-sand-600
                  pl-10 pr-4 py-3 rounded-sm
                  outline-none
                  transition-colors duration-200
                "
                style={{ border: "1px solid rgba(128,128,128,0.2)" }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-500 hover:text-neutral-900
                             dark:hover:text-sand-100 text-sm cursor-pointer bg-transparent border-none"
                >
                  &#10005;
                </button>
              )}
            </div>
          </div>

          {/* Type toggle */}
          {hasFieldCards && (
            <div className="flex gap-2 mb-4">
              {["all", "guide", "field-card"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`
                    font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
                    ${typeFilter === t
                      ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900"
                      : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                    }
                  `}
                  style={typeFilter !== t ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
                >
                  {t === "all" ? "All" : t === "guide" ? "Guides" : "Field Cards"}
                </button>
              ))}
            </div>
          )}

          {/* Tag filters */}
          <div className="flex gap-2.5 mb-8 flex-wrap">
            {activeTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`
                  font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
                  ${activeTag === tag
                    ? "bg-rugged-500 dark:bg-rugged-400 text-white border border-rugged-500 dark:border-rugged-400"
                    : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                  }
                `}
                style={activeTag !== tag ? { border: "1px solid rgba(128,128,128,0.2)" } : {}}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(search || activeTag !== "all" || typeFilter !== "all") && (
            <p className="text-xs text-sand-500 dark:text-sand-600 mb-6">
              {filtered.length} {filtered.length === 1 ? "result" : "results"} found
              {search && <span> for &ldquo;{search}&rdquo;</span>}
              {activeTag !== "all" && <span> in {activeTag}</span>}
            </p>
          )}

          {/* Content */}
          {filtered.length > 0 ? (
            <div>
              {/* Guides section */}
              {filteredGuides.length > 0 && (
                <div className="mb-10">
                  {(typeFilter === "all" && filteredCards.length > 0) && (
                    <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sand-500 mb-4">
                      Guides ({filteredGuides.length})
                    </p>
                  )}
                  <div className="space-y-5">
                    {filteredGuides.map((piece) => (
                      <ContentCard key={piece.slug} piece={piece} />
                    ))}
                  </div>
                </div>
              )}

              {/* Field cards section */}
              {filteredCards.length > 0 && (
                <div>
                  {(typeFilter === "all" && filteredGuides.length > 0) && (
                    <div className="mb-6 mt-4 pt-6" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
                      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sand-500">
                        Field Cards ({filteredCards.length})
                      </p>
                      <p className="text-xs text-sand-500 mt-1">
                        Quick-reference cards — print them, laminate them, keep them in your kit.
                      </p>
                    </div>
                  )}
                  <div className="space-y-4">
                    {filteredCards.map((piece) => (
                      <ContentCard key={piece.slug} piece={piece} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-sm text-sand-600 dark:text-sand-500 mb-2">
                No {typeFilter === "field-card" ? "field cards" : "guides"} found
                {search ? ` for "${search}"` : ""}.
              </p>
              <p className="text-xs text-sand-500 dark:text-sand-600">
                Try a different search term or{" "}
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveTag("all");
                    setTypeFilter("all");
                  }}
                  className="text-rugged-500 dark:text-rugged-400 bg-transparent border-none
                             cursor-pointer font-mono underline"
                >
                  clear all filters
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
