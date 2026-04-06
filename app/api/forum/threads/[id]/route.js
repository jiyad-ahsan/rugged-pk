import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;

  const thread = await prisma.forumThread.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, name: true, image: true, createdAt: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  });

  if (!thread || thread.isHidden) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  return NextResponse.json(thread);
}

export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const thread = await prisma.forumThread.findUnique({ where: { id } });

  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  const isMod = session.user.role === "MODERATOR" || session.user.role === "ADMIN";
  const isAuthor = thread.authorId === session.user.id;

  const body = await req.json();

  // Author can edit title/body within 10-minute grace window
  if (isAuthor && !isMod) {
    const graceMs = 10 * 60 * 1000;
    const withinGrace = Date.now() - new Date(thread.createdAt).getTime() < graceMs;
    if (!withinGrace) {
      return NextResponse.json({ error: "Edit window has expired" }, { status: 403 });
    }
    const data = {};
    if (body.title) data.title = body.title.trim();
    if (body.body) data.body = body.body.trim();

    const updated = await prisma.forumThread.update({ where: { id }, data });
    return NextResponse.json(updated);
  }

  // Moderator actions
  if (isMod) {
    const data = {};
    if (typeof body.isPinned === "boolean") data.isPinned = body.isPinned;
    if (typeof body.isLocked === "boolean") data.isLocked = body.isLocked;
    if (typeof body.isHidden === "boolean") data.isHidden = body.isHidden;

    const updated = await prisma.forumThread.update({ where: { id }, data });

    // Log moderation action
    const actions = [];
    if (typeof body.isPinned === "boolean") actions.push(body.isPinned ? "pin" : "unpin");
    if (typeof body.isLocked === "boolean") actions.push(body.isLocked ? "lock" : "unlock");
    if (typeof body.isHidden === "boolean") actions.push(body.isHidden ? "hide" : "unhide");

    for (const actionType of actions) {
      await prisma.moderationAction.create({
        data: {
          actorId: session.user.id,
          actionType,
          targetType: "thread",
          targetId: id,
          reason: body.reason || null,
        },
      });
    }

    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
