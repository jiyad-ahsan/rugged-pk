import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// GET: list open reports (mod/admin only)
export async function GET(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "MODERATOR" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || "open";

  const reports = await prisma.forumReport.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      reporter: { select: { id: true, name: true } },
      resolver: { select: { id: true, name: true } },
      thread: { select: { id: true, title: true, authorId: true } },
      reply: { select: { id: true, body: true, authorId: true, threadId: true } },
    },
  });

  return NextResponse.json(reports);
}

// POST: resolve a report (mod/admin only)
export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "MODERATOR" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { reportId, status, reason } = await req.json();

  if (!reportId || !["resolved", "dismissed"].includes(status)) {
    return NextResponse.json({ error: "Invalid report ID or status" }, { status: 400 });
  }

  const report = await prisma.forumReport.update({
    where: { id: reportId },
    data: {
      status,
      resolverId: session.user.id,
      resolvedAt: new Date(),
    },
  });

  await prisma.moderationAction.create({
    data: {
      actorId: session.user.id,
      actionType: `report_${status}`,
      targetType: report.threadId ? "thread" : "reply",
      targetId: report.threadId || report.replyId,
      reason: reason || null,
    },
  });

  return NextResponse.json(report);
}
