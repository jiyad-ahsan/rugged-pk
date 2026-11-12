import { notFound } from "next/navigation";
import { SHOP_ENABLED } from "@/lib/features";

export default function ShopFeatureLayout({ children }) {
  if (!SHOP_ENABLED) notFound();
  return children;
}
