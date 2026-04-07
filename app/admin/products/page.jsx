import prisma from "@/lib/db";
import ProductManager from "@/components/admin/ProductManager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const categories = await prisma.productCategory.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

  return <ProductManager categories={categories} />;
}
