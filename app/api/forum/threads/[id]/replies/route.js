import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = 30;

  const [replies, total] = await Promise.all([
    prisma.forumReply.findMany({
      where: { threadId: id, isHidden: false },
      orderBy: { createdAt: "asc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    }),
    prisma.forumReply.count({ where: { threadId: id, isHidden: false } }),
  ]);

  const res = NextResponse.json({ replies, total, page, totalPages: Math.ceil(total / limit) });
  res.headers.set("Cache-Control", "public, s-maxage=15, stale-while-revalidate=30");
  return res;
}

export async function POST(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: threadId } = await params;

  const thread = await prisma.forumThread.findUnique({ where: { id: threadId } });
  if (!thread || thread.isHidden) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }
  if (thread.isLocked) {
    return NextResponse.json({ error: "This thread is locked" }, { status: 403 });
  }

  const { body } = await req.json();
  if (!body?.trim()) {
    return NextResponse.json({ error: "Reply body is required" }, { status: 400 });
  }

  // Rate limit: max 10 replies per minute
  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
  const recentCount = await prisma.forumReply.count({
    where: { authorId: session.user.id, createdAt: { gte: oneMinuteAgo } },
  });
  if (recentCount >= 10) {
    return NextResponse.json({ error: "Too many replies. Please slow down." }, { status: 429 });
  }

  const [reply] = await prisma.$transaction([
    prisma.forumReply.create({
      data: {
        body: body.trim(),
        threadId,
        authorId: session.user.id,
      },
      include: {
        author: { select: { id: true, name: true, image: true } },
      },
    }),
    prisma.forumThread.update({
      where: { id: threadId },
      data: {
        replyCount: { increment: 1 },
        lastActivityAt: new Date(),
      },
    }),
  ]);

  return NextResponse.json(reply, { status: 201 });
}
