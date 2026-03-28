import Link from "next/link";
import Divider from "@/components/Divider";

// Eventually these come from a CMS or markdown files — hardcoded for now
const featuredGuides = [
  {
    slug: "30-minute-window",
    title: "The 30-Minute Window: A Family Evacuation Plan You Can Build Tonight",
    tag: "essentials",
    date: "2026.03",
    excerpt:
      "A border escalation hits the news. Your wife calls. You have maybe 30 minutes before the roads clog. Where do you go? What do you grab? Who do you call first? This guide walks you through building a real plan — rally points, vehicle prep, the grab bag by the door — so that when the moment comes, you move instead of freeze.",
    readTime: "14 min",
  },
  {
    slug: "sattu-chana-emergency-food",
    title: "Sattu, Chana, and Staying Fed When the Supply Chain Breaks",
    tag: "food & water",
    date: "2026.02",
    excerpt:
      "Forget freeze-dried Western rations nobody here has tasted. Pakistan already has the perfect emergency foods — sattu alone can sustain you for days, costs almost nothing, and needs zero preparation. A complete guide to sourcing, storing, and rotating a local emergency food supply your family will actually eat.",
    readTime: "9 min",
  },
];

const recentDiscussions = [
  {
    id: 1,
    title: "May tensions — anyone else quietly prepping their go-bags this week?",
    author: "Kamran A.",
    time: "4 hours ago",
    replies: 73,
    tag: "planning",
  },
  {
    id: 2,
    title: "We started a 12-house cluster in North Nazimabad. Here's how we did it.",
    author: "Zainab S.",
    time: "3 days ago",
    replies: 88,
    tag: "community",
  },
  {
    id: 3,
    title: "Realistic talk: what does an actual urban conflict scenario look like for Karachi?",
    author: "Bilal F.",
    time: "5 days ago",
    replies: 134,
    tag: "planning",
  },
];

const tagColor = {
  essentials: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  comms: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  planning: "text-rugged-500 dark:text-rugged-400",
  gear: "text-amber-800 dark:text-amber-500",
};

