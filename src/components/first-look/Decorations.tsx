import type { CSSProperties } from "react";

/* The scrapbook's paper goods, drawn as inline SVG. All of it is decoration:
   every piece is aria-hidden and none of it carries meaning.

   The pinks are literals: ribbon and satin read the same on light paper and
   on the dark sheet. What does change with the mode, the gingham's cloth
   and the pencil's lead, comes from the sheet's tokens (.scrap-sheet in
   globals.css): the pattern's base through a CSS fill, the sketches through
   currentColor.

   The satin bow and the watercolor swatches are honest stand-ins: gloss and
   wet paint read as digital when faked with gradients and turbulence. Swap
   them for transparent WebP cut-outs when real artwork exists. */

interface Props {
  className?: string;
  style?: CSSProperties;
}

const hidden = { "aria-hidden": true, focusable: false } as const;

/** Shared gradient, pattern and filter definitions. Mount once per page.
    Zero-sized rather than display:none, because some browsers drop
    gradients and patterns defined inside an undisplayed <svg>. */
export function ScrapDefs() {
  return (
    <svg width="0" height="0" className="absolute" {...hidden}>
      <defs>
        <filter id="fl-watercolor" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} seed={7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale={12} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id="fl-gingham" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" style={{ fill: "var(--gingham-base)" }} />
          <rect width="4" height="8" fill="#ee7f9e" opacity="0.55" />
          <rect width="8" height="4" fill="#ee7f9e" opacity="0.55" />
        </pattern>
        <linearGradient id="fl-satin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7a6bd" />
          <stop offset="0.5" stopColor="#e2668b" />
          <stop offset="1" stopColor="#c94a72" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** A loose curl of thin ribbon for a sheet corner. */
export function RibbonCorner({ className, style }: Props) {
  return (
    <svg viewBox="0 0 160 180" className={className} style={style} {...hidden}>
      <g fill="none" stroke="#e8799a" strokeWidth="2.2" strokeLinecap="round">
        <path d="M70 40 C 52 18, 22 22, 30 42 C 36 58, 58 50, 70 40 C 84 22, 118 20, 112 44 C 108 60, 84 52, 70 40" />
        <path d="M70 40 C 60 60, 38 64, 44 84 C 50 104, 84 92, 72 76 C 62 64, 40 92, 58 118 C 72 138, 64 158, 50 172" />
        <path d="M70 40 C 88 62, 120 60, 116 86 C 112 108, 92 100, 100 88 C 110 72, 140 100, 128 130 C 120 150, 134 164, 150 170" />
      </g>
    </svg>
  );
}

/** Stand-in for a satin ribbon bow. */
export function SatinBow({ className, style }: Props) {
  return (
    <svg viewBox="0 0 160 200" className={className} style={style} {...hidden}>
      <g fill="url(#fl-satin)">
        <path d="M80 40 C 50 5, 5 15, 12 38 C 18 58, 60 52, 80 40 Z" />
        <path d="M80 40 C 110 5, 155 15, 148 38 C 142 58, 100 52, 80 40 Z" />
        <path d="M76 44 C 60 90, 70 140, 50 195 L 62 190 C 82 140, 74 92, 84 46 Z" />
        <path d="M84 44 C 100 90, 120 120, 118 180 L 128 172 C 128 122, 104 88, 88 44 Z" />
      </g>
      <ellipse cx="80" cy="41" rx="9" ry="8" fill="#d2557c" />
    </svg>
  );
}

/** A small flat bow cut from gingham ribbon. */
export function GinghamBow({ className, style }: Props) {
  return (
    <svg viewBox="0 0 150 64" className={className} style={style} {...hidden}>
      <g fill="url(#fl-gingham)" stroke="#d9587d" strokeWidth="1">
        <path d="M75 28 C 56 6, 14 4, 6 20 C 0 34, 38 42, 75 32 Z" />
        <path d="M75 28 C 94 6, 136 4, 144 20 C 150 34, 112 42, 75 32 Z" />
        <path d="M70 32 L 44 60 L 58 58 L 74 34 Z" />
        <path d="M80 32 L 106 60 L 92 58 L 76 34 Z" />
        <rect x="68" y="22" width="14" height="14" rx="4" />
      </g>
    </svg>
  );
}

const SWATCH_STACK = [
  { x: 18, y: 8, w: 150, fill: "#f7b8c8", o: 1 },
  { x: 4, y: 40, w: 170, fill: "#f4a093", o: 0.85 },
  { x: 12, y: 72, w: 150, fill: "#f9c6bf", o: 1 },
  { x: 0, y: 104, w: 176, fill: "#f19b86", o: 0.8 },
  { x: 14, y: 136, w: 156, fill: "#f5aabd", o: 1 },
  { x: 6, y: 168, w: 164, fill: "#f8cdbf", o: 1 },
  { x: 20, y: 198, w: 140, fill: "#f3b2c2", o: 0.9 },
];

/** Stand-in for scanned watercolor strokes: a stack on desktop, a single
    band of three on a phone. */
export function Watercolor({ className, style, band = false }: Props & { band?: boolean }) {
  if (band) {
    return (
      <svg viewBox="0 0 343 44" preserveAspectRatio="none" className={className} style={style} {...hidden}>
        <g filter="url(#fl-watercolor)">
          <rect x="6" y="6" width="130" height="20" rx="10" fill="#f7b8c8" />
          <rect x="110" y="16" width="140" height="20" rx="10" fill="#f4a093" opacity="0.8" />
          <rect x="220" y="6" width="116" height="20" rx="10" fill="#f9c6bf" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 240" className={className} style={style} {...hidden}>
      <g filter="url(#fl-watercolor)">
        {SWATCH_STACK.map((s) => (
          <rect key={s.y} x={s.x} y={s.y} width={s.w} height="30" rx="14" fill={s.fill} opacity={s.o} />
        ))}
      </g>
    </svg>
  );
}

/** A pencil drawing of an oversize tee, in the hero's sketch hand. Uses the
    hero's #pencil-filter (PencilFilterDefs) through .pencil-grain, so it
    wobbles like the rough sketch on stage 1. The lead is currentColor, so
    the sketch takes the sheet's --paper-sketch and stays visible at night;
    folds and seams are the same lead, lighter. */
export function TeeSketch({ className, style, sleeve = "short" }: Props & { sleeve?: "short" | "long" }) {
  const body =
    sleeve === "short"
      ? "M56 16 C 66 26, 94 26, 104 16 L 138 28 L 156 74 L 128 84 L 122 66 L 124 162 L 36 162 L 38 66 L 32 84 L 4 74 L 22 28 Z"
      : "M56 16 C 66 26, 94 26, 104 16 L 138 28 L 152 106 L 126 110 L 122 66 L 124 162 L 36 162 L 38 66 L 34 110 L 8 106 L 22 28 Z";

  return (
    <svg viewBox="0 0 160 170" className={`pencil-grain ${className ?? ""}`} style={style} {...hidden}>
      <path d={body} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M56 16 C 64 34, 96 34, 104 16" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {sleeve === "short" ? (
        <>
          <path d="M40 70 C 46 100, 42 130, 46 156 M120 70 C 114 100, 118 130, 114 156" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" fill="none" />
          <path d="M22 28 L 38 66 M138 28 L 122 66" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1.1" strokeDasharray="3 3" fill="none" />
          <path d="M128 18 C 140 6, 152 8, 156 18" stroke="#E65478" strokeWidth="1.6" fill="none" />
        </>
      ) : (
        <>
          <path d="M2 74 L 44 74 M116 74 L 158 74" stroke="#E65478" strokeWidth="1.4" strokeDasharray="4 3" fill="none" />
          <path d="M40 120 C 46 136, 42 146, 46 156 M120 120 C 114 136, 118 146, 114 156" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.1" fill="none" />
        </>
      )}
    </svg>
  );
}
