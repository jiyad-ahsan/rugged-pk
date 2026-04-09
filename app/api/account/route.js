import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

// Get current user profile
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, displayName: true, email: true },
  });

  return NextResponse.json(user);
}

// Update display name
export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { displayName } = await req.json();

  // Allow clearing display name (set to null)
  const cleaned = displayName?.trim() || null;

  if (cleaned && cleaned.length > 30) {
    return NextResponse.json({ error: "Display name must be 30 characters or less" }, { status: 400 });
  }

  if (cleaned && cleaned.length < 2) {
    return NextResponse.json({ error: "Display name must be at least 2 characters" }, { status: 400 });
  }

  // Basic filter — no special characters that could break UI
  if (cleaned && !/^[\w\s.\-]+$/i.test(cleaned)) {
    return NextResponse.json({ error: "Display name can only contain letters, numbers, spaces, dots and hyphens" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { displayName: cleaned },
    select: { id: true, name: true, displayName: true },
  });

  return NextResponse.json(user);
}
