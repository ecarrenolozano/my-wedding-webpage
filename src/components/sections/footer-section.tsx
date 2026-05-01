import { siteConfig } from "@/config/site.config";
import type { HomePageContent } from "@/types/site";

type FooterSectionProps = {
  content: HomePageContent;
};

export function FooterSection({ content }: FooterSectionProps) {
  const names = `${siteConfig.couple.partnerOne} & ${siteConfig.couple.partnerTwo}`;

  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-12 pt-4 text-center">
      <div className="h-px w-full bg-[color:var(--color-accent)]/20" />

      <div className="mx-auto mt-10 max-w-3xl">
        <p className="hero-script text-[2.9rem] text-[color:var(--color-accent)] sm:text-[3.4rem]">
          {names}
        </p>
        <p className="body-elegant mt-5 text-stone-700">
          {content.footer.note}
        </p>
        <p className="meta-label mt-6 text-[color:var(--color-accent)]">
          {content.footer.credit}
        </p>
      </div>
    </footer>
  );
}
