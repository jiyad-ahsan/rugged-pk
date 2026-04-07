import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Admin — Rugged",
};

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="section-container py-12">
      <div className="flex items-center gap-6 mb-8 pb-4" style={{ borderBottom: "1px solid rgba(128,128,128,0.15)" }}>
        <Link href="/admin/products" className="text-xs font-mono uppercase tracking-wider text-sand-600 dark:text-sand-500 hover:text-rugged-500 dark:hover:text-rugged-400 transition-colors">
          Products
        </Link>
      </div>
      {children}
    </div>
  );
}
