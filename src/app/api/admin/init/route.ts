import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Hash password with SHA-256
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// This endpoint creates the initial admin user
// Only run this once, then delete or protect this endpoint
export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin kullanıcı zaten mevcut" },
        { status: 400 }
      );
    }

    // Create initial admin with username and password: Ahmet123
    const hashedPassword = hashPassword("Ahmet123");

    await prisma.admin.create({
      data: {
        username: "Ahmet123",
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin kullanıcı oluşturuldu. Kullanıcı adı ve şifre: Ahmet123"
    });
  } catch (error) {
    console.error("Init admin error:", error);
    return NextResponse.json(
      { error: "Admin oluşturma sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
