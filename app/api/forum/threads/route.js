import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get("categoryId");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort") || "activity"; // activity | newest
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;

  const where = { isHidden: false };
  if (categoryId) where.categoryId = categoryId;
  if (tag) where.tag = tag;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { body: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy =
    sort === "newest"
      ? { createdAt: "desc" }
      : { lastActivityAt: "desc" };

  const [threads, total] = await Promise.all([
    prisma.forumThread.findMany({
      where,
      orderBy: [{ isPinned: "desc" }, orderBy],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, name: true, image: true } },
        category: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.forumThread.count({ where }),
  ]);

  const res = NextResponse.json({ threads, total, page, totalPages: Math.ceil(total / limit) });
  res.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
  return res;
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Require email verification to post
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });
  if (!user?.emailVerified) {
    return NextResponse.json({ error: "Please verify your email before posting" }, { status: 403 });
  }

  const { title, body, categoryId, tag } = await req.json();

  if (!title?.trim() || !body?.trim() || !categoryId) {
    return NextResponse.json({ error: "Title, body, and category are required" }, { status: 400 });
  }

  if (title.trim().length > 200) {
    return NextResponse.json({ error: "Title must be under 200 characters" }, { status: 400 });
  }

  // Rate limit: max 5 threads per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentCount = await prisma.forumThread.count({
    where: { authorId: session.user.id, createdAt: { gte: oneHourAgo } },
  });
  if (recentCount >= 5) {
    return NextResponse.json({ error: "Too many threads. Please wait before posting again." }, { status: 429 });
  }

  const thread = await prisma.forumThread.create({
    data: {
      title: title.trim(),
      body: body.trim(),
      categoryId,
      tag: tag?.trim() || null,
      authorId: session.user.id,
    },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  return NextResponse.json(thread, { status: 201 });
}
