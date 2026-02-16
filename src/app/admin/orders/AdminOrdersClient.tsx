"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStatusColor, formatPrice } from "@/lib/utils";

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
  const router = useRouter();

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
