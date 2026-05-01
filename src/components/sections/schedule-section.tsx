"use client";

import Image from "next/image";

import { siteConfig } from "@/config/site.config";
import type { Dictionary, HomePageContent, Locale } from "@/types/site";

type ScheduleSectionProps = {
  dictionary: Dictionary;
  content: HomePageContent;
  locale: Locale;
};

export function ScheduleSection({
  dictionary,
  content,
  locale,
}: ScheduleSectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center">
      <h2 className="section-title font-serif text-[color:var(--color-foreground)]">
        {content.sections.scheduleHeading}
      </h2>
      <p className="date-display mt-10 text-[color:var(--color-clay)]">
        {siteConfig.event.scheduleDateLabel[locale]}
      </p>

      <div className="mt-10 w-full space-y-10">
        {siteConfig.event.schedule.map((item) => (
          <article
            key={item.id}
            className={
              item.image
                ? "grid gap-6 border-l border-[color:var(--color-accent)]/45 pl-8 text-left lg:grid-cols-[minmax(0,1fr)_220px]"
                : "grid gap-4 border-l border-[color:var(--color-accent)]/45 pl-8 text-left md:grid-cols-[180px_1fr]"
            }
          >
            <div>
              <p className="date-display text-[color:var(--color-wine)]">
                {item.time}
              </p>

              <h3 className="subsection-title mt-4 font-serif text-stone-800">
                {item.title[locale]}
              </h3>
              {item.subtitle ? (
                <p className="mt-2 text-base text-[color:var(--color-accent)]">
                  {item.subtitle}
                </p>
              ) : null}

              <div className="mt-4 space-y-4">
                <div>
                  <p className="meta-label text-stone-500">
                    {dictionary.common.placeLabel}
                  </p>
                  <p className="form-value mt-2 text-stone-800">
                    {item.venue}
                  </p>
                </div>

                <div>
                  <p className="meta-label text-stone-500">
                    {dictionary.common.addressLabel}
                  </p>
                  <p className="form-value mt-2 text-stone-700">
                    {item.address}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="btn-action btn-action-soft btn-action-md"
                    href={item.directionsUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {dictionary.common.getDirectionsLabel}
                  </a>
                  <a
                    className="btn-action btn-action-soft btn-action-md"
                    href={item.calendarUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {dictionary.common.addToCalendarLabel}
                  </a>
                </div>
              </div>
            </div>

            {item.image ? (
              <div className="relative aspect-square max-w-[220px] overflow-hidden rounded-[1rem] bg-[rgba(244,226,202,0.65)] shadow-[0_12px_30px_rgba(26,44,56,0.08)] lg:justify-self-end">
                <Image
                  alt={item.image.alt}
                  className="object-cover"
                  fill
                  sizes="220px"
                  src={item.image.src}
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-14 h-px w-full bg-[color:var(--color-accent)]/35" />
    </section>
  );
}
