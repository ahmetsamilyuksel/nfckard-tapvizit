import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    // Simple admin check via header
    const adminKey = req.headers.get("x-admin-key");
    if (adminKey !== (process.env.ADMIN_PASSWORD ?? "admin123")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { card: { select: { slug: true, firstName: true, lastName: true } } },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Order not found or error occurred" }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      card: {
        select: {
          slug: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Return public data only (use type assertion for new fields that may not exist in older records)
  const orderData = order as Record<string, unknown>;
  return NextResponse.json({
    id: order.id,
    status: order.status,
    cardType: order.cardType,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    currency: orderData.currency || "RUB",
    paymentMethod: orderData.paymentMethod || "card",
    paymentStatus: orderData.paymentStatus || "PENDING",
    customerName: order.customerName,
    trackingNumber: orderData.trackingNumber || null,
    createdAt: order.createdAt,
    card: order.card,
  });
}
