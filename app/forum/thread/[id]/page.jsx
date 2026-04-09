import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReplySection from "@/components/forum/ReplySection";
import ThreadActions from "@/components/forum/ThreadActions";

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const thread = await prisma.forumThread.findUnique({
    where: { id },
    select: { title: true },
  });
  return { title: thread ? `${thread.title} — Forum — Rugged` : "Thread — Forum — Rugged" };
}

export default async function ThreadPage({ params }) {
  const { id } = await params;

  const [session, thread] = await Promise.all([
    auth(),
    prisma.forumThread.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, displayName: true, image: true, createdAt: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    }),
  ]);

  if (!thread || thread.isHidden) notFound();

  const isMod = session?.user?.role === "MODERATOR" || session?.user?.role === "ADMIN";
  const isAuthor = session?.user?.id === thread.authorId;
  const memberSince = thread.author?.createdAt
    ? new Date(thread.author.createdAt).toLocaleDateString("en-PK", { month: "short", year: "numeric" })
    : null;

  const tagColor = {
    planning: "text-rugged-500 dark:text-rugged-400",
    "food & water": "text-cyan-700 dark:text-cyan-400",
    gear: "text-amber-800 dark:text-amber-500",
    community: "text-emerald-700 dark:text-emerald-400",
    family: "text-violet-700 dark:text-violet-400",
    medical: "text-rose-700 dark:text-rose-400",
    comms: "text-amber-800 dark:text-amber-500",
  };

  return (
    <div className="section-container py-16 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center text-xs text-sand-500 mb-8">
        <Link href="/forum" className="hover:text-rugged-500 transition-colors">Forum</Link>
        <span>/</span>
        {thread.category && (
          <>
            <span>{thread.category.name}</span>
            <span>/</span>
          </>
        )}
        <span className="text-sand-600 dark:text-sand-400 truncate">{thread.title}</span>
      </div>

      {/* Thread header */}
      <div className="mb-8">
        <div className="flex gap-4 items-center text-xs mb-3 flex-wrap">
          {thread.tag && (
            <span className={`font-medium uppercase tracking-wide ${tagColor[thread.tag] || "text-rugged-500"}`}>
              {thread.tag}
            </span>
          )}
          {thread.isPinned && (
            <span className="text-rugged-500/60 dark:text-rugged-400/60 font-medium">pinned</span>
          )}
          {thread.isLocked && (
            <span className="text-sand-500 font-medium">locked</span>
          )}
        </div>

        <h1 className="font-sans text-2xl md:text-3xl font-bold tracking-tight mb-4 text-neutral-900 dark:text-sand-100">
          {thread.title}
        </h1>

        <div className="flex gap-4 items-center text-xs text-sand-500 mb-6">
          <span className="font-medium text-neutral-800 dark:text-sand-200">
            {thread.author?.displayName || thread.author?.name || "Anonymous"}
          </span>
          {memberSince && <span>member since {memberSince}</span>}
          <span>{timeAgo(thread.createdAt)}</span>
          <span>{thread.replyCount} {thread.replyCount === 1 ? "reply" : "replies"}</span>
        </div>
      </div>

      {/* Thread body */}
      <div className="text-sm text-neutral-800 dark:text-sand-200 leading-relaxed whitespace-pre-wrap pb-6 border-b border-black/10 dark:border-white/8">
        {thread.body}
      </div>

      {/* Thread actions (report, mod controls) */}
      <ThreadActions
        threadId={thread.id}
        isPinned={thread.isPinned}
        isLocked={thread.isLocked}
        session={session ? { user: { id: session.user.id, name: session.user.name, role: session.user.role, emailVerified: session.user.emailVerified } } : null}
        isMod={isMod}
        isAuthor={isAuthor}
      />

      {/* Replies */}
      <ReplySection
        threadId={thread.id}
        isLocked={thread.isLocked}
        session={session ? { user: { id: session.user.id, name: session.user.name, role: session.user.role, emailVerified: session.user.emailVerified } } : null}
        isMod={isMod}
      />
    </div>
  );
}
