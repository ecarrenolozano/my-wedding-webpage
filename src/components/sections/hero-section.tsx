import { CountdownTimer } from "@/components/ui/countdown-timer";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { siteConfig } from "@/config/site.config";
import { assetUrl } from "@/lib/assets";
import type { Dictionary, HomePageContent, Locale } from "@/types/site";

type HeroSectionProps = {
  dictionary: Dictionary;
  content: HomePageContent;
  locale: Locale;
};

export function HeroSection({ dictionary, content, locale }: HeroSectionProps) {
  const names = `${siteConfig.couple.partnerOne} & ${siteConfig.couple.partnerTwo}`;

  return (
    <section className="relative left-1/2 min-h-[58vh] w-screen -translate-x-1/2 overflow-hidden py-10 sm:min-h-[62vh]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,226,202,0.28),rgba(244,226,202,0.18))]" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{ backgroundImage: `url('${assetUrl("header-background-cropped.png")}')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,226,202,0.5),rgba(244,226,202,0.16)_38%,transparent_66%),linear-gradient(180deg,rgba(244,226,202,0.08),rgba(244,226,202,0.12))]" />

      <div className="relative mx-auto flex min-h-[56vh] w-full max-w-[1400px] items-center px-6 sm:px-10 lg:px-16">
        <div className="relative w-full">
          <div className="absolute right-0 top-0 z-20">
            <LanguageSwitcher
              label={dictionary.nav.languageLabel}
              locale={locale}
            />
          </div>

          <div className="absolute left-[7%] top-1/2 hidden h-[400px] w-[300px] -translate-y-1/2 border border-[color:var(--color-accent)]/35 md:block lg:h-[430px] lg:w-[330px]" />

          <div className="relative flex max-w-[920px] flex-col items-center pt-18 text-center md:items-start md:text-left md:pl-[12%] lg:pl-[15%]">
            <p className="eyebrow-text text-[color:var(--color-accent)]">
              {content.hero.eyebrow}
            </p>

            <h1 className="hero-script mt-8 text-[color:var(--color-foreground)]">
              {names}
            </h1>

            <p className="hero-message mt-7 max-w-[42rem] text-[color:var(--color-clay)]">
              {content.hero.description}
            </p>

            <p className="date-display mt-6 text-[color:var(--color-wine)]">
              {siteConfig.event.dateLabel[locale]}
            </p>

            <CountdownTimer
              heroContent={content.hero}
              targetDate={siteConfig.event.dateTimeISO}
            />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                className="btn-action btn-action-soft btn-action-lg"
                href="#rsvp"
              >
                {content.hero.primaryCta}
              </a>
              <a
                className="btn-action btn-action-soft btn-action-lg"
                href={`/${locale}/ubicacion-y-hospedaje`}
              >
                {content.hero.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
