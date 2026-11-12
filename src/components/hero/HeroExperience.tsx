"use client";

import { useCallback, useState, type ReactNode } from "react";
import type { HeroStage } from "@/lib/types";
import { useMetamorphosis } from "@/hooks/useMetamorphosis";
import { HeroHeader } from "./HeroHeader";
import { HeroCopy } from "./HeroCopy";
import { StageTheater } from "./StageTheater";
import { HeroFooter } from "./HeroFooter";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { PencilFilterDefs } from "./PencilFilterDefs";

/* The single client boundary for the hero.

   The header stepper, the stage pills, the theater badge and the footer label
   all read the same value, so `stage` lives here and flows down as props. The
   original coordinated the same thing through getElementById and manual
   className strings across four places.

   The hero itself is composed as one screen: header, stage and telemetry bar
   fill the viewport between them. Whatever the page passes as children (the
   first-look scrapbook) follows below that screen, on the same drafting
   grid, and the colophon closes the page after it. Children arrive as
   server-rendered markup, so they add nothing to this client bundle. */

export function HeroExperience({ children }: { children?: ReactNode }) {
  const [stage, setStage] = useState<HeroStage>(1);

  const onStageChange = useCallback((next: HeroStage) => setStage(next), []);
  const { scope, jumpToStage, restart } = useMetamorphosis({ onStageChange });

  return (
    <div
      data-skin="atelier"
      className="draft-canvas-grid relative flex flex-1 flex-col overflow-x-hidden text-ink"
    >
      <PencilFilterDefs />

      <div className="relative flex min-h-screen flex-col justify-between">
        <HeroHeader stage={stage} onJump={jumpToStage} />

        <main className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 py-8 lg:px-14 lg:py-12">
          {/* Drafting watermark. The positioned box stays in the page's own
              direction so start/end mirror in Arabic, while latin-telemetry sits
              on the inner span to keep the text itself left-to-right — otherwise
              the leading "//" and the reference number get reordered. */}
          <div className="pointer-events-none absolute inset-s-14 top-4 hidden font-atelier-mono text-[10px] uppercase tracking-widest text-ink-faint lg:block">
            <span className="latin-telemetry">
              {"// ATELIER METAMORPHOSIS PIPELINE • TRACE ENGINE • REF #744.18"}
            </span>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 xl:col-span-5">
              <HeroCopy stage={stage} onJump={jumpToStage} onRestart={restart} />
            </div>
            <div className="lg:col-span-6 xl:col-span-7">
              <StageTheater stage={stage} viewportRef={scope} />
            </div>
          </div>
        </main>

        <HeroFooter stage={stage} />
      </div>

      {children}

      <SiteFooter />
    </div>
  );
}
