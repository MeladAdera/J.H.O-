import Link from "next/link";
import type { HeroStage } from "@/lib/types";

/* The editorial left-hand column: headline, call to action, the manual stage
   pills, and the phase footnotes.
   Ported from design-reference/code.html (the left column). */

const PILLS: { stage: HeroStage; label: string }[] = [
  { stage: 1, label: "01 Sketch" },
  { stage: 2, label: "02 Design" },
  { stage: 3, label: "03 Shirt" },
];

const PHASES = [
  { phase: "Phase 01", title: "Raw Concept", note: "Freehand pencil draft", accent: false },
  { phase: "Phase 02", title: "Vector Precision", note: "Bézier & Pantone prep", accent: false },
  { phase: "Phase 03", title: "360GSM Garment", note: "High-density puff print", accent: true },
];

interface Props {
  stage: HeroStage;
  onJump: (stage: HeroStage) => void;
  onRestart: () => void;
}

export function HeroCopy({ stage, onJump, onRestart }: Props) {
  return (
    <div className="z-20 flex flex-col">
      <div className="mb-6 inline-flex items-center gap-2.5 self-start rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-atelier-pink" />
        <span className="font-atelier-mono text-[11px] font-medium uppercase tracking-wider text-atelier-dark">
          Sketch → Design → Shirt
        </span>
        <span className="text-[10px] text-black/20">|</span>
        <span className="font-atelier-mono text-[10px] text-atelier-muted">1-of-1 Bespoke</span>
      </div>

      <h1 className="font-atelier-sans text-4xl font-bold uppercase leading-[1.03] tracking-tight text-atelier-dark sm:text-5xl xl:text-6xl 2xl:text-7xl">
        From an idea
        <span className="block py-1 pr-2 font-atelier-serif text-5xl font-normal italic lowercase tracking-normal text-atelier-pink sm:text-6xl xl:text-7xl 2xl:text-8xl">
          to something real.
        </span>
      </h1>

      <p className="mt-6 max-w-lg font-atelier-sans text-base leading-relaxed text-atelier-muted sm:text-lg">
        Your story, your business, your idea — transformed into a design made for you.
      </p>

      <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <Link
          href="/collection"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-atelier-dark px-7 py-4 font-atelier-mono text-sm uppercase tracking-wider text-white shadow-lg shadow-black/10 transition-all duration-300 hover:gap-4 hover:bg-black active:scale-95"
        >
          <span className="relative z-10 whitespace-nowrap font-medium">
            Explore our collection →
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-atelier-pink-deep/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Manual stage controls — these pause the loop */}
        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-sm">
          {PILLS.map(({ stage: pill, label }) => (
            <button
              key={pill}
              type="button"
              onClick={() => onJump(pill)}
              aria-pressed={pill === stage}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-atelier-mono text-xs font-medium transition-all ${
                pill === stage
                  ? "bg-atelier-dark text-white shadow-sm"
                  : "text-atelier-muted hover:text-black"
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onRestart}
            title="Replay full transformation"
            aria-label="Replay full transformation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-atelier-muted transition-all hover:bg-black/5 hover:text-black"
          >
            ↻
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-black/[0.08] pt-6 font-atelier-mono text-[11px]">
        {PHASES.map(({ phase, title, note, accent }) => (
          <div key={phase}>
            <div className="text-[10px] uppercase tracking-wider text-atelier-muted">{phase}</div>
            <div
              className={`mt-0.5 font-medium ${accent ? "text-atelier-pink-deep" : "text-atelier-dark"}`}
            >
              {title}
            </div>
            <div className="mt-0.5 text-[10px] text-atelier-muted">{note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
