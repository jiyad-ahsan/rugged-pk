import { notFound } from "next/navigation";
import { ACCOUNTS_ENABLED } from "@/lib/features";

export default function AccountsFeatureLayout({ children }) {
  if (!ACCOUNTS_ENABLED) notFound();
  return children;
}
