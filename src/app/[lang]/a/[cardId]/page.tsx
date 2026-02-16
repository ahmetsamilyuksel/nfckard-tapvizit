import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import DigitalCard from "./DigitalCard";

interface Props {
  params: Promise<{ lang: string; cardId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, cardId } = await params;
  const t = getTranslations(lang);

  const card = await prisma.card.findUnique({
    where: { slug: cardId, isActive: true },
  });

  if (!card) {
    return { title: "Kart Bulunamadı" };
  }

  return {
    title: `${card.firstName} ${card.lastName} | ${t.siteName}`,
    description: card.bio ?? `${card.firstName} ${card.lastName} - ${card.title ?? ""} ${card.company ?? ""}`,
    openGraph: {
      title: `${card.firstName} ${card.lastName}`,
      description: card.bio ?? `${card.title ?? ""} at ${card.company ?? ""}`,
    },
  };
}

export default async function DigitalCardPage({ params }: Props) {
  const { lang, cardId } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;

  const card = await prisma.card.findUnique({
    where: { slug: cardId, isActive: true },
  });

  if (!card) {
    notFound();
  }

  // Increment view count
  await prisma.card.update({
    where: { id: card.id },
    data: { viewCount: { increment: 1 } },
  });

  const t = getTranslations(locale);

  return <DigitalCard card={card} lang={locale} t={t} />;
}
