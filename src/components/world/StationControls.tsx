"use client";

import { useTranslations } from "next-intl";
import { STATIONS } from "@/data/stations";
import type { StationIndex } from "@/lib/types";

/* The waypoint picker. Rendered as a radio group rather than plain buttons:
   exactly one station is active at a time, and that is what a screen reader
   should hear when arrowing through them. */

interface Props {
  active: StationIndex;
  onSelect: (index: StationIndex) => void;
}

export function StationControls({ active, onSelect }: Props) {
  const t = useTranslations("world");

  return (
    <div
      role="radiogroup"
      aria-label={t("dioramaLabel")}
      className="flex flex-wrap items-center gap-2"
    >
      {STATIONS.map((station) => {
        const isActive = station.index === active;
        return (
          <button
            key={station.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(station.index)}
            className={`group flex items-center gap-2 border px-3 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
              isActive
                ? "border-accent-ink bg-accent-soft text-accent-ink"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                isActive ? "bg-accent" : "bg-ink-faint group-hover:bg-ink-muted"
              }`}
            />
            <span className="latin-telemetry">
              {String(station.index).padStart(2, "0")}
            </span>
            <span>{t(`stations.${station.id}.title`)}</span>
          </button>
        );
      })}
    </div>
  );
}
