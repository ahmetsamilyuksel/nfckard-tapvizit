/**
 * Phone number utilities for formatting and validation
 */

export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { code: "+7", name: "Россия", flag: "🇷🇺" },
  { code: "+90", name: "Türkiye", flag: "🇹🇷" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+49", name: "Deutschland", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+86", name: "中国", flag: "🇨🇳" },
  { code: "+81", name: "日本", flag: "🇯🇵" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
];

/**
 * Get country code from full phone number
 */
export function getCountryCode(phone: string): string {
  if (!phone) return "+7";

  // Sort by code length (longest first) to match longer codes first
  const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);

  for (const country of sortedCodes) {
    if (phone.startsWith(country.code)) {
      return country.code;
    }
  }

  return "+7"; // Default to Russia
}

/**
 * Format a raw number string into (XXX) XXX XX XX format for display in input
 */
export function formatPhoneInput(digits: string): string {
  if (!digits) return "";

  // Remove non-digits
  const clean = digits.replace(/[^\d]/g, "");

  let result = "";
  if (clean.length > 0) result += "(" + clean.slice(0, 3);
  if (clean.length >= 3) result += ") ";
  else if (clean.length > 0) return result;

  if (clean.length > 3) result += clean.slice(3, 6);
  if (clean.length > 6) result += " " + clean.slice(6, 8);
  if (clean.length > 8) result += " " + clean.slice(8, 10);

  return result;
}

/**
 * Extract raw digits from formatted phone input
 */
export function unformatPhoneInput(formatted: string): string {
  return formatted.replace(/[^\d]/g, "");
}

/**
 * Format phone number for display
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return "";

  const countryCode = getCountryCode(phone);
  const number = phone.slice(countryCode.length);

  // Format as +7 (XXX) XXX XX XX
  const formatted = formatPhoneInput(number);
  return `${countryCode} ${formatted}`;
}

/**
 * Format phone number for WhatsApp link
 */
export function formatPhoneForWhatsApp(phone: string): string {
  if (!phone) return "";

  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Empty is valid (optional field)

  // Must start with + and have at least 8 digits total
  const digitsOnly = phone.replace(/[^\d]/g, "");
  return phone.startsWith("+") && digitsOnly.length >= 8;
}
