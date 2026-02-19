/**
 * Link utilities for social media and marketplace platforms
 */

export interface SocialLink {
  platform: string;
  value: string;
  icon: string;
  url: string;
  label: string;
}

/**
 * Normalize username by removing @ and spaces
 */
function normalizeUsername(username: string): string {
  return username.replace(/^@/, "").trim();
}

/**
 * Check if value is a full URL
 */
function isFullUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

/**
 * Format WhatsApp link (supports phone numbers and usernames)
 */
export function formatWhatsAppLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // If it's a phone number (contains only digits and +)
  const phonePattern = /^[\d+\s()-]+$/;
  if (phonePattern.test(value)) {
    const cleaned = value.replace(/[^\d+]/g, "");
    return `https://wa.me/${cleaned}`;
  }

  // Otherwise treat as username
  return `https://wa.me/${normalizeUsername(value)}`;
}

/**
 * Format Telegram link
 */
export function formatTelegramLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://t.me/${normalizeUsername(value)}`;
}

/**
 * Format Instagram link
 */
export function formatInstagramLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://instagram.com/${normalizeUsername(value)}`;
}

/**
 * Format TikTok link
 */
export function formatTikTokLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://tiktok.com/@${normalizeUsername(value)}`;
}

/**
 * Format VKontakte link
 */
export function formatVKontakteLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://vk.com/${normalizeUsername(value)}`;
}

/**
 * Format MAX (max.ru) link - Russian messaging app
 */
export function formatMaxLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://max.ru/${normalizeUsername(value)}`;
}

/**
 * Format WeChat link
 */
export function formatWeChatLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // WeChat doesn't have a direct web link format, return as-is for QR code
  return `weixin://dl/chat?${normalizeUsername(value)}`;
}

/**
 * Format YouTube link
 */
export function formatYouTubeLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // Support both channel names and @handles
  if (value.startsWith("@")) {
    return `https://youtube.com/${value}`;
  }
  return `https://youtube.com/c/${normalizeUsername(value)}`;
}

/**
 * Format Facebook link
 */
export function formatFacebookLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://facebook.com/${normalizeUsername(value)}`;
}

/**
 * Format Snapchat link
 */
export function formatSnapchatLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://snapchat.com/add/${normalizeUsername(value)}`;
}

/**
 * Format Twitter/X link
 */
export function formatTwitterLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://x.com/${normalizeUsername(value)}`;
}

/**
 * Format LinkedIn link
 */
export function formatLinkedInLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  return `https://linkedin.com/in/${normalizeUsername(value)}`;
}

/**
 * Format Wildberries seller/product link
 */
export function formatWildberriesLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // If it looks like a seller ID (numbers only), create seller link
  if (/^\d+$/.test(value)) {
    return `https://www.wildberries.ru/seller/${value}`;
  }

  // Otherwise assume it's a search term or product
  return `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(value)}`;
}

/**
 * Format Ozon seller/product link
 */
export function formatOzonLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // If it looks like a seller ID (numbers only), create seller link
  if (/^\d+$/.test(value)) {
    return `https://www.ozon.ru/seller/${value}`;
  }

  // Otherwise assume it's a search term or product
  return `https://www.ozon.ru/search/?text=${encodeURIComponent(value)}`;
}

/**
 * Format Yandex Market seller/product link
 */
export function formatYandexMarketLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // If it looks like a shop ID (numbers only), create shop link
  if (/^\d+$/.test(value)) {
    return `https://market.yandex.ru/shop--/${value}`;
  }

  // Otherwise assume it's a search term or product
  return `https://market.yandex.ru/search?text=${encodeURIComponent(value)}`;
}

/**
 * Format website link
 */
export function formatWebsiteLink(value: string): string {
  if (!value) return "";
  if (isFullUrl(value)) return value;

  // Add https:// if no protocol
  return `https://${value}`;
}

/**
 * Get formatted link for any platform
 */
export function formatSocialLink(platform: string, value: string): string {
  if (!value) return "";

  switch (platform.toLowerCase()) {
    case "whatsapp":
      return formatWhatsAppLink(value);
    case "telegram":
      return formatTelegramLink(value);
    case "instagram":
      return formatInstagramLink(value);
    case "tiktok":
      return formatTikTokLink(value);
    case "vkontakte":
      return formatVKontakteLink(value);
    case "max":
      return formatMaxLink(value);
    case "wechat":
      return formatWeChatLink(value);
    case "youtube":
      return formatYouTubeLink(value);
    case "facebook":
      return formatFacebookLink(value);
    case "snapchat":
      return formatSnapchatLink(value);
    case "twitter":
      return formatTwitterLink(value);
    case "linkedin":
      return formatLinkedInLink(value);
    case "wildberries":
      return formatWildberriesLink(value);
    case "ozon":
      return formatOzonLink(value);
    case "yandexmarket":
      return formatYandexMarketLink(value);
    case "website":
      return formatWebsiteLink(value);
    default:
      return isFullUrl(value) ? value : `https://${value}`;
  }
}

/**
 * Extract display value from username or URL
 */
export function getDisplayValue(value: string): string {
  if (!value) return "";
  if (!isFullUrl(value)) return value;

  // Extract username from URL
  try {
    const url = new URL(value);
    const path = url.pathname;
    const username = path.split("/").filter(Boolean).pop();
    return username ? `@${username}` : value;
  } catch {
    return value;
  }
}
