import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl mb-6 shadow-lg shadow-sky-500/30">
          <span className="text-white font-extrabold text-3xl">N</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t.aboutTitle}</h1>
        <p className="text-lg text-gray-600">{t.aboutSubtitle}</p>
      </div>

      {/* About Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{t.aboutDesc}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mission */}
          <div className="bg-sky-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.aboutMission}</h3>
            <p className="text-gray-600 leading-relaxed">{t.aboutMissionDesc}</p>
          </div>
          {/* Vision */}
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.aboutVision}</h3>
            <p className="text-gray-600 leading-relaxed">{t.aboutVisionDesc}</p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === "ru" ? "Что мы предлагаем" : locale === "en" ? "What We Offer" : "Neler Sunuyoruz"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0", text: locale === "ru" ? "NFC визитки для бизнеса" : locale === "en" ? "NFC business cards" : "İş için NFC kartvizitler" },
              { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", text: locale === "ru" ? "QR-коды для совместимости" : locale === "en" ? "QR codes for compatibility" : "Uyumluluk için QR kodlar" },
              { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", text: locale === "ru" ? "Онлайн редактирование" : locale === "en" ? "Online editing" : "Online düzenleme" },
              { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", text: locale === "ru" ? "Доставка по всей России" : locale === "en" ? "Delivery across Russia" : "Rusya genelinde teslimat" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <svg className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Channels */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === "ru" ? "Где купить" : locale === "en" ? "Where to Buy" : "Nereden Alınır"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {["Wildberries", "Ozon", "Yandex Market", "CDEK", "Avito", "vizit.life"].map((channel) => (
              <div key={channel} className="flex items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-sky-300 transition-colors">
                <span className="font-semibold text-gray-700">{channel}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl shadow-lg p-8 sm:p-12 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">{t.aboutContact}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
          <a href="mailto:info@vizit.life" className="flex items-center gap-2 text-lg hover:text-sky-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            info@vizit.life
          </a>
          <a href="https://vizit.life" className="flex items-center gap-2 text-lg hover:text-sky-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            vizit.life
          </a>
        </div>
        <Link
          href={`/${locale}/create`}
          className="inline-flex items-center px-8 py-3 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors"
        >
          {t.heroButton}
        </Link>
      </div>

      <div className="mt-8 text-center">
        <Link href={`/${locale}`} className="text-sky-600 hover:text-sky-700 font-medium">
          &larr; {t.navHome}
        </Link>
      </div>
    </div>
  );
}
