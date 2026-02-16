"use client";

import { useState } from "react";
import { type translations } from "@/lib/i18n";
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
  const cardBg = isDark ? "bg-gray-800" : isGradient ? "bg-white/10 backdrop-blur-sm" : "bg-white";
  const textPrimary = isDark || isGradient ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : isGradient ? "text-white/80" : "text-gray-500";
  const dividerColor = isDark ? "border-gray-700" : isGradient ? "border-white/20" : "border-gray-200";
  const iconBg = isDark ? "bg-gray-700" : isGradient ? "bg-white/20" : "bg-gray-100";

  const initials = `${card.firstName.charAt(0)}${card.lastName.charAt(0)}`.toUpperCase();

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

  return (
    <div
      className={`min-h-screen ${bgClass} flex items-center justify-center p-4`}
      style={bgStyle}
    >
      <div className={`w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl ${cardBg}`}>
        {/* Top accent bar */}
        <div className="h-2" style={{ backgroundColor: card.primaryColor }} />

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg"
              style={{ backgroundColor: card.primaryColor }}
            >
              {card.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={card.photoUrl} alt="profile" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                initials
              )}
            </div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>
              {card.firstName} {card.lastName}
            </h1>
            {card.title && (
              <p className={`text-sm font-medium mt-1 ${textSecondary}`}>{card.title}</p>
            )}
            {card.company && (
              <p className="text-sm font-semibold mt-0.5" style={{ color: card.primaryColor }}>
                {card.company}
              </p>
            )}
            {card.bio && (
              <p className={`text-sm mt-3 leading-relaxed text-center ${textSecondary}`}>
                {card.bio}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-5">
            {card.phone && (
              <a
                href={`tel:${card.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: card.primaryColor }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t.callNow}
              </a>
            )}
            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-colors ${
                  isDark
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                    : isGradient
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.sendEmail}
              </a>
            )}
          </div>

          {/* Contact Details */}
          <div className={`rounded-2xl p-4 space-y-3 ${isDark ? "bg-gray-700/50" : isGradient ? "bg-white/10" : "bg-gray-50"}`}>
            {card.phone && (
              <ContactItem
                href={`tel:${card.phone}`}
                label={t.phone}
                value={card.phone}
                color={card.primaryColor}
                iconBg={iconBg}
                textSecondary={textSecondary}
                textPrimary={textPrimary}
                icon="phone"
              />
            )}
            {card.email && (
              <ContactItem
                href={`mailto:${card.email}`}
                label={t.email}
                value={card.email}
                color={card.primaryColor}
                iconBg={iconBg}
                textSecondary={textSecondary}
                textPrimary={textPrimary}
                icon="email"
              />
            )}
            {card.website && (
              <ContactItem
                href={card.website.startsWith("http") ? card.website : `https://${card.website}`}
                label={t.website}
                value={card.website.replace(/^https?:\/\//, "")}
                color={card.primaryColor}
                iconBg={iconBg}
                textSecondary={textSecondary}
                textPrimary={textPrimary}
                icon="web"
                external
              />
            )}
            {card.address && (
              <ContactItem
                href={`https://maps.google.com/?q=${encodeURIComponent(card.address)}`}
                label={t.address}
                value={card.address}
                color={card.primaryColor}
                iconBg={iconBg}
                textSecondary={textSecondary}
                textPrimary={textPrimary}
                icon="location"
                external
              />
            )}
          </div>

          {/* Social Links */}
          {(card.linkedin || card.twitter || card.instagram) && (
            <div className="mt-4">
              <div className={`border-t ${dividerColor} mb-4`} />
              <div className="flex gap-3 justify-center">
                {card.linkedin && (
                  <SocialButton
                    href={`https://linkedin.com/in/${card.linkedin.replace("@", "")}`}
                    color={card.primaryColor}
                    label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </SocialButton>
                )}
                {card.twitter && (
                  <SocialButton
                    href={`https://twitter.com/${card.twitter.replace("@", "")}`}
                    color={card.primaryColor}
                    label="Twitter"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </SocialButton>
                )}
                {card.instagram && (
                  <SocialButton
                    href={`https://instagram.com/${card.instagram.replace("@", "")}`}
                    color={card.primaryColor}
                    label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </SocialButton>
                )}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadVCard}
              className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: card.primaryColor }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t.downloadVCard}
            </button>
            <button
              onClick={() => setShowQR(true)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : isGradient
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              QR
            </button>
            <button
              onClick={handleShare}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
                isDark
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : isGradient
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {t.shareCard}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-gray-700/30 text-center">
            <p className={`text-xs ${textSecondary}`}>
              {t.digitalCardBy}
            </p>
            <a
              href={`/${lang}/create`}
              className="text-xs font-semibold mt-1 inline-block"
              style={{ color: card.primaryColor }}
            >
              nfckart.com
            </a>
          </div>
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

interface ContactItemProps {
  href: string;
  label: string;
  value: string;
  color: string;
  iconBg: string;
  textSecondary: string;
  textPrimary: string;
  icon: "phone" | "email" | "web" | "location";
  external?: boolean;
}

function ContactItem({ href, label, value, color, iconBg, textSecondary, textPrimary, icon, external }: ContactItemProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 group"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} flex-shrink-0`}>
        {icon === "phone" && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )}
        {icon === "email" && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
        {icon === "web" && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
        )}
        {icon === "location" && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </div>
      <div className="min-w-0">
        <p className={`text-xs ${textSecondary}`}>{label}</p>
        <p className={`text-sm font-medium truncate ${textPrimary} group-hover:underline`}>{value}</p>
      </div>
    </a>
  );
}

function SocialButton({ href, color, label, children }: { href: string; color: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
      style={{ backgroundColor: color }}
      aria-label={label}
    >
      {children}
    </a>
  );
}
