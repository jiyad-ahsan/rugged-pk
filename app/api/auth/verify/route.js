import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { code } = await request.json();
  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const token = await prisma.verificationToken.findFirst({
    where: {
      identifier: session.user.email,
      token: code,
      expires: { gt: new Date() },
    },
  });

  if (!token) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: token.identifier,
        token: token.token,
      },
    },
  });

  return NextResponse.json({ message: "Email verified" });
}
