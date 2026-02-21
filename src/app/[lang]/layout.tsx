import { getTranslations, isValidLocale, defaultLocale, locales, localeNames } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang);
  return {
    title: t.siteName,
    description: t.siteDesc,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  // Check if we're on a card view page (hide header)
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isCardView = pathname.includes("/a/");
  const isLandingPage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // If card view, render without header/footer
  if (isCardView) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">vizit.life</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href={`/${locale}`} className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">
                {t.navHome}
              </Link>
              <Link href={`/${locale}/create`} className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">
                {t.navCreate}
              </Link>
              <Link href={`/${locale}#pricing`} className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">
                {t.navPricing}
              </Link>
              <Link href={`/${locale}/about`} className="text-sm font-medium text-gray-600 hover:text-sky-600 transition-colors">
                {t.navAbout}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      l === locale
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title={localeNames[l]}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
              <Link
                href={`/${locale}/create`}
                className="hidden sm:inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-lg hover:bg-sky-600 transition-colors"
              >
                {t.heroButton}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer - shown on all pages except card view */}
      {!isLandingPage && (
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-indigo-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <span className="font-semibold text-white text-sm">vizit.life</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{t.footerTerms}</Link>
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{t.footerPrivacy}</Link>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t.footerAbout}</Link>
                <a href="mailto:info@vizit.life" className="hover:text-white transition-colors">info@vizit.life</a>
              </div>
              <p className="text-xs">&copy; 2024 vizit.life</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
