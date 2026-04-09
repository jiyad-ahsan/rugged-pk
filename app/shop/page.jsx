import prisma from "@/lib/db";
import ShopListing from "@/components/shop/ShopListing";

export const metadata = {
  title: "Shop — Rugged",
  description: "Preparedness kits and individual gear built for Pakistani families. Local foods, reliable power, real medical supplies.",
};

export const revalidate = 60; // regenerate every 60 seconds

export default async function ShopPage() {
  let products = [];
  let categories = [];

  try {
    products = await prisma.product.findMany({
      where: { status: { not: "draft" } },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: {
        id: true, name: true, slug: true, subtitle: true, description: true,
        price: true, comparePrice: true, badge: true, status: true,
        isKit: true, items: true, images: true, sortOrder: true,
        category: { select: { name: true, slug: true } },
      },
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
