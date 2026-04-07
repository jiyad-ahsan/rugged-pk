import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Admin: update product
export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const data = await req.json();

  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name.trim();
  if (data.slug !== undefined) updateData.slug = data.slug.trim();
  if (data.subtitle !== undefined) updateData.subtitle = data.subtitle?.trim() || null;
  if (data.description !== undefined) updateData.description = data.description?.trim() || null;
  if (data.price !== undefined) updateData.price = parseInt(data.price, 10);
  if (data.comparePrice !== undefined) updateData.comparePrice = data.comparePrice ? parseInt(data.comparePrice, 10) : null;
  if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
  if (data.badge !== undefined) updateData.badge = data.badge?.trim() || null;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.isKit !== undefined) updateData.isKit = data.isKit;
  if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured;
  if (data.kitHighlight !== undefined) updateData.kitHighlight = data.kitHighlight?.trim() || null;
  if (data.items !== undefined) updateData.items = data.items;
  if (data.images !== undefined) updateData.images = data.images;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: { select: { name: true, slug: true } } },
  });

  return NextResponse.json(product);
}

// Admin: delete product
export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
