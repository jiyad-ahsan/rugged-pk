import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const reply = await prisma.forumReply.findUnique({ where: { id } });

  if (!reply) {
    return NextResponse.json({ error: "Reply not found" }, { status: 404 });
  }

  const isMod = session.user.role === "MODERATOR" || session.user.role === "ADMIN";
  const isAuthor = reply.authorId === session.user.id;
  const body = await req.json();

  // Author edit within grace window
  if (isAuthor && !isMod) {
    const graceMs = 10 * 60 * 1000;
    const withinGrace = Date.now() - new Date(reply.createdAt).getTime() < graceMs;
    if (!withinGrace) {
      return NextResponse.json({ error: "Edit window has expired" }, { status: 403 });
    }
    if (!body.body?.trim()) {
      return NextResponse.json({ error: "Reply body is required" }, { status: 400 });
    }
    const updated = await prisma.forumReply.update({
      where: { id },
      data: { body: body.body.trim() },
    });
    return NextResponse.json(updated);
  }

  // Moderator: hide/unhide
  if (isMod && typeof body.isHidden === "boolean") {
    const updated = await prisma.forumReply.update({
      where: { id },
      data: { isHidden: body.isHidden },
    });

    await prisma.moderationAction.create({
      data: {
        actorId: session.user.id,
        actionType: body.isHidden ? "hide" : "unhide",
        targetType: "reply",
        targetId: id,
        reason: body.reason || null,
      },
    });

    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
