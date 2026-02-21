"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { translations } from "@/lib/i18n";
import Link from "next/link";

type T = (typeof translations)["tr"];

interface Props {
  lang: string;
  t: T;
}

interface OrderData {
  id: string;
  status: string;
  cardType: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  customerName: string;
  trackingNumber: string | null;
  createdAt: string;
  card: {
    slug: string;
    firstName: string;
    lastName: string;
  };
}

const STATUS_STEPS = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"];

const LABELS: Record<string, Record<string, string>> = {
  ru: {
    title: "Отслеживание заказа",
    subtitle: "Введите номер заказа для проверки статуса",
    placeholder: "Введите номер заказа...",
    search: "Найти",
    searching: "Поиск...",
    notFound: "Заказ не найден. Проверьте номер заказа.",
    orderNumber: "Номер заказа",
    status: "Статус",
    cardType: "Тип карты",
    quantity: "Количество",
    total: "Сумма",
    payment: "Оплата",
    tracking: "Трек-номер",
    date: "Дата заказа",
    card: "Карта",
    viewCard: "Посмотреть карту",
    PENDING: "Ожидает",
    CONFIRMED: "Подтверждён",
    PROCESSING: "В обработке",
    SHIPPED: "Отправлен",
    DELIVERED: "Доставлен",
    CANCELLED: "Отменён",
    paymentPENDING: "Ожидает оплаты",
    paymentPAID: "Оплачено",
    paymentFAILED: "Ошибка оплаты",
    card_method: "Банковская карта",
    transfer_method: "Банковский перевод",
    cash_method: "Оплата при получении",
  },
  en: {
    title: "Track Your Order",
    subtitle: "Enter your order number to check the status",
    placeholder: "Enter order number...",
    search: "Search",
    searching: "Searching...",
    notFound: "Order not found. Please check your order number.",
    orderNumber: "Order Number",
    status: "Status",
    cardType: "Card Type",
    quantity: "Quantity",
    total: "Total",
    payment: "Payment",
    tracking: "Tracking Number",
    date: "Order Date",
    card: "Card",
    viewCard: "View Card",
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    paymentPENDING: "Awaiting Payment",
    paymentPAID: "Paid",
    paymentFAILED: "Payment Failed",
    card_method: "Credit/Debit Card",
    transfer_method: "Bank Transfer",
    cash_method: "Cash on Delivery",
  },
  tr: {
    title: "Sipariş Takip",
    subtitle: "Sipariş durumunuzu kontrol etmek için sipariş numaranızı girin",
    placeholder: "Sipariş numarasını girin...",
    search: "Ara",
    searching: "Aranıyor...",
    notFound: "Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.",
    orderNumber: "Sipariş Numarası",
    status: "Durum",
    cardType: "Kart Tipi",
    quantity: "Adet",
    total: "Toplam",
    payment: "Ödeme",
    tracking: "Takip Numarası",
    date: "Sipariş Tarihi",
    card: "Kart",
    viewCard: "Kartı Gör",
    PENDING: "Bekliyor",
    CONFIRMED: "Onaylandı",
    PROCESSING: "Hazırlanıyor",
    SHIPPED: "Kargoya Verildi",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal Edildi",
    paymentPENDING: "Ödeme Bekleniyor",
    paymentPAID: "Ödendi",
    paymentFAILED: "Ödeme Hatası",
    card_method: "Kredi/Banka Kartı",
    transfer_method: "Banka Havalesi",
    cash_method: "Kapıda Ödeme",
  },
};

export default function TrackClient({ lang }: Props) {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const l = LABELS[lang] || LABELS.ru;

  const handleSearch = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);

    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      if (!res.ok) {
        setError(l.notFound);
        return;
      }
      const data = await res.json();
      setOrder(data);
    } catch {
      setError(l.notFound);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = (currency: string) => {
    if (currency === "RUB") return "₽";
    if (currency === "TRY") return "₺";
    return "€";
  };

  const currentStepIndex = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Search Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{l.title}</h1>
        <p className="text-gray-600">{l.subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={l.placeholder}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none font-mono text-lg"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            {loading ? l.searching : l.search}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && searched && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Status Progress Bar */}
          {order.status !== "CANCELLED" && (
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6">
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/30" />
                <div
                  className="absolute top-5 left-0 h-0.5 bg-white transition-all duration-500"
                  style={{ width: `${Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 100)}%` }}
                />

                {STATUS_STEPS.map((step, i) => (
                  <div key={step} className="relative flex flex-col items-center z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      i <= currentStepIndex
                        ? "bg-white text-sky-600"
                        : "bg-white/20 text-white/60"
                    }`}>
                      {i < currentStepIndex ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium whitespace-nowrap ${
                      i <= currentStepIndex ? "text-white" : "text-white/50"
                    }`}>
                      {l[step as keyof typeof l] || step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Banner */}
          {order.status === "CANCELLED" && (
            <div className="bg-red-500 p-4 text-center">
              <span className="text-white font-bold text-lg">{l.CANCELLED}</span>
            </div>
          )}

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.orderNumber}</p>
                <p className="font-mono font-bold text-gray-900">{order.id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.date}</p>
                <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.cardType}</p>
                <p className="font-bold text-gray-900 capitalize">{order.cardType}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.quantity}</p>
                <p className="font-bold text-gray-900">{order.quantity}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.total}</p>
                <p className="font-bold text-sky-600 text-xl">{order.totalPrice}{getCurrencySymbol(order.currency || "RUB")}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{l.payment}</p>
                <p className="font-bold text-gray-900">
                  {l[`${order.paymentMethod || "card"}_method` as keyof typeof l] || order.paymentMethod}
                </p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  order.paymentStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {l[`payment${order.paymentStatus || "PENDING"}` as keyof typeof l] || order.paymentStatus}
                </span>
              </div>
            </div>

            {/* Tracking Number */}
            {order.trackingNumber && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <p className="text-xs text-indigo-600 mb-1">{l.tracking}</p>
                <p className="font-mono font-bold text-indigo-900 text-lg">{order.trackingNumber}</p>
              </div>
            )}

            {/* Card Info */}
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-sky-600 mb-1">{l.card}</p>
                <p className="font-bold text-gray-900">{order.card.firstName} {order.card.lastName}</p>
              </div>
              <Link
                href={`/${lang}/a/${order.card.slug}`}
                className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors"
              >
                {l.viewCard}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
