import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, directionOf } from "@/i18n/routing";
import { ThemeScript } from "@/components/shared/ThemeScript";
import { fontVariables } from "../fonts";
import "../globals.css";

/* The three designs use nine Latin typefaces between them, none of which has
   Arabic glyphs. Rather than swapping families per locale, the Arabic faces
   are appended to every font token in globals.css, so the browser falls back
   per character: Latin words keep their Latin face even inside an Arabic
   sentence, and each subset only downloads when its glyphs actually appear.

   The faces themselves are defined in app/fonts.ts, served from the
   repository rather than fetched from Google — see the note there. */

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
