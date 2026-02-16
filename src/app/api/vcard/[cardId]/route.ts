import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await params;

  const card = await prisma.card.findUnique({
    where: { slug: cardId, isActive: true },
  });

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.firstName} ${card.lastName}`,
    `N:${card.lastName};${card.firstName};;;`,
  ];

  if (card.title || card.company) {
    if (card.title) lines.push(`TITLE:${card.title}`);
    if (card.company) lines.push(`ORG:${card.company}`);
  }

  // Add photo if available (base64 data URL)
  if (card.photoUrl && card.photoUrl.startsWith("data:image")) {
    const base64Data = card.photoUrl.split(",")[1];
    lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${base64Data}`);
  }

  if (card.email) lines.push(`EMAIL:${card.email}`);
  if (card.phone) lines.push(`TEL;TYPE=CELL:${card.phone}`);
  if (card.website) {
    const url = card.website.startsWith("http") ? card.website : `https://${card.website}`;
    lines.push(`URL:${url}`);
  }
  if (card.address) lines.push(`ADR;TYPE=WORK:;;${card.address};;;;`);

  if (card.linkedin) {
    const handle = card.linkedin.replace("@", "");
    lines.push(`X-SOCIALPROFILE;type=linkedin:https://linkedin.com/in/${handle}`);
  }
  if (card.twitter) {
    const handle = card.twitter.replace("@", "");
    lines.push(`X-SOCIALPROFILE;type=twitter:https://twitter.com/${handle}`);
  }
  if (card.instagram) {
    const handle = card.instagram.replace("@", "");
    lines.push(`X-SOCIALPROFILE;type=instagram:https://instagram.com/${handle}`);
  }

  if (card.bio) {
    lines.push(`NOTE:${card.bio.replace(/\n/g, "\\n")}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  lines.push(`X-DIGITALCARD:${baseUrl}/tr/a/${card.slug}`);

  lines.push(`REV:${new Date().toISOString()}`);
  lines.push("END:VCARD");

  const vcardContent = lines.join("\r\n");
  const filename = `${card.firstName}-${card.lastName}.vcf`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_.]/g, "");

  return new NextResponse(vcardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard;charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
