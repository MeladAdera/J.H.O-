"use client";

import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  THEME_PREFERENCES,
  applyTheme,
  readPreference,
  resolveTheme,
  serverPreference,
  subscribeToPreference,
  writePreference,
  type ThemePreference,
} from "@/lib/theme";

/* Cycles Auto → Light → Dark. "Auto" follows the OS and is the default, so
   the site matches whatever the visitor already asked their machine for.

   Icon-only: the label lives in the tooltip and the accessible name instead
   of on the button, so the control stays the same square as the locale
   switcher and the header keeps its quiet. */

const ICON: Record<ThemePreference, React.ReactNode> = {
  // Half-filled disc — the standard "decided elsewhere" glyph.
  system: (
    <>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 2.25a5.75 5.75 0 0 1 0 11.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  light: (
    <>
      <circle cx="8" cy="8" r="3.1" />
      <path
        strokeLinecap="round"
        d="M8 1.2v1.6M8 13.2v1.6M14.8 8h-1.6M2.8 8H1.2M12.81 3.19l-1.13 1.13M4.32 11.68l-1.13 1.13M12.81 12.81l-1.13-1.13M4.32 4.32L3.19 3.19"
      />
    </>
  ),
  dark: <path strokeLinejoin="round" d="M13.4 9.6A5.8 5.8 0 1 1 6.4 2.6a4.6 4.6 0 0 0 7 7Z" />,
};

/* Shared by both header controls so they cannot drift apart. No border: the
   shape is carried by a faint wash of the text colour, which inverts with the
   theme on its own and reads lighter than a hairline box. */
export const HEADER_CONTROL =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-muted transition-[background-color,color,transform] duration-200 hover:bg-ink/10 hover:text-ink active:scale-92 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("nav.theme");

  /* The preference lives in localStorage and the OS, so it is read as an
     external store rather than mirrored into state. The server snapshot is
     "system", which is what the layout renders, so hydration matches; React
     then swaps in the real value. Mirroring this into useState instead would
     mean a setState in an effect, i.e. a cascading render. */
  const preference = useSyncExternalStore(
    subscribeToPreference,
    readPreference,
    serverPreference,
  );

  /* Re-apply the attribute the inline script set. React's dev-only Strict
     Mode remount resets <html> to just the attributes it manages from JSX,
     wiping it — without this the theme looks broken in `next dev` only.
     A no-op in production. */
  useLayoutEffect(() => {
    applyTheme(resolveTheme(readPreference()));
  }, []);

  const cycle = useCallback(() => {
    const index = THEME_PREFERENCES.indexOf(preference);
    writePreference(THEME_PREFERENCES[(index + 1) % THEME_PREFERENCES.length]);
  }, [preference]);

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={t("switchTo", { mode: t(preference) })}
      title={t("switchTo", { mode: t(preference) })}
      className={`${HEADER_CONTROL} ${className}`}
    >
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        aria-hidden="true"
      >
        {ICON[preference]}
      </svg>
    </button>
  );
}
