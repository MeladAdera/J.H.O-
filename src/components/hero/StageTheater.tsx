import type { RefObject } from "react";
import type { HeroStage } from "@/lib/types";
import { SketchStage } from "./stages/SketchStage";
import { VectorStage } from "./stages/VectorStage";
import { GarmentStage } from "./stages/GarmentStage";

/* The framed viewport the three acts play inside: progress bar, live stage
   badge, and the corner annotations around the frame.
   Ported from design-reference/code.html (the right-hand column). */

const BADGE: Record<HeroStage, { subtitle: string; title: string }> = {
  1: { subtitle: "Idea Conception", title: "Stage 1 of 3: Rough Sketch" },
  2: { subtitle: "Digital Translation", title: "Stage 2 of 3: Vector Design" },
  3: { subtitle: "Physical Product", title: "Stage 3 of 3: Real T-Shirt" },
};

interface Props {
  stage: HeroStage;
  /** Attaches to the frame: scopes the GSAP timeline and receives the tilt. */
  viewportRef: RefObject<HTMLDivElement | null>;
}

export function StageTheater({ stage, viewportRef }: Props) {
  const badge = BADGE[stage];

  return (
    <div className="relative flex items-center justify-center">
      <div
        ref={viewportRef}
        className="group relative aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-2xl transition-transform duration-700 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] sm:aspect-[4/5.1] sm:p-3"
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-neutral-900">
          <GarmentStage />
          <VectorStage />
          <SketchStage />

          {/* Live stage badge */}
          <div className="absolute bottom-4 right-4 z-40 flex items-center gap-3 rounded-xl border border-black/10 bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md transition-all duration-300">
            <div className="h-2.5 w-2.5 animate-ping rounded-full bg-atelier-pink" />
            <div>
              <div className="font-atelier-mono text-[10px] uppercase tracking-wider text-atelier-muted">
                {badge.subtitle}
              </div>
              <div className="font-atelier-mono text-xs font-semibold text-atelier-dark">
                {badge.title}
              </div>
            </div>
          </div>

          {/* Transformation progress */}
          <div className="absolute inset-x-0 top-0 z-40 h-1 bg-black/10">
            <div
              className="h-full bg-atelier-pink transition-all duration-700"
              style={{ width: `${(stage / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Frame annotations */}
      <div className="absolute -bottom-6 -left-6 z-30 hidden items-center gap-2 rounded-lg border border-black/10 bg-white/90 px-3 py-1.5 font-atelier-mono text-[10px] text-atelier-muted shadow-sm sm:flex">
        <span className="font-bold text-atelier-pink">•</span>
        <span>AUTONOMOUS STAGE SEQUENCE: 1 → 2 → 3</span>
      </div>
      <div className="absolute -right-4 -top-5 z-30 hidden items-center gap-2 rounded-lg border border-black/10 bg-white/90 px-3 py-1.5 font-atelier-mono text-[10px] text-atelier-muted shadow-sm sm:flex">
        <span>PARIS ATELIER CAD UNIT 08</span>
      </div>
    </div>
  );
}
