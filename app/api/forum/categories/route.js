import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.forumCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { threads: true } },
    },
  });
  const res = NextResponse.json(categories);
  res.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  return res;
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  if (!data.name?.trim() || !data.slug?.trim()) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  try {
    const category = await prisma.forumCategory.create({
      data: {
        name: data.name.trim(),
        slug: data.slug.trim(),
        description: data.description?.trim() || null,
        sortOrder: data.sortOrder || 0,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "A category with that name or slug already exists" }, { status: 409 });
    }
    throw e;
  }
}
