"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { useSyncExternalStore } from "react";
import { useState } from "react";

import { EventOverviewSection } from "@/components/sections/event-overview-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { HeroSection } from "@/components/sections/hero-section";
import { InvitationIntro } from "@/components/sections/invitation-intro";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { ScheduleSection } from "@/components/sections/schedule-section";
import { siteConfig } from "@/config/site.config";
import type { Dictionary, HomePageContent, Locale } from "@/types/site";

const SESSION_KEY = "boda-invitation-opened";

function subscribeToNothing() {
  return () => {};
}

type HomePageProps = {
  content: HomePageContent;
  dictionary: Dictionary;
  locale: Locale;
};

export function HomePage({ content, dictionary, locale }: HomePageProps) {
  const [isIntroDismissed, setIsIntroDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const hasSeenInvitation = useSyncExternalStore(
    subscribeToNothing,
    () => window.sessionStorage.getItem(SESSION_KEY) === "true",
    () => false,
  );
  const showInvitationIntro = !hasSeenInvitation && !isIntroDismissed;

  return (
    <div
      style={
        {
          "--color-background": siteConfig.theme.background,
          "--color-foreground": siteConfig.theme.foreground,
          "--color-accent": siteConfig.theme.accent,
          "--color-accent-soft": siteConfig.theme.accentSoft,
          "--color-clay": siteConfig.theme.clay,
          "--color-wine": siteConfig.theme.wine,
          "--color-green": siteConfig.theme.green,
          "--color-cream": siteConfig.theme.cream,
        } as CSSProperties
      }
    >
      <AnimatePresence>
        {showInvitationIntro ? (
          <InvitationIntro onOpenComplete={() => setIsIntroDismissed(true)} />
        ) : null}
      </AnimatePresence>

      <motion.main
        animate={
          !showInvitationIntro
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : prefersReducedMotion
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0.18, scale: 0.992, filter: "blur(8px)" }
        }
        className="min-h-screen overflow-hidden px-4 pb-6 text-[color:var(--color-foreground)] sm:px-6 sm:pb-6 lg:px-8"
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <HeroSection
          content={content}
          dictionary={dictionary}
          locale={locale}
        />

        <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-14">
          <PhotoStrip />
          <EventOverviewSection content={content} locale={locale} />
          <ScheduleSection content={content} dictionary={dictionary} locale={locale} />
          <FaqSection content={content} locale={locale} />
          <RsvpSection content={content} dictionary={dictionary} locale={locale} />
        </div>

        <FooterSection content={content} />
      </motion.main>
    </div>
  );
}
