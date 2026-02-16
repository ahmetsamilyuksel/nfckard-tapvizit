"use client";

import type { CardFormData } from "@/types";
import type { translations } from "@/lib/i18n";

type T = (typeof translations)["tr"];

interface Props {
  card: CardFormData;
  lang: string;
  t: T;
  onPhotoClick?: () => void;
  fullScreen?: boolean; // For public card view - removes max-width and margins
}

interface LayoutProps {
  card: CardFormData;
  t: T;
  bgStyle?: React.CSSProperties;
  bgClass?: string;
  initials: string;
  onPhotoClick?: () => void;
  textPrimaryColor?: string;
  textSecondaryColor?: string;
  containerClass?: string;
}

// Helper function to determine if a color is dark
function isColorDark(hexColor: string): boolean {
  if (!hexColor || hexColor.length < 6) return false;
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55; // Slightly increased threshold for better contrast
}

// Helper function to format social media URLs
function formatSocialUrl(
  url: string | undefined,
  platform: 'linkedin' | 'twitter' | 'instagram' | 'whatsapp' | 'telegram' | 'vkontakte' | 'vkmax' | 'tiktok' | 'wechat' | 'youtube' | 'facebook' | 'snapchat' | 'wildberries' | 'ozon' | 'yandexmarket'
): string {
  if (!url) return '#';

  // Special handling for WhatsApp - expects phone number
  if (platform === 'whatsapp') {
    const cleanPhone = url.replace(/[^\d+]/g, ''); // Keep only digits and +
    return `https://wa.me/${cleanPhone}`;
  }

  // Special handling for WeChat - no direct URL, show username
  if (platform === 'wechat') {
    return `#wechat-${url}`;
  }

  // If already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  // Otherwise, construct the full URL
  const baseUrls = {
    linkedin: 'https://linkedin.com/in/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    telegram: 'https://t.me/',
    vkontakte: 'https://vk.com/',
    vkmax: 'https://vk.com/',
    tiktok: 'https://tiktok.com/',
    youtube: 'https://youtube.com/',
    facebook: 'https://facebook.com/',
    snapchat: 'https://snapchat.com/add/',
    wildberries: 'https://www.wildberries.ru/seller/',
    ozon: 'https://www.ozon.ru/seller/',
    yandexmarket: 'https://market.yandex.ru/shop/',
    whatsapp: 'https://wa.me/',
    wechat: '#'
  };

  return baseUrls[platform] + url.replace('@', '').replace(/^\//, '');
}

// Helper function to create radial gradient based on intensity
// intensity: 0-100 (0=very soft/nearly white, 100=very sharp/full color)
function createRadialGradient(color: string, intensity: number = 50): string {
  // Convert intensity (0-100) to opacity values
  // 0 = almost white everywhere (very transparent)
  // 100 = full color everywhere (solid)

  const intensityFactor = intensity / 100;

  // Center: always starts with some color, but affected by intensity
  const centerOpacity = Math.round(255 * (0.2 + intensityFactor * 0.8)).toString(16).padStart(2, '0'); // 20% -> 100%

  // Mid point: heavily affected by intensity
  const midOpacity = Math.round(255 * (0.1 + intensityFactor * 0.8)).toString(16).padStart(2, '0'); // 10% -> 90%

  // Edge: most affected by intensity, can go almost white
  const edgeOpacity = Math.round(255 * (0.03 + intensityFactor * 0.87)).toString(16).padStart(2, '0'); // 3% -> 90%

  return `radial-gradient(ellipse at center, ${color}${centerOpacity} 0%, ${color}${midOpacity} 50%, ${color}${edgeOpacity} 100%)`;
}

export default function CardPreview({ card, t, onPhotoClick, fullScreen = false }: Props) {
  const layout = card.layout || "classic";
  // Wider cards with comfortable margins - no extra padding (cards already have internal padding)
  const containerClass = fullScreen ? "w-full max-w-lg mx-auto" : "w-full max-w-lg mx-auto";

  // Check if custom background color is dark
  const hasCustomBg = !!card.backgroundColor;
  const isDarkBg = hasCustomBg ? isColorDark(card.backgroundColor!) : false;

  // Debug log
  if (hasCustomBg) {
    console.log('🎨 Background Color:', card.backgroundColor, 'Is Dark:', isDarkBg);
  }

  // Theme-based styling logic
  let bgClass = "";
  let bgStyle = {};
  let textPrimaryColor = "";
  let textSecondaryColor = "";

  switch (card.theme) {
    case "dark":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      };
      break;

    case "light":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      };
      break;

    case "gradient":
      bgClass = "";
      bgStyle = {
        background: `linear-gradient(135deg, ${card.primaryColor}dd 0%, ${card.primaryColor}88 100%)`,
      };
      break;

    case "modern":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      };
      break;

    case "elegant":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #434343 0%, #000000 100%)",
      };
      break;

    case "minimal":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      };
      break;

    case "vibrant":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      };
      break;

    case "professional":
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      };
      break;

    default:
      bgClass = "";
      bgStyle = {
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      };
  }

  // Override text colors based on background color brightness
  // This should ALWAYS apply when backgroundColor is set, regardless of theme
  if (hasCustomBg) {
    if (isDarkBg) {
      // Dark background = light text
      textPrimaryColor = "#ffffff";
      textSecondaryColor = "#d1d5db";
    } else {
      // Light background = dark text
      textPrimaryColor = "#111827";
      textSecondaryColor = "#4b5563";
    }
  }

  const initials = `${card.firstName.charAt(0) || "?"}${card.lastName.charAt(0) || ""}`.toUpperCase();

  // Render different layouts
  if (layout === "modern") {
    return <ModernLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "sidebar") {
    return <SidebarLayout card={card} t={t} bgStyle={bgStyle} bgClass={bgClass} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "minimal") {
    return <MinimalLayout card={card} t={t} bgStyle={bgStyle} bgClass={bgClass} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "bold") {
    return <BoldLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "stylish") {
    return <StylishLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "elegant") {
    return <ElegantLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  if (layout === "creative") {
    return <CreativeLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} containerClass={containerClass} />;
  }

  // Classic layout (default)
  const finalBgStyle = card.backgroundColor
    ? { background: createRadialGradient(card.backgroundColor, card.gradientIntensity || 50) }
    : bgStyle;

  // Inline styles for text colors
  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl ${containerClass} ${bgClass}`}
      style={finalBgStyle}
    >
      {/* Top bar - Gradient */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 50%, ${card.primaryColor} 100%)` }}
      />

      <div className="p-8">
        {/* Photo - Centered and Large */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 shadow-2xl ring-4 ring-white/20 overflow-hidden cursor-pointer hover:ring-6 transition-all"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}cc 100%)` }}
            onClick={onPhotoClick}
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
            <h2 className={`text-3xl font-bold mb-2 `} style={primaryStyle}>
              {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
            </h2>
            {card.title && (
              <p className={`text-lg font-medium mb-2 `} style={secondaryStyle}>{card.title}</p>
            )}
            {card.company && (
              <p className={`text-base font-semibold`} style={{ color: card.primaryColor }}>
                {card.company}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-base mb-5 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Divider */}
        <div className={`border-t border-gray-200/30 mb-4`} />

        {/* Contact Info */}
        <div className="space-y-2.5">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.website && (
            <a href={card.website?.startsWith('http') ? card.website : `https://${card.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </a>
          )}
          {card.address && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <LocationIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <>
            <div className={`border-t border-gray-200/30 mt-4 mb-4`} />
            <div className="flex gap-2">
              {card.linkedin && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.linkedin, 'linkedin')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <LinkedInIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">LinkedIn</span>
                </div>
              )}
              {card.twitter && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.twitter, 'twitter')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter / X"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TwitterIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Twitter</span>
                </div>
              )}
              {card.instagram && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.instagram, 'instagram')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <InstagramIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Instagram</span>
                </div>
              )}
              {card.whatsapp && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.whatsapp, 'whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WhatsAppIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WhatsApp</span>
                </div>
              )}
              {card.telegram && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.telegram, 'telegram')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TelegramIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Telegram</span>
                </div>
              )}
              {card.vkontakte && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.vkontakte, 'vkontakte')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="VKontakte"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <VKontakteIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">VK</span>
                </div>
              )}
              {card.tiktok && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.tiktok, 'tiktok')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TikTokIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">TikTok</span>
                </div>
              )}
              {card.wechat && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.wechat, 'wechat')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WeChat"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WeChatIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WeChat</span>
                </div>
              )}
              {card.youtube && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.youtube, 'youtube')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <YouTubeIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">YouTube</span>
                </div>
              )}
              {card.facebook && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.facebook, 'facebook')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <FacebookIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Facebook</span>
                </div>
              )}
              {card.snapchat && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.snapchat, 'snapchat')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Snapchat"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <SnapchatIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Snapchat</span>
                </div>
              )}
              {card.vkmax && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.vkmax, 'vkmax')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="VK MAX"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <VKMaxIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">VK MAX</span>
                </div>
              )}
              {card.wildberries && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.wildberries, 'wildberries')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Wildberries"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WildberriesIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WB</span>
                </div>
              )}
              {card.ozon && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.ozon, 'ozon')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ozon"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <OzonIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Ozon</span>
                </div>
              )}
              {card.yandexmarket && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.yandexmarket, 'yandexmarket')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Yandex Market"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <YandexMarketIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Yandex</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons - Gradient */}
        <div className="flex gap-2 mt-5">
          {card.phone && (
            <a
              href={`tel:${card.phone}`}
              className="flex-1 py-2 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
            >
              {t.previewCall}
            </a>
          )}
          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="flex-1 py-2 rounded-xl text-sm font-semibold border border-white/30 text-white shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor}33 0%, ${card.primaryColor}22 100%)` }}
            >
              {t.previewEmail}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// LAYOUT 2: Modern - Full width photo with elegant line
function ModernLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  // If we have inline colors, use them; otherwise fallback to classes
  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className={`rounded-2xl overflow-hidden shadow-xl ${containerClass}`} style={{ background: bgGradient }}>
      {/* Full width photo */}
      <div className="relative h-64 w-full overflow-hidden cursor-pointer hover:opacity-95 transition-opacity rounded-t-2xl" onClick={onPhotoClick}>
        {card.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.photoUrl}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-6xl font-bold"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}cc 100%)` }}
          >
            {initials}
          </div>
        )}
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none" style={{ background: `linear-gradient(to top, ${card.primaryColor}15 0%, transparent 100%)` }} />
      </div>

      {/* Thin elegant accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent 0%, ${card.primaryColor}44 35%, ${card.primaryColor}88 50%, ${card.primaryColor}44 65%, transparent 100%)` }} />

      <div className="p-6">
        {/* Name and Title */}
        <div className="mb-4">
          <h2 className={`text-2xl font-bold mb-1 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && (
            <p className={`text-base font-medium mb-1 `} style={secondaryStyle}>{card.title}</p>
          )}
          {card.company && (
            <p className="text-sm font-semibold" style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Divider */}
        <div className={`border-t border-gray-200/30 mb-4`} />

        {/* Contact Info */}
        <div className="space-y-2.5">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.website && (
            <a href={card.website?.startsWith('http') ? card.website : `https://${card.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </a>
          )}
          {card.address && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <LocationIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <>
            <div className={`border-t border-gray-200/30 mt-4 mb-4`} />
            <div className="flex gap-2">
              {card.linkedin && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.linkedin, 'linkedin')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <LinkedInIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">LinkedIn</span>
                </div>
              )}
              {card.twitter && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.twitter, 'twitter')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter / X"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TwitterIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Twitter</span>
                </div>
              )}
              {card.instagram && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.instagram, 'instagram')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <InstagramIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Instagram</span>
                </div>
              )}
              {card.whatsapp && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.whatsapp, 'whatsapp')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WhatsAppIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WhatsApp</span>
                </div>
              )}
              {card.telegram && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.telegram, 'telegram')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TelegramIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Telegram</span>
                </div>
              )}
              {card.vkontakte && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.vkontakte, 'vkontakte')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="VKontakte"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <VKontakteIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">VK</span>
                </div>
              )}
              {card.tiktok && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.tiktok, 'tiktok')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <TikTokIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">TikTok</span>
                </div>
              )}
              {card.wechat && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.wechat, 'wechat')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WeChat"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WeChatIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WeChat</span>
                </div>
              )}
              {card.youtube && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.youtube, 'youtube')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <YouTubeIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">YouTube</span>
                </div>
              )}
              {card.facebook && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.facebook, 'facebook')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <FacebookIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Facebook</span>
                </div>
              )}
              {card.snapchat && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.snapchat, 'snapchat')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Snapchat"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <SnapchatIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Snapchat</span>
                </div>
              )}
              {card.vkmax && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.vkmax, 'vkmax')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="VK MAX"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <VKMaxIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">VK MAX</span>
                </div>
              )}
              {card.wildberries && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.wildberries, 'wildberries')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Wildberries"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <WildberriesIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">WB</span>
                </div>
              )}
              {card.ozon && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.ozon, 'ozon')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ozon"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <OzonIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Ozon</span>
                </div>
              )}
              {card.yandexmarket && (
                <div className="flex flex-col items-center gap-1">
                  <a
                    href={formatSocialUrl(card.yandexmarket, 'yandexmarket')}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Yandex Market"
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                  >
                    <YandexMarketIcon />
                  </a>
                  <span className="text-[9px] text-white/80 font-medium">Yandex</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-5">
          {card.phone && (
            <a
              href={`tel:${card.phone}`}
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow text-center"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
            >
              {t.previewCall}
            </a>
          )}
          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-center"
            >
              {t.previewEmail}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// LAYOUT 3: Sidebar - Photo on left, info on right
function SidebarLayout({ card, t, bgStyle, bgClass, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const finalBgStyle = card.backgroundColor
    ? { background: createRadialGradient(card.backgroundColor, card.gradientIntensity || 50) }
    : bgStyle;

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl ${containerClass} ${bgClass} flex`}
      style={finalBgStyle}
    >
      {/* Left sidebar - Photo */}
      <div className="w-48 flex-shrink-0 flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl ring-4 ring-white/20 overflow-hidden cursor-pointer hover:ring-6 transition-all"
          style={{ backgroundColor: card.primaryColor }}
          onClick={onPhotoClick}
        >
          {card.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={card.photoUrl} alt="photo" className="w-full h-full object-cover rounded-full" />
          ) : (
            initials
          )}
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 p-6">
        {/* Name and Title */}
        <div className="mb-4">
          <h2 className={`text-2xl font-bold mb-2 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && (
            <p className={`text-base font-medium mb-1 `} style={secondaryStyle}>{card.title}</p>
          )}
          {card.company && (
            <p className={`text-sm font-semibold`} style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info */}
        <div className="space-y-2">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.website && (
            <a href={card.website?.startsWith('http') ? card.website : `https://${card.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.website}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-2 mt-4">
            {card.linkedin && (
              <a
                href={formatSocialUrl(card.linkedin, 'linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a
                href={formatSocialUrl(card.twitter, 'twitter')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a
                href={formatSocialUrl(card.instagram, 'instagram')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 4: Minimal - Small photo top left, ultra clean
function MinimalLayout({ card, t, bgStyle, bgClass, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const finalBgStyle = card.backgroundColor
    ? { background: createRadialGradient(card.backgroundColor, card.gradientIntensity || 50) }
    : bgStyle;

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-xl ${containerClass} ${bgClass}`}
      style={finalBgStyle}
    >
      <div className="p-8">
        {/* Header with small photo and name */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-24 h-24 rounded-xl flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
            style={{ backgroundColor: card.primaryColor }}
            onClick={onPhotoClick}
          >
            {card.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.photoUrl} alt="photo" className="w-full h-full object-cover rounded-xl" />
            ) : (
              initials
            )}
          </div>

          <div className="flex-1">
            <h2 className={`text-2xl font-bold mb-1 `} style={primaryStyle}>
              {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
            </h2>
            {card.title && (
              <p className={`text-base font-medium `} style={secondaryStyle}>{card.title}</p>
            )}
            {card.company && (
              <p className={`text-sm font-semibold mt-1`} style={{ color: card.primaryColor }}>
                {card.company}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-base mb-5 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info - Clean list */}
        <div className="space-y-3">
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-3">
              <EmailIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-3">
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
          {card.website && (
            <a href={card.website?.startsWith('http') ? card.website : `https://${card.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
              <WebIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </a>
          )}
          {card.address && (
            <div className="flex items-center gap-3">
              <LocationIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-3 mt-6">
            {card.linkedin && (
              <a href={formatSocialUrl(card.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={formatSocialUrl(card.twitter, 'twitter')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={formatSocialUrl(card.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}

        {/* Minimal action button */}
        {card.phone && (
          <a
            href={`tel:${card.phone}`}
            className="block w-full mt-6 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl text-center"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
          >
            {t.previewCall}
          </a>
        )}
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

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function VKontakteIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function WeChatIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.478c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1 .023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.389.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.064-.194-.017-.21.155-.479.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  );
}

function VKMaxIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zM18.5 16.5h-1.5c-.711 0-.945-.563-2.25-1.875-1.125-1.125-1.594-1.266-1.875-1.266-.375 0-.484.094-.484.563v1.688c0 .469-.141.75-1.406.75-2.063 0-4.313-1.266-5.906-3.656C3.094 9.422 2.5 7.094 2.5 6.625c0-.281.094-.563.563-.563h1.5c.422 0 .563.188.75.656.938 2.625 2.531 4.922 3.187 4.922.234 0 .328-.094.328-.656V8.422c-.047-1.313-.75-1.406-.75-1.875 0-.234.188-.469.469-.469h2.344c.375 0 .516.188.516.609v3.047c0 .375.141.516.234.516.234 0 .422-.141.844-.562 1.313-1.5 2.25-3.75 2.25-3.75.141-.281.328-.563.75-.563h1.5c.469 0 .563.234.469.609-.234 1.078-2.438 4.266-2.438 4.266-.188.281-.234.422 0 .75.188.234.797.797 1.219 1.266.75.844 1.313 1.547 1.5 2.062.141.516-.094.75-.609.75z"/>
    </svg>
  );
}

function WildberriesIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2 4h3l2 8 1.5-8h2l1.5 8 2-8h3l-3.5 14h-2.5l-1.5-7-1.5 7h-2.5L2 4zm16 0h2v16h-2V4z"/>
    </svg>
  );
}

function OzonIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
    </svg>
  );
}

function YandexMarketIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h18v6h-4v-2H7v10h10v-2h4v6H3V3zm10 8v-1h8v8h-4v-4h-4v-3z"/>
    </svg>
  );
}

// LAYOUT 5: Bold - Large diagonal photo with overlapping content
function BoldLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ${containerClass}`} style={{ background: bgGradient }}>
      {/* Diagonal full-width photo */}
      <div className="relative h-72 w-full overflow-hidden cursor-pointer group rounded-t-2xl" onClick={onPhotoClick}>
        {card.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.photoUrl}
            alt="profile"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-7xl font-bold"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
          >
            {initials}
          </div>
        )}
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="p-6">
        {/* Name and title */}
        <div className="mb-4">
          <h2 className={`text-2xl font-bold mb-1 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && <p className={`text-sm font-medium `} style={secondaryStyle}>{card.title}</p>}
          {card.company && (
            <p className="text-xs font-semibold mt-1" style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <EmailIcon color={card.primaryColor} />
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-2 justify-center">
            {card.linkedin && (
              <a href={formatSocialUrl(card.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={formatSocialUrl(card.twitter, 'twitter')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={formatSocialUrl(card.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 6: Stylish - Magazine style with split photo
function StylishLayout({ card, t, initials, onPhotoClick, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ${containerClass}`} style={{ background: bgGradient }}>
      {/* Magazine style with blended photo */}
      <div className="relative h-80 w-full rounded-t-2xl overflow-hidden">
        {/* Full-width photo as background */}
        <div className="absolute inset-0 cursor-pointer group" onClick={onPhotoClick}>
          {card.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.photoUrl}
              alt="profile"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-6xl font-bold"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor}dd 0%, ${card.primaryColor} 100%)` }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Subtle gradient overlay blending to colored panel */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 0%, transparent 50%, ${card.primaryColor}22 60%, ${card.primaryColor}cc 75%, ${card.primaryColor} 85%)` }} />

        {/* Colored info panel on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 p-4 flex flex-col justify-center">
          <div className="text-white text-center">
            <h2 className="text-lg font-bold mb-2 leading-tight drop-shadow-lg">
              {card.firstName || t.previewFirstName}
            </h2>
            <h2 className="text-lg font-bold mb-3 leading-tight drop-shadow-lg">
              {card.lastName || t.previewLastName}
            </h2>
            {card.title && <p className="text-xs font-medium opacity-90 mb-2 drop-shadow-md">{card.title}</p>}
            {card.company && <p className="text-xs font-semibold opacity-90 drop-shadow-md">{card.company}</p>}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info - Vertical list */}
        <div className="space-y-2 mb-4">
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <EmailIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-3 justify-center pt-4 border-t" style={{ borderColor: `${card.primaryColor}30` }}>
            {card.linkedin && (
              <a href={formatSocialUrl(card.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={formatSocialUrl(card.twitter, 'twitter')} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={formatSocialUrl(card.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 7: Elegant - Circular photo with arc design
function ElegantLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ${containerClass}`} style={{ background: bgGradient }}>
      {/* Arc background with centered circular photo */}
      <div className="relative h-72 w-full rounded-t-2xl" style={{ background: `linear-gradient(180deg, ${card.primaryColor} 0%, ${card.primaryColor}ee 60%, ${card.primaryColor}cc 85%, transparent 100%)` }}>
        {/* Decorative arc shape with blur effect */}
        <div className="absolute bottom-0 left-0 right-0 h-28 rounded-t-[50%]" style={{ background: bgGradient, filter: 'blur(1px)' }} />

        {/* Large circular photo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div
            className="w-52 h-52 rounded-full flex items-center justify-center text-white text-7xl font-bold shadow-2xl ring-8 ring-white/20 overflow-hidden cursor-pointer hover:ring-white/40 transition-all"
            style={{
              background: `linear-gradient(135deg, ${card.primaryColor}cc 0%, ${card.primaryColor} 100%)`,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 40px rgba(255, 255, 255, 0.1) inset'
            }}
            onClick={onPhotoClick}
          >
            {card.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={card.photoUrl} alt="photo" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-4">
        {/* Name and title */}
        <div className="text-center mb-4">
          <h2 className={`text-3xl font-bold mb-2 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && <p className={`text-lg font-medium `} style={secondaryStyle}>{card.title}</p>}
          {card.company && (
            <p className="text-base font-semibold mt-1" style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-base mb-4 leading-relaxed text-center `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info - Icon grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {card.email && (
            <a href={`mailto:${card.email}`} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <EmailIcon color={card.primaryColor} />
              <span className={`text-xs  truncate w-full text-center`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.phone && (
            <a href={`tel:${card.phone}`} className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
        </div>

        {/* Social Links - Horizontal bar */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-2 justify-center pt-4">
            {card.linkedin && (
              <a href={formatSocialUrl(card.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={formatSocialUrl(card.twitter, 'twitter')} target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={formatSocialUrl(card.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 8: Creative - Asymmetric photo with angled content
function CreativeLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor, containerClass = "w-full max-w-lg mx-auto" }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className={`rounded-2xl overflow-hidden shadow-2xl ${containerClass}`} style={{ background: bgGradient }}>
      {/* Angled photo header with soft edges */}
      <div className="relative h-64 w-full overflow-hidden cursor-pointer group rounded-t-2xl" onClick={onPhotoClick}>
        {card.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.photoUrl}
            alt="profile"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-7xl font-bold"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}cc 100%)` }}
          >
            {initials}
          </div>
        )}
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Name and title with accent border */}
        <div className="mb-4 pb-4" style={{ borderBottom: `3px solid ${card.primaryColor}` }}>
          <h2 className={`text-2xl font-bold mb-1 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && <p className={`text-sm font-medium `} style={secondaryStyle}>{card.title}</p>}
          {card.company && (
            <p className="text-xs font-semibold mt-1" style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-4 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact buttons */}
        <div className="space-y-2 mb-4">
          {card.email && (
            <a href={`mailto:${card.email}`} className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:shadow-md transition-shadow" style={{ background: `linear-gradient(135deg, ${card.primaryColor}20 0%, ${card.primaryColor}10 100%)` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <EmailIcon color="#ffffff" />
              </div>
              <span className={`text-sm font-medium  truncate`} style={secondaryStyle}>{card.email}</span>
            </a>
          )}
          {card.phone && (
            <a href={`tel:${card.phone}`} className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:shadow-md transition-shadow" style={{ background: `linear-gradient(135deg, ${card.primaryColor}20 0%, ${card.primaryColor}10 100%)` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <PhoneIcon color="#ffffff" />
              </div>
              <span className={`text-sm font-medium `} style={secondaryStyle}>{card.phone}</span>
            </a>
          )}
        </div>

        {/* Social Links - Pills */}
        {(card.linkedin || card.twitter || card.instagram || card.whatsapp || card.telegram || card.vkontakte || card.vkmax || card.tiktok || card.wechat || card.youtube || card.facebook || card.snapchat || card.wildberries || card.ozon || card.yandexmarket) && (
          <div className="flex gap-2">
            {card.linkedin && (
              <a href={formatSocialUrl(card.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={formatSocialUrl(card.twitter, 'twitter')} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={formatSocialUrl(card.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
