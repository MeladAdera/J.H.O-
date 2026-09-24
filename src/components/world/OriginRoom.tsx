"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { StationControls } from "./StationControls";
import { StationHud } from "./StationHud";
import { useTheme } from "@/hooks/useTheme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useOriginRoom } from "@/hooks/useOriginRoom";
import { STATIONS } from "@/data/stations";
import type { StationIndex } from "@/lib/types";

/* The single client boundary for page 3. Station state lives here because the
   waypoint picker, the HUD and the scene all read it — the same shape as
   HeroExperience on page 1.

   The room tours itself: the camera walks the stations on a timer so the page
   is doing something before anyone touches it. Any deliberate act — picking a
   station, clicking a prop — stops the tour, on the same principle as the
   hero's stage pills pausing its loop. Nothing yanks the camera away while
   someone is looking at something. */

/** How long the camera dwells before moving on. Long enough to read the card. */
const DWELL_MS = 7000;

export function OriginRoom() {
  const t = useTranslations("world");
  const [station, setStation] = useState<StationIndex>(0);
  const [touring, setTouring] = useState(true);
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  /** A deliberate choice — from the picker or from clicking a prop. */
  const select = useCallback((next: StationIndex) => {
    setStation(next);
    setTouring(false);
  }, []);

  /** Any touch of the room itself — a click on empty floor, a drag, a zoom. */
  const stopTour = useCallback(() => setTouring(false), []);

  const mountRef = useOriginRoom({
    station,
    theme,
    reducedMotion,
    onSelectStation: select,
    onInteract: stopTour,
  });

  /* Reduced motion opts out entirely: an unattended camera glide every seven
     seconds is exactly the kind of movement that setting asks us not to make. */
  useEffect(() => {
    if (!touring || reducedMotion) return;
    const timer = window.setInterval(() => {
      setStation((current) => ((current + 1) % STATIONS.length) as StationIndex);
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [touring, reducedMotion]);

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 pb-4 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="text-mono-telemetry inline-flex items-center gap-2.5 border border-line bg-surface px-3 py-1.5 text-[10px] uppercase text-gold">
            <span className="pulse-glow inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {t("eyebrow")}
          </span>
          <h1 className="mt-4 font-editorial-heading text-5xl tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-4 font-world-serif text-lg leading-relaxed text-ink-muted">
            {t("intro")}
          </p>
        </div>
      </div>

      <div className="border border-line bg-surface p-2 shadow-2xl sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
          <StationControls active={station} onSelect={select} />

          <div className="flex items-center gap-2">
            {/* Hidden under reduced motion: the tour never runs, so a control
                that claims to pause it would be lying. */}
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setTouring((on) => !on)}
                aria-pressed={touring}
                className={`flex items-center gap-2 border px-3 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
                  touring
                    ? "border-accent-ink bg-accent-soft text-accent-ink"
                    : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    touring ? "pulse-glow bg-accent" : "bg-ink-faint"
                  }`}
                />
                {touring ? t("tour.pause") : t("tour.resume")}
              </button>
            )}

            <button
              type="button"
              onClick={() => select(0)}
              className="border border-line px-3 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              {t("resetView")}
            </button>
          </div>
        </div>

        {/* The stage. The room's own lighting responds to the theme — see
            lib/diorama/lighting.ts — so this only supplies the ground the
            canvas sits on before WebGL takes over. */}
        <div className="relative w-full overflow-hidden bg-sunken">
          {/* The canvas mounts into this div. The message underneath stays in
              the flow as the fallback: if WebGL is unavailable the hook bails
              before appending anything and this is what remains visible. */}
          <div ref={mountRef} className="relative h-135 w-full sm:h-160 md:h-180">
            <div className="absolute inset-0 -z-10 flex items-center justify-center px-8 text-center">
              <span className="text-mono-telemetry text-[10px] uppercase text-ink-faint">
                {t("unsupported")}
              </span>
            </div>
          </div>

          <StationHud active={station} />
        </div>

        <p className="text-mono-telemetry mt-3 px-1 text-center text-[9px] uppercase text-ink-faint">
          {t("hint")}
        </p>
      </div>
    </section>
  );
}
