import { NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session.user.email;

  // Check if already verified
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { emailVerified: true },
  });

  if (user?.emailVerified) {
    return NextResponse.json({ message: "Already verified" });
  }

  // Rate limit: don't allow resend if a code was sent less than 60 seconds ago
  const existing = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      expires: { gt: new Date(Date.now() + 9 * 60 * 1000) }, // created < 1 min ago (10min expiry - 9min = 1min window)
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Please wait before requesting a new code" },
      { status: 429 }
    );
  }

  // Clean up old codes
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Generate new code
  const code = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.verificationToken.create({
    data: { identifier: email, token: code, expires },
  });

  try {
    await sendVerificationEmail(email, code);
  } catch (err) {
    console.error("Failed to resend verification email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ message: "Code sent" });
}
