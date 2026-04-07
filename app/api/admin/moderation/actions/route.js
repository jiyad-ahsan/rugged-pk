import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !["ADMIN", "MODERATOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const actions = await prisma.moderationAction.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      actor: { select: { name: true, email: true } },
    },
  });

  return NextResponse.json(actions);
}
