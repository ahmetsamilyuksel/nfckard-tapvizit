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
  "#0ea5e9", // sky-600
  "#3b82f6", // blue-600
  "#8b5cf6", // violet-600
  "#ec4899", // pink-600
  "#f43f5e", // rose-600
  "#f59e0b", // amber-600
  "#10b981", // emerald-600
  "#06b6d4", // cyan-600
  "#6366f1", // indigo-600
  "#a855f7", // purple-600
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
    website: "", linkedin: "", twitter: "", instagram: "", address: "", bio: "",
    theme: "dark", primaryColor: "#0ea5e9", photoUrl: ""
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
        throw new Error(errorData.error || "Failed to create card");
      }

      const result = await response.json();
      setCreatedSlug(result.slug);
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoSaved = (photoDataUrl: string) => {
    setCardData((prev) => ({ ...prev, photoUrl: photoDataUrl }));
    setShowCropper(false);
  };

  const handleRemovePhoto = () => {
    setCardData((prev) => ({ ...prev, photoUrl: "" }));
  };

  const handleNewCard = () => {
    setStep("design");
    setCardData({
      firstName: "", lastName: "", title: "", company: "", email: "", phone: "",
      website: "", linkedin: "", twitter: "", instagram: "", address: "", bio: "",
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
      {/* Step Indicators */}
      <div className="mb-8">
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

              {/* Photo Upload Section - Large & Modern */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  {t.profilePhoto}
                </label>
                <div
                  onClick={() => !cardData.photoUrl && setShowCropper(true)}
                  className={`relative w-full ${!cardData.photoUrl ? 'cursor-pointer' : ''}`}
                >
                  {cardData.photoUrl ? (
                    <div className="group relative">
                      <div className="w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                        <img src={cardData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center rounded-3xl max-w-sm mx-auto">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowCropper(true)}
                            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Değiştir
                          </button>
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="bg-red-500 text-white p-3 rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-colors"
                            title={t.removePhoto}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-sm mx-auto">
                      <div className="border-4 border-dashed border-sky-300 rounded-3xl bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 hover:from-sky-100 hover:via-blue-100 hover:to-indigo-100 transition-all aspect-square flex flex-col items-center justify-center p-8 group">
                        <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-16 h-16 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-xl font-bold text-gray-800 mb-2">{t.uploadPhoto}</p>
                        <p className="text-sm text-gray-500 text-center px-4">Tıklayın ve profil fotoğrafınızı yükleyin</p>
                        <p className="text-xs text-gray-400 mt-2">JPG, PNG veya WEBP</p>
                      </div>
                    </div>
                  )}
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

              {/* Design Options */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">{t.designTitle}</h3>

                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">{t.theme}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["dark", "light", "gradient", "modern", "elegant", "minimal", "vibrant", "professional"].map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => handleCardChange("theme", theme)}
                        className={`group relative px-4 py-6 rounded-xl border-2 font-semibold transition-all overflow-hidden ${
                          cardData.theme === theme
                            ? "border-sky-600 bg-sky-600 text-white shadow-lg scale-105"
                            : "border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-12 h-12 rounded-lg ${
                            theme === "dark" ? "bg-gray-900" :
                            theme === "light" ? "bg-white border-2 border-gray-200" :
                            theme === "gradient" ? "bg-gradient-to-br from-purple-500 to-pink-500" :
                            theme === "modern" ? "bg-gradient-to-br from-blue-500 to-cyan-500" :
                            theme === "elegant" ? "bg-gradient-to-br from-gray-800 to-gray-600" :
                            theme === "minimal" ? "bg-gray-100 border-2 border-gray-300" :
                            theme === "vibrant" ? "bg-gradient-to-br from-orange-500 to-red-500" :
                            "bg-gradient-to-br from-indigo-600 to-blue-600"
                          } ${cardData.theme === theme ? "shadow-lg" : ""}`}></div>
                          <span className="text-sm">{t[`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}` as keyof T] || theme}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.primaryColor}</label>
                  <div className="grid grid-cols-5 gap-3">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleCardChange("primaryColor", color)}
                        className={`w-full h-12 rounded-lg border-2 transition-all ${
                          cardData.primaryColor === color ? "border-gray-900 scale-110" : "border-gray-200 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
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

        {/* Preview Section */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.previewTitle}</h3>
            <CardPreview card={cardData} lang={lang} t={t} />
          </div>
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
          />
        </Suspense>
      )}
    </div>
  );
}
