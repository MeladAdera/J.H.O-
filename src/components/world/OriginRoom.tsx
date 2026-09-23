"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { StationControls } from "./StationControls";
import { StationHud } from "./StationHud";
import type { StationIndex } from "@/lib/types";

/* The single client boundary for page 3. Station state lives here because the
   waypoint picker, the HUD and the scene all read it — the same shape as
   HeroExperience on page 1.

   The scene itself mounts in step 4; until then the frame renders its own
   chrome so the layout and both themes can be verified without WebGL. */

export function OriginRoom() {
  const t = useTranslations("world");
  const [station, setStation] = useState<StationIndex>(0);

  const select = useCallback((next: StationIndex) => setStation(next), []);

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
          <button
            type="button"
            onClick={() => select(0)}
            className="border border-line px-3 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
          >
            {t("resetView")}
          </button>
        </div>

        {/* The stage. Kept dark in both themes for now; step 5 decides how the
            room itself is lit, which is a scene concern rather than a CSS one. */}
        <div className="relative w-full overflow-hidden bg-sunken">
          <div className="h-135 w-full sm:h-160 md:h-180">
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-mono-telemetry text-[10px] uppercase text-ink-faint">
                {t("loading")}
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
