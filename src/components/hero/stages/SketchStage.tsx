import { useTranslations } from "next-intl";

/* Act 1 — the rough hand sketch on studio drafting paper.
   Ported from design-reference/code.html (Stage 1). Every path carrying
   .sketch-path is drawn by GSAP, in order, via its stroke dash offset. */

export function SketchStage() {
  const t = useTranslations("hero.sketchStage");

  return (
    <div
      data-stage="1"
      className="absolute inset-0 z-30 flex h-full w-full flex-col items-center justify-center bg-[#FAF7F2] p-6"
    >
      {/* Paper tooth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#d1c7b7 0.85px, transparent 0.85px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* The drafting sheet, pinned slightly askew */}
      <div className="relative z-10 flex w-full max-w-107.5 rotate-[-0.6deg] flex-col items-center rounded-xl border border-[#E5DEC9] bg-[#FFFDF9] p-6 shadow-lg sm:p-8">
        {/* Tape */}
        <div className="absolute -top-3 left-1/2 flex h-6 w-24 -translate-x-1/2 rotate-[1.5deg] items-center justify-center border border-[#DACFBA] bg-[#EBE2CD]/80 shadow-sm backdrop-blur-sm">
          <span className="font-atelier-mono text-[8px] uppercase tracking-widest text-neutral-600">
            {t("studioNote")}
          </span>
        </div>

        <div className="mb-2 mt-1 flex w-full items-center justify-between border-b border-dashed border-neutral-300 pb-2 font-atelier-mono text-[10px] uppercase text-neutral-500">
          <span className="font-medium text-neutral-700">
            {t("ideaSpark")} • {t("brief")} <span className="latin-telemetry">#049</span>
          </span>
          <span className="font-semibold text-[#ff7b9a]">
            <span className="latin-telemetry">STAGE 01 //</span> {t("stageLabel")}
          </span>
        </div>

        <div className="my-2 w-full text-start">
          <p className="font-atelier-serif text-sm italic leading-snug text-neutral-800 sm:text-base">
            &ldquo;{t("quote")}&rdquo;
          </p>
        </div>

        <div className="flex w-full justify-center py-2">
          <svg viewBox="0 0 320 200" className="pencil-grain h-auto w-64 sm:w-72">
            {/* Construction guidelines */}
            <line
              x1="30" y1="100" x2="290" y2="100"
              stroke="#C4B7A6" strokeWidth="1" strokeDasharray="4,4"
              className="sketch-path"
            />
            <line
              x1="160" y1="30" x2="160" y2="170"
              stroke="#C4B7A6" strokeWidth="1" strokeDasharray="4,4"
              className="sketch-path"
            />
            <ellipse
              cx="160" cy="100" rx="90" ry="45"
              stroke="#D9CEBF" strokeWidth="1" fill="none" strokeDasharray="3,3"
              className="sketch-path"
            />

            {/* Left loop */}
            <path
              d="M152,98 C115,48 50,68 56,108 C62,138 122,126 150,102"
              fill="none" stroke="#2B2625" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round"
              className="sketch-path"
            />
            <path
              d="M148,101 C120,62 65,76 68,110"
              fill="none" stroke="#7A6F68" strokeWidth="1.2" strokeLinecap="round"
              className="sketch-path"
            />
            <path
              d="M85,88 L95,115 M100,82 L112,118 M118,85 L128,115"
              stroke="#B0A396" strokeWidth="1.2" strokeLinecap="round"
              className="sketch-path"
            />

            {/* Right loop */}
            <path
              d="M168,98 C205,48 270,68 264,108 C258,138 198,126 170,102"
              fill="none" stroke="#2B2625" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round"
              className="sketch-path"
            />
            <path
              d="M172,101 C200,62 255,76 252,110"
              fill="none" stroke="#7A6F68" strokeWidth="1.2" strokeLinecap="round"
              className="sketch-path"
            />
            <path
              d="M235,88 L225,115 M220,82 L208,118 M202,85 L192,115"
              stroke="#B0A396" strokeWidth="1.2" strokeLinecap="round"
              className="sketch-path"
            />

            {/* Knot */}
            <ellipse
              cx="160" cy="100" rx="14" ry="17"
              fill="none" stroke="#1F1B1A" strokeWidth="2.8"
              className="sketch-path"
            />
            <path
              d="M155,92 C157,98 156,106 158,112"
              stroke="#5E544F" strokeWidth="1.5" strokeLinecap="round"
              className="sketch-path"
            />
            <path
              d="M164,90 C163,98 165,105 163,110"
              stroke="#5E544F" strokeWidth="1.5" strokeLinecap="round"
              className="sketch-path"
            />

            {/* Ribbon tails */}
            <path
              d="M152,108 C135,138 108,168 88,182 C108,172 125,188 128,188 C138,165 150,132 158,112"
              fill="none" stroke="#2B2625" strokeWidth="2.4" strokeLinecap="round"
              className="sketch-path"
            />
            <path
              d="M168,108 C185,138 212,168 232,182 C212,172 195,188 192,188 C182,165 170,132 162,112"
              fill="none" stroke="#2B2625" strokeWidth="2.4" strokeLinecap="round"
              className="sketch-path"
            />

            {/* Red-ink correction note */}
            <path
              d="M245,60 C265,45 285,48 290,62"
              fill="none" stroke="#E65478" strokeWidth="1.8" strokeLinecap="round"
              className="sketch-path"
            />
            <polygon points="292,58 290,67 284,62" fill="#E65478" className="sketch-path" />
            <text
              x="235" y="38"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontSize="9" fill="#E65478" fontWeight="600"
            >
              curve +12°
            </text>
          </svg>
        </div>

        <div className="mt-1 flex w-full items-center justify-between border-t border-neutral-200/80 pt-2 text-center">
          <span className="font-atelier-mono text-[11px] text-neutral-500">
            {t("annotationLabel")} {t("annotation")}
          </span>
          <span className="rounded bg-neutral-100 px-2 py-0.5 font-atelier-mono text-[9px] uppercase text-neutral-600">
            {t("pencil")}
          </span>
        </div>
      </div>
    </div>
  );
}
