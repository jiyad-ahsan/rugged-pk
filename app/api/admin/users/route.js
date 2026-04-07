import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, role } = await req.json();

  if (!userId || !["USER", "MODERATOR", "ADMIN"].includes(role)) {
    return NextResponse.json({ error: "Invalid user or role" }, { status: 400 });
  }

  // Prevent demoting yourself
  if (userId === session.user.id && role !== "ADMIN") {
    return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json(user);
}
