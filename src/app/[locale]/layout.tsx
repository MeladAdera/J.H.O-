import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Amiri,
  Bodoni_Moda,
  Cormorant_Garamond,
  EB_Garamond,
  IBM_Plex_Sans_Arabic,
  Inter,
  Italiana,
  JetBrains_Mono,
  Playfair_Display,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import { routing, directionOf } from "@/i18n/routing";
import { ThemeScript } from "@/components/shared/ThemeScript";
import "../globals.css";

/* The three designs use nine Latin typefaces between them, none of which has
   Arabic glyphs. Rather than swapping families per locale, the Arabic faces
   are appended to every font token in globals.css, so the browser falls back
   per character: Latin words keep their Latin face even inside an Arabic
   sentence, and each subset only downloads when its glyphs actually appear. */

// Page 1 — hero
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600", "700"],
});
const italiana = Italiana({ variable: "--font-italiana", subsets: ["latin"], weight: "400" });

// Page 2 — collection
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

// Page 3 — my little world
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

// Shared by pages 1 and 3
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

/* Arabic. Amiri is a classical Naskh whose high stroke contrast answers the
   Bodoni/Playfair/Cormorant headlines; IBM Plex Sans Arabic carries UI and
   body text. Not preloaded — they download only when Arabic text appears. */
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  preload: false,
});
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600"],
  preload: false,
});

const fontVariables = [
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* Tints the browser chrome to match the page. Static rather than
   generateViewport: it does not depend on the request, and the media-keyed
   form lets the UA pick without us reading anything request-scoped. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#141316" },
  ],
};

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "brand" });
  return { title: t("name"), description: t("tagline") };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  /* data-theme is the server's guess; the script in <head> corrects it during
     parsing. suppressHydrationWarning is required because of that: without it
     React treats the corrected attribute as a mismatch and re-renders from the
     nearest boundary, which reintroduces the flash it exists to prevent. */
  return (
    <html
      lang={locale}
      dir={directionOf(locale)}
      data-theme="light"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-ground text-ink">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
