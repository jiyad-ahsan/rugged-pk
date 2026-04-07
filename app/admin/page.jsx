import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [
    userCount,
    productCount,
    threadCount,
    replyCount,
    openReportCount,
    recentUsers,
    recentThreads,
    productsByStatus,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.forumThread.count({ where: { isHidden: false } }),
    prisma.forumReply.count({ where: { isHidden: false } }),
    prisma.forumReport.count({ where: { status: "open" } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.forumThread.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      where: { isHidden: false },
      select: {
        id: true, title: true, createdAt: true, replyCount: true,
        author: { select: { name: true } },
        category: { select: { name: true } },
      },
    }),
    prisma.product.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const statusCounts = {};
  for (const s of productsByStatus) {
    statusCounts[s.status] = s._count.status;
  }

  const stats = [
    { label: "Users", value: userCount, href: "/admin/users", color: "text-sky-600 dark:text-sky-400" },
    { label: "Products", value: productCount, href: "/admin/products", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Threads", value: threadCount, href: null, color: "text-violet-600 dark:text-violet-400" },
    { label: "Replies", value: replyCount, href: null, color: "text-amber-600 dark:text-amber-400" },
    { label: "Open Reports", value: openReportCount, href: "/admin/moderation", color: openReportCount > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400" },
  ];

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
        <p className="text-sm text-sand-500">Overview of your site activity.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map((stat) => {
          const inner = (
            <div className="card p-5 text-center">
              <span className={`font-sans text-3xl font-bold tracking-tight block mb-1 ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-sand-500">
                {stat.label}
              </span>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href} className="no-underline hover:scale-[1.02] transition-transform">
              {inner}
            </Link>
          ) : (
            <div key={stat.label}>{inner}</div>
          );
        })}
      </div>

      {/* Product status breakdown */}
      <div className="card p-6 mb-8">
        <h2 className="font-sans text-sm font-semibold mb-4">Product Status</h2>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Available: {statusCounts.available || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Coming Soon: {statusCounts.coming_soon || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-sm text-sand-600 dark:text-sand-500">Sold Out: {statusCounts.sold_out || 0}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-sans text-sm font-semibold">Recent Users</h2>
            <Link href="/admin/users" className="text-xs text-rugged-500 hover:text-rugged-600 no-underline">
              View all →
            </Link>
          </div>
          <div className="space-y-0">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between py-2.5"
                style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-sand-200 dark:bg-sand-700 flex items-center justify-center text-xs font-semibold text-sand-600 dark:text-sand-400 shrink-0">
                    {(user.name || user.email)?.[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-neutral-900 dark:text-sand-100 block truncate">
                      {user.name || "—"}
                    </span>
                    <span className="text-xs text-sand-500 truncate block">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-1.5 py-0.5 rounded-sm ${
                    user.role === "ADMIN" ? "text-rugged-500 bg-rugged-500/10" :
                    user.role === "MODERATOR" ? "text-violet-600 bg-violet-500/10" :
                    "text-sand-500 bg-sand-200 dark:bg-sand-700"
                  }`}>
                    {user.role}
                  </span>
                  <span className="text-[0.6rem] text-sand-500 tabular-nums">{timeAgo(user.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent threads */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-sans text-sm font-semibold">Recent Threads</h2>
            <Link href="/forum" className="text-xs text-rugged-500 hover:text-rugged-600 no-underline">
              View forum →
            </Link>
          </div>
          <div className="space-y-0">
            {recentThreads.map((thread) => (
              <div
                key={thread.id}
                className="py-2.5"
                style={{ borderBottom: "1px solid rgba(128,128,128,0.08)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/forum/thread/${thread.id}`}
                      className="text-sm font-medium text-neutral-900 dark:text-sand-100 hover:text-rugged-500 no-underline block truncate"
                    >
                      {thread.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-sand-500">{thread.author?.name}</span>
                      <span className="text-xs text-sand-500">in {thread.category?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-sand-500 tabular-nums">{thread.replyCount} replies</span>
                    <span className="text-[0.6rem] text-sand-500 tabular-nums">{timeAgo(thread.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
