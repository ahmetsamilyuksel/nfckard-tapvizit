import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug, getPriceByCardType } from "@/lib/utils";
import type { CardFormData, OrderFormData } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cardData, orderData }: { cardData: CardFormData; orderData: OrderFormData } = body;

    if (!cardData.firstName?.trim() || !cardData.lastName?.trim()) {
      return NextResponse.json({ error: "First and last name are required" }, { status: 400 });
    }

    if (!orderData.customerEmail?.trim() || !orderData.customerName?.trim() || !orderData.shippingAddress?.trim()) {
      return NextResponse.json({ error: "Customer info and shipping address are required" }, { status: 400 });
    }

    // Generate unique slug
    let slug = generateSlug(cardData.firstName, cardData.lastName);
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.card.findUnique({ where: { slug } });
      if (!existing) break;
      slug = generateSlug(cardData.firstName, cardData.lastName);
      attempts++;
    }

    const price = getPriceByCardType(orderData.cardType) * (orderData.quantity || 1);

    const card = await prisma.card.create({
      data: {
        slug,
        firstName: cardData.firstName.trim(),
        lastName: cardData.lastName.trim(),
        title: cardData.title?.trim() || null,
        company: cardData.company?.trim() || null,
        email: cardData.email?.trim() || null,
        phone: cardData.phone?.trim() || null,
        website: cardData.website?.trim() || null,
        linkedin: cardData.linkedin?.trim() || null,
        twitter: cardData.twitter?.trim() || null,
        instagram: cardData.instagram?.trim() || null,
        whatsapp: cardData.whatsapp?.trim() || null,
        telegram: cardData.telegram?.trim() || null,
        vkontakte: cardData.vkontakte?.trim() || null,
        vkmax: cardData.vkmax?.trim() || null,
        tiktok: cardData.tiktok?.trim() || null,
        wechat: cardData.wechat?.trim() || null,
        youtube: cardData.youtube?.trim() || null,
        facebook: cardData.facebook?.trim() || null,
        snapchat: cardData.snapchat?.trim() || null,
        address: cardData.address?.trim() || null,
        bio: cardData.bio?.trim() || null,
        theme: cardData.theme || "dark",
        primaryColor: cardData.primaryColor || "#0ea5e9",
        backgroundColor: cardData.backgroundColor || null,
        gradientIntensity: cardData.gradientIntensity || 50,
        layout: cardData.layout || "classic",
        photoUrl: cardData.photoUrl || null,
        order: {
          create: {
            quantity: orderData.quantity || 1,
            cardType: orderData.cardType || "standard",
            status: "PENDING",
            totalPrice: price,
            customerName: orderData.customerName.trim(),
            customerEmail: orderData.customerEmail.trim(),
            customerPhone: orderData.customerPhone?.trim() || null,
            shippingAddress: orderData.shippingAddress.trim(),
            notes: orderData.notes?.trim() || null,
          },
        },
      },
      include: { order: true },
    });

    return NextResponse.json({
      success: true,
      cardId: card.id,
      slug: card.slug,
      orderId: card.order?.id,
    });
  } catch (error) {
    console.error("Error creating card:", error);

    // Check for Prisma validation errors
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Handle common validation errors with user-friendly messages
    if (
      errorMessage.includes("Invalid") ||
      errorMessage.includes("pattern") ||
      errorMessage.includes("expected") ||
      errorMessage.includes("match") ||
      errorMessage.includes("format")
    ) {
      console.error("Validation error detected:", errorMessage);
      return NextResponse.json({
        error: "VALIDATION_ERROR",
        message: "invalidFormat"
      }, { status: 400 });
    }

    // Return generic error
    console.error("Server error:", errorMessage);
    return NextResponse.json({
      error: "SERVER_ERROR",
      message: "serverError"
    }, { status: 500 });
  }
}
