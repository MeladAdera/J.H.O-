import type { HeroStage } from "@/lib/types";

/* Telemetry bar. Ported from design-reference/code.html (footer). */

const STAGE_LABEL: Record<HeroStage, string> = {
  1: "01 ROUGH SKETCH & NOTE",
  2: "02 POLISHED VECTOR ARTWORK",
  3: "03 REAL EMBROIDERED SHIRT",
};

export function HeroFooter({ stage }: { stage: HeroStage }) {
  return (
    <footer className="z-20 flex w-full flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] bg-white/70 px-6 py-3 font-atelier-mono text-[11px] text-atelier-muted backdrop-blur-sm lg:px-14">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 font-medium text-atelier-dark">
          <span className="h-2 w-2 rounded-full bg-atelier-pink" />
          <span>J.H.O METAMORPHOSIS LAB</span>
        </span>
        <span className="hidden text-black/20 sm:inline">|</span>
        <span className="hidden sm:inline">SKETCH TO GARMENT FABRICATION CYCLE</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-black/40">TRANSFORMATION:</span>
          <span className="font-semibold text-atelier-dark">{STAGE_LABEL[stage]}</span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-black/40">LATENCY:</span>
          <span className="font-medium text-emerald-600">100% BESPOKE ARCHIVE</span>
        </div>
        <a
          href="#start"
          className="font-medium underline decoration-atelier-pink underline-offset-4 transition-colors hover:text-black"
        >
          SUBMIT AN IDEA ↗
        </a>
      </div>
    </footer>
  );
}
