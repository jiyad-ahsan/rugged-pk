import Link from "next/link";
import Divider from "@/components/Divider";
import prisma from "@/lib/db";

const featuredGuides = [
  {
    slug: "30-minute-window",
    title: "The 30-Minute Window",
    tag: "essentials",
    excerpt: "Build a family evacuation plan — rally points, grab bag, vehicle prep — in one evening.",
    readTime: "14 min",
  },
  {
    slug: "sattu-chana-emergency-food",
    title: "Emergency Food That Actually Works Here",
    tag: "food & water",
    excerpt: "Sattu, chana, and local staples that cost almost nothing, last months, and need zero prep.",
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

export const revalidate = 60;

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
    // Database not available
  }

  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="section-container py-16 md:py-24 flex flex-col md:flex-row gap-10 items-start animate-fade-in-up">
        <div className="flex-1">
          <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-5">
            Pakistan's first preparedness brand
          </p>
          <h1 className="font-sans text-4xl md:text-5xl font-bold leading-[1.12] tracking-tight mb-6">
            When things go wrong,
            <br />
            <span className="text-rugged-500 dark:text-rugged-400">be ready.</span>
          </h1>
          <p className="text-sm text-sand-600 dark:text-sand-500 max-w-md leading-relaxed mb-8">
            Free guides, practical kits, and a community — built for Pakistani families who want a plan before they need one.
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
              minutes to grab your family and go. Do you have a plan?
            </span>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════ FEATURED GUIDES ══════ */}
      <section className="section-container py-14 animate-fade-in-up animate-delay-100">
        <div className="flex justify-between items-baseline mb-6">
          <span className="section-title">Guides</span>
          <Link
            href="/guides"
            className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="card p-6 flex flex-col justify-between no-underline group"
            >
              <div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className={`font-medium uppercase tracking-wide ${tagColor[guide.tag] || "text-rugged-500"}`}>
                    {guide.tag}
                  </span>
                  <span className="text-sand-500">{guide.readTime}</span>
                </div>
                <h3 className="font-sans text-lg font-semibold leading-snug tracking-tight mb-1.5 text-neutral-900 dark:text-sand-100">
                  {guide.title}
                </h3>
                <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed">
                  {guide.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-sand-500 mt-4">
          All guides are free. No login required.
        </p>
      </section>

      <Divider />

      {/* ══════ KIT HIGHLIGHT ══════ */}
      <section className="section-container py-14 animate-fade-in-up animate-delay-200">
        <div className="flex justify-between items-baseline mb-6">
          <span className="section-title">Kits</span>
          <Link
            href="/shop"
            className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
          >
            See all →
          </Link>
        </div>

        <div className="card border-2 !border-rugged-500 dark:!border-rugged-400 p-7 md:p-8 relative max-w-xl">
          <div className="absolute -top-3 left-6 bg-rugged-500 dark:bg-rugged-400 text-white text-xs font-mono tracking-widest px-3 py-1 rounded-sm">
            START HERE
          </div>
          <h3 className="font-sans text-xl font-bold tracking-tight mt-1 mb-1">
            Starter Kit
          </h3>
          <p className="text-sm text-sand-600 dark:text-sand-500 mb-3">
            72 hours. One person. Everything in a grab bag.
          </p>
          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-sm text-sand-600 dark:text-sand-500">Rs.</span>
            <span className="font-sans text-2xl font-bold tracking-tight">10,000</span>
          </div>
          <div className="text-sm text-sand-600 dark:text-sand-500 space-y-1 mb-5">
            <p>· 9 meals, water purification, LED torch</p>
            <p>· First aid kit, document safe, canvas bag</p>
          </div>
          <Link href="/shop/starter-kit" className="btn-primary text-sm">
            View kit →
          </Link>
        </div>
      </section>

      <Divider />

      {/* ══════ FORUM PREVIEW ══════ */}
      {recentThreads.length > 0 && (
        <>
          <section className="section-container py-14 animate-fade-in-up animate-delay-300">
            <div className="flex justify-between items-baseline mb-6">
              <span className="section-title">Community</span>
              <Link
                href="/forum"
                className="text-sm text-rugged-500 dark:text-rugged-400 no-underline font-medium"
              >
                Join →
              </Link>
            </div>

            <div className="flex flex-col">
              {recentThreads.map((t) => (
                <Link
                  key={t.id}
                  href={`/forum/thread/${t.id}`}
                  className="flex justify-between items-center py-4 border-b border-black/10 dark:border-white/8
                             hover:bg-sand-100/50 dark:hover:bg-sand-800/30 -mx-4 px-4 transition-colors rounded-sm no-underline"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-4 text-xs mb-1">
                      {t.tag && (
                        <span className={`font-medium uppercase tracking-wide ${tagColor[t.tag] || "text-rugged-500"}`}>
                          {t.tag}
                        </span>
                      )}
                      <span className="text-sand-500">{timeAgo(t.lastActivityAt)}</span>
                    </div>
                    <h3 className="font-sans text-sm font-medium leading-snug tracking-tight text-neutral-900 dark:text-sand-100">
                      {t.title}
                    </h3>
                  </div>
                  <div className="text-center pl-6 shrink-0">
                    <span className="font-sans text-lg font-semibold block leading-none text-neutral-900 dark:text-sand-100">
                      {t.replyCount}
                    </span>
                    <span className="text-[0.6rem] text-sand-500 uppercase tracking-wider">
                      {t.replyCount === 1 ? "reply" : "replies"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <Divider />
        </>
      )}

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="bg-sand-300 dark:bg-sand-950 py-14 transition-colors duration-300">
        <div className="max-w-md mx-auto text-center px-6">
          <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tight mb-3">
            Start with the guides. They're free.
          </h2>
          <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed mb-6">
            No account required. No email capture. Read them, save them, share them with your family.
          </p>
          <Link href="/guides" className="btn-primary">
            Read the guides →
          </Link>
        </div>
      </section>
    </>
  );
}
