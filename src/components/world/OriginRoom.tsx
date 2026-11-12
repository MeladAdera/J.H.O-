"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { useTranslations } from "next-intl";
import { StationControls } from "./StationControls";
import { StationHud } from "./StationHud";
import { TypedLines } from "./TypedLines";
import { useTheme } from "@/hooks/useTheme";
import { useOriginRoom } from "@/hooks/useOriginRoom";
import { CAMERA_FOV, STATIONS } from "@/data/stations";
import type { StationIndex } from "@/lib/types";

/* The diorama section, from design-reference/my little world.html:157-878:
   the title block with its seal, then the exhibition frame — waypoint bar,
   canvas, HUD, telemetry corner, guide bar.

   Station state belongs to WorldExperience, because the artifact cards and
   the epilogue further down drive the same camera. So this is a controlled
   component: it renders the station it is given and reports choices back. */

interface Props {
  station: StationIndex;
  touring: boolean;
  reducedMotion: boolean;
  onSelect: (index: StationIndex) => void;
  onInteract: () => void;
  onToggleTour: () => void;
  /** The exhibition frame, so a choice made further down can scroll it back into view. */
  frameRef: RefObject<HTMLDivElement | null>;
}

/** Room 402's coordinates — Latakia, as the colophon says. The reference
    printed Paris, which was the design tool's default. Latin telemetry, so
    not translated. */
const COORDS = "35°31′N 35°47′E";

/** The camera's downward tilt at a waypoint, in degrees. The reference typed
    "-14.2°" as decoration; this one is read off the real geometry, so the
    readout changes with the station and is never wrong. */
function tiltOf(index: StationIndex): string {
  const { cam, look } = STATIONS[index];
  const drop = look[1] - cam[1];
  const reach = Math.hypot(look[0] - cam[0], look[2] - cam[2]);
  return ((Math.atan2(drop, reach) * 180) / Math.PI).toFixed(1);
}

const CONTROL =
  "flex items-center gap-2 border px-3 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";
const CONTROL_QUIET = "border-line text-ink-muted hover:border-line-strong hover:text-ink";
const CONTROL_LIT = "border-accent-ink bg-accent-soft text-accent-ink";

export function OriginRoom({
  station,
  touring,
  reducedMotion,
  onSelect,
  onInteract,
  onToggleTour,
  frameRef,
}: Props) {
  const t = useTranslations("world");
  const tBrand = useTranslations("brand");
  const theme = useTheme();

  const mountRef = useOriginRoom({
    station,
    theme,
    reducedMotion,
    onSelectStation: onSelect,
    onInteract,
  });

  return (
    <section
      id="origin-room"
      className="mx-auto w-full max-w-[1600px] scroll-mt-20 px-4 pb-4 pt-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <div className="text-mono-telemetry flex flex-wrap items-center gap-3 text-[11px] uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="text-accent-ink">[ {t("eyebrow")} ]</span>
            <span className="text-ink-faint" aria-hidden="true">
              /
            </span>
            <span className="text-ink-muted">{t("genesis")}</span>
          </div>
          <h1 className="font-editorial-heading text-5xl text-ink uppercase sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          {/* Two lines in the designer's own voice, written on once. Upright,
              not italic: they are statements rather than quotations, and a
              slanted Naskh is a synthetic distortion anyway. */}
          <div className="pt-1 font-world-serif">
            <TypedLines
              lines={[
                { text: t("lede.ideas"), className: "text-xl leading-snug text-accent-ink sm:text-2xl" },
                { text: t("lede.room"), className: "text-base text-ink-muted sm:text-lg" },
              ]}
            />
          </div>
        </div>

        {/* The seal: the emblem with the room's coordinates and status, set
            like a plaque beside the title. */}
        <div className="flex items-center gap-5 border border-line bg-surface px-6 py-4 shadow-xl">
          <Image
            src="/images/brand/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full border border-accent-ink/40 object-cover shadow-md"
          />
          <div className="flex flex-col gap-1 font-world-mono text-[10px] tracking-wider">
            <span className="text-xs font-medium tracking-widest text-ink uppercase">
              {tBrand("name")}
            </span>
            {/* The coordinates are isolated: "35°31′N 35°47′E" has two strong
                Latin letters in it, and the bidi algorithm pulls an Arabic
                sentence apart around them. */}
            <span className="text-ink-muted">
              {t.rich("seal.coord", {
                coords: COORDS,
                latin: (chunks) => <span className="latin-telemetry">{chunks}</span>,
              })}
            </span>
            <span className="tracking-widest text-gold uppercase">{t("seal.status")}</span>
          </div>
        </div>
      </div>

      {/* The exhibition frame. scroll-mt clears the sticky header when a card
          below scrolls it back into view. */}
      <div ref={frameRef} className="scroll-mt-24 border border-line bg-surface p-2 shadow-2xl sm:p-4">
        {/* The waypoint bar. Two rows on purpose: the feed's label with the
            two tour controls opposite it, then the picker on a line of its
            own. The reference had label and picker on one line, but that was
            five short names; six full titles wrap at 1920px, and a picker
            that wraps in the middle of a row of other controls reads as
            three ragged lines. */}
        <div className="mb-3 flex flex-col gap-3 border-b border-line bg-sunken/60 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div className="text-mono-telemetry flex items-center gap-3 text-[10px] text-gold uppercase">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <span>{t("waypoint")}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Hidden under reduced motion: the tour never runs, so a control
                  that claims to pause it would be lying. */}
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={onToggleTour}
                  aria-pressed={touring}
                  className={`${CONTROL} ${touring ? CONTROL_LIT : CONTROL_QUIET}`}
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
                onClick={() => onSelect(0)}
                className={`${CONTROL} ${CONTROL_QUIET}`}
              >
                {t("resetView")}
              </button>
            </div>
          </div>

          <StationControls active={station} onSelect={onSelect} />
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
              <span className="text-mono-telemetry text-[10px] text-ink-faint uppercase">
                {t("unsupported")}
              </span>
            </div>
          </div>

          <StationHud active={station} />

          {/* The telemetry corner. Real numbers, but decoration — the HUD
              already announces the station, so this is hidden from readers. */}
          <div
            aria-hidden="true"
            className="text-mono-telemetry pointer-events-none absolute top-5 inset-e-5 z-20 hidden flex-col items-end gap-1 text-[10px] uppercase sm:flex"
          >
            <span className="text-ink-muted">
              {t("telemetry.fov")}: <span className="latin-telemetry">{CAMERA_FOV}°</span>
              {" • "}
              {t("telemetry.tilt")}: <span className="latin-telemetry">{tiltOf(station)}°</span>
            </span>
            <span className="text-accent-ink">{t("telemetry.scale")}</span>
          </div>
        </div>

        {/* The guide bar: how to touch the room on one side, the lab's name
            on the other. */}
        <div className="text-mono-telemetry mt-3 flex flex-col items-center justify-between gap-2 border border-line bg-sunken/60 px-4 py-2.5 text-[10px] uppercase sm:flex-row">
          <span className="text-center text-ink-muted sm:text-start">{t("hint")}</span>
          <span className="shrink-0 font-medium text-accent-ink">{t("live")}</span>
        </div>
      </div>
    </section>
  );
}
