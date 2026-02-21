import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import TrackClient from "./TrackClient";

export default async function TrackPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  return <TrackClient lang={locale} t={t} />;
}
