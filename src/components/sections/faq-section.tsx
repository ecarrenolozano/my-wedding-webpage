"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { siteConfig } from "@/config/site.config";
import type { Dictionary, Locale } from "@/types/site";

type FaqSectionProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function FaqSection({ dictionary, locale }: FaqSectionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(
    siteConfig.event.faq[0]?.id ?? null,
  );

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col px-6 text-left">
      <div className="h-px w-full bg-[color:var(--color-accent)]/35" />
      <h2 className="section-title mt-14 font-serif text-[color:var(--color-foreground)]">
        {dictionary.sections.faqHeading}
      </h2>

      <div className="mt-12 divide-y divide-[color:var(--color-accent)]/18">
        {siteConfig.event.faq.map((item) => {
          const isOpen = openItemId === item.id;

          return (
            <article key={item.id} className="py-6">
              <button
                className="flex w-full items-start justify-between gap-6 text-left"
                onClick={() =>
                  setOpenItemId((current) => (current === item.id ? null : item.id))
                }
                type="button"
              >
                <h3 className="question-title font-serif text-[color:var(--color-foreground)]">
                  {item.question[locale]}
                </h3>
                <span className="mt-1 text-2xl leading-none text-[color:var(--color-accent)]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden"
                    exit={{ height: 0, opacity: 0 }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="body-elegant max-w-3xl pt-4 text-stone-700">
                      {renderInlineBold(item.answer[locale])}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function renderInlineBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/g).map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`${segment}-${index}`} className="font-semibold text-stone-900">
          {segment.slice(2, -2)}
        </strong>
      );
    }

    return segment;
  });
}
