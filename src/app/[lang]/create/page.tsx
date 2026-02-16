import { getTranslations, isValidLocale, defaultLocale } from "@/lib/i18n";
import CreateCardClient from "./CreateCardClient";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? lang : defaultLocale;
  const t = getTranslations(locale);

  return <CreateCardClient lang={locale} t={t} />;
}
