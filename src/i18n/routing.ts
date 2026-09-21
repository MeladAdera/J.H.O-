import { defineRouting } from "next-intl/routing";

/* Both locales carry a prefix (/en, /ar) so neither is an implicit default
   and every page has one canonical URL per language. */

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Arabic reads right-to-left; this drives <html dir> and the layout. */
export function directionOf(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
