"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { assetUrl } from "@/lib/assets";

type InvitationIntroProps = {
  onOpenComplete: () => void;
};

const SESSION_KEY = "boda-invitation-opened";

export function InvitationIntro({ onOpenComplete }: InvitationIntroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpening, setIsOpening] = useState(false);

  function finishIntro() {
    window.sessionStorage.setItem(SESSION_KEY, "true");
    onOpenComplete();
  }

  function handleOpen() {
    if (isOpening) {
      return;
    }

    if (prefersReducedMotion) {
      finishIntro();
      return;
    }

    setIsOpening(true);
    window.setTimeout(finishIntro, 1650);
  }

  function handleSkip() {
    finishIntro();
  }

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[70] overflow-hidden bg-[color:var(--color-cream)]"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),transparent_26%),linear-gradient(180deg,rgba(244,226,202,1)_0%,rgba(232,214,190,1)_100%)]" />

        <motion.button
          className="btn-action btn-action-pill btn-action-sm absolute right-5 top-5 z-50 backdrop-blur-sm sm:right-8 sm:top-8"
          onClick={handleSkip}
          type="button"
          whileHover={prefersReducedMotion ? undefined : { y: -1 }}
        >
          Skip intro
        </motion.button>

        <div className="absolute inset-0 flex items-center justify-center px-4 pt-16 pb-28 sm:px-8 sm:pt-20 sm:pb-32">
          <div className="relative w-full max-w-[980px]">
            <motion.div
              animate={
                isOpening
                  ? { opacity: 0, scale: 1.02, filter: "blur(4px)" }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.6rem]"
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                alt="Closed wedding envelope with wax seal"
                className="object-contain"
                fill
                priority
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 86vw, 980px"
                src={assetUrl("envelope-closed-v2.png")}
              />

              <div className="absolute inset-0 z-20">
                <motion.div
                  animate={
                    isOpening
                      ? { y: "-62%", rotate: -4, opacity: 0.96 }
                      : { y: 0, rotate: 0, opacity: 0 }
                  }
                  className="absolute inset-x-0 top-0 h-1/2 origin-bottom bg-[linear-gradient(180deg,#f4e1c4_0%,#ead1ab_62%,#dfbd8f_100%)] shadow-[0_18px_30px_rgba(120,83,47,0.16),inset_0_-1px_0_rgba(255,247,233,0.42)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                  transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  animate={
                    isOpening
                      ? { x: "56%", rotate: 5, opacity: 0.94 }
                      : { x: 0, rotate: 0, opacity: 0 }
                  }
                  className="absolute inset-y-0 right-0 w-1/2 origin-left bg-[linear-gradient(180deg,#f1ddbf_0%,#e4c79f_100%)] shadow-[0_10px_24px_rgba(120,83,47,0.14),inset_1px_0_0_rgba(255,247,233,0.4)]"
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                  transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  animate={
                    isOpening
                      ? { y: "62%", rotate: 4, opacity: 0.94 }
                      : { y: 0, rotate: 0, opacity: 0 }
                  }
                  className="absolute inset-x-0 bottom-0 h-1/2 origin-top bg-[linear-gradient(180deg,#ecd3ad_0%,#dcb787_100%)] shadow-[0_-16px_28px_rgba(120,83,47,0.12),inset_0_1px_0_rgba(255,247,233,0.34)]"
                  style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  animate={
                    isOpening
                      ? { x: "-56%", rotate: -5, opacity: 0.94 }
                      : { x: 0, rotate: 0, opacity: 0 }
                  }
                  className="absolute inset-y-0 left-0 w-1/2 origin-right bg-[linear-gradient(180deg,#f0dcc0_0%,#e3c59d_100%)] shadow-[0_10px_24px_rgba(120,83,47,0.14),inset_-1px_0_0_rgba(255,247,233,0.4)]"
                  style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                  transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <motion.div
                animate={
                  isOpening
                    ? { opacity: [0, 0.28, 0], scale: [0.9, 1.04, 1.08] }
                    : { opacity: 0, scale: 0.9 }
                }
                className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,rgba(255,248,239,0.92),rgba(255,248,239,0.28)_18%,transparent_34%)]"
                transition={{ duration: 0.72, ease: "easeOut" }}
              />

              <motion.button
                animate={
                  isOpening
                    ? { opacity: 0, scale: 0.92, y: 8 }
                    : prefersReducedMotion
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 1, scale: [1, 1.02, 1], y: [0, -1, 0] }
                }
                aria-label="Open invitation"
                className="absolute left-1/2 top-1/2 z-40 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent sm:h-28 sm:w-28 md:h-36 md:w-36"
                onClick={handleOpen}
                transition={
                  isOpening
                    ? { duration: 0.24, ease: "easeIn" }
                    : { duration: 3.2, ease: "easeInOut", repeat: Infinity }
                }
                type="button"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              />
            </motion.div>
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
