"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { HEADER_CONTROL } from "./ThemeToggle";

/* Swaps between English and Arabic while staying on the same page.
   usePathname from @/i18n/navigation returns the path without the locale
   prefix, so /ar/collection round-trips to /en/collection. */

interface Props {
  className?: string;
}

/* There used to be a `theme` prop here carrying a hardcoded palette per call
   site. HEADER_CONTROL is correct on every page in both modes, so the prop is
   gone — and with it the chance of confusing a per-page palette with the
   actual theme.

   The button shows the language it switches TO, as a two-character mark
   rather than the full endonym: "العربية" and "English" are wide enough to
   unbalance the header, and the full name still carries the accessible name
   and the tooltip. */

const MARK: Record<Locale, string> = { en: "EN", ar: "ع" };

export function LocaleSwitcher({ className = "" }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const next: Locale = locale === "en" ? "ar" : "en";
  const label = `${t("switchLanguage")} — ${next === "ar" ? "Switch to Arabic" : "Switch to English"}`;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      lang={next}
      aria-label={label}
      title={label}
      className={`${HEADER_CONTROL} font-atelier-mono text-[11px] font-medium tracking-wider ${className}`}
    >
      {/* The Arabic mark sits low in the em box next to Latin digits, so it
          gets a hair of optical lift rather than a shared baseline. */}
      <span className={next === "ar" ? "-translate-y-px text-[15px] leading-none" : "leading-none"}>
        {MARK[next]}
      </span>
    </button>
  );
}
