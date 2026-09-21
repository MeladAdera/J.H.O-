import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  EB_Garamond,
  Inter,
  Italiana,
  JetBrains_Mono,
  Playfair_Display,
  Space_Grotesk,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

/* The three designs use nine typefaces between them. Loading each here as a
   CSS variable replaces the render-blocking <link> tags in the original HTML
   and lets globals.css map them onto per-page font tokens. */

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
const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

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
].join(" ");

export const metadata: Metadata = {
  title: "J.H.O Atelier & Lab",
  description: "Your idea → design → real. Bespoke garments from sketch to shirt.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
