import Image from "next/image";
import { useTranslations } from "next-intl";
import { ARCHIVE_PLATES } from "@/data/stations";

/* "In Situ Archives", from design-reference/my little world.html:1058-1158:
   the photographic counterpart to the modelled room. Three plates, each a
   real photograph, held in the desaturated archive state until hovered, when
   the colour comes back. The middle plate is lifted, as the reference has it.

   The reference's second row of macro close-ups is not here: there are three
   photographs of the room, and they are these three. */

export function ArchivePlates() {
  const t = useTranslations("world.archive");

  return (
    <section
      id="photo-archives"
      className="mx-auto w-full max-w-[1600px] scroll-mt-20 border-t border-line px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <span className="text-mono-telemetry mb-2 block text-[11px] text-accent-ink uppercase">
            {t("eyebrow")}
          </span>
          <h2 className="font-editorial-heading text-3xl text-ink sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-2 font-world-serif text-base leading-relaxed text-ink-muted">
            {t("intro")}
          </p>
        </div>
        <div className="text-mono-telemetry flex items-center gap-4 text-[10px] text-ink-muted uppercase">
          <span>{t("exhibit")}</span>
          <span className="text-accent" aria-hidden="true">
            •
          </span>
          <span>{t("scan")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
        {ARCHIVE_PLATES.map(({ key, img, numeral, portrait, time, code }, i) => (
          <article
            key={key}
            className={`group flex flex-col overflow-hidden border border-line bg-surface shadow-xl transition-colors duration-300 hover:border-accent-ink/40 ${
              i === 1 ? "md:-mt-6" : ""
            }`}
          >
            <div
              className={`relative w-full overflow-hidden bg-sunken ${
                portrait ? "aspect-3/4" : "aspect-4/3"
              }`}
            >
              <Image
                src={img}
                alt={t(`${key}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale contrast-125 transition-all duration-700 ease-atelier group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100"
              />
              <span className="text-mono-telemetry absolute top-3 inset-s-3 border border-line bg-overlay px-2.5 py-1 text-[10px] text-ink uppercase backdrop-blur-sm">
                {t("plate", { numeral })} {"//"} {t(`${key}.label`)}
              </span>
            </div>

            <div className="flex flex-col gap-3 p-5">
              <div>
                <span className="text-mono-telemetry block text-[10px] text-ink-muted uppercase">
                  {t(`${key}.context`)} • <span className="latin-telemetry">{time}</span>
                </span>
                <h3 className="mt-1 font-editorial-heading text-lg font-medium text-ink">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 font-world-serif text-sm leading-relaxed text-ink-muted">
                  {t(`${key}.desc`)}
                </p>
              </div>
              <div className="text-mono-telemetry flex items-center justify-between border-t border-line pt-3 text-[10px] text-ink-muted uppercase">
                <span>{t("ref", { code })}</span>
                <span className="text-gold">{t("authentic")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
