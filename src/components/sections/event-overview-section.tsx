import { siteConfig } from "@/config/site.config";
import type { Dictionary, Locale } from "@/types/site";

type EventOverviewSectionProps = {
  dictionary: Dictionary;
  locale: Locale;
};

export function EventOverviewSection({
  dictionary,
  locale,
}: EventOverviewSectionProps) {
  return (
    <section
      className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
      id="details"
    >
      <h2 className="section-title mt-4 font-serif text-[color:var(--color-foreground)]">
        {dictionary.sections.storyHeading}
      </h2>
      <p className="section-intro mt-8 max-w-4xl text-stone-800">
        {siteConfig.event.overview.headline[locale]}
      </p>
      <div className="mt-8 space-y-7">
        {siteConfig.event.overview.details[locale].map((detail) => (
          <p key={detail} className="body-elegant max-w-4xl text-stone-800">
            {detail}
          </p>
        ))}
      </div>
      <div className="mt-14 h-px w-full bg-[color:var(--color-accent)]/35" />
    </section>
  );
}