export default function Home() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="section-container py-16 md:py-20 flex flex-col md:flex-row gap-10 items-start animate-fade-in-up">
        <div className="flex-1">
          <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-5">
            Pakistan's first preparedness brand
          </p>
          <h1 className="font-sans text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight mb-6">
            When things go wrong,
            <br />
            <span className="text-rugged-500 dark:text-rugged-400">be ready.</span>
          </h1>
          <p className="text-sm text-sand-600 dark:text-sand-500 max-w-xl leading-relaxed mb-8">
            Free guides written for our reality. A private community that takes this seriously.
            Kits packed with things that actually work here — not imported survival fantasies,
            not tacticool nonsense. Just practical readiness for Pakistani families.
          </p>
          <div className="flex gap-4 items-center">
            <Link href="/guides" className="btn-primary">
              Read the guides →
            </Link>
            <Link
              href="/shop"
              className="font-mono text-sm text-sand-600 dark:text-sand-500 
                         hover:text-neutral-900 dark:hover:text-sand-100 transition-colors"
            >
              See the kits
            </Link>
          </div>
        </div>

        <div className="w-full md:w-64 shrink-0 md:pt-8">
          <div className="card px-6 py-8">
            <span className="font-sans text-5xl font-bold text-rugged-500 dark:text-rugged-400 leading-none block mb-3">
              30
            </span>
            <span className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed">
              minutes. That's how long you have to grab your family and go if things
              escalate. Do you have a plan?
            </span>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════ FEATURED GUIDES ══════ */}
      <section className="section-container py-16 animate-fade-in-up animate-delay-100">
        <div className="flex justify-between items-baseline mb-8">
          <span className="section-title">Featured Guides</span>
          <Link
            href="/guides"
            className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="card p-7 flex flex-col justify-between no-underline group"
            >
              <div>
                <div className="flex justify-between mb-3 text-xs">
                  <span className={`font-medium uppercase tracking-wide ${tagColor[guide.tag] || "text-rugged-500"}`}>
                    {guide.tag}
                  </span>
                  <span className="text-sand-600 dark:text-sand-500 tabular-nums">
                    {guide.date}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-semibold leading-snug tracking-tight mb-2 text-neutral-900 dark:text-sand-100">
                  {guide.title}
                </h3>
                <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5">
                  {guide.excerpt}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-black/10 dark:border-white/8 text-xs">
                <span className="text-sand-600 dark:text-sand-500">{guide.readTime} read</span>
                <span className="text-rugged-500 dark:text-rugged-400 font-medium">
                  ↓ Save offline
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ══════ FORUM PREVIEW ══════ */}
      <section className="section-container py-16 animate-fade-in-up animate-delay-200">
        <div className="flex justify-between items-baseline mb-8">
          <span className="section-title">Forum</span>
          <Link
            href="/forum"
            className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
          >
            Enter discussion →
          </Link>
        </div>

        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-2xl mb-8">
          The conversations you have quietly with friends over chai — about what you'd actually
          do if things escalated, whether your neighbourhood would hold together, where you'd take
          your family — those conversations belong here.
        </p>

        <div className="flex flex-col">
          {recentDiscussions.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center py-5 border-b border-black/10 dark:border-white/8 cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex gap-5 text-xs mb-1.5">
                  <span className={`font-medium uppercase tracking-wide ${tagColor[d.tag] || "text-rugged-500"}`}>
                    {d.tag}
                  </span>
                  <span className="text-sand-600 dark:text-sand-500">{d.time}</span>
                </div>
                <h3 className="font-sans text-base font-medium leading-snug tracking-tight mb-1 text-neutral-900 dark:text-sand-100">
                  {d.title}
                </h3>
                <span className="text-xs text-sand-600 dark:text-sand-500">
                  by {d.author}
                </span>
              </div>
              <div className="text-center pl-8 shrink-0">
                <span className="font-sans text-2xl font-semibold block leading-none text-neutral-900 dark:text-sand-100">
                  {d.replies}
                </span>
                <span className="text-[0.65rem] text-sand-600 dark:text-sand-500 uppercase tracking-wider">
                  replies
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ══════ SHOP HIGHLIGHT ══════ */}
      <section className="section-container py-16 animate-fade-in-up animate-delay-300">
        <div className="flex justify-between items-baseline mb-8">
          <span className="section-title">Kits</span>
          <Link
            href="/shop"
            className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
          >
            See all kits →
          </Link>
        </div>

        {/* Just the hero product highlighted on homepage */}
        <div className="card border-2 !border-rugged-500 dark:!border-rugged-400 p-8 md:p-10 relative max-w-2xl">
          <div className="absolute -top-3 left-8 bg-rugged-500 dark:bg-rugged-400 text-white text-xs font-mono tracking-widest px-3 py-1 rounded-sm">
            ★ MOST COMPREHENSIVE
          </div>
          <span className="text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-widest font-medium">
            Complete protection
          </span>
          <h3 className="font-sans text-2xl font-bold tracking-tight mt-1 mb-1">
            Urban Conflict Kit
          </h3>
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-4">
            5+ days. Full readiness.
          </p>
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
            <span className="font-sans text-3xl font-bold tracking-tight">95,000</span>
          </div>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5 max-w-lg">
            Built for the scenario nobody wants to say out loud. Trauma-grade medical.
            Solar power that doesn't depend on anything. Extended comms. Enough to sustain
            your household while you figure out your next move.
          </p>
          <div className="text-sm text-neutral-900 dark:text-sand-100 space-y-1.5 mb-6">
            <p>· 80+ meals — 2,000 cal/person/day for a family of 4</p>
            <p>· Trauma medical — 120+ items including tourniquets and chest seals</p>
            <p>· Solar panel + power bank — daytime recharge, grid-independent</p>
          </div>
          <div className="flex gap-4">
            <Link href="/shop" className="btn-primary">
              Get the full kit →
            </Link>
            <Link href="/shop" className="font-mono text-sm text-sand-600 dark:text-sand-500 self-center">
              Compare all kits
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="bg-sand-300 dark:bg-sand-950 py-16 mt-8 transition-colors duration-300">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight mb-4">
            You don't need to buy anything. Start with the guides.
          </h2>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-8">
            Every guide on Rugged is free. No account, no email capture, no paywall. Download
            them, save them offline, share them with your family. Because the most important
            thing isn't a kit — it's having a plan before you need one.
          </p>
          <Link href="/guides" className="btn-primary">
            Read the guides →
          </Link>
        </div>
      </section>
    </>
  );
}
