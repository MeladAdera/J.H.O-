import { useTranslations } from "next-intl";

/* Act 2 — the sketch redrawn as a production-ready vector.
   Ported from design-reference/code.html (Stage 2). */

export function VectorStage() {
  const t = useTranslations("hero.vectorStage");

  return (
    <div
      data-stage="2"
      className="absolute inset-0 z-20 flex h-full w-full flex-col items-center justify-center bg-[#121214] p-6 opacity-0"
    >
      {/* Blueprint metric grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-105 flex-col items-center">
        <div className="mb-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-atelier-mono text-[11px] uppercase text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff7b9a]" />
          <span>
            <span className="latin-telemetry">STAGE 02 //</span> {t("stageLabel")}
          </span>
        </div>

        <div
          data-vector-artwork
          className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
        >
          {/* Calibration guides */}
          <div className="absolute inset-s-2 top-2 font-atelier-mono text-[9px] text-white/30">
            <span className="latin-telemetry">+ 00.00 ANCHOR</span>
          </div>
          <div className="absolute inset-e-2 top-2 font-atelier-mono text-[9px] text-white/30">
            <span className="latin-telemetry">1:1 SCALED</span>
          </div>
          <div className="pointer-events-none absolute inset-x-8 top-1/2 border-t border-dashed border-[#ff7b9a]/30" />
          <div className="pointer-events-none absolute inset-y-8 left-1/2 border-l border-dashed border-[#ff7b9a]/30" />

          <div className="mb-1 text-center">
            <span className="font-atelier-mono text-[11px] font-bold uppercase tracking-[0.28em] text-pink-200">
              {t("specimen")}
            </span>
            <div className="font-atelier-serif text-[9px] italic text-pink-300/80">
              {t("proof")}
            </div>
          </div>

          <svg
            viewBox="0 0 320 200"
            className="my-2 h-auto w-64 drop-shadow-[0_12px_24px_rgba(255,123,154,0.35)] sm:w-72"
          >
            <defs>
              <linearGradient id="bowGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF94B4" />
                <stop offset="50%" stopColor="#FF6B93" />
                <stop offset="100%" stopColor="#E2426E" />
              </linearGradient>
              <linearGradient id="bowGradientKnot" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFADC6" />
                <stop offset="100%" stopColor="#E2426E" />
              </linearGradient>
              <radialGradient id="bowGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B93" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF6B93" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="160" cy="95" r="90" fill="url(#bowGlow)" />

            {/* Left loop */}
            <path
              d="M150,95 C110,40 45,65 52,108 C58,142 125,128 150,102 Z"
              fill="url(#bowGradientMain)" stroke="#FFF0F5" strokeWidth="2.5"
            />
            <path
              d="M130,96 C98,75 75,85 78,102 C82,118 115,110 135,100"
              fill="none" stroke="#FFA6C1" strokeWidth="2" strokeLinecap="round"
            />

            {/* Right loop */}
            <path
              d="M170,95 C210,40 275,65 268,108 C262,142 195,128 170,102 Z"
              fill="url(#bowGradientMain)" stroke="#FFF0F5" strokeWidth="2.5"
            />
            <path
              d="M190,96 C222,75 245,85 242,102 C238,118 205,110 185,100"
              fill="none" stroke="#FFA6C1" strokeWidth="2" strokeLinecap="round"
            />

            {/* Ribbon tails */}
            <path
              d="M152,105 C138,140 108,175 85,190 C110,180 125,195 130,195 C142,168 156,132 160,108 Z"
              fill="#E84876" stroke="#FFF0F5" strokeWidth="1.8"
            />
            <path
              d="M168,105 C182,140 212,175 235,190 C210,180 195,195 190,195 C178,168 164,132 160,108 Z"
              fill="#E84876" stroke="#FFF0F5" strokeWidth="1.8"
            />

            {/* Knot */}
            <ellipse
              cx="160" cy="98" rx="16" ry="19"
              fill="url(#bowGradientKnot)" stroke="#FFFFFF" strokeWidth="2.5"
            />
            <line x1="156" y1="88" x2="156" y2="108" stroke="#FFA3BF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="164" y1="88" x2="164" y2="108" stroke="#E2426E" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <div className="mt-1 text-center">
            {/* The artwork's own wordmark — part of the design, never translated. */}
            <span className="latin-telemetry block font-atelier-serif text-2xl font-bold italic tracking-wide text-white drop-shadow-md sm:text-3xl">
              boop &amp; co.
            </span>
            <span className="mt-1 block font-atelier-mono text-[9px] uppercase tracking-[0.25em] text-white/50">
              {t("puffSpec")}
            </span>
          </div>
        </div>

        {/* Colourway chips */}
        {/* Colourway chips are spec data: hex codes stay Latin and LTR. */}
        <div className="mt-4 flex items-center gap-3">
          <div className="latin-telemetry flex items-center gap-1.5 rounded border border-white/10 bg-white/10 px-2.5 py-1 font-atelier-mono text-[10px] text-white/80">
            <span className="h-3 w-3 rounded-full border border-white/30 bg-[#FF7B9A]" />
            <span>#FF7B9A / Prism Pink</span>
          </div>
          <div className="latin-telemetry flex items-center gap-1.5 rounded border border-white/10 bg-white/10 px-2.5 py-1 font-atelier-mono text-[10px] text-white/80">
            <span className="h-3 w-3 rounded-full border border-white/30 bg-[#141416]" />
            <span>#141416 / Noir Terry</span>
          </div>
        </div>
      </div>
    </div>
  );
}
