import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(request) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findFirst({
    where: {
      token,
      identifier: { startsWith: "reset:" },
      expires: { gt: new Date() },
    },
  });

  if (!record) {
    return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
  }

  const email = record.identifier.replace("reset:", "");
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { email },
    data: { password: hashed },
  });

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: record.identifier,
        token: record.token,
      },
    },
  });

  return NextResponse.json({ message: "Password updated" });
}
