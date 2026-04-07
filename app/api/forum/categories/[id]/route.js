import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

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
  if (data.description !== undefined) updateData.description = data.description?.trim() || null;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder, 10) || 0;

  try {
    const category = await prisma.forumCategory.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(category);
  } catch (e) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "A category with that name or slug already exists" }, { status: 409 });
    }
    throw e;
  }
}

export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const threadCount = await prisma.forumThread.count({ where: { categoryId: id } });
  if (threadCount > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${threadCount} thread(s) still in this category. Move them first.` },
      { status: 400 }
    );
  }

  await prisma.forumCategory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
