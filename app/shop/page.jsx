import prisma from "@/lib/db";
import ShopListing from "@/components/shop/ShopListing";

export const metadata = {
  title: "Shop — Rugged",
  description: "Preparedness kits and individual gear built for Pakistani families. Local foods, reliable power, real medical supplies.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products = [];
  let categories = [];

  try {
    products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { category: { select: { name: true, slug: true } } },
    });

    categories = await prisma.productCategory.findMany({
      orderBy: { sortOrder: "asc" },
      select: { name: true, slug: true },
    });
  } catch {
    // Database unavailable
  }

  return <ShopListing products={products} categories={categories} />;
}
