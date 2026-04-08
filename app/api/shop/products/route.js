import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const isKit = searchParams.get("kit");
  const status = searchParams.get("status");

  const where = {};
  if (categorySlug) {
    const cat = await prisma.productCategory.findUnique({ where: { slug: categorySlug } });
    if (cat) where.categoryId = cat.id;
  }
  if (isKit === "true") where.isKit = true;
  if (isKit === "false") where.isKit = false;
  if (status) where.status = status;

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { category: { select: { name: true, slug: true } } },
  });

  const res = NextResponse.json(products);
  res.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=120");
  return res;
}

// Admin: create product
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  if (!data.name?.trim() || !data.slug?.trim() || !data.price || !data.categoryId) {
    return NextResponse.json({ error: "Name, slug, price, and category are required" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name: data.name.trim(),
      slug: data.slug.trim(),
      subtitle: data.subtitle?.trim() || null,
      description: data.description?.trim() || null,
      price: parseInt(data.price, 10),
      comparePrice: data.comparePrice ? parseInt(data.comparePrice, 10) : null,
      categoryId: data.categoryId,
      badge: data.badge?.trim() || null,
      status: data.status || "coming_soon",
      isKit: data.isKit || false,
      isFeatured: data.isFeatured || false,
      kitHighlight: data.kitHighlight?.trim() || null,
      items: data.items || [],
      images: data.images || [],
      sortOrder: data.sortOrder || 0,
    },
    include: { category: { select: { name: true, slug: true } } },
  });

  return NextResponse.json(product, { status: 201 });
}
