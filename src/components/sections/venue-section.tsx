import { siteConfig } from "@/config/site.config";
import type { Dictionary } from "@/types/site";

type VenueSectionProps = {
  dictionary: Dictionary;
};

export function VenueSection({ dictionary }: VenueSectionProps) {
  const { venueDetails, travel } = siteConfig.event;

  return (
    <section className="mx-auto grid w-full max-w-4xl gap-16 px-6 text-center lg:grid-cols-2 lg:text-left">
      <article>
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent)]">
          {dictionary.sections.venueLabel}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-[#314a7a] sm:text-5xl">
          {dictionary.sections.venueHeading}
        </h2>
        <p className="mt-8 font-serif text-2xl text-stone-800">{venueDetails.name}</p>
        <p className="mt-4 text-lg leading-8 text-stone-700">{venueDetails.address}</p>
        <p className="mt-4 text-lg leading-8 text-stone-700">{venueDetails.note}</p>
      </article>

      <article>
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-accent)]">
          {dictionary.sections.travelLabel}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-[#314a7a] sm:text-5xl">
          {dictionary.sections.travelHeading}
        </h2>

        <div className="mt-8 space-y-5 text-lg text-stone-700">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
              {dictionary.common.airportLabel}
            </p>
            <p className="mt-2 text-base">{travel.airport}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-500">
              {dictionary.common.hotelAreaLabel}
            </p>
            <p className="mt-2 text-base">{travel.hotelArea}</p>
          </div>
          <p className="text-base leading-7">{travel.transportNote}</p>
        </div>
      </article>
    </section>
  );
}
