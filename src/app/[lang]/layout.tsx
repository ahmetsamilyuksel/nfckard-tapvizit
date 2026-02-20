import { getTranslations, isValidLocale, defaultLocale, locales, localeNames } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import Footer from "@/components/Footer";

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

  // If card view, render without header
  if (isCardView) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={`/${locale}/create`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">TapVizit</span>
            </Link>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}/create`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      l === locale
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title={localeNames[l]}
                  >
                    {l === "tr" ? "🇹🇷" : l === "en" ? "🇬🇧" : "🇷🇺"} {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer lang={locale} t={t} />
    </div>
  );
}
