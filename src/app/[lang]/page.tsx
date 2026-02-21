import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import Link from "next/link";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  const prices = locale === "ru"
    ? { standard: "500₽", premium: "850₽", metal: "1700₽" }
    : locale === "en"
    ? { standard: "€5", premium: "€9", metal: "€18" }
    : { standard: "150₺", premium: "250₺", metal: "500₺" };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-sky-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {t.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/create`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50"
                >
                  {t.heroButton}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl text-lg transition-all"
                >
                  {t.heroPricing}
                </a>
              </div>
            </div>
            {/* Animated NFC Card */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-48 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-2xl shadow-sky-500/30 p-6 text-white transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" /></svg>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="w-12 h-9 rounded bg-yellow-400/80 mb-3"></div>
                  <p className="text-sm font-medium opacity-80">NFC CARD</p>
                  <p className="text-lg font-bold">vizit.life</p>
                </div>
                <div className="absolute -top-3 -right-3 w-20 h-20 border-2 border-sky-300/40 rounded-full animate-ping opacity-30"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-sky-300/20 rounded-full animate-pulse opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t.featuresTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.featuresSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: t.feature1Title, desc: t.feature1Desc, color: "sky" },
              { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", title: t.feature2Title, desc: t.feature2Desc, color: "green" },
              { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: t.feature3Title, desc: t.feature3Desc, color: "emerald" },
              { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", title: t.feature4Title, desc: t.feature4Desc, color: "indigo" },
              { icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z", title: t.feature5Title, desc: t.feature5Desc, color: "purple" },
              { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: t.feature6Title, desc: t.feature6Desc, color: "orange" },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow group">
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <svg className={`w-7 h-7 text-${feature.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t.howTitle}</h2>
            <p className="text-lg text-gray-600">{t.howSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: t.howStep1Title, desc: t.howStep1Desc, icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
              { step: "2", title: t.howStep2Title, desc: t.howStep2Desc, icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
              { step: "3", title: t.howStep3Title, desc: t.howStep3Desc, icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-sky-500 rounded-2xl mb-6 shadow-lg shadow-sky-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{t.pricingTitle}</h2>
            <p className="text-lg text-gray-600">{t.pricingSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-sky-300 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.cardTypeStandard}</h3>
              <p className="text-sm text-gray-500 mb-4">{t.cardTypeStandardDesc}</p>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">{prices.standard}</p>
              <ul className="space-y-3 mb-8">
                {[t.pricingFeature1, t.pricingFeature2, t.pricingFeature3, t.pricingFeature4].map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/create`} className="block w-full text-center py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                {t.pricingSelect}
              </Link>
            </div>
            {/* Premium */}
            <div className="relative bg-sky-50 border-2 border-sky-500 rounded-2xl p-8 shadow-lg shadow-sky-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-4 py-1 rounded-full">{t.pricingPopular}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.cardTypePremium}</h3>
              <p className="text-sm text-gray-500 mb-4">{t.cardTypePremiumDesc}</p>
              <p className="text-4xl font-extrabold text-sky-600 mb-6">{prices.premium}</p>
              <ul className="space-y-3 mb-8">
                {[t.pricingFeature1, t.pricingFeature2, t.pricingFeature3, t.pricingFeature4, t.pricingFeature5, t.pricingFeature6].map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-sky-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/create`} className="block w-full text-center py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/30">
                {t.pricingSelect}
              </Link>
            </div>
            {/* Metal */}
            <div className="bg-gray-900 border-2 border-gray-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-2">{t.cardTypeMetal}</h3>
              <p className="text-sm text-gray-400 mb-4">{t.cardTypeMetalDesc}</p>
              <p className="text-4xl font-extrabold mb-6">{prices.metal}</p>
              <ul className="space-y-3 mb-8">
                {[t.pricingFeature1, t.pricingFeature2, t.pricingFeature3, t.pricingFeature4, t.pricingFeature5, t.pricingFeature6, t.pricingFeature7, t.pricingFeature8].map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/create`} className="block w-full text-center py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                {t.pricingSelect}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12 text-center">{t.faqTitle}</h2>
          <div className="space-y-4">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
              { q: t.faq5Q, a: t.faq5A },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-gray-900 hover:text-sky-600 transition-colors">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">{t.heroTitle}</h2>
          <p className="text-lg text-sky-100 mb-8 max-w-2xl mx-auto">{t.heroSubtitle}</p>
          <Link
            href={`/${locale}/create`}
            className="inline-flex items-center px-10 py-4 bg-white text-sky-600 font-bold rounded-xl text-lg hover:bg-sky-50 transition-colors shadow-lg"
          >
            {t.heroButton}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <span className="font-bold text-white text-lg">NFC Kart</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">{t.footerDesc}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.navHome}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}`} className="hover:text-white transition-colors">{t.navHome}</Link></li>
                <li><Link href={`/${locale}/create`} className="hover:text-white transition-colors">{t.navCreate}</Link></li>
                <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t.navAbout}</Link></li>
                <li><Link href={`/${locale}/track`} className="hover:text-white transition-colors">{locale === "ru" ? "Отслеживание заказа" : locale === "en" ? "Track Order" : "Sipariş Takip"}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t.footerContact}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t.footerTerms}</Link></li>
                <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t.footerPrivacy}</Link></li>
                <li><a href="mailto:info@vizit.life" className="hover:text-white transition-colors">info@vizit.life</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 vizit.life. {t.footerRights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
