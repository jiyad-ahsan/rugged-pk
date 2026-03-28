const discussions = [
  {
    id: 1,
    title: "May tensions — anyone else quietly prepping their go-bags this week?",
    author: "Kamran A.",
    time: "4 hours ago",
    replies: 73,
    tag: "planning",
    pinned: true,
  },
  {
    id: 2,
    title: "Tried storing sattu for 6 months — here's what worked and what went rancid",
    author: "Amna R.",
    time: "1 day ago",
    replies: 52,
    tag: "food & water",
  },
  {
    id: 3,
    title: "Baofeng vs local brand walkies — real range test from Gulshan to Saddar",
    author: "Hassan M.",
    time: "2 days ago",
    replies: 41,
    tag: "gear",
  },
  {
    id: 4,
    title: "We started a 12-house cluster in North Nazimabad. Here's how we did it.",
    author: "Zainab S.",
    time: "3 days ago",
    replies: 88,
    tag: "community",
  },
  {
    id: 5,
    title: "Realistic talk: what does an actual urban conflict scenario look like for Karachi?",
    author: "Bilal F.",
    time: "5 days ago",
    replies: 134,
    tag: "planning",
  },
  {
    id: 6,
    title: "Generator vs solar vs power bank — which makes sense for a flat in Gulshan?",
    author: "Danish K.",
    time: "1 week ago",
    replies: 67,
    tag: "gear",
  },
  {
    id: 7,
    title: "Teaching my kids about emergency plans without scaring them",
    author: "Sara A.",
    time: "1 week ago",
    replies: 45,
    tag: "family",
  },
  {
    id: 8,
    title: "Water storage in Karachi heat — what containers actually work?",
    author: "Owais T.",
    time: "2 weeks ago",
    replies: 38,
    tag: "food & water",
  },
];

const tagColor = {
  planning: "text-rugged-500 dark:text-rugged-400",
  "food & water": "text-cyan-700 dark:text-cyan-400",
  gear: "text-amber-800 dark:text-amber-500",
  community: "text-emerald-700 dark:text-emerald-400",
  family: "text-violet-700 dark:text-violet-400",
};

export const metadata = {
  title: "Forum — Rugged",
  description: "Private, encrypted discussions about real preparedness for Pakistani families.",
};

export default function ForumPage() {
  return (
    <div className="section-container py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="font-mono text-xs text-rugged-500 dark:text-rugged-400 uppercase tracking-wider mb-4">
          Forum
        </p>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-4">
          The conversation nobody
          <br />
          <span className="text-sand-600 dark:text-sand-500">else is having.</span>
        </h1>
        <p className="text-sm text-sand-600 dark:text-sand-500 leading-relaxed max-w-xl">
          The conversations you have quietly with friends over chai — about what you'd
          actually do if things escalated, whether your neighbourhood would hold together,
          where you'd take your family — those conversations belong here. Private, encrypted,
          and away from the noise of social media.
        </p>
      </div>

      {/* Topic filters — stub */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {["all topics", "planning", "food & water", "gear", "community", "family", "medical"].map(
          (tag) => (
            <button
              key={tag}
              className={`
                font-mono text-xs px-3 py-1.5 rounded-sm border cursor-pointer transition-all
                ${tag === "all topics"
                  ? "bg-rugged-500 dark:bg-rugged-400 text-white border-rugged-500 dark:border-rugged-400"
                  : "bg-transparent text-sand-600 dark:text-sand-500 border-black/15 dark:border-white/10 hover:border-black/30 dark:hover:border-white/20"
                }
              `}
            >
              {tag}
            </button>
          )
        )}
      </div>

      {/* New thread button */}
      <div className="mb-8">
        <button className="btn-outline text-sm">
          + Start a thread
        </button>
      </div>

      {/* Threads */}
      <div className="flex flex-col">
        {discussions.map((d) => (
          <div
            key={d.id}
            className="flex justify-between items-center py-5 border-b border-black/10 dark:border-white/8 cursor-pointer 
                       hover:bg-sand-100/50 dark:hover:bg-sand-800/30 -mx-4 px-4 transition-colors rounded-sm"
          >
            <div className="flex-1">
              <div className="flex gap-5 items-center text-xs mb-1.5">
                <span className={`font-medium uppercase tracking-wide ${tagColor[d.tag] || "text-rugged-500"}`}>
                  {d.tag}
                </span>
                {d.pinned && (
                  <span className="text-rugged-500/60 dark:text-rugged-400/60 font-medium">
                    📌 pinned
                  </span>
                )}
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
    </div>
  );
}
