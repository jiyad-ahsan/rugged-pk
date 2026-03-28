"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SketchBackpack,
  SketchFood,
  SketchRadio,
  SketchHouses,
  SketchMedical,
  SketchWater,
  SketchShelter,
} from "@/components/Sketches";

const guides = [
  {
    slug: "30-minute-window",
    title: "The 30-Minute Window",
    subtitle: "A Family Evacuation Plan You Can Build Tonight",
    tag: "essentials",
    date: "2026.03",
    excerpt:
      "A border escalation hits the news. Your wife calls. You have maybe 30 minutes before the roads clog. Where do you go? What do you grab? Who do you call first?",
    readTime: "14 min",
    sketch: "backpack",
    sections: ["Rally points", "Vehicle prep", "Grab bag checklist", "Communication tree"],
  },
  {
    slug: "sattu-chana-emergency-food",
    title: "Sattu, Chana, and Staying Fed",
    subtitle: "When the Supply Chain Breaks",
    tag: "food & water",
    date: "2026.02",
    excerpt:
      "Forget freeze-dried Western rations nobody here has tasted. Pakistan already has the perfect emergency foods — sattu alone can sustain you for days and costs almost nothing.",
    readTime: "9 min",
    sketch: "food",
    sections: ["Why local foods win", "Sourcing guide", "Storage & rotation", "Calorie planning"],
  },
  {
    slug: "towers-go-down",
    title: "When the Towers Go Down",
    subtitle: "Emergency Comms for Pakistani Families",
    tag: "comms",
    date: "2026.01",
    excerpt:
      "During the 2024 internet shutdowns, most families had no way to reach each other beyond shouting distance. Cell towers get overloaded in minutes during a crisis.",
    readTime: "11 min",
    sketch: "radio",
    sections: ["Walkie-talkie selection", "Frequency planning", "Family check-in protocol", "Mesh networks"],
  },
  {
    slug: "neighbourhood-cluster",
    title: "Your Street Is Your First Responder",
    subtitle: "Building a Neighbourhood Cluster",
    tag: "community",
    date: "2026.01",
    excerpt:
      "In every crisis Pakistan has faced, it was neighbours who showed up first — not services, not government. This guide helps you build that into something deliberate.",
    readTime: "16 min",
    sketch: "houses",
    sections: ["Starting the conversation", "Skills mapping", "WhatsApp tree setup", "Mutual aid agreements"],
  },
  {
    slug: "water-when-taps-stop",
    title: "Water When the Taps Stop",
    subtitle: "Purification, Storage, and Rationing for Karachi",
    tag: "food & water",
    date: "2025.12",
    excerpt:
      "Karachi's water supply is fragile on a good day. In a crisis, it's the first utility to fail. Three purification methods using materials from any local market, plus how much you actually need per person.",
    readTime: "10 min",
    sketch: "water",
    sections: ["Daily water needs", "Purification methods", "Storage in heat", "Rationing protocol"],
  },
  {
    slug: "trauma-first-aid",
    title: "Trauma First Aid",
    subtitle: "What to Do Before the Ambulance That Isn't Coming",
    tag: "medical",
    date: "2025.12",
    excerpt:
      "In an urban conflict scenario, professional medical help may be hours away or not coming at all. Tourniquet application, wound packing, and keeping someone stable — skills that save lives when the system can't.",
    readTime: "18 min",
    sketch: "medical",
    sections: ["Tourniquet basics", "Wound packing", "Chest seal application", "Shock management"],
  },
  {
    slug: "shelter-in-place",
    title: "Shelter in Place",
    subtitle: "When Leaving Isn't an Option",
    tag: "essentials",
    date: "2025.11",
    excerpt:
      "Sometimes the safest move is no move at all. How to fortify your home for a multi-day lockdown — securing entry points, managing power and water, keeping your family calm, and knowing when it's finally time to go.",
    readTime: "13 min",
    sketch: "shelter",
    sections: ["Home security basics", "Resource management", "Information gathering", "Decision framework"],
  },
];

