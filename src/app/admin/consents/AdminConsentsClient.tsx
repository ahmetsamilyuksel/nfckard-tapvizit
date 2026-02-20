"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ConsentRecord = {
  id: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerIp: string | null;
  offerAccepted: boolean;
  privacyAccepted: boolean;
  refundAccepted: boolean;
  userAgent: string | null;
  createdAt: Date;
};

export default function AdminConsentsClient({ consents: initialConsents }: { consents: ConsentRecord[] }) {
  const [consents] = useState(initialConsents);
  const [selectedConsent, setSelectedConsent] = useState<ConsentRecord | null>(null);
  const router = useRouter();

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Onay Kayitlari</h1>
          <p className="text-gray-500 mt-1">Kullanici sozlesme onaylari ({consents.length} kayit)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/admin/panel")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Geri
          </button>
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Toplam Onay</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{consents.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Oferta Kabul</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {consents.filter((c) => c.offerAccepted).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Gizlilik Kabul</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            {consents.filter((c) => c.privacyAccepted).length}
          </p>
        </div>
      </div>

      {consents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <p className="text-gray-500 text-lg">Henuz onay kaydi yok</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Musteri</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Siparis ID</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Oferta</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gizlilik</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Iade</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Detay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consents.map((consent) => (
                  <tr key={consent.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="text-xs text-gray-600">
                        {new Date(consent.createdAt).toLocaleDateString("tr-TR")}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(consent.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-medium text-gray-900">{consent.customerName}</p>
                      <p className="text-xs text-gray-500">{consent.customerEmail}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs text-gray-400 font-mono">{consent.orderId.slice(0, 12)}...</p>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {consent.offerAccepted ? (
                        <span className="inline-flex w-6 h-6 bg-green-100 text-green-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex w-6 h-6 bg-red-100 text-red-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {consent.privacyAccepted ? (
                        <span className="inline-flex w-6 h-6 bg-green-100 text-green-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex w-6 h-6 bg-red-100 text-red-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {consent.refundAccepted ? (
                        <span className="inline-flex w-6 h-6 bg-green-100 text-green-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-flex w-6 h-6 bg-red-100 text-red-600 rounded-full items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xs text-gray-500 font-mono">{consent.customerIp || "-"}</p>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => setSelectedConsent(consent)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Detaylar"
                      >
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedConsent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedConsent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Onay Detayi</h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">{selectedConsent.id}</p>
              </div>
              <button onClick={() => setSelectedConsent(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Musteri</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Isim</span><span className="text-xs font-medium text-gray-900">{selectedConsent.customerName}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">E-posta</span><span className="text-xs font-medium text-gray-900">{selectedConsent.customerEmail}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">IP Adresi</span><span className="text-xs font-mono text-gray-900">{selectedConsent.customerIp || "-"}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Siparis ID</span><span className="text-xs font-mono text-gray-900">{selectedConsent.orderId}</span></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Onaylar</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Hizmet Sozlesmesi (Oferta)</span>
                    <span className={`text-xs font-semibold ${selectedConsent.offerAccepted ? "text-green-600" : "text-red-600"}`}>
                      {selectedConsent.offerAccepted ? "Kabul Edildi" : "Reddedildi"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Gizlilik Politikasi</span>
                    <span className={`text-xs font-semibold ${selectedConsent.privacyAccepted ? "text-green-600" : "text-red-600"}`}>
                      {selectedConsent.privacyAccepted ? "Kabul Edildi" : "Reddedildi"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Iade Politikasi</span>
                    <span className={`text-xs font-semibold ${selectedConsent.refundAccepted ? "text-green-600" : "text-red-600"}`}>
                      {selectedConsent.refundAccepted ? "Kabul Edildi" : "Reddedildi"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Teknik Bilgi</h3>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-xs text-gray-500">Tarih</span><span className="text-xs font-medium text-gray-900">{new Date(selectedConsent.createdAt).toLocaleString("tr-TR")}</span></div>
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">User Agent</span>
                    <p className="text-xs font-mono text-gray-700 bg-gray-100 rounded p-2 break-all">{selectedConsent.userAgent || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
