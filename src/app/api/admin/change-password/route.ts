import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto";

// Hash password with SHA-256
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("admin_session");

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Oturum bulunamadı" },
        { status: 401 }
      );
    }

    const { username, currentPassword, newPassword } = await request.json();

    if (!username || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Tüm alanlar gerekli" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Yeni şifre en az 6 karakter olmalı" },
        { status: 400 }
      );
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Verify current password
    const hashedCurrentPassword = hashPassword(currentPassword);
    if (admin.password !== hashedCurrentPassword) {
      return NextResponse.json(
        { error: "Mevcut şifre hatalı" },
        { status: 401 }
      );
    }

    // Update password
    const hashedNewPassword = hashPassword(newPassword);
    await prisma.admin.update({
      where: { username },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({ success: true, message: "Şifre başarıyla değiştirildi" });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Şifre değiştirme sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
