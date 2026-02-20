import Link from "next/link";

interface FooterProps {
  lang: string;
  t: {
    footerRights: string;
    footerContact: string;
    footerLegal: string;
    footerDescription: string;
    legalOffer: string;
    legalPrivacy: string;
    legalRefund: string;
  };
}

export default function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-white text-lg">TapVizit</span>
            </div>
            <p className="text-sm leading-relaxed">{t.footerDescription}</p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footerLegal}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/legal/offer`} className="text-sm hover:text-white transition-colors">
                  {t.legalOffer}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/privacy`} className="text-sm hover:text-white transition-colors">
                  {t.legalPrivacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/refund`} className="text-sm hover:text-white transition-colors">
                  {t.legalRefund}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footerContact}</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@tapvizit.life" className="text-sm hover:text-white transition-colors">
                  info@tapvizit.life
                </a>
              </li>
              <li>
                <span className="text-sm">tapvizit.life</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} TapVizit. {t.footerRights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
