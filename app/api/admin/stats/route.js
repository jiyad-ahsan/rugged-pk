import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    userCount,
    productCount,
    recentUsers,
    productsByStatus,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.product.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const statusCounts = {};
  for (const s of productsByStatus) {
    statusCounts[s.status] = s._count.status;
  }

  return NextResponse.json({
    userCount, productCount, recentUsers, statusCounts,
  });
}
