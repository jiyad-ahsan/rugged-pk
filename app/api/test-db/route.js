import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ ok: true, userCount: count });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err.message, name: err.name },
      { status: 500 }
    );
  }
}
