"use client";
import { useState, lazy, Suspense } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { CardFormData, OrderFormData } from "@/types";
import type { translations } from "@/lib/i18n";
import CardPreview from "@/components/CardPreview";
// Icons removed - using inline SVG instead

const PhotoCropper = lazy(() => import("@/components/PhotoCropper"));

type T = (typeof translations)["tr"];
interface Props { lang: string; t: T; }

type Step = "design" | "order" | "success";

const PRESET_COLORS = [
  { id: "sky", gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", primary: "#0ea5e9" },
  { id: "blue", gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)", primary: "#3b82f6" },
  { id: "purple", gradient: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)", primary: "#8b5cf6" },
  { id: "pink", gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", primary: "#ec4899" },
  { id: "rose", gradient: "linear-gradient(135deg, #f43f5e 0%, #dc2626 100%)", primary: "#f43f5e" },
  { id: "amber", gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)", primary: "#f59e0b" },
  { id: "emerald", gradient: "linear-gradient(135deg, #10b981 0%, #16a34a 100%)", primary: "#10b981" },
  { id: "cyan", gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", primary: "#06b6d4" },
  { id: "indigo", gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", primary: "#6366f1" },
  { id: "violet", gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)", primary: "#a855f7" },
  { id: "red", gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", primary: "#ef4444" },
  { id: "orange", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", primary: "#f97316" },
  { id: "yellow", gradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)", primary: "#eab308" },
  { id: "lime", gradient: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)", primary: "#84cc16" },
  { id: "green", gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", primary: "#22c55e" },
  { id: "teal", gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)", primary: "#14b8a6" },
  { id: "deepcyan", gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)", primary: "#0891b2" },
  { id: "royalblue", gradient: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)", primary: "#2563eb" },
  { id: "grape", gradient: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", primary: "#7c3aed" },
  { id: "hotpink", gradient: "linear-gradient(135deg, #db2777 0%, #be185d 100%)", primary: "#db2777" },
  { id: "charcoal", gradient: "linear-gradient(135deg, #171717 0%, #000000 100%)", primary: "#171717" },
  { id: "white", gradient: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)", primary: "#ffffff" },
];

const CARD_TYPES = [
  { id: "standard", price: 49.99 },
  { id: "premium", price: 79.99 },
  { id: "metal", price: 129.99 },
];

export default function CreateCardClient({ lang, t }: Props) {
  const [step, setStep] = useState<Step>("design");
  const [cardData, setCardData] = useState<CardFormData>({
    firstName: "", lastName: "", title: "", company: "", email: "", phone: "",
    website: "", linkedin: "", twitter: "", instagram: "", whatsapp: "", telegram: "", vkontakte: "", vkmax: "", tiktok: "", wechat: "", youtube: "", facebook: "", snapchat: "", wildberries: "", ozon: "", yandexmarket: "", address: "", bio: "",
    theme: "dark", primaryColor: "#0ea5e9", backgroundColor: "#ffffff", gradientIntensity: 50, photoUrl: "", layout: "classic",
    photoZoom: 1, photoPosition: { x: 0, y: 0 }
  });
  const [orderData, setOrderData] = useState<OrderFormData>({
    cardType: "standard",
    quantity: 1,
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    notes: "",
  });
  const [createdSlug, setCreatedSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCropper, setShowCropper] = useState(false);

  const handleCardChange = (field: keyof CardFormData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleOrderChange = (field: keyof OrderFormData, value: string | number) => {
    setOrderData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateDesignStep = () => {
    const newErrors: Record<string, string> = {};
    if (!cardData.firstName.trim()) newErrors.firstName = t.required;
    if (!cardData.lastName.trim()) newErrors.lastName = t.required;
    if (cardData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.email)) {
      newErrors.email = t.invalidEmail;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOrderStep = () => {
    const newErrors: Record<string, string> = {};
    if (!orderData.customerName.trim()) newErrors.customerName = t.required;
    if (!orderData.customerEmail.trim()) {
      newErrors.customerEmail = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customerEmail)) {
      newErrors.customerEmail = t.invalidEmail;
    }
    if (!orderData.shippingAddress.trim()) newErrors.shippingAddress = t.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToOrder = () => {
    if (validateDesignStep()) {
      setStep("order");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmitOrder = async () => {
    if (!validateOrderStep()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardData, orderData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        // Handle validation errors with translated messages
        if (errorData.error === "VALIDATION_ERROR" && errorData.message === "invalidFormat") {
          alert(t.invalidFormat);
        } else if (errorData.error === "SERVER_ERROR" && errorData.message === "serverError") {
          alert(t.serverError);
        } else if (errorData.error === "SERVER_ERROR") {
          alert(t.serverError);
        } else {
          // Fallback: show translated error or default
          alert(t.orderError);
        }
        return;
      }

      const result = await response.json();
      setCreatedSlug(result.slug);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Order error:", error);
      alert(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSaved = (croppedPhotoUrl: string, originalPhotoUrl: string, zoom: number, position: { x: number; y: number }) => {
    setCardData((prev) => ({ ...prev, photoUrl: croppedPhotoUrl, originalPhotoUrl: originalPhotoUrl, photoZoom: zoom, photoPosition: position }));
    setShowCropper(false);
  };

  const handleRemovePhoto = () => {
    setCardData((prev) => ({ ...prev, photoUrl: "" }));
  };

  const handleNewCard = () => {
    setStep("design");
    setCardData({
      firstName: "", lastName: "", title: "", company: "", email: "", phone: "",
      website: "", linkedin: "", twitter: "", instagram: "", whatsapp: "", telegram: "", vkontakte: "", vkmax: "", tiktok: "", wechat: "", youtube: "", facebook: "", snapchat: "", wildberries: "", ozon: "", yandexmarket: "", address: "", bio: "",
      theme: "dark", primaryColor: "#0ea5e9", photoUrl: ""
    });
    setOrderData({
      cardType: "standard",
      quantity: 1,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      notes: "",
    });
    setCreatedSlug("");
    setErrors({});
  };

  const cardUrl = createdSlug ? `${typeof window !== "undefined" ? window.location.origin : ""}/${lang}/a/${createdSlug}` : "";

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <svg className="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.orderSuccessTitle}</h1>
          <p className="text-lg text-gray-600 mb-6">{t.orderSuccessMessage}</p>

          <div className="bg-sky-50 rounded-xl p-6 mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <QRCodeSVG value={cardUrl} size={200} level="H" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{t.yourCardUrl}</p>
            <a
              href={cardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 font-medium break-all"
            >
              {cardUrl}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={cardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              {t.viewCardButton}
            </a>
            <button
              onClick={handleNewCard}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              {t.createAnotherCard}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Step Indicators - Sticky */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-gray-50 to-transparent pb-6 mb-2">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step === "design" ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              1
            </div>
            <span className={`ml-2 font-medium ${step === "design" ? "text-sky-600" : "text-gray-600"}`}>
              {t.stepDesign}
            </span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step === "order" ? "bg-sky-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              2
            </div>
            <span className={`ml-2 font-medium ${step === "order" ? "text-sky-600" : "text-gray-600"}`}>
              {t.stepOrder}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          {step === "design" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.designYourCard}</h2>

              {/* Photo Upload Section - Compact */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.profilePhoto}
                </label>
                <div
                  onClick={() => !cardData.photoUrl && setShowCropper(true)}
                  className={`relative w-full ${!cardData.photoUrl ? 'cursor-pointer' : ''}`}
                >
                  {cardData.photoUrl ? (
                    <div className="group relative">
                      <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cardData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center rounded-2xl w-32 h-32 mx-auto">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCropper(true)}
                            className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                            title="Değiştir"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
                            title={t.removePhoto}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 mx-auto border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center justify-center cursor-pointer">
                      <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-600 font-medium">{t.uploadPhoto}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Layout Selector - Compact icons */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.layoutTitle}</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "classic", key: "layoutClassic" },
                    { id: "modern", key: "layoutModern" },
                    { id: "sidebar", key: "layoutSidebar" },
                    { id: "minimal", key: "layoutMinimal" },
                    { id: "bold", key: "layoutBold" },
                    { id: "stylish", key: "layoutStylish" },
                    { id: "elegant", key: "layoutElegant" },
                    { id: "creative", key: "layoutCreative" }
                  ].map((layout) => (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => handleCardChange("layout", layout.id)}
                      className={`group relative rounded-md border-2 transition-all hover:scale-105 overflow-hidden ${
                        cardData.layout === layout.id
                          ? "border-sky-500 shadow-lg ring-2 ring-sky-200"
                          : "border-gray-300 hover:border-sky-400 hover:shadow-md"
                      }`}
                      title={t[layout.key as keyof T] as string}
                    >
                      {/* Layout name on top */}
                      <div className={`px-1 py-0.5 text-center border-b transition-colors ${
                        cardData.layout === layout.id
                          ? "bg-sky-500 border-sky-600 text-white"
                          : "bg-gray-50 border-gray-200 text-gray-600 group-hover:bg-sky-50 group-hover:text-sky-600"
                      }`}>
                        <span className="text-[7px] font-semibold leading-tight">{t[layout.key as keyof T] as string}</span>
                      </div>
                      {/* Mini preview cards */}
                      <div className="aspect-[3/2] bg-gradient-to-br from-white to-gray-50 p-0.5 flex flex-col">
                        {layout.id === "classic" && (
                          <>
                            <div className="h-px w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400 rounded mb-0.5"></div>
                            <div className="flex flex-col items-center gap-px mb-0.5">
                              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-sky-400 to-sky-500"></div>
                              <div className="w-5 h-px bg-gray-300 rounded"></div>
                              <div className="w-3.5 h-px bg-gray-200 rounded"></div>
                            </div>
                            <div className="flex-1 flex flex-col gap-px px-0.5">
                              <div className="w-full h-px bg-gray-200 rounded"></div>
                              <div className="w-2/3 h-px bg-gray-200 rounded"></div>
                            </div>
                          </>
                        )}
                        {layout.id === "modern" && (
                          <>
                            <div className="h-5 w-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-t mb-px"></div>
                            <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
                            <div className="flex-1 px-0.5 pt-0.5 flex flex-col gap-px">
                              <div className="w-5 h-px bg-gray-300 rounded"></div>
                              <div className="w-3.5 h-px bg-gray-200 rounded"></div>
                            </div>
                          </>
                        )}
                        {layout.id === "sidebar" && (
                          <div className="flex gap-px h-full">
                            <div className="w-1/3 bg-gradient-to-br from-sky-100 to-sky-50 rounded flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-sky-400 to-sky-500"></div>
                            </div>
                            <div className="flex-1 flex flex-col gap-px py-px">
                              <div className="w-full h-px bg-gray-300 rounded"></div>
                              <div className="w-2/3 h-px bg-gray-200 rounded"></div>
                              <div className="flex-1"></div>
                              <div className="w-full h-px bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        )}
                        {layout.id === "minimal" && (
                          <div className="flex flex-col gap-px p-px h-full">
                            <div className="flex gap-px items-start">
                              <div className="w-2 h-2 rounded bg-gradient-to-br from-sky-400 to-sky-500 flex-shrink-0"></div>
                              <div className="flex-1 flex flex-col gap-px">
                                <div className="w-full h-px bg-gray-300 rounded"></div>
                                <div className="w-2/3 h-px bg-gray-200 rounded"></div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-px">
                              <div className="w-full h-px bg-gray-200 rounded"></div>
                              <div className="w-3/4 h-px bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        )}
                        {layout.id === "bold" && (
                          <>
                            <div className="h-6 w-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-t mb-px relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent rounded-t"></div>
                            </div>
                            <div className="flex-1 px-0.5 flex flex-col gap-px">
                              <div className="w-5 h-px bg-gray-300 rounded"></div>
                              <div className="w-3.5 h-px bg-gray-200 rounded"></div>
                            </div>
                          </>
                        )}
                        {layout.id === "stylish" && (
                          <div className="flex h-full rounded-t overflow-hidden">
                            <div className="w-3/5 bg-gradient-to-br from-sky-300 to-sky-400"></div>
                            <div className="w-2/5 bg-gradient-to-b from-sky-500 to-sky-600 flex flex-col items-center justify-center gap-px">
                              <div className="w-2.5 h-px bg-white/90 rounded"></div>
                              <div className="w-2 h-px bg-white/70 rounded"></div>
                            </div>
                          </div>
                        )}
                        {layout.id === "elegant" && (
                          <div className="relative h-full">
                            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-sky-500 via-sky-400 to-transparent rounded-t"></div>
                            <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 ring-1 ring-white/30"></div>
                            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-px px-0.5 pb-px items-center">
                              <div className="w-5 h-px bg-gray-300 rounded"></div>
                              <div className="w-3.5 h-px bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        )}
                        {layout.id === "creative" && (
                          <>
                            <div className="h-5 w-full bg-gradient-to-br from-sky-400 to-sky-500 rounded-t mb-px relative">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent rounded-t"></div>
                            </div>
                            <div className="flex-1 px-0.5">
                              <div className="border-b border-sky-400/50 pb-px mb-px">
                                <div className="w-5 h-px bg-gray-300 rounded"></div>
                              </div>
                              <div className="w-full h-px bg-gray-200 rounded"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{t.basicInfo}</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.firstName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardData.firstName}
                      onChange={(e) => handleCardChange("firstName", e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.placeholderFirstName}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.lastName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardData.lastName}
                      onChange={(e) => handleCardChange("lastName", e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={t.placeholderLastName}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.title}</label>
                  <input
                    type="text"
                    value={cardData.title}
                    onChange={(e) => handleCardChange("title", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderTitle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
                  <input
                    type="text"
                    value={cardData.company}
                    onChange={(e) => handleCardChange("company", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderCompany}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{t.contactInfo}</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                  <input
                    type="email"
                    value={cardData.email}
                    onChange={(e) => handleCardChange("email", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.placeholderEmail}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                  <input
                    type="tel"
                    value={cardData.phone}
                    onChange={(e) => handleCardChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderPhone}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.website}</label>
                  <input
                    type="url"
                    value={cardData.website}
                    onChange={(e) => handleCardChange("website", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderWebsite}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label>
                  <input
                    type="text"
                    value={cardData.address}
                    onChange={(e) => handleCardChange("address", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderAddress}
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{t.socialMedia}</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.linkedin}</label>
                  <input
                    type="text"
                    value={cardData.linkedin}
                    onChange={(e) => handleCardChange("linkedin", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderLinkedin}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.twitter}</label>
                  <input
                    type="text"
                    value={cardData.twitter}
                    onChange={(e) => handleCardChange("twitter", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderTwitter}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.instagram}</label>
                  <input
                    type="text"
                    value={cardData.instagram}
                    onChange={(e) => handleCardChange("instagram", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderInstagram}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.whatsapp}</label>
                  <input
                    type="text"
                    value={cardData.whatsapp}
                    onChange={(e) => handleCardChange("whatsapp", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderWhatsapp}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.telegram}</label>
                  <input
                    type="text"
                    value={cardData.telegram}
                    onChange={(e) => handleCardChange("telegram", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderTelegram}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.vkontakte}</label>
                  <input
                    type="text"
                    value={cardData.vkontakte}
                    onChange={(e) => handleCardChange("vkontakte", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderVkontakte}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.tiktok}</label>
                  <input
                    type="text"
                    value={cardData.tiktok}
                    onChange={(e) => handleCardChange("tiktok", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderTiktok}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.wechat}</label>
                  <input
                    type="text"
                    value={cardData.wechat}
                    onChange={(e) => handleCardChange("wechat", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderWechat}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.youtube}</label>
                  <input
                    type="text"
                    value={cardData.youtube}
                    onChange={(e) => handleCardChange("youtube", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderYoutube}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.facebook}</label>
                  <input
                    type="text"
                    value={cardData.facebook}
                    onChange={(e) => handleCardChange("facebook", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderFacebook}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.snapchat}</label>
                  <input
                    type="text"
                    value={cardData.snapchat}
                    onChange={(e) => handleCardChange("snapchat", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderSnapchat}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.vkmax}</label>
                  <input
                    type="text"
                    value={cardData.vkmax}
                    onChange={(e) => handleCardChange("vkmax", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderVkmax}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.wildberries}</label>
                  <input
                    type="text"
                    value={cardData.wildberries}
                    onChange={(e) => handleCardChange("wildberries", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderWildberries}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.ozon}</label>
                  <input
                    type="text"
                    value={cardData.ozon}
                    onChange={(e) => handleCardChange("ozon", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderOzon}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.yandexmarket}</label>
                  <input
                    type="text"
                    value={cardData.yandexmarket}
                    onChange={(e) => handleCardChange("yandexmarket", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderYandexmarket}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.bio}</label>
                <textarea
                  value={cardData.bio}
                  onChange={(e) => handleCardChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder={t.placeholderBio}
                />
              </div>

              {/* Theme Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.theme}</label>
                <div className="grid grid-cols-2 gap-2">
                  {["dark", "light", "gradient", "modern", "elegant", "minimal", "vibrant", "professional"].map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => handleCardChange("theme", theme)}
                      className={`px-3 py-2.5 rounded-lg border-2 font-medium transition-all ${
                        cardData.theme === theme
                          ? "border-sky-600 bg-gradient-to-br from-sky-50 to-sky-100 text-sky-700 shadow-md"
                          : "border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded flex-shrink-0 ${
                          theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-700" :
                          theme === "light" ? "bg-gradient-to-br from-white to-gray-100 border border-gray-200" :
                          theme === "gradient" ? "bg-gradient-to-br from-purple-500 to-pink-500" :
                          theme === "modern" ? "bg-gradient-to-br from-blue-500 to-cyan-500" :
                          theme === "elegant" ? "bg-gradient-to-br from-gray-800 to-gray-600" :
                          theme === "minimal" ? "bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300" :
                          theme === "vibrant" ? "bg-gradient-to-br from-orange-500 to-red-500" :
                          "bg-gradient-to-br from-indigo-600 to-blue-600"
                        }`}></div>
                        <span className="text-xs font-semibold truncate">{t[`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}` as keyof T] || theme}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Color Picker - Gradient */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.primaryColor}</label>
                <div className="space-y-3">
                  {/* Gradient Color Picker - Click to select shade */}
                  <div
                    className="relative w-full h-16 rounded-xl border-2 border-gray-300 shadow-inner cursor-crosshair overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, #000000 0%, ${cardData.primaryColor} 50%, #ffffff 100%)`
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;

                      // Convert current color to RGB
                      const hex = cardData.primaryColor.replace('#', '');
                      const r = parseInt(hex.substring(0, 2), 16);
                      const g = parseInt(hex.substring(2, 4), 16);
                      const b = parseInt(hex.substring(4, 6), 16);

                      let newR, newG, newB;
                      if (percentage < 0.5) {
                        // Black to color (0% to 50%)
                        const factor = percentage * 2;
                        newR = Math.round(r * factor);
                        newG = Math.round(g * factor);
                        newB = Math.round(b * factor);
                      } else {
                        // Color to white (50% to 100%)
                        const factor = (percentage - 0.5) * 2;
                        newR = Math.round(r + (255 - r) * factor);
                        newG = Math.round(g + (255 - g) * factor);
                        newB = Math.round(b + (255 - b) * factor);
                      }

                      const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
                      handleCardChange("primaryColor", newColor);
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                      <span className="text-white text-xs font-semibold drop-shadow-lg">Tıklayın ve ton seçin</span>
                    </div>
                  </div>
                  {/* HTML5 Color Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={cardData.primaryColor}
                      onChange={(e) => handleCardChange("primaryColor", e.target.value)}
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={cardData.primaryColor}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                            handleCardChange("primaryColor", val);
                          }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-sky-500 focus:outline-none"
                        placeholder="#0ea5e9"
                      />
                    </div>
                  </div>
                  {/* Quick preset colors */}
                  <div className="grid grid-cols-8 gap-2">
                    {PRESET_COLORS.slice(0, 8).map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleCardChange("primaryColor", color.primary)}
                        className={`w-full h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                          cardData.primaryColor === color.primary
                            ? "border-gray-900 ring-2 ring-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ background: color.gradient }}
                        title={color.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Background Color Picker - Gradient */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.backgroundColor}</label>
                <div className="space-y-3">
                  {/* Gradient Color Picker - Click to select shade */}
                  <div
                    className="relative w-full h-16 rounded-xl border-2 border-gray-300 shadow-inner cursor-crosshair overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, #000000 0%, ${cardData.backgroundColor || '#ffffff'} 50%, #ffffff 100%)`
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = x / rect.width;

                      // Convert current color to RGB
                      const currentColor = cardData.backgroundColor || '#ffffff';
                      const hex = currentColor.replace('#', '');
                      const r = parseInt(hex.substring(0, 2), 16);
                      const g = parseInt(hex.substring(2, 4), 16);
                      const b = parseInt(hex.substring(4, 6), 16);

                      let newR, newG, newB;
                      if (percentage < 0.5) {
                        // Black to color (0% to 50%)
                        const factor = percentage * 2;
                        newR = Math.round(r * factor);
                        newG = Math.round(g * factor);
                        newB = Math.round(b * factor);
                      } else {
                        // Color to white (50% to 100%)
                        const factor = (percentage - 0.5) * 2;
                        newR = Math.round(r + (255 - r) * factor);
                        newG = Math.round(g + (255 - g) * factor);
                        newB = Math.round(b + (255 - b) * factor);
                      }

                      const newColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
                      handleCardChange("backgroundColor", newColor);
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                      <span className="text-white text-xs font-semibold drop-shadow-lg">Tıklayın ve ton seçin</span>
                    </div>
                  </div>
                  {/* HTML5 Color Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={cardData.backgroundColor || "#ffffff"}
                      onChange={(e) => handleCardChange("backgroundColor", e.target.value)}
                      className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 shadow-sm"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={cardData.backgroundColor || "#ffffff"}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                            handleCardChange("backgroundColor", val);
                          }
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-sky-500 focus:outline-none"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                  {/* Quick preset colors - Same as primary colors */}
                  <div className="grid grid-cols-8 gap-2">
                    {PRESET_COLORS.slice(0, 8).map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleCardChange("backgroundColor", color.primary)}
                        className={`w-full h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                          cardData.backgroundColor === color.primary
                            ? "border-gray-900 ring-2 ring-gray-400"
                            : "border-gray-200"
                        }`}
                        style={{ background: color.gradient }}
                        title={color.id}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Gradient Intensity Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.gradientIntensity}</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 w-12">Yumuşak</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={cardData.gradientIntensity || 50}
                      onChange={(e) => handleCardChange("gradientIntensity", e.target.value)}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    />
                    <span className="text-xs text-gray-500 w-12">Sert</span>
                  </div>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                      {cardData.gradientIntensity || 50}%
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextToOrder}
                className="w-full px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold text-lg"
              >
                {t.nextOrderDetails}
              </button>
            </div>
          )}

          {step === "order" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.orderDetails}</h2>

              {/* Card Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">{t.cardType}</label>
                <div className="space-y-3">
                  {CARD_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => handleOrderChange("cardType", type.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        orderData.cardType === type.id
                          ? "border-sky-600 bg-sky-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-900 capitalize">
                            {t[`cardType${type.id.charAt(0).toUpperCase() + type.id.slice(1)}` as keyof T] || type.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {t[`cardType${type.id.charAt(0).toUpperCase() + type.id.slice(1)}Desc` as keyof T] || ""}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-sky-600">${type.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.quantity}</label>
                <input
                  type="number"
                  min="1"
                  value={orderData.quantity}
                  onChange={(e) => handleOrderChange("quantity", parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              {/* Customer Information */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{t.customerInfo}</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={orderData.customerName}
                    onChange={(e) => handleOrderChange("customerName", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.placeholderCustomerName}
                  />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={orderData.customerEmail}
                    onChange={(e) => handleOrderChange("customerEmail", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                      errors.customerEmail ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.placeholderEmail}
                  />
                  {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
                  <input
                    type="tel"
                    value={orderData.customerPhone}
                    onChange={(e) => handleOrderChange("customerPhone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder={t.placeholderPhone}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.shippingAddress} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={orderData.shippingAddress}
                    onChange={(e) => handleOrderChange("shippingAddress", e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none ${
                      errors.shippingAddress ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder={t.placeholderShippingAddress}
                  />
                  {errors.shippingAddress && <p className="text-red-500 text-xs mt-1">{errors.shippingAddress}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.notes}</label>
                  <textarea
                    value={orderData.notes}
                    onChange={(e) => handleOrderChange("notes", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                    placeholder={t.placeholderNotes}
                  />
                </div>
              </div>

              {/* Total */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-700">{t.total}:</span>
                  <span className="font-bold text-sky-600 text-2xl">
                    ${(CARD_TYPES.find((t) => t.id === orderData.cardType)?.price || 0) * orderData.quantity}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("design")}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.submitting : t.placeOrder}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section - STICKY */}
        <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6 z-10 self-start">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t.previewTitle}</h3>
          <CardPreview card={cardData} lang={lang} t={t} onPhotoClick={() => cardData.photoUrl && setShowCropper(true)} />
        </div>
      </div>

      {/* Photo Cropper Modal */}
      {showCropper && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8">
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        }>
          <PhotoCropper
            onPhotoSaved={handlePhotoSaved}
            onClose={() => setShowCropper(false)}
            labelUpload={t.uploadPhoto}
            labelCrop={t.cropPhoto}
            labelDone={t.cropDone}
            labelCancel={t.cropCancel}
            initialZoom={cardData.photoZoom}
            initialPosition={cardData.photoPosition}
            existingPhoto={cardData.photoUrl}
            existingOriginalPhoto={cardData.originalPhotoUrl}
            layout={cardData.layout}
          />
        </Suspense>
      )}
    </div>
  );
}
