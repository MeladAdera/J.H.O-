import { useTranslations } from "next-intl";
import { STATIONS } from "@/data/stations";
import type { StationIndex } from "@/lib/types";

/* The readout floating over the bottom-left of the diorama. `aria-live` so a
   camera move announces where it landed — the visual glide conveys that to
   sighted users and nothing conveys it otherwise. */

export function StationHud({ active }: { active: StationIndex }) {
  const t = useTranslations("world");
  const station = STATIONS[active];

  return (
    <div
      aria-live="polite"
      className="pointer-events-none absolute bottom-5 inset-s-5 z-20 max-w-md border border-line bg-overlay p-4 shadow-2xl backdrop-blur-md md:inset-e-auto"
    >
      <div className="mb-1.5 flex items-center justify-between gap-4">
        <span className="text-mono-telemetry text-[9px] uppercase text-accent-ink">
          <span className="latin-telemetry">
            {t("stationLabel")} {String(station.index).padStart(2, "0")}
          </span>
        </span>
        <span className="pulse-glow h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      </div>
      <h3 className="font-editorial-heading text-lg text-ink">
        {t(`stations.${station.id}.title`)}
      </h3>
      <p className="mt-1 font-world-serif text-sm leading-relaxed text-ink-muted">
        {t(`stations.${station.id}.desc`)}
      </p>
    </div>
  );
}
