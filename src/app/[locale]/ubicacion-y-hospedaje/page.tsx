import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationStayPage } from "@/components/pages/location-and-stay-page";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getLocationStayPageContent } from "@/lib/content";
import type { Locale } from "@/types/site";

type LocationStayRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocationStayRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = getLocationStayPageContent(locale);

  return {
    title: content.seo.title,
    description: content.seo.description,
  };
}

export default async function LocationStayRoute({
  params,
}: LocationStayRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const resolvedLocale = locale as Locale;

  return (
    <LocationStayPage
      content={getLocationStayPageContent(resolvedLocale)}
      dictionary={getDictionary(resolvedLocale)}
      locale={resolvedLocale}
    />
  );
}
