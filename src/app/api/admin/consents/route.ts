import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get("admin_session");
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const consents = await prisma.consent.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ consents });
  } catch (error) {
    console.error("Error fetching consents:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
