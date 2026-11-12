import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { ACCOUNTS_ENABLED } from "@/lib/features";

export const metadata = {
  title: "Admin · Rugged",
};

export default function AdminLayout({ children }) {
  if (!ACCOUNTS_ENABLED) notFound();
  return <AdminShell>{children}</AdminShell>;
}
