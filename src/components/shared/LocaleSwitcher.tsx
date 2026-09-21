"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/* Swaps between English and Arabic while staying on the same page.
   usePathname from @/i18n/navigation returns the path without the locale
   prefix, so /ar/collection round-trips to /en/collection. */

interface Props {
  /** Matches the palette of whichever page it sits on. */
  theme?: "light" | "dark";
  className?: string;
}

export function LocaleSwitcher({ theme = "light", className = "" }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const next: Locale = locale === "en" ? "ar" : "en";

  const palette =
    theme === "light"
      ? "border-black/[0.08] bg-white text-atelier-dark hover:bg-black/[0.04]"
      : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      lang={next}
      aria-label={`Switch to ${next === "ar" ? "Arabic" : "English"}`}
      className={`rounded-lg border px-3 py-1.5 font-atelier-mono text-xs tracking-wider transition-colors ${palette} ${className}`}
    >
      {t("switchLanguage")}
    </button>
  );
}
