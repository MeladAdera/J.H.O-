"use client";

import { useTranslations } from "next-intl";
import { STATIONS } from "@/data/stations";
import type { StationId, StationIndex } from "@/lib/types";

/* "Artifacts of the Origin Room" — one card per station, from
   design-reference/my little world.html:879-1057. Each card is a second way
   into the diorama: choosing one glides the camera to that station and brings
   the frame back into view, so the section reads as an index of the room
   rather than a gallery beside it.

   The whole card is clickable, but the control is the "Viewpoint" button in
   its foot, stretched over the card with a pseudo-element. A heading and two
   paragraphs cannot live inside a <button>, and a reader arrowing through
   the cards should hear an article with a button in it, not a button that
   talks for a paragraph.

   The reference used Material Symbols for the corner glyphs. There is no icon
   font in this project, so these are six small inline strokes. */

const GLYPH: Record<StationId, React.ReactNode> = {
  overview: <path d="M2 13V6.5L8 2l6 4.5V13M2 13h12M6 13V9h4v4" />,
  desk: <path d="M11 2l3 3-8 8H3v-3l8-8zM9.5 3.5l3 3" />,
  lamp: <path d="M8 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM8 9v5M5.5 14h5" />,
  laptop: <path d="M2.5 4h11v7h-11zM1 13h14" />,
  rack: <path d="M8 3a1.5 1.5 0 0 1 1.5 1.5c0 1.2-1.5 1.3-1.5 2.7v.3M1.5 12.5L8 7.5l6.5 5z" />,
  vanity: <path d="M4 13V7a4 4 0 0 1 8 0v6M2.5 13h11M8 4.5v2" />,
};

interface Props {
  active: StationIndex;
  onSelect: (index: StationIndex) => void;
}

export function ArtifactCards({ active, onSelect }: Props) {
  const t = useTranslations("world");
  const last = String(STATIONS.length - 1).padStart(2, "0");

  return (
    <section
      aria-labelledby="artifacts-title"
      className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex items-baseline justify-between gap-6">
        <div>
          <span className="text-mono-telemetry mb-1 block text-[11px] text-accent-ink uppercase">
            {t("artifacts.eyebrow")}
          </span>
          <h2 id="artifacts-title" className="font-editorial-heading text-2xl text-ink sm:text-3xl">
            {t("artifacts.title")}
          </h2>
        </div>
        <span className="text-mono-telemetry hidden text-[11px] text-ink-muted uppercase md:inline-block">
          {t("artifacts.index")} • <span className="latin-telemetry">00 — {last}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {STATIONS.map((station) => {
          const isActive = station.index === active;
          const title = t(`stations.${station.id}.title`);
          return (
            <article
              key={station.id}
              className={`group relative flex flex-col justify-between overflow-hidden border bg-surface p-6 transition-all duration-300 hover:shadow-xl ${
                isActive ? "border-accent-ink" : "border-line hover:border-accent-ink/40"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-mono-telemetry latin-telemetry text-[11px] text-accent-ink uppercase">
                    {t("artifacts.station")} {String(station.index).padStart(2, "0")}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-ink-muted transition-colors group-hover:text-accent-ink"
                  >
                    {GLYPH[station.id]}
                  </svg>
                </div>
                <div>
                  <h3 className="font-editorial-heading text-xl font-medium text-ink transition-colors group-hover:text-accent-ink">
                    {title}
                  </h3>
                  <p className="mt-1 font-world-serif text-base text-gold italic">
                    {t(`artifacts.quotes.${station.id}`)}
                  </p>
                </div>
                <p className="font-world-serif text-sm leading-relaxed text-ink-muted">
                  {t(`stations.${station.id}.desc`)}
                </p>
              </div>

              <div className="-mx-6 -mb-6 mt-6 flex items-center justify-between border-t border-line bg-sunken/40 px-6 py-3">
                <span className="text-mono-telemetry text-[10px] text-ink-muted uppercase">
                  {t("artifacts.focusCam")}
                </span>
                {/* after:inset-0 stretches the hit area over the whole card;
                    the article is the positioned ancestor. */}
                <button
                  type="button"
                  onClick={() => onSelect(station.index)}
                  aria-pressed={isActive}
                  aria-label={`${title} — ${t("artifacts.viewpoint")}`}
                  className="text-mono-telemetry inline-flex items-center gap-1.5 text-xs text-accent-ink transition-transform after:absolute after:inset-0 after:content-[''] group-hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink rtl:group-hover:-translate-x-1"
                >
                  {t("artifacts.viewpoint")}
                  <span className="flip-arrow inline-block" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
