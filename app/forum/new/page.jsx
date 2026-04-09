import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import NewThreadForm from "@/components/forum/NewThreadForm";

export const metadata = {
  title: "New Thread — Forum — Rugged",
};

export default async function NewThreadPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/forum/new");

  // Check email verification
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });

  const categories = await prisma.forumCategory.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="section-container py-16 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex gap-2 items-center text-xs text-sand-500 mb-8">
        <Link href="/forum" className="hover:text-rugged-500 transition-colors">Forum</Link>
        <span>/</span>
        <span className="text-sand-600 dark:text-sand-400">New thread</span>
      </div>

      <h1 className="font-sans text-2xl font-bold tracking-tight mb-8 text-neutral-900 dark:text-sand-100">
        Start a new thread
      </h1>

      {user?.emailVerified ? (
        <NewThreadForm categories={JSON.parse(JSON.stringify(categories))} />
      ) : (
        <div className="text-center py-8 px-4 border border-amber-300 dark:border-amber-700 rounded-sm bg-amber-50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
            Please verify your email before creating threads.
          </p>
          <Link href="/verify" className="btn-primary text-sm px-6 py-2 no-underline inline-block">
            Verify email
          </Link>
        </div>
      )}
    </div>
  );
}
