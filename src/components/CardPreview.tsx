"use client";

import type { CardFormData } from "@/types";
import type { translations } from "@/lib/i18n";

type T = (typeof translations)["tr"];

interface Props {
  card: CardFormData;
  lang: string;
  t: T;
}

export default function CardPreview({ card, t }: Props) {
  // Theme-based styling logic
  let bgClass = "";
  let bgStyle = {};
  let textPrimary = "";
  let textSecondary = "";
  let dividerColor = "";
  let iconBg = "";

  switch (card.theme) {
    case "dark":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      };
      textPrimary = "text-white";
      textSecondary = "text-gray-300";
      dividerColor = "border-white/20";
      iconBg = "bg-white/10";
      break;

    case "light":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      };
      textPrimary = "text-gray-900";
      textSecondary = "text-gray-600";
      dividerColor = "border-gray-200";
      iconBg = "bg-gray-100";
      break;

    case "gradient":
      bgClass = "";
      bgStyle = {
        background: `linear-gradient(135deg, ${card.primaryColor}dd 0%, ${card.primaryColor}88 100%)`,
      };
      textPrimary = "text-white";
      textSecondary = "text-white/90";
      dividerColor = "border-white/20";
      iconBg = "bg-white/15";
      break;

    case "modern":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      };
      textPrimary = "text-white";
      textSecondary = "text-white/90";
      dividerColor = "border-white/20";
      iconBg = "bg-white/15";
      break;

    case "elegant":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      };
      textPrimary = "text-white";
      textSecondary = "text-gray-300";
      dividerColor = "border-white/20";
      iconBg = "bg-white/10";
      break;

    case "minimal":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      };
      textPrimary = "text-gray-900";
      textSecondary = "text-gray-700";
      dividerColor = "border-gray-300";
      iconBg = "bg-white/50";
      break;

    case "vibrant":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      };
      textPrimary = "text-white";
      textSecondary = "text-white/90";
      dividerColor = "border-white/20";
      iconBg = "bg-white/15";
      break;

    case "professional":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      };
      textPrimary = "text-white";
      textSecondary = "text-white/90";
      dividerColor = "border-white/20";
      iconBg = "bg-white/15";
      break;

    default:
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      };
      textPrimary = "text-gray-900";
      textSecondary = "text-gray-600";
      dividerColor = "border-gray-200";
      iconBg = "bg-gray-100";
  }

  const initials = `${card.firstName.charAt(0) || "?"}${card.lastName.charAt(0) || ""}`.toUpperCase();

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl max-w-sm mx-auto ${bgClass}`}
      style={bgStyle}
    >
      {/* Top bar */}
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: card.primaryColor }}
      />

      <div className="p-8">
        {/* Photo - Centered and Large */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-2xl ring-4 ring-white/20"
            style={{ backgroundColor: card.primaryColor }}
          >
            {card.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.photoUrl} alt="photo" className="w-full h-full object-cover rounded-full" />
            ) : (
              initials
            )}
          </div>

          {/* Name and Title - Centered */}
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-1 ${textPrimary}`}>
              {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
            </h2>
            {card.title && (
              <p className={`text-base font-medium mb-1 ${textSecondary}`}>{card.title}</p>
            )}
            {card.company && (
              <p className={`text-sm font-semibold`} style={{ color: card.primaryColor }}>
                {card.company}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed ${textSecondary}`}>{card.bio}</p>
        )}

        {/* Divider */}
        <div className={`border-t ${dividerColor} mb-4`} />

        {/* Contact Info */}
        <div className="space-y-2.5">
          {card.phone && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm ${textSecondary}`}>{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm ${textSecondary} truncate`}>{card.email}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm ${textSecondary} truncate`}>{card.website}</span>
            </div>
          )}
          {card.address && (
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                <LocationIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm ${textSecondary}`}>{card.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <>
            <div className={`border-t ${dividerColor} mt-4 mb-4`} />
            <div className="flex gap-2">
              {card.linkedin && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: card.primaryColor }}
                >
                  <LinkedInIcon />
                </div>
              )}
              {card.twitter && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: card.primaryColor }}
                >
                  <TwitterIcon />
                </div>
              )}
              {card.instagram && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: card.primaryColor }}
                >
                  <InstagramIcon />
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-5">
          {card.phone && (
            <button
              className="flex-1 py-2 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: card.primaryColor }}
            >
              {t.previewCall}
            </button>
          )}
          {card.email && (
            <button
              className="flex-1 py-2 rounded-xl text-sm font-semibold border border-white/30 text-white bg-white/10 backdrop-blur-sm"
            >
              {t.previewEmail}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PhoneIcon({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function WebIcon({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
    </svg>
  );
}

function LocationIcon({ color }: { color: string }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
