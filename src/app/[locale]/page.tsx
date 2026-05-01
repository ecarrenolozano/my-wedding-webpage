import { HomePage } from "@/components/home-page";
import { getHomePageContent } from "@/lib/content";
import { getDictionary, isLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/types/site";
import { notFound } from "next/navigation";

type LocalizedHomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const resolvedLocale = locale as Locale;

  return (
    <HomePage
      content={getHomePageContent(resolvedLocale)}
      dictionary={getDictionary(resolvedLocale)}
      locale={resolvedLocale}
    />
  );
}
