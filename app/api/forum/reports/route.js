import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reason, notes, threadId, replyId } = await req.json();

  if (!reason?.trim()) {
    return NextResponse.json({ error: "Reason is required" }, { status: 400 });
  }
  if (!threadId && !replyId) {
    return NextResponse.json({ error: "Must specify a thread or reply to report" }, { status: 400 });
  }

  // Rate limit: max 10 reports per day
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentCount = await prisma.forumReport.count({
    where: { reporterId: session.user.id, createdAt: { gte: oneDayAgo } },
  });
  if (recentCount >= 10) {
    return NextResponse.json({ error: "Too many reports today. Please try again tomorrow." }, { status: 429 });
  }

  const report = await prisma.forumReport.create({
    data: {
      reason: reason.trim(),
      notes: notes?.trim() || null,
      reporterId: session.user.id,
      threadId: threadId || null,
      replyId: replyId || null,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
