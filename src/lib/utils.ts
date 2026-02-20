export function generateSlug(firstName: string, lastName: string): string {
  const base = `${firstName}-${lastName}`
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

export function getPriceByCardType(cardType: string): number {
  const prices: Record<string, number> = {
    standard: 150,
    premium: 250,
    metal: 500,
  };
  return (prices[cardType] ?? 150) ;
}

export function formatPrice(price: number, lang: string): string {
  if (lang === "en") {
    return `$${price.toFixed(2)}`;
  }
  if (lang === "ru") {
    return `${price.toFixed(0)} ₽`;
  }
  return `$${price.toFixed(2)}`;
}

export function getDeliveryLabel(method: string): string {
  const labels: Record<string, string> = {
    cdek: "СДЭК",
    post_ru: "Почта России",
    ozon: "Ozon Доставка",
    yandex: "Яндекс Доставка",
  };
  return labels[method] || method;
}

export function getStatusLabel(status: string, lang: string): string {
  const labels: Record<string, Record<string, string>> = {
    PENDING: { tr: "Bekliyor", en: "Pending", ru: "Ожидает" },
    CONFIRMED: { tr: "Onaylandı", en: "Confirmed", ru: "Подтверждён" },
    PROCESSING: { tr: "Hazırlanıyor", en: "Processing", ru: "В обработке" },
    SHIPPED: { tr: "Kargoya Verildi", en: "Shipped", ru: "Отправлен" },
    DELIVERED: { tr: "Teslim Edildi", en: "Delivered", ru: "Доставлен" },
    CANCELLED: { tr: "İptal Edildi", en: "Cancelled", ru: "Отменён" },
  };
  return labels[status]?.[lang] ?? status;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    SHIPPED: "bg-indigo-100 text-indigo-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };
  return colors[status] ?? "bg-gray-100 text-gray-800";
}
