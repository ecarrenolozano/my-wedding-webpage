import { homeEn } from "@/content/pages/en/home";
import { locationStayEn } from "@/content/pages/en/location-and-stay";
import { homeEs } from "@/content/pages/es/home";
import { locationStayEs } from "@/content/pages/es/location-and-stay";
import { defaultLocale } from "@/lib/i18n";
import type {
  HomePageContent,
  Locale,
  LocationStayPageContent,
} from "@/types/site";

const homePageContent: Record<Locale, HomePageContent> = {
  es: homeEs,
  en: homeEn,
};

const locationStayPageContent: Record<Locale, LocationStayPageContent> = {
  es: locationStayEs,
  en: locationStayEn,
};

export function getHomePageContent(locale: Locale): HomePageContent {
  return homePageContent[locale] ?? homePageContent[defaultLocale];
}

export function getLocationStayPageContent(
  locale: Locale,
): LocationStayPageContent {
  return locationStayPageContent[locale] ?? locationStayPageContent[defaultLocale];
}
