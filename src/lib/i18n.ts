import { en } from "@/content/i18n/en";
import { es } from "@/content/i18n/es";
import type { Dictionary, Locale } from "@/types/site";

export const locales: Locale[] = ["es", "en"];
export const defaultLocale: Locale = "es";

const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
