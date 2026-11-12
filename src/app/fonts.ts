import localFont from "next/font/local";

/* Every typeface the site uses, served from the repository itself.

   These were next/font/google. That downloads each family from Google at
   build time — and at dev-server start — and when the download fails it
   does not fail the build: it quietly swaps in a metric-adjusted Arial or
   Times and carries on. Google's font host is unreachable from some
   networks (it timed out from the machine this site is built on), so six
   of the eleven families were rendering as Arial and Times in development
   without anyone being told. The design was being judged in the wrong
   typefaces.

   The files now come from the @fontsource packages pinned in package.json,
   installed from npm like everything else, so dev and production render the
   same fonts on any network. Each family keeps the CSS variable it always
   had; globals.css and the components do not know the difference.

   The paths are written out in full: next/font reads its options at compile
   time and accepts only literals, not a shared prefix. Weight ranges are
   the variable fonts' full axes. */

// --- Page 1: hero -----------------------------------------------------------

export const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  src: "../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
});

export const playfair = localFont({
  variable: "--font-playfair",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-italic.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
});

export const italiana = localFont({
  variable: "--font-italiana",
  src: "../../node_modules/@fontsource/italiana/files/italiana-latin-400-normal.woff2",
  weight: "400",
  adjustFontFallback: "Times New Roman",
});

// --- Page 2: collection -----------------------------------------------------

export const inter = localFont({
  variable: "--font-inter",
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  weight: "100 900",
});

export const cormorant = localFont({
  variable: "--font-cormorant",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
});

export const spaceMono = localFont({
  variable: "--font-space-mono",
  src: [
    {
      path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/space-mono/files/space-mono-latin-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

// --- Page 3: my little world ------------------------------------------------

export const bodoni = localFont({
  variable: "--font-bodoni",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-italic.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
});

export const ebGaramond = localFont({
  variable: "--font-eb-garamond",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-normal.woff2",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/eb-garamond/files/eb-garamond-latin-wght-italic.woff2",
      weight: "400 800",
      style: "italic",
    },
  ],
  adjustFontFallback: "Times New Roman",
});

// --- Shared by pages 1 and 3 -------------------------------------------------

export const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  src: [
    {
      path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-italic.woff2",
      weight: "100 800",
      style: "italic",
    },
  ],
});

// --- Arabic -------------------------------------------------------------------

/* Only the Arabic subsets. Each Arabic face sits second in its stack, after
   a Latin face, so Latin letters never reach it — and a Latin subset file
   declared under the same weight would simply replace the Arabic one, since
   next/font/local writes no unicode-range. Not preloaded: they download
   only when Arabic text appears. */

export const amiri = localFont({
  variable: "--font-amiri",
  src: [
    {
      path: "../../node_modules/@fontsource/amiri/files/amiri-arabic-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/amiri/files/amiri-arabic-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource/amiri/files/amiri-arabic-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/amiri/files/amiri-arabic-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  preload: false,
  adjustFontFallback: false,
});

export const plexArabic = localFont({
  variable: "--font-plex-arabic",
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-200-normal.woff2",
      weight: "200",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-300-normal.woff2",
      weight: "300",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2",
      weight: "400",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2",
      weight: "500",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2",
      weight: "600",
    },
  ],
  preload: false,
  adjustFontFallback: false,
});

/** Every variable class, for the <html> element. */
export const fontVariables = [
  spaceGrotesk.variable,
  playfair.variable,
  italiana.variable,
  inter.variable,
  cormorant.variable,
  spaceMono.variable,
  bodoni.variable,
  ebGaramond.variable,
  jetbrainsMono.variable,
  amiri.variable,
  plexArabic.variable,
].join(" ");
