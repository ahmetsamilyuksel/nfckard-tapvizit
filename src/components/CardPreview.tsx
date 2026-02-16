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
  const containerClass = fullScreen ? "w-full h-full" : "${containerClass}";

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
    return <ModernLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "sidebar") {
    return <SidebarLayout card={card} t={t} bgStyle={bgStyle} bgClass={bgClass} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "minimal") {
    return <MinimalLayout card={card} t={t} bgStyle={bgStyle} bgClass={bgClass} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "bold") {
    return <BoldLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "stylish") {
    return <StylishLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "elegant") {
    return <ElegantLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
  }

  if (layout === "creative") {
    return <CreativeLayout card={card} t={t} initials={initials} onPhotoClick={onPhotoClick} textPrimaryColor={textPrimaryColor} textSecondaryColor={textSecondaryColor} />;
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
            className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-2xl ring-4 ring-white/20 overflow-hidden cursor-pointer hover:ring-6 transition-all"
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
            <h2 className={`text-2xl font-bold mb-1 `} style={primaryStyle}>
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
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </div>
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
        {(card.linkedin || card.twitter || card.instagram) && (
          <>
            <div className={`border-t border-gray-200/30 mt-4 mb-4`} />
            <div className="flex gap-2">
              {card.linkedin && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                >
                  <LinkedInIcon />
                </div>
              )}
              {card.twitter && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                >
                  <TwitterIcon />
                </div>
              )}
              {card.instagram && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                >
                  <InstagramIcon />
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons - Gradient */}
        <div className="flex gap-2 mt-5">
          {card.phone && (
            <button
              className="flex-1 py-2 rounded-xl text-white text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
            >
              {t.previewCall}
            </button>
          )}
          {card.email && (
            <button
              className="flex-1 py-2 rounded-xl text-sm font-semibold border border-white/30 text-white shadow-md hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor}33 0%, ${card.primaryColor}22 100%)` }}
            >
              {t.previewEmail}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// LAYOUT 2: Modern - Full width photo with elegant line
function ModernLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  // If we have inline colors, use them; otherwise fallback to classes
  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl ${containerClass}" style={{ background: bgGradient }}>
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
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10`}
                style={{ background: `linear-gradient(135deg, ${card.primaryColor}22 0%, ${card.primaryColor}11 100%)` }}
              >
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </div>
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
        {(card.linkedin || card.twitter || card.instagram) && (
          <>
            <div className={`border-t border-gray-200/30 mt-4 mb-4`} />
            <div className="flex gap-2">
              {card.linkedin && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                >
                  <LinkedInIcon />
                </div>
              )}
              {card.twitter && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
                >
                  <TwitterIcon />
                </div>
              )}
              {card.instagram && (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
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
              className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
            >
              {t.previewCall}
            </button>
          )}
          {card.email && (
            <button
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
            >
              {t.previewEmail}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// LAYOUT 3: Sidebar - Photo on left, info on right
function SidebarLayout({ card, t, bgStyle, bgClass, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
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
      <div className="w-40 flex-shrink-0 flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl ring-4 ring-white/20 overflow-hidden cursor-pointer hover:ring-6 transition-all"
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
          <h2 className={`text-xl font-bold mb-1 `} style={primaryStyle}>
            {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
          </h2>
          {card.title && (
            <p className={`text-sm font-medium mb-1 `} style={secondaryStyle}>{card.title}</p>
          )}
          {card.company && (
            <p className={`text-xs font-semibold`} style={{ color: card.primaryColor }}>
              {card.company}
            </p>
          )}
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-xs mb-3 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info */}
        <div className="space-y-2">
          {card.phone && (
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <PhoneIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <EmailIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center bg-white/10`}>
                <WebIcon color={card.primaryColor} />
              </div>
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.website}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-2 mt-4">
            {card.linkedin && (
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <LinkedInIcon />
              </div>
            )}
            {card.twitter && (
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <TwitterIcon />
              </div>
            )}
            {card.instagram && (
              <div
                className="w-7 h-7 rounded flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
              >
                <InstagramIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 4: Minimal - Small photo top left, ultra clean
function MinimalLayout({ card, t, bgStyle, bgClass, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
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
            className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-xl transition-all"
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
            <h2 className={`text-xl font-bold mb-0.5 `} style={primaryStyle}>
              {card.firstName || t.previewFirstName} {card.lastName || t.previewLastName}
            </h2>
            {card.title && (
              <p className={`text-sm font-medium `} style={secondaryStyle}>{card.title}</p>
            )}
            {card.company && (
              <p className={`text-xs font-semibold mt-1`} style={{ color: card.primaryColor }}>
                {card.company}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {card.bio && (
          <p className={`text-sm mb-5 leading-relaxed `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info - Clean list */}
        <div className="space-y-3">
          {card.email && (
            <div className="flex items-center gap-3">
              <EmailIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center gap-3">
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center gap-3">
              <WebIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.website}</span>
            </div>
          )}
          {card.address && (
            <div className="flex items-center gap-3">
              <LocationIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-3 mt-6">
            {card.linkedin && (
              <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </a>
            )}
            {card.twitter && (
              <a href={card.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </a>
            )}
            {card.instagram && (
              <a href={card.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </a>
            )}
          </div>
        )}

        {/* Minimal action button */}
        {card.phone && (
          <button
            className="w-full mt-6 py-3 rounded-xl text-white text-sm font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}
          >
            {t.previewCall}
          </button>
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

// LAYOUT 5: Bold - Large diagonal photo with overlapping content
function BoldLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl ${containerClass}" style={{ background: bgGradient }}>
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
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
          {card.email && (
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <EmailIcon color={card.primaryColor} />
              <span className={`text-xs  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-2 justify-center">
            {card.linkedin && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </div>
            )}
            {card.twitter && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </div>
            )}
            {card.instagram && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 6: Stylish - Magazine style with split photo
function StylishLayout({ card, t, initials, onPhotoClick, textSecondaryColor }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl ${containerClass}" style={{ background: bgGradient }}>
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
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <EmailIcon color={card.primaryColor} />
              <span className={`text-sm  truncate`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-sm `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-3 justify-center pt-4 border-t" style={{ borderColor: `${card.primaryColor}30` }}>
            {card.linkedin && (
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </div>
            )}
            {card.twitter && (
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </div>
            )}
            {card.instagram && (
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 7: Elegant - Circular photo with arc design
function ElegantLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl ${containerClass}" style={{ background: bgGradient }}>
      {/* Arc background with centered circular photo */}
      <div className="relative h-72 w-full rounded-t-2xl" style={{ background: `linear-gradient(180deg, ${card.primaryColor} 0%, ${card.primaryColor}ee 60%, ${card.primaryColor}cc 85%, transparent 100%)` }}>
        {/* Decorative arc shape with blur effect */}
        <div className="absolute bottom-0 left-0 right-0 h-28 rounded-t-[50%]" style={{ background: bgGradient, filter: 'blur(1px)' }} />

        {/* Large circular photo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div
            className="w-44 h-44 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl ring-8 ring-white/20 overflow-hidden cursor-pointer hover:ring-white/40 transition-all"
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
          <p className={`text-sm mb-4 leading-relaxed text-center `} style={secondaryStyle}>{card.bio}</p>
        )}

        {/* Contact Info - Icon grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {card.email && (
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <EmailIcon color={card.primaryColor} />
              <span className={`text-xs  truncate w-full text-center`} style={secondaryStyle}>{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl" style={{ background: `linear-gradient(135deg, ${card.primaryColor}15 0%, ${card.primaryColor}08 100%)` }}>
              <PhoneIcon color={card.primaryColor} />
              <span className={`text-xs `} style={secondaryStyle}>{card.phone}</span>
            </div>
          )}
        </div>

        {/* Social Links - Horizontal bar */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-2 justify-center pt-4">
            {card.linkedin && (
              <div className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </div>
            )}
            {card.twitter && (
              <div className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </div>
            )}
            {card.instagram && (
              <div className="flex-1 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// LAYOUT 8: Creative - Asymmetric photo with angled content
function CreativeLayout({ card, t, initials, onPhotoClick, textPrimaryColor, textSecondaryColor }: LayoutProps) {
  const bgColor = card.backgroundColor || "#ffffff";
  const bgGradient = createRadialGradient(bgColor, card.gradientIntensity || 50);

  const primaryStyle = textPrimaryColor ? { color: textPrimaryColor } : {};
  const secondaryStyle = textSecondaryColor ? { color: textSecondaryColor } : {};

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl ${containerClass}" style={{ background: bgGradient }}>
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
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:shadow-md transition-shadow" style={{ background: `linear-gradient(135deg, ${card.primaryColor}20 0%, ${card.primaryColor}10 100%)` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <EmailIcon color="#ffffff" />
              </div>
              <span className={`text-sm font-medium  truncate`} style={secondaryStyle}>{card.email}</span>
            </button>
          )}
          {card.phone && (
            <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:shadow-md transition-shadow" style={{ background: `linear-gradient(135deg, ${card.primaryColor}20 0%, ${card.primaryColor}10 100%)` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <PhoneIcon color="#ffffff" />
              </div>
              <span className={`text-sm font-medium `} style={secondaryStyle}>{card.phone}</span>
            </button>
          )}
        </div>

        {/* Social Links - Pills */}
        {(card.linkedin || card.twitter || card.instagram) && (
          <div className="flex gap-2">
            {card.linkedin && (
              <div className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <LinkedInIcon />
              </div>
            )}
            {card.twitter && (
              <div className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <TwitterIcon />
              </div>
            )}
            {card.instagram && (
              <div className="flex-1 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.primaryColor}dd 100%)` }}>
                <InstagramIcon />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
