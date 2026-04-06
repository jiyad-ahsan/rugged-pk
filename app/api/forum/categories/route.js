import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const categories = await prisma.forumCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { threads: true } },
    },
  });
  return NextResponse.json(categories);
}
