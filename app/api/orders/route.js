import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Place an order (public — guest checkout allowed)
export async function POST(req) {
  const data = await req.json();

  // Validate required fields
  if (!data.customerName?.trim() || !data.phone?.trim() || !data.city?.trim() || !data.address?.trim()) {
    return NextResponse.json({ error: "Name, phone, city, and address are required" }, { status: 400 });
  }

  if (!data.items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // Validate phone (Pakistani format)
  const phone = data.phone.trim().replace(/\s+/g, "");
  if (!/^(\+92|0)?3\d{9}$/.test(phone)) {
    return NextResponse.json({ error: "Please enter a valid Pakistani phone number" }, { status: 400 });
  }

  try {
    // Fetch only needed fields from DB to get real prices (don't trust client)
    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, status: true },
    });

    // Validate all products exist and are available
    const productMap = new Map(products.map((p) => [p.id, p]));
    const orderItems = [];

    for (const item of data.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }
      if (product.status !== "available") {
        return NextResponse.json({ error: `${product.name} is not currently available` }, { status: 400 });
      }
      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
      });
    }

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Generate order number
    const lastOrder = await prisma.order.findFirst({
      orderBy: { createdAt: "desc" },
      select: { orderNumber: true },
    });
    let nextNum = 1;
    if (lastOrder?.orderNumber) {
      const match = lastOrder.orderNumber.match(/RGD-(\d+)/);
      if (match) nextNum = parseInt(match[1], 10) + 1;
    }
    const orderNumber = `RGD-${String(nextNum).padStart(4, "0")}`;

    // Check if user is logged in
    let userId = null;
    try {
      const session = await auth();
      if (session?.user?.id) userId = session.user.id;
    } catch {}

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName.trim(),
          phone,
          city: data.city.trim(),
          address: data.address.trim(),
          notes: data.notes?.trim() || null,
          userId,
          subtotal,
          total: subtotal,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });
      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}

// List orders (admin only)
export async function GET(req) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where = {};
  if (status && status !== "ALL") where.status = status;

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: { select: { slug: true, images: true } },
        },
      },
    },
  });

  return NextResponse.json(orders);
}
