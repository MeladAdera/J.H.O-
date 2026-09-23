import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Specimen } from "@/lib/types";

/* One specimen in the lookbook grid.
   Ported from the card template in design-reference/our collection.html. */

interface Props {
  specimen: Specimen;
  /** Drives the staggered reveal as the grid fills in. */
  index: number;
  onSelect: (specimen: Specimen) => void;
}

export function SpecimenCard({ specimen, index, onSelect }: Props) {
  const t = useTranslations("collection.lookbook");
  const tPanels = useTranslations("collection.panels");

  return (
    <article
      className="group atelier-glass-card animate-fade-in-up flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl opacity-0 transition duration-500 hover:-translate-y-1.5 hover:border-accent-ink"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <button
        type="button"
        onClick={() => onSelect(specimen)}
        className="flex h-full w-full flex-col justify-between text-start"
      >
        <div className="relative aspect-3/4 w-full overflow-hidden bg-sunken">
          <Image
            src={specimen.img}
            alt={specimen.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top brightness-95 transition duration-700 ease-atelier group-hover:scale-105 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-photo-scrim/90 via-transparent to-transparent opacity-65 transition duration-300 group-hover:opacity-40" />

          <div className="latin-telemetry absolute inset-s-3.5 top-3.5 rounded-full border border-on-photo/10 bg-photo-scrim/75 px-2.5 py-1 font-archive-mono text-[9px] uppercase tracking-widest text-on-photo">
            {specimen.code}
          </div>

          <div className="absolute inset-e-3.5 top-3.5 rounded-full border border-accent bg-photo-scrim/75 px-2.5 py-1 font-archive-mono text-[9px] uppercase tracking-wider text-accent">
            {t(specimen.fit === "REGULAR" ? "regular" : "oversized")}
          </div>

          <div className="absolute inset-x-4 bottom-4 translate-y-2 rounded-full border border-accent bg-photo-scrim/95 py-2.5 text-center font-archive-mono text-xs uppercase tracking-widest text-accent opacity-0 shadow-xl backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            [ {t("inspect")} ]
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <span className="mb-1.5 block font-archive-mono text-[9px] uppercase tracking-widest text-accent-ink">
              {tPanels(`${specimen.season.toLowerCase()}.title`)} •{" "}
              {tPanels(`${specimen.gender.toLowerCase()}.title`)}
            </span>
            <h3 className="mb-1 line-clamp-1 font-archive-serif text-2xl font-light text-ink transition duration-300 group-hover:text-accent-ink">
              {specimen.title}
            </h3>
            <p className="mb-4 line-clamp-2 font-archive-sans text-xs font-light leading-relaxed text-ink-muted">
              {specimen.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-3 font-archive-mono text-[10px] text-ink-muted">
            <span>{specimen.priceNote}</span>
            <span className="text-ink transition duration-300 group-hover:text-accent-ink">
              {t("details")}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