const allTags = ["all", ...Array.from(new Set(guides.map((g) => g.tag)))];

const tagColor = {
  essentials: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  comms: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  medical: "text-rose-700 dark:text-rose-400",
};

const sketchComponents = {
  backpack: SketchBackpack,
  food: SketchFood,
  radio: SketchRadio,
  houses: SketchHouses,
  medical: SketchMedical,
  water: SketchWater,
  shelter: SketchShelter,
};

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      const matchTag = activeTag === "all" || g.tag === activeTag;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.tag.toLowerCase().includes(q) ||
        g.sections.some((s) => s.toLowerCase().includes(q));
      return matchTag && matchSearch;
    });
  }, [search, activeTag]);

  return (
    <div className="section-container py-16">
      {/* ══════ HEADER ══════ */}
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

      {/* ══════ SEARCH ══════ */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-500 dark:text-sand-600 text-sm pointer-events-none">
            ⌕
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
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ══════ TAG FILTERS ══════ */}
      <div className="flex gap-2.5 mb-10 flex-wrap">
        {allTags.map((tag) => (
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

      {/* ══════ RESULTS COUNT ══════ */}
      {(search || activeTag !== "all") && (
        <p className="text-xs text-sand-500 dark:text-sand-600 mb-6">
          {filtered.length} {filtered.length === 1 ? "guide" : "guides"} found
          {search && <span> for "{search}"</span>}
          {activeTag !== "all" && <span> in {activeTag}</span>}
        </p>
      )}

      {/* ══════ GUIDE CARDS ══════ */}
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((guide) => {
            const Sketch = sketchComponents[guide.sketch];
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card flex flex-col md:flex-row no-underline group overflow-hidden"
              >
                {/* Sketch illustration */}
                <div className="
                  w-full md:w-52 shrink-0 
                  flex items-center justify-center
                  p-6 md:p-0
                  bg-sand-50 dark:bg-sand-900
                  transition-colors duration-300
                "
                  style={{ borderRight: "1px solid rgba(128,128,128,0.1)" }}
                >
                  {Sketch && (
                    <Sketch className="w-28 h-28 text-neutral-800 dark:text-sand-400 opacity-70 
                                       group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                  <div>
                    {/* Meta row */}
                    <div className="flex items-center gap-4 mb-3 text-xs">
                      <span className={`font-medium uppercase tracking-wide ${tagColor[guide.tag] || "text-rugged-500"}`}>
                        {guide.tag}
                      </span>
                      <span className="text-sand-500 dark:text-sand-600 tabular-nums">
                        {guide.date}
                      </span>
                      <span className="text-sand-500 dark:text-sand-600">
                        {guide.readTime} read
                      </span>
                    </div>

                    {/* Title block */}
                    <h2 className="font-sans text-xl font-bold leading-snug tracking-tight mb-0.5 
                                   text-neutral-900 dark:text-sand-100
                                   group-hover:text-rugged-500 dark:group-hover:text-rugged-400 transition-colors">
                      {guide.title}
                    </h2>
                    <p className="font-sans text-sm text-sand-600 dark:text-sand-500 mb-3">
                      {guide.subtitle}
                    </p>

                    {/* Excerpt */}
                    <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-4">
                      {guide.excerpt}
                    </p>

                    {/* Section pills */}
                    <div className="flex flex-wrap gap-2">
                      {guide.sections.map((section) => (
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
                  </div>

                  {/* Bottom row */}
                  <div className="flex justify-between items-center mt-5 pt-4 text-xs"
                       style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}>
                    <span className="text-rugged-500 dark:text-rugged-400 font-medium">
                      Read guide →
                    </span>
                    <span className="text-rugged-500 dark:text-rugged-400 font-medium opacity-60 
                                     group-hover:opacity-100 transition-opacity">
                      ↓ Save offline
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-2">
            No guides found{search ? ` for "${search}"` : ""}.
          </p>
          <p className="text-xs text-sand-500 dark:text-sand-600">
            Try a different search term or{" "}
            <button
              onClick={() => {
                setSearch("");
                setActiveTag("all");
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
  );
}
