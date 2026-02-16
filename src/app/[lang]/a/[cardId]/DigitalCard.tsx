"use client";

import { useState } from "react";
import { type translations } from "@/lib/i18n";
import type { CardFormData } from "@/types";
import CardPreview from "@/components/CardPreview";
import QRModal from "@/components/QRModal";

type T = (typeof translations)["tr"];

interface CardData {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  title?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  address?: string | null;
  bio?: string | null;
  theme: string;
  primaryColor: string;
  photoUrl?: string | null;
  backgroundColor?: string | null;
  gradientIntensity?: number | null;
  layout?: string | null;
  viewCount: number;
}

interface Props {
  card: CardData;
  lang: string;
  t: T;
}

export default function DigitalCard({ card, lang, t }: Props) {
  const [showQR, setShowQR] = useState(false);
  const isDark = card.theme === "dark";
  const isGradient = card.theme === "gradient";

  const bgStyle = isGradient
    ? { background: `linear-gradient(135deg, ${card.primaryColor}ee 0%, ${card.primaryColor}99 100%)` }
    : {};

  const bgClass = isDark ? "bg-gray-900" : isGradient ? "" : "bg-gray-50";

  const handleDownloadVCard = () => {
    window.open(`/api/vcard/${card.slug}`, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.firstName} ${card.lastName}`,
          text: card.bio ?? `${card.title ?? ""} ${card.company ? `- ${card.company}` : ""}`,
          url: window.location.href,
        });
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(lang === "tr" ? "Link kopyalandı!" : "Link copied!");
  };

  // Convert CardData to CardFormData format for CardPreview
  const cardFormData: CardFormData = {
    firstName: card.firstName,
    lastName: card.lastName,
    title: card.title || undefined,
    company: card.company || undefined,
    email: card.email || undefined,
    phone: card.phone || undefined,
    website: card.website || undefined,
    linkedin: card.linkedin || undefined,
    twitter: card.twitter || undefined,
    instagram: card.instagram || undefined,
    address: card.address || undefined,
    bio: card.bio || undefined,
    theme: card.theme as any,
    primaryColor: card.primaryColor,
    backgroundColor: card.backgroundColor || undefined,
    gradientIntensity: card.gradientIntensity || 50,
    photoUrl: card.photoUrl || undefined,
    layout: (card.layout as any) || "classic",
  };

  return (
    <div
      className={`min-h-screen ${bgClass} flex flex-col items-center justify-center p-4`}
      style={bgStyle}
    >
      {/* Card Preview Component */}
      <CardPreview
        card={cardFormData}
        lang={lang}
        t={t}
      />

      {/* Bottom Actions - Outside card */}
      <div className="w-full max-w-sm mt-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleDownloadVCard}
            className="col-span-3 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 shadow-lg"
            style={{ backgroundColor: card.primaryColor }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {t.downloadVCard}
          </button>
          <button
            onClick={() => setShowQR(true)}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors shadow-md ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 bg-gray-800"
                : isGradient
                ? "border-white/30 text-white hover:bg-white/10 bg-white/5"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span className="hidden sm:inline">QR</span>
          </button>
          <button
            onClick={handleShare}
            className={`col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors shadow-md ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 bg-gray-800"
                : isGradient
                ? "border-white/30 text-white hover:bg-white/10 bg-white/5"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {t.shareCard}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className={`text-xs ${isDark || isGradient ? "text-gray-400" : "text-gray-500"}`}>
            {t.digitalCardBy}
          </p>
          <a
            href={`/${lang}/create`}
            className="text-xs font-semibold mt-1 inline-block hover:underline"
            style={{ color: card.primaryColor }}
          >
            nfckart.com
          </a>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && typeof window !== "undefined" && (
        <QRModal
          url={window.location.href}
          title={t.qrCodeTitle}
          label={t.scanQR}
          onClose={() => setShowQR(false)}
          primaryColor={card.primaryColor}
        />
      )}
    </div>
  );
}
