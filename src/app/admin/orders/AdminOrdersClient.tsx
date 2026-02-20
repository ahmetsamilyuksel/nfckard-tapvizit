"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStatusColor, formatPrice, getDeliveryLabel } from "@/lib/utils";

type OrderWithCard = {
  id: string;
  quantity: number;
  cardType: string;
  status: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  shippingAddress: string;
  notes: string | null;
  deliveryMethod: string | null;
  trackingNumber: string | null;
  createdAt: Date;
  card: {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    title: string | null;
    company: string | null;
    theme: string;
    primaryColor: string;
    viewCount: number;
    createdAt: Date;
  };
};

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Bekliyor",
  CONFIRMED: "Onaylandı",
  PROCESSING: "Hazırlanıyor",
  SHIPPED: "Kargoya Verildi",
  DELIVERED: "Teslim Edildi",
  CANCELLED: "İptal Edildi",
};

const CARD_TYPE_LABELS: Record<string, string> = {
  standard: "Standart (PVC)",
  premium: "Premium (Mat)",
  metal: "Metal",
};

export default function AdminOrdersClient({ orders: initialOrders }: { orders: OrderWithCard[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithCard | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  const BASE_URL = "https://vizit.life";

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const filtered = filterStatus === "ALL" ? orders : orders.filter((o) => o.status === filterStatus);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "admin123",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : null);
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(null);
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sipariş Yönetimi</h1>
          <p className="text-gray-500 mt-1">Tüm siparişleri buradan yönetebilirsiniz</p>
        </div>
        <button
          onClick={() => router.refresh()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Yenile
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Toplam Sipariş</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Bekleyen Sipariş</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Toplam Ciro</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{formatPrice(totalRevenue, "tr")}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterStatus("ALL")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === "ALL" ? "bg-gray-900 text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Tümü ({orders.length})
        </button>
        {STATUSES.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterStatus === s ? "bg-gray-900 text-white" : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {STATUS_LABELS[s]} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <p className="text-gray-500 text-lg">Henüz sipariş yok</p>
          <p className="text-gray-400 text-sm mt-2">Siparişler burada görünecek</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sipariş</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Müşteri</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kart</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tip / Adet</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tutar</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="text-xs text-gray-400 font-mono">{order.id.slice(0, 8)}...</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {new Date(order.createdAt).toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      {order.customerPhone && (
                        <p className="text-xs text-gray-400">{order.customerPhone}</p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-md flex-shrink-0"
                          style={{ backgroundColor: order.card.primaryColor }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.card.firstName} {order.card.lastName}
                          </p>
                          {order.card.title && (
                            <p className="text-xs text-gray-400">{order.card.title}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-700">{CARD_TYPE_LABELS[order.cardType] ?? order.cardType}</p>
                      <p className="text-xs text-gray-500">{order.quantity} adet</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-bold text-gray-900">{formatPrice(order.totalPrice, "tr")}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          disabled={updating === order.id}
                          className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 bg-white"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                        {/* NFC URL Kopyala */}
                        <button
                          onClick={() => copyToClipboard(`${BASE_URL}/ru/a/${order.card.slug}`, `nfc-${order.id}`)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            copiedField === `nfc-${order.id}` ? "bg-green-100" : "hover:bg-purple-100"
                          }`}
                          title={copiedField === `nfc-${order.id}` ? "Kopyalandı!" : "NFC URL Kopyala"}
                        >
                          {copiedField === `nfc-${order.id}` ? (
                            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          )}
                        </button>
                        {/* VCF İndir */}
                        <a
                          href={`/api/vcard/${order.card.slug}`}
                          download
                          className="p-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                          title="VCF İndir"
                        >
                          <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </a>
                        {/* Kartı Görüntüle */}
                        <a
                          href={`/tr/a/${order.card.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Kartı görüntüle"
                        >
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        {/* Detaylar */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Detaylar"
                        >
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sipariş Detayı</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <Section title="Müşteri Bilgileri">
                <Row label="İsim" value={selectedOrder.customerName} />
                <Row label="E-posta" value={selectedOrder.customerEmail} />
                {selectedOrder.customerPhone && <Row label="Telefon" value={selectedOrder.customerPhone} />}
                <Row label="Adres" value={selectedOrder.shippingAddress} />
                {selectedOrder.notes && <Row label="Notlar" value={selectedOrder.notes} />}
              </Section>

              <Section title="Kart Bilgileri">
                <Row label="İsim" value={`${selectedOrder.card.firstName} ${selectedOrder.card.lastName}`} />
                {selectedOrder.card.title && <Row label="Unvan" value={selectedOrder.card.title} />}
                {selectedOrder.card.company && <Row label="Şirket" value={selectedOrder.card.company} />}
                <Row label="Görüntülenme" value={`${selectedOrder.card.viewCount} kez`} />
              </Section>

              <Section title="Sipariş Bilgileri">
                <Row label="Kart Tipi" value={CARD_TYPE_LABELS[selectedOrder.cardType] ?? selectedOrder.cardType} />
                <Row label="Adet" value={`${selectedOrder.quantity}`} />
                <Row label="Toplam" value={formatPrice(selectedOrder.totalPrice, "tr")} />
                <Row label="Teslimat" value={selectedOrder.deliveryMethod ? getDeliveryLabel(selectedOrder.deliveryMethod) : "Belirtilmedi"} />
                {selectedOrder.trackingNumber && <Row label="Takip No" value={selectedOrder.trackingNumber} />}
                <Row label="Tarih" value={new Date(selectedOrder.createdAt).toLocaleString("tr-TR")} />
              </Section>

              <div className="pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Durum Güncelle</p>
                <div className="flex gap-2 flex-wrap">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      disabled={updating === selectedOrder.id || selectedOrder.status === s}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:cursor-not-allowed ${
                        selectedOrder.status === s
                          ? getStatusColor(s) + " opacity-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* NFC Tools Bölümü */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
                <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  NFC Tools - Karta Yaz
                </h3>

                {/* NFC URL - Ana link */}
                <div className="mb-3">
                  <label className="text-[10px] font-medium text-purple-600 uppercase tracking-wider">NFC&apos;ye Yazilacak URL</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${BASE_URL}/ru/a/${selectedOrder.card.slug}`}
                      className="flex-1 text-xs font-mono bg-white border border-purple-200 rounded-lg px-3 py-2 text-gray-800 select-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <button
                      onClick={() => copyToClipboard(`${BASE_URL}/ru/a/${selectedOrder.card.slug}`, "nfc-url")}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
                        copiedField === "nfc-url"
                          ? "bg-green-500 text-white"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {copiedField === "nfc-url" ? "Kopyalandi!" : "Kopyala"}
                    </button>
                  </div>
                </div>

                {/* VCF Link */}
                <div className="mb-3">
                  <label className="text-[10px] font-medium text-purple-600 uppercase tracking-wider">VCF Dosyasi Linki</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`${BASE_URL}/api/vcard/${selectedOrder.card.slug}`}
                      className="flex-1 text-xs font-mono bg-white border border-purple-200 rounded-lg px-3 py-2 text-gray-800 select-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <button
                      onClick={() => copyToClipboard(`${BASE_URL}/api/vcard/${selectedOrder.card.slug}`, "vcf-url")}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex-shrink-0 ${
                        copiedField === "vcf-url"
                          ? "bg-green-500 text-white"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {copiedField === "vcf-url" ? "Kopyalandi!" : "Kopyala"}
                    </button>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <a
                    href={`/api/vcard/${selectedOrder.card.slug}`}
                    download
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-white border border-purple-300 text-purple-700 rounded-xl text-xs font-semibold hover:bg-purple-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    VCF Indir
                  </a>
                  <a
                    href={`${BASE_URL}/ru/a/${selectedOrder.card.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-white border border-purple-300 text-purple-700 rounded-xl text-xs font-semibold hover:bg-purple-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Karti Goruntule
                  </a>
                </div>

                {/* NFC Tools Talimatları */}
                <div className="mt-3 p-2.5 bg-white/70 rounded-lg border border-purple-100">
                  <p className="text-[10px] font-semibold text-purple-800 mb-1">NFC Tools Kullanimi:</p>
                  <div className="text-[10px] text-purple-600 space-y-0.5">
                    <p>1. NFC Tools &gt; Write &gt; Add a record</p>
                    <p>2. URL/URI secin</p>
                    <p>3. Yukaridaki URL&apos;yi yapiştirin</p>
                    <p>4. Write &gt; NFC karti yaklastirin</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`/tr/a/${selectedOrder.card.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Dijital Kartı Görüntüle
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-900 text-right">{value}</span>
    </div>
  );
}
