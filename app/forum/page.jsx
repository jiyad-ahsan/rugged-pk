import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import ThreadList from "@/components/forum/ThreadList";

export const metadata = {
  title: "Forum — Rugged",
  description: "Private, practical discussions about real preparedness for Pakistani families.",
};

export const dynamic = "force-dynamic";

export default async function ForumPage() {
  let session = null;
  let categories = [];
  try {
    [session, categories] = await Promise.all([
      auth(),
      prisma.forumCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);
  } catch {
    session = await auth();
  }

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
          where you'd take your family — those conversations belong here. Private and
          away from the noise of social media.
        </p>
      </div>

      <ThreadList
        categories={JSON.parse(JSON.stringify(categories))}
        session={session ? { user: { id: session.user.id, name: session.user.name, role: session.user.role } } : null}
      />
    </div>
  );
}
