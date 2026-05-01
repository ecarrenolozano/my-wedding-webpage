"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import type {
  Dictionary,
  FactIcon,
  JourneyInfoItem,
  JourneyStep,
  Locale,
  LocationStayPageContent,
  LodgingOption,
  PageVisual,
} from "@/types/site";

type LocationStayPageProps = {
  content: LocationStayPageContent;
  dictionary: Dictionary;
  locale: Locale;
};

const sectionReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
} as const;

export function LocationStayPage({
  content,
  dictionary,
  locale,
}: LocationStayPageProps) {
  const journeyRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    const element = journeyRef.current;

    if (!element) {
      return;
    }

    function updateScrollState() {
      const currentElement = journeyRef.current;

      if (!currentElement) {
        return;
      }

      const maxScrollLeft =
        currentElement.scrollWidth - currentElement.clientWidth;
      setCanScrollPrev(currentElement.scrollLeft > 8);
      setCanScrollNext(currentElement.scrollLeft < maxScrollLeft - 8);
    }

    updateScrollState();
    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function scrollJourney(direction: "prev" | "next") {
    const element = journeyRef.current;

    if (!element) {
      return;
    }

    const offset = Math.max(element.clientWidth * 0.82, 320);
    element.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col gap-8 px-2 pb-14 pt-2 sm:px-4 lg:px-6">
      <motion.section
        {...sectionReveal}
        className="overflow-hidden rounded-[2rem] border border-[#d9d2c4] bg-[#f7f3eb] shadow-[0_18px_45px_rgba(25,35,28,0.08)]"
      >
        <div className="relative min-h-[340px] sm:min-h-[430px] lg:min-h-[470px]">
          <BackgroundVisual
            overlay="bg-[linear-gradient(90deg,rgba(5,29,23,0.9)_0%,rgba(5,29,23,0.84)_22%,rgba(5,29,23,0.46)_46%,rgba(5,29,23,0.1)_72%,rgba(5,29,23,0.22)_100%)]"
            visual={content.hero.visual}
          />

          <div className="relative z-10 flex min-h-[340px] flex-col justify-between p-5 text-[#fbf8f1] sm:min-h-[430px] sm:p-8 lg:min-h-[470px] lg:px-10 lg:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Link
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-[0.76rem] uppercase tracking-[0.18em] text-white/90 backdrop-blur"
                href={`/${locale}`}
              >
                <span className="text-[0.9rem]">←</span>
                {content.nav.backLabel}
              </Link>
              <LanguageSwitcher label={dictionary.nav.languageLabel} locale={locale} />
            </div>

            <div className="max-w-4xl pt-8 sm:pt-12 lg:pt-16">
              <h1 className="max-w-[12ch] font-serif text-[3rem] leading-[0.92] text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.48)] sm:max-w-none sm:whitespace-nowrap sm:text-[4.35rem] lg:text-[5.2rem]">
                {content.hero.title}
              </h1>
              <div className="mt-7 flex flex-col gap-3 text-white/94 sm:text-[1.06rem]">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <HeroMetaItem
                    icon={<MapPinStroke />}
                    text={content.hero.subtitle}
                  />
                  <HeroMetaItem
                    icon={<CalendarStroke />}
                    text={content.hero.metadata[0] ?? ""}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <HeroMetaItem
                    icon={<ThermometerStroke />}
                    text={content.hero.metadata[1] ?? ""}
                  />
                  <HeroMetaItem
                    icon={<CloudRainStroke />}
                    text={content.hero.metadata[2] ?? ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...sectionReveal}
        className="grid gap-8 rounded-[2.2rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fcfaf4,#f6f0e6)] px-6 py-8 shadow-[0_22px_55px_rgba(25,35,28,0.05)] md:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] md:items-stretch md:px-10 md:py-10 lg:gap-10 lg:px-12 lg:py-12"
      >
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="text-[#2f654d]">
              <MountainStroke />
            </span>
            <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#3f6a57]">
              Sobre Pasto
            </p>
          </div>
          <h2 className="mt-5 max-w-[10.5ch] font-serif text-[2.9rem] leading-[0.98] text-[#173d2f] sm:text-[3.45rem] lg:text-[4rem]">
            {content.location.title}
          </h2>
          <p className="mt-7 max-w-[34rem] text-[1.12rem] leading-[1.92] text-[#4b554d]">
            {content.location.description}
          </p>

          <ul className="mt-10 grid max-w-[34rem] gap-6">
            {content.location.facts.map((fact) => (
              <li
                key={fact.id}
                className="flex items-start gap-4 text-[1.08rem] leading-8 text-[#31443a]"
              >
                <span className="mt-1.5 shrink-0 text-[#2f654d]">
                  <FactIconBadge icon={fact.icon} />
                </span>
                <span>{fact.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-stretch justify-center md:justify-end">
          <div className="w-full max-w-[620px]">
            <MapCard visual={content.location.mapVisual} />
          </div>
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="space-y-4">
        <JourneyOverview
          content={content}
          supportContacts={content.arrival.steps[1]?.contacts ?? []}
        />

        <div className="flex items-center justify-between gap-4 px-1">
          <div className="rounded-full border border-[#d7d1c4] bg-[#f7f3eb] px-4 py-2 text-[0.78rem] uppercase tracking-[0.16em] text-[#173d2f]">
            {content.labels.journeyHint} →
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <ScrollButton
              direction="prev"
              disabled={!canScrollPrev}
              onClick={() => scrollJourney("prev")}
            />
            <ScrollButton
              direction="next"
              disabled={!canScrollNext}
              onClick={() => scrollJourney("next")}
            />
          </div>
        </div>

        <div
          ref={journeyRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.arrival.steps.map((step) => (
            <JourneyCard key={step.id} locale={locale} step={step} />
          ))}
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="rounded-[2rem] border border-[#ddd7ca] bg-[#f7f3eb] p-4 shadow-[0_18px_45px_rgba(25,35,28,0.04)] sm:p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173d2f] text-white">
            <BedMini />
          </span>
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.18em] text-[#5a6b5f]">
              {content.labels.lodging}
            </p>
            <h2 className="font-serif text-[1.8rem] text-[#173d2f]">
              {content.lodging.title}
            </h2>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-[#4f564f]">
          {content.lodging.intro}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {content.lodging.options.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </motion.section>

      <motion.section {...sectionReveal} className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_340px]">
        <div className="rounded-[2rem] border border-[#ddd7ca] bg-[#f7f3eb] p-4 shadow-[0_18px_45px_rgba(25,35,28,0.04)] sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#173d2f] text-white">
              <CompassMini />
            </span>
            <div>
              <p className="text-[0.76rem] uppercase tracking-[0.18em] text-[#5a6b5f]">
                {content.labels.activities}
              </p>
              <h2 className="font-serif text-[1.8rem] text-[#173d2f]">
                {content.explore.title}
              </h2>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-[1rem] leading-7 text-[#4f564f]">
            {content.explore.intro}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.explore.options.map((activity) => (
              <motion.article
                key={activity.id}
                className="overflow-hidden rounded-[1.3rem] border border-[#e0dacd] bg-white"
                transition={{ duration: 0.22 }}
                whileHover={{ y: -4 }}
              >
                <DecorativeVisual className="aspect-[1.38/1]" visual={activity.visual} />
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#173d2f] text-[0.88rem] font-semibold text-white">
                      {activity.number}
                    </span>
                    <h3 className="font-serif text-[1.12rem] leading-tight text-[#173d2f]">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.94rem] leading-6 text-[#4f564f]">
                    {activity.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <FinalCta content={content} locale={locale} />
      </motion.section>
    </main>
  );
}

function JourneyOverview({
  content,
  supportContacts,
}: {
  content: LocationStayPageContent;
  supportContacts: { name: string; phone: string }[];
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#d8d1c2] bg-[#f7f3eb] shadow-[0_18px_45px_rgba(25,35,28,0.08)]">
      <div className="relative">
        <BackgroundVisual
          overlay="bg-[linear-gradient(90deg,rgba(248,244,236,0.96)_0%,rgba(248,244,236,0.72)_26%,rgba(12,28,22,0.2)_54%,rgba(12,28,22,0.68)_100%)]"
          visual={content.arrival.overviewVisual}
        />

        <div className="relative z-10 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d6d0c4] bg-[rgba(255,251,245,0.82)] px-4 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-[#173d2f]">
                <EyeMini />
                {content.labels.overviewBadge}
              </div>
              <h2 className="mt-6 max-w-lg font-serif text-[2.2rem] leading-[1.02] text-[#173d2f] sm:text-[3.1rem]">
                {content.arrival.title}
              </h2>
              <p className="mt-4 max-w-md text-[1rem] leading-7 text-[#31433a]">
                {content.arrival.intro}
              </p>
            </div>

            <div className="hidden w-full max-w-[320px] rounded-[1.4rem] border border-white/10 bg-[rgba(255,252,247,0.86)] p-4 shadow-[0_18px_35px_rgba(15,20,14,0.12)] backdrop-blur xl:block">
              <p className="text-[0.95rem] font-semibold text-[#173d2f]">
                {content.arrival.supportCardTitle}
              </p>
              <p className="mt-2 text-[0.88rem] leading-6 text-[#4d584f]">
                {content.arrival.supportCardDescription}
              </p>
              <div className="mt-4 space-y-3">
                {supportContacts.map((contact) => (
                  <div
                    key={contact.phone}
                    className="rounded-[1rem] border border-[#e5dfd2] bg-white px-4 py-3"
                  >
                    <p className="text-[0.92rem] font-medium text-[#173d2f]">
                      {contact.name}
                    </p>
                    <p className="mt-1 text-[0.86rem] text-[#4f564f]">
                      {contact.phone}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative min-w-[980px]">
              <div className="absolute left-[6%] right-[6%] top-[2.25rem] border-t-2 border-dashed border-white/70" />
              <div className="grid grid-cols-6 gap-4">
                {content.arrival.steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center text-center">
                    <div className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-[#173d2f] text-[0.88rem] font-semibold text-white shadow-[0_10px_20px_rgba(23,61,47,0.22)]">
                      {step.stepNumber}
                    </div>
                    <div className="grid h-[4.6rem] w-[4.6rem] place-items-center rounded-full border border-[#d6d0c5] bg-[rgba(255,251,245,0.96)] text-[#173d2f] shadow-[0_14px_28px_rgba(24,34,27,0.1)]">
                      <JourneyIcon icon={step.icon} />
                    </div>
                    <p className="mt-4 max-w-[9.5rem] text-[1rem] font-semibold leading-5 text-white">
                      {step.title}
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-5 text-white/84">
                      {step.shortLabel}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="rounded-full bg-[#173d2f] px-5 py-3 text-[0.84rem] font-medium text-[#f8f4eb] shadow-[0_12px_24px_rgba(23,61,47,0.22)]">
              {content.labels.journeyHint} →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ step, locale }: { step: JourneyStep; locale: Locale }) {
  return (
    <motion.article
      className="min-w-[82vw] snap-start overflow-hidden rounded-[1.4rem] border border-[#ddd7ca] bg-[#f8f5ee] shadow-[0_16px_34px_rgba(25,35,28,0.08)] sm:min-w-[420px] lg:min-w-[360px] xl:min-w-[380px]"
      transition={{ duration: 0.24 }}
      whileHover={{ y: -4 }}
    >
      <div className="p-4 pb-0">
        <div className="flex items-start gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#173d2f] text-[0.88rem] font-semibold text-white">
            {step.stepNumber}
          </span>
          <div>
            <h3 className="font-serif text-[1.7rem] leading-tight text-[#173d2f]">
              {step.title}
            </h3>
            <p className="mt-1 text-[0.96rem] font-medium text-[#587163]">
              {step.shortLabel}
            </p>
          </div>
        </div>
        <p className="mt-4 min-h-[4.8rem] text-[0.98rem] leading-7 text-[#4e574f]">
          {step.cardText}
        </p>
      </div>

      <div className="px-4 pb-4">
        <DecorativeVisual className="aspect-[1.18/1] rounded-[1.2rem]" visual={step.visual} />

        <AnimatePresence>
          {step.assistanceTitle ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-[1.1rem] border border-[#dcd5c8] bg-[rgba(255,250,245,0.94)] p-4"
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.24 }}
            >
              <p className="text-[0.95rem] font-semibold text-[#173d2f]">
                {step.assistanceTitle}
              </p>
              <p className="mt-1 text-[0.86rem] leading-6 text-[#586058]">
                {step.assistanceDescription}
              </p>
              <div className="mt-3 grid gap-2">
                {step.contacts?.map((contact) => (
                  <div
                    key={contact.phone}
                    className="rounded-[0.95rem] border border-[#e7e0d4] bg-white px-3 py-3"
                  >
                    <p className="text-[0.88rem] font-medium text-[#173d2f]">
                      {contact.name}
                    </p>
                    <p className="mt-1 text-[0.82rem] text-[#4f564f]">
                      {contact.phone}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {step.infoItems?.length ? (
          <div className="mt-3 grid gap-2 rounded-[1.1rem] border border-[#ddd7ca] bg-[#fffdfa] p-4">
            {step.infoItems.map((item) => (
              <InfoRow key={`${item.label}-${item.value}`} item={item} />
            ))}
          </div>
        ) : null}

        {step.ctaLabel ? (
          <div className="mt-3 rounded-[1.1rem] border border-[#ddd7ca] bg-[#fffdfa] p-4">
            <p className="text-[0.9rem] leading-6 text-[#586058]">
              {step.cardText}
            </p>
            <Link
              className="btn-action btn-action-soft btn-action-md mt-4"
              href={`/${locale}#rsvp`}
            >
              {step.ctaLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function HotelCard({ hotel }: { hotel: LodgingOption }) {
  const buttonLabel = hotel.actionLabel ?? "Ver mas";

  return (
    <motion.article
      className="overflow-hidden rounded-[1.3rem] border border-[#dfd8cb] bg-white"
      transition={{ duration: 0.2 }}
      whileHover={{ y: -3 }}
    >
      <DecorativeVisual className="aspect-[1.22/1]" visual={hotel.visual} />
      <div className="p-4">
        <p className="text-[1.02rem] font-semibold text-[#173d2f]">{hotel.name}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[0.76rem] uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[#f1ece3] px-2.5 py-1 text-[#7b6542]">
            {hotel.price}
          </span>
          {hotel.label ? (
            <span className="rounded-full bg-[#e4efe7] px-2.5 py-1 text-[#17402f]">
              {hotel.label}
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-[0.9rem] leading-6 text-[#4e564e]">
          {hotel.description}
        </p>
        <div className="mt-3 space-y-1 text-[0.82rem] text-[#607165]">
          {hotel.distance ? <p>{hotel.distance}</p> : null}
          {hotel.location ? <p>{hotel.location}</p> : null}
        </div>
        {hotel.href ? (
          <a
            className="btn-action btn-action-soft btn-action-md mt-4 w-full"
            href={hotel.href}
            rel="noreferrer"
            target="_blank"
          >
            {buttonLabel}
          </a>
        ) : (
          <button
            className="btn-action btn-action-soft btn-action-md mt-4 w-full"
            type="button"
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </motion.article>
  );
}

function FinalCta({
  content,
  locale,
}: {
  content: LocationStayPageContent;
  locale: Locale;
}) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#d7d1c4] bg-[#153628] text-[#fbf8f1] shadow-[0_18px_45px_rgba(25,35,28,0.12)]">
      <div className="relative min-h-full p-6 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_44%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <p className="text-[0.76rem] uppercase tracking-[0.18em] text-[#d8c69e]">
              Soporte
            </p>
            <h2 className="mt-4 font-serif text-[2rem] leading-tight text-white">
              {content.closing.title}
            </h2>
            <p className="mt-4 text-[1rem] leading-7 text-[#e9eee8]">
              {content.closing.description}
            </p>
          </div>

          <div className="mt-8">
            <Link
              className="inline-flex items-center justify-center rounded-[0.8rem] bg-[#fbf8f1] px-5 py-3 text-[1rem] font-medium text-[#173d2f] shadow-[0_14px_24px_rgba(0,0,0,0.12)] transition hover:bg-white"
              href={`/${locale}#rsvp`}
            >
              {content.closing.buttonLabel}
            </Link>
            <p className="mt-4 text-[0.92rem] text-[#d7e1da]">
              ¡Te esperamos en Pasto!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapCard({ visual }: { visual: PageVisual }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#d9d0c1] bg-[linear-gradient(180deg,#f7f0e3,#efe4d1)] p-3 shadow-[0_26px_46px_rgba(60,57,46,0.1),inset_0_1px_0_rgba(255,255,255,0.7)]">
      <div className="pointer-events-none absolute inset-x-8 top-3 h-10 rounded-full bg-white/18 blur-2xl" />
      {visual.src ? (
        <Image
          alt={visual.alt}
          className="block h-full min-h-[520px] w-full rounded-[1.65rem] border border-[#e6ddce] object-cover shadow-[0_14px_28px_rgba(29,33,24,0.08)]"
          height={2174}
          src={visual.src}
          width={2014}
        />
      ) : (
        <div className="h-full p-1">
          <DecorativeVisual className="h-full min-h-[520px] rounded-[1.65rem]" visual={visual} />
        </div>
      )}
    </div>
  );
}

function FactIconBadge({ icon }: { icon: FactIcon }) {
  if (icon.src) {
    return (
      <Image
        alt={icon.alt}
        className="h-5 w-5 object-contain"
        height={20}
        src={icon.src}
        width={20}
      />
    );
  }

  if (icon.key === "calendar") {
    return <CalendarStroke />;
  }

  if (icon.key === "mountain") {
    return <MountainStroke />;
  }

  if (icon.key === "volcano") {
    return <VolcanoStroke />;
  }

  return <ThermometerStroke />;
}

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={direction === "prev" ? "Scroll previous cards" : "Scroll next cards"}
      className="grid h-11 w-11 place-items-center rounded-full border border-[#d9d2c5] bg-[#f7f3eb] text-[#173d2f] shadow-[0_10px_24px_rgba(25,35,28,0.06)] transition disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

function InfoRow({ item }: { item: JourneyInfoItem }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#eee7db] pb-2 last:border-b-0 last:pb-0">
      <p className="text-[0.78rem] uppercase tracking-[0.12em] text-[#718072]">
        {item.label}
      </p>
      <p className="max-w-[62%] text-right text-[0.88rem] leading-6 text-[#20372e]">
        {item.value}
      </p>
    </div>
  );
}

function BackgroundVisual({
  visual,
  overlay,
}: {
  visual: PageVisual;
  overlay: string;
}) {
  return (
    <>
      <DecorativeVisual className="absolute inset-0" visual={visual} />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}

function DecorativeVisual({
  visual,
  className,
}: {
  visual: PageVisual;
  className: string;
}) {
  const toneClasses: Record<NonNullable<PageVisual["tone"]>, string> = {
    forest:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,#20382e,#496959_46%,#9f724d)]",
    cream:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_26%),linear-gradient(135deg,#efe3c5,#cfb58b_48%,#8e684b)]",
    sky:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.32),transparent_24%),linear-gradient(135deg,#c6d7e6,#84a4bf_50%,#3d5767)]",
    gold:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_22%),linear-gradient(135deg,#eed4a5,#c89866_48%,#704735)]",
    charcoal:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_22%),linear-gradient(135deg,#465662,#79838c_44%,#a06f58)]",
  };

  const tone = visual.tone ?? "forest";

  if (visual.src) {
    return (
      <div
        aria-label={visual.alt}
        className={`${className} bg-cover bg-center`}
        role="img"
        style={{ backgroundImage: `url('${visual.src}')` }}
      />
    );
  }

  return (
    <div
      aria-label={visual.alt}
      className={`${className} relative overflow-hidden ${toneClasses[tone]}`}
      role="img"
    >
      <div className="absolute inset-0 opacity-28 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute left-6 top-6 h-20 w-20 rounded-full border border-white/20 bg-white/8 blur-[2px]" />
      <div className="absolute bottom-4 left-4 rounded-full bg-[rgba(255,251,245,0.86)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-[#173d2f]">
        {visual.label}
      </div>
    </div>
  );
}

function HeroMetaItem({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-[1rem] text-white/94 drop-shadow-[0_2px_8px_rgba(0,0,0,0.32)] sm:text-[1.08rem]">
      <span className="text-white/92">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function JourneyIcon({ icon }: { icon: JourneyStep["icon"] }) {
  switch (icon) {
    case "plane":
      return <PlaneMini />;
    case "building":
      return <BuildingMini />;
    case "takeoff":
      return <TakeoffMini />;
    case "pin":
      return <MapPinMini />;
    case "car":
      return <CarMini />;
    case "city":
      return <CityMini />;
  }
}

function EyeMini() {
  return (
    <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 24 24" width="14">
      <path d="M2 12C4.9 7.6 8.1 5.4 12 5.4S19.1 7.6 22 12c-2.9 4.4-6.1 6.6-10 6.6S4.9 16.4 2 12Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" fill="currentColor" r="2.6" />
    </svg>
  );
}

function PlaneMini() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
      <path d="m2 16 20-8-7.8 10.8-3.2-4L6.5 19 5 17l4.2-4.7-4.9-1.7L2 16Z" fill="currentColor" />
    </svg>
  );
}

function BuildingMini() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
      <path d="M5 21V7.5L12 3l7 4.5V21M9 21v-4h6v4M8 9h.01M12 9h.01M16 9h.01M8 13h.01M12 13h.01M16 13h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function TakeoffMini() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
      <path d="m2 17 20-8-8.4 11-2.6-3.5L6.2 20 5 18.5l4.4-4.7-4.8-1.3L2 17Z" fill="currentColor" />
    </svg>
  );
}

function MapPinMini() {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" fill="currentColor" r="2.3" />
    </svg>
  );
}

function MapPinStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" fill="currentColor" r="1.8" />
    </svg>
  );
}

function CalendarStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function ThermometerStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M10 14.5V5.8a2 2 0 1 1 4 0v8.7a4 4 0 1 1-4 0Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10v6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CloudRainStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M8 18h8a4 4 0 0 0 .5-8A5.5 5.5 0 0 0 6 8.8 3.8 3.8 0 0 0 8 18Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 19.5 8.8 21M13 19.5 11.8 21M16 19.5 14.8 21" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function CarMini() {
  return (
    <svg aria-hidden="true" fill="none" height="26" viewBox="0 0 24 24" width="26">
      <path d="M5 16h14l-1.1-5.1A2 2 0 0 0 16 9H8a2 2 0 0 0-1.9 1.5L5 16Zm0 0v2m14-2v2M7.5 18.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm9 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CityMini() {
  return (
    <svg aria-hidden="true" fill="none" height="28" viewBox="0 0 24 24" width="28">
      <path d="M4 21V9l4-2.5V21m0-9h8M10 21V4l6-2v19m-2-14h.01M14 11h.01M14 15h.01M6 12h.01M6 16h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function BedMini() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path d="M3 18V8m0 6h18v4m-14-8h3a2 2 0 0 1 2 2v2H5v-2a2 2 0 0 1 2-2Zm8 0h4a2 2 0 0 1 2 2v2h-6v-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function CompassMini() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.8 8.2-2.2 5.8-5.4 2 2.2-5.8 5.4-2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function MountainStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="m3 18 5.5-8L13 16l2.8-4L21 18H3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="m8.5 10 1.4-2 1.2 1.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function VolcanoStroke() {
  return (
    <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path d="M4 19h16l-4.2-7.8-2 1.8-2.7-5L8.3 12 4 19Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M12 4c0 1.5 1.2 1.8 1.2 3M9.8 5.2c0 1 1 1.3 1 2.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}
