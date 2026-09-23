import type { RefObject } from "react";
import { useTranslations } from "next-intl";
import type { HeroStage } from "@/lib/types";
import { SketchStage } from "./stages/SketchStage";
import { VectorStage } from "./stages/VectorStage";
import { GarmentStage } from "./stages/GarmentStage";

/* The framed viewport the three acts play inside: progress bar, live stage
   badge, and the corner annotations around the frame.
   Ported from design-reference/code.html (the right-hand column). */

const BADGE_KEY: Record<HeroStage, "sketch" | "vector" | "shirt"> = {
  1: "sketch",
  2: "vector",
  3: "shirt",
};

interface Props {
  stage: HeroStage;
  /** Attaches to the frame: scopes the GSAP timeline and receives the tilt. */
  viewportRef: RefObject<HTMLDivElement | null>;
}

export function StageTheater({ stage, viewportRef }: Props) {
  const t = useTranslations("hero");
  const key = BADGE_KEY[stage];

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={viewportRef}
        className="group relative aspect-4/5 w-full max-w-155 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl transition-transform duration-700 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] sm:aspect-[4/5.1] sm:p-3"
      >
        {/* The theater's black box. Not themed: it is the unlit space the
            three acts play inside, and every act paints over it. */}
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
          <GarmentStage />
          <VectorStage />
          <SketchStage />

          {/* Live stage badge */}
          <div className="absolute bottom-4 inset-e-4 z-40 flex items-center gap-3 rounded-xl border border-line bg-overlay px-3.5 py-2 shadow-lg backdrop-blur-md transition-all duration-300">
            <div className="h-2.5 w-2.5 animate-ping rounded-full bg-accent" />
            <div>
              <div className="font-atelier-mono text-[10px] uppercase tracking-wider text-ink-muted">
                {t(`stageBadge.${key}.subtitle`)}
              </div>
              <div className="font-atelier-mono text-xs font-semibold text-ink">
                {t(`stageBadge.${key}.title`)}
              </div>
            </div>
          </div>

          {/* Transformation progress */}
          <div className="absolute inset-x-0 top-0 z-40 h-1 bg-line-strong">
            <div
              className="h-full bg-accent transition-all duration-700"
              style={{ width: `${(stage / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Frame annotations */}
      <div className="absolute -bottom-6 -inset-s-6 z-30 hidden items-center gap-2 rounded-lg border border-line bg-overlay px-3 py-1.5 font-atelier-mono text-[10px] uppercase text-ink-muted shadow-sm backdrop-blur-sm sm:flex">
        <span className="font-bold text-accent-ink">•</span>
        <span>{t("sequence")}</span>
      </div>
      <div className="absolute -inset-e-4 -top-5 z-30 hidden items-center gap-2 rounded-lg border border-line bg-overlay px-3 py-1.5 font-atelier-mono text-[10px] text-ink-muted shadow-sm backdrop-blur-sm sm:flex">
        <span>{t("frameNote")}</span>
      </div>
    </div>
  );
}
