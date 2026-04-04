"use client";

import type { Locale } from "@/types/site";

type LanguageSwitcherProps = {
  label: string;
  locale: Locale;
  onChange: (locale: Locale) => void;
};

const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export function LanguageSwitcher({
  label,
  locale,
  onChange,
}: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--color-accent)]/20 bg-[rgba(255,251,247,0.72)] px-3 py-2 text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--color-accent)] shadow-[0_10px_24px_rgba(140,103,78,0.08)] backdrop-blur md:text-[0.95rem]">
      <span className="text-[color:var(--color-accent)]/70">{label}</span>
      <div className="flex items-center gap-1">
        {(["es", "en"] as const).map((option) => {
          const isActive = option === locale;

          return (
            <button
              key={option}
              className={
                isActive
                  ? "rounded-full bg-[color:var(--color-accent)] px-3 py-1 text-white transition"
                  : "rounded-full px-3 py-1 text-[color:var(--color-accent)]/75 transition hover:text-[color:var(--color-accent)]"
              }
              onClick={() => onChange(option)}
              type="button"
            >
              {localeLabels[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
