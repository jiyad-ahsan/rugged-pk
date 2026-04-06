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

      <NewThreadForm categories={JSON.parse(JSON.stringify(categories))} />
    </div>
  );
}
