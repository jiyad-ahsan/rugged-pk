import Link from "next/link";
import { SketchBackpack, SketchFood, SketchRadio, SketchHouses, SketchMedical, SketchWater, SketchShelter } from "@/components/Sketches";

// This will eventually come from markdown/CMS — hardcoded sample for now
const guideData = {
  "30-minute-window": {
    title: "The 30-Minute Window",
    subtitle: "A Family Evacuation Plan You Can Build Tonight",
    tag: "essentials",
    date: "2026.03",
    readTime: "14 min",
    sketch: "backpack",
  },
  "sattu-chana-emergency-food": {
    title: "Sattu, Chana, and Staying Fed",
    subtitle: "When the Supply Chain Breaks",
    tag: "food & water",
    date: "2026.02",
    readTime: "9 min",
    sketch: "food",
  },
  "towers-go-down": {
    title: "When the Towers Go Down",
    subtitle: "Emergency Comms for Pakistani Families",
    tag: "comms",
    date: "2026.01",
    readTime: "11 min",
    sketch: "radio",
  },
  "neighbourhood-cluster": {
    title: "Your Street Is Your First Responder",
    subtitle: "Building a Neighbourhood Cluster",
    tag: "community",
    date: "2026.01",
    readTime: "16 min",
    sketch: "houses",
  },
  "water-when-taps-stop": {
    title: "Water When the Taps Stop",
    subtitle: "Purification, Storage, and Rationing for Karachi",
    tag: "food & water",
    date: "2025.12",
    readTime: "10 min",
    sketch: "water",
  },
  "trauma-first-aid": {
    title: "Trauma First Aid",
    subtitle: "What to Do Before the Ambulance That Isn't Coming",
    tag: "medical",
    date: "2025.12",
    readTime: "18 min",
    sketch: "medical",
  },
  "shelter-in-place": {
    title: "Shelter in Place",
    subtitle: "When Leaving Isn't an Option",
    tag: "essentials",
    date: "2025.11",
    readTime: "13 min",
    sketch: "shelter",
  },
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

const tagColor = {
  essentials: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  comms: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  medical: "text-rose-700 dark:text-rose-400",
};

export default function GuidePage({ params }) {
  const guide = guideData[params.slug];

  if (!guide) {
    return (
      <div className="section-container py-16 text-center">
        <p className="text-sm text-sand-600 dark:text-sand-500">Guide not found.</p>
        <Link href="/guides" className="text-sm text-rugged-500 dark:text-rugged-400 no-underline mt-4 inline-block">
          ← Back to guides
        </Link>
      </div>
    );
  }

  const Sketch = sketchComponents[guide.sketch];

  return (
    <article className="section-container py-16">
      {/* Breadcrumb */}
      <Link
        href="/guides"
        className="font-mono text-xs text-sand-500 dark:text-sand-600 no-underline 
                   hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors mb-8 inline-block"
      >
        ← Back to guides
      </Link>

      {/* Header with sketch */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4 text-xs">
            <span className={`font-medium uppercase tracking-wide ${tagColor[guide.tag] || "text-rugged-500"}`}>
              {guide.tag}
            </span>
            <span className="text-sand-500 dark:text-sand-600 tabular-nums">{guide.date}</span>
            <span className="text-sand-500 dark:text-sand-600">{guide.readTime} read</span>
          </div>
          <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {guide.title}
          </h1>
          <p className="font-sans text-lg text-sand-600 dark:text-sand-500 mb-6">
            {guide.subtitle}
          </p>
          <div className="flex gap-3">
            <button className="btn-primary text-sm">↓ Download for offline</button>
            <button className="btn-outline text-sm">Share guide</button>
          </div>
        </div>
        {Sketch && (
          <div className="w-40 h-40 shrink-0 flex items-center justify-center">
            <Sketch className="w-full h-full text-neutral-700 dark:text-sand-500 opacity-60" />
          </div>
        )}
      </div>

      {/* ══════ GUIDE CONTENT PLACEHOLDER ══════ */}
      {/* This is where actual guide content will go — shown here as a template */}
      <div className="max-w-2xl">
        <div className="py-8" style={{ borderTop: "1px solid rgba(128,128,128,0.15)" }}>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-loose mb-6">
            This guide is under development. When complete, it will include
            illustrated step-by-step instructions with the same black and white
            sketched visuals you see throughout the site.
          </p>

          {/* Example of how inline illustrations would work */}
          <div className="card p-6 mb-8">
            <p className="font-sans text-xs font-medium uppercase tracking-wider text-sand-500 dark:text-sand-600 mb-4">
              How guide content will look
            </p>

            {/* Sample section with inline sketch */}
            <div className="flex gap-6 items-start mb-6 pb-6" style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                <SketchBackpack className="w-full h-full text-neutral-700 dark:text-sand-500 opacity-50" />
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold mb-1 text-neutral-900 dark:text-sand-100">
                  Step 1: The Grab Bag
                </h3>
                <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed">
                  Keep a packed bag by your front door. Not in a cupboard, not in the
                  bedroom — by the door. A canvas drawstring bag works. Inside: documents
                  pouch, three days of sattu and dried fruit, water purification tabs,
                  torch, batteries, Rs. 20,000 cash in small notes.
                </p>
              </div>
            </div>

            {/* Sample section with inline sketch */}
            <div className="flex gap-6 items-start mb-6 pb-6" style={{ borderBottom: "1px solid rgba(128,128,128,0.1)" }}>
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                <SketchRadio className="w-full h-full text-neutral-700 dark:text-sand-500 opacity-50" />
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold mb-1 text-neutral-900 dark:text-sand-100">
                  Step 2: The Call Tree
                </h3>
                <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed">
                  Who do you call first? Not fifteen people — three. Your spouse, one
                  family member who knows the plan, one neighbour in your cluster. Each
                  of them has their own three. Within two minutes, twelve people know
                  you're moving. Pre-agree a walkie-talkie channel as backup.
                </p>
              </div>
            </div>

            {/* Full-width illustration example */}
            <div className="bg-sand-50 dark:bg-sand-900 rounded-sm p-8 flex flex-col items-center text-center transition-colors duration-300">
              <SketchHouses className="w-48 h-36 text-neutral-700 dark:text-sand-500 opacity-50 mb-4" />
              <p className="font-mono text-xs text-sand-500 dark:text-sand-600 italic max-w-sm">
                Your neighbourhood cluster: three houses, one agreement, a shared 
                WhatsApp group. That's all it takes to not be alone when it matters.
              </p>
            </div>
          </div>

          {/* Notification */}
          <div className="card p-5 flex gap-4 items-start">
            <span className="text-rugged-500 dark:text-rugged-400 text-lg leading-none mt-0.5">◉</span>
            <div>
              <p className="text-sm text-neutral-900 dark:text-sand-100 font-medium mb-1">
                This guide is being written
              </p>
              <p className="text-xs text-sand-600 dark:text-sand-500 leading-relaxed">
                We're putting together the full illustrated guide now. Join the forum
                to be notified when it's ready, or check back soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
