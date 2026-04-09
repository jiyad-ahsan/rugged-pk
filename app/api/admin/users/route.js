import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, password, role } = await req.json();

  if (!email?.trim() || !password?.trim()) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const validRoles = ["USER", "MODERATOR", "ADMIN"];
  const userRole = validRoles.includes(role) ? role : "USER";

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: name?.trim() || null,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: userRole,
      emailVerified: new Date(), // admin-created users are pre-verified
    },
    select: {
      id: true, name: true, email: true, role: true, createdAt: true, emailVerified: true,
    },
  });

  return NextResponse.json(user, { status: 201 });
}

export async function PATCH(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, role, action } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Handle verify/unverify action
  if (action === "verify" || action === "unverify") {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: action === "verify" ? new Date() : null },
      select: { id: true, name: true, email: true, role: true, emailVerified: true },
    });
    return NextResponse.json(user);
  }

  // Handle role change
  if (!role || !["USER", "MODERATOR", "ADMIN"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  // Prevent demoting yourself
  if (userId === session.user.id && role !== "ADMIN") {
    return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, name: true, email: true, role: true, emailVerified: true },
  });

  return NextResponse.json(user);
}
