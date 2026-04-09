import Link from "next/link";
import Divider from "@/components/Divider";
import prisma from "@/lib/db";

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

const tagColor = {
  essentials: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  comms: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  planning: "text-rugged-500 dark:text-rugged-400",
  gear: "text-amber-800 dark:text-amber-500",
  family: "text-violet-700 dark:text-violet-400",
  medical: "text-rose-700 dark:text-rose-400",
};

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  return new Date(date).toLocaleDateString("en-PK", { day: "numeric", month: "short" });
}

export const revalidate = 60; // regenerate every 60 seconds

export default async function Home() {
  let recentThreads = [];
  try {
    recentThreads = await prisma.forumThread.findMany({
      where: { isHidden: false },
      orderBy: { lastActivityAt: "desc" },
      take: 3,
      select: {
        id: true, title: true, tag: true, replyCount: true, lastActivityAt: true,
        author: { select: { name: true, displayName: true } },
      },
    });
  } catch {
    // Database not available — show nothing
  }

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
            Most Pakistani families have no plan. No supplies. No idea where to start.
            Rugged changes that — with free guides written for our conditions, a community
            of people who take this seriously, and kits built from what actually works here.
            Not imported fantasy. Practical readiness, starting today.
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

        {recentThreads.length > 0 ? (
          <div className="flex flex-col">
            {recentThreads.map((t) => (
              <Link
                key={t.id}
                href={`/forum/thread/${t.id}`}
                className="flex justify-between items-center py-5 border-b border-black/10 dark:border-white/8
                           hover:bg-sand-100/50 dark:hover:bg-sand-800/30 -mx-4 px-4 transition-colors rounded-sm no-underline"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex gap-5 text-xs mb-1.5">
                    {t.tag && (
                      <span className={`font-medium uppercase tracking-wide ${tagColor[t.tag] || "text-rugged-500"}`}>
                        {t.tag}
                      </span>
                    )}
                    <span className="text-sand-600 dark:text-sand-500">{timeAgo(t.lastActivityAt)}</span>
                  </div>
                  <h3 className="font-sans text-base font-medium leading-snug tracking-tight mb-1 text-neutral-900 dark:text-sand-100">
                    {t.title}
                  </h3>
                  <span className="text-xs text-sand-600 dark:text-sand-500">
                    by {t.author?.displayName || t.author?.name || "Anonymous"}
                  </span>
                </div>
                <div className="text-center pl-8 shrink-0">
                  <span className="font-sans text-2xl font-semibold block leading-none text-neutral-900 dark:text-sand-100">
                    {t.replyCount}
                  </span>
                  <span className="text-[0.65rem] text-sand-600 dark:text-sand-500 uppercase tracking-wider">
                    {t.replyCount === 1 ? "reply" : "replies"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-sand-500 py-4">Conversations coming soon.</p>
        )}
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
            ★ START HERE
          </div>
          <span className="text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-widest font-medium">
            Essential readiness
          </span>
          <h3 className="font-sans text-2xl font-bold tracking-tight mt-1 mb-1">
            Starter Kit
          </h3>
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-4">
            72 hours. One person.
          </p>
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
            <span className="font-sans text-3xl font-bold tracking-tight">10,000</span>
          </div>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-5 max-w-lg">
            Everything one person needs to survive 72 hours with no infrastructure.
            Packed in a grab-and-go canvas bag that lives by your front door.
          </p>
          <div className="text-sm text-neutral-900 dark:text-sand-100 space-y-1.5 mb-6">
            <p>· 9 meals — 1,800+ cal/day, shelf-stable local foods</p>
            <p>· Water purification for 72L (3 days drinking + cooking)</p>
            <p>· LED torch + 48-hour battery supply</p>
            <p>· First aid kit — 35+ components</p>
            <p>· Waterproof document safe</p>
            <p>· Canvas grab bag — ready to move</p>
          </div>
          <div className="flex gap-4">
            <Link href="/shop/starter-kit" className="btn-primary">
              View kit →
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
