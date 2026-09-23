import Image from "next/image";
import { useTranslations } from "next-intl";
import { ARCHIVE_PLATES } from "@/data/stations";

/* The photographic counterpart to the modelled room. These are real
   photographs, so their scrim is pinned dark in both themes — see the
   photo-scrim / on-photo roles in globals.css. */

export function ArchivePlates() {
  const t = useTranslations("world.archive");

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-line pb-4">
        <h2 className="font-editorial-heading text-2xl text-ink sm:text-3xl">{t("title")}</h2>
        <p className="text-mono-telemetry text-[10px] uppercase text-ink-muted">{t("intro")}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARCHIVE_PLATES.map(({ key, img }) => (
          <figure key={key} className="group relative overflow-hidden border border-line">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-sunken">
              <Image
                src={img}
                alt={t(`${key}.title`)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover brightness-95 transition duration-700 ease-atelier group-hover:scale-105 group-hover:brightness-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-photo-scrim/85 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-45" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-mono-telemetry block text-[9px] uppercase text-accent">
                {t(`${key}.note`)}
              </span>
              <span className="font-editorial-heading text-lg text-on-photo">
                {t(`${key}.title`)}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
