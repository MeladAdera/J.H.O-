"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/* The one way between the three pages, in two shapes.

   PageNav is the header row, shown from md up. PageNavBar is the mobile
   bottom bar — on a phone the headers are already full of the brand and the
   two controls, and a row of links there would either wrap or be cut.

   `usePathname` here is the next-intl wrapper, which strips the locale, so
   "/collection" matches under both /en and /ar.

   Like LocaleSwitcher and ThemeToggle these use one typeface across all three
   pages rather than each page's own mono. This is site chrome, not page
   content: it should read as the same object wherever you meet it. */

const PAGES = [
  { href: "/", key: "hero" },
  { href: "/collection", key: "collection" },
  { href: "/my-little-world", key: "myLittleWorld" },
] as const;

/** Height of the bottom bar. Pages reserve this much room on mobile. */
export const NAV_BAR_HEIGHT = "3.5rem";

function useNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  return { t, pathname };
}

/** Header row. Hidden on phones — PageNavBar covers those. */
export function PageNav({ className = "" }: { className?: string }) {
  const { t, pathname } = useNav();

  return (
    <nav aria-label={t("pages")} className={`items-center gap-x-5 gap-y-1 ${className}`}>
      {PAGES.map(({ href, key }) => {
        const isCurrent = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={`inline-flex items-baseline border-b py-0.5 font-atelier-mono text-[10px] uppercase tracking-[0.15em] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink ${
              isCurrent
                ? "border-accent-ink text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}

/* Mobile bottom bar. Fixed rather than sticky so it survives the collection's
   full-height panels and the diorama's tall canvas, both of which would carry
   a sticky bar off-screen.

   Sits above the page's own chrome (the collection header is z-50) and pads
   itself by the phone's home-indicator inset rather than assuming a flat
   edge — on an iPhone a bar at `bottom: 0` puts its labels under the bar. */
export function PageNavBar() {
  const { t, pathname } = useNav();

  return (
    <nav
      aria-label={t("pages")}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      className="fixed inset-x-0 bottom-0 z-60 flex border-t border-line bg-overlay backdrop-blur-md md:hidden"
    >
      {PAGES.map(({ href, key }) => {
        const isCurrent = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            style={{ height: NAV_BAR_HEIGHT }}
            className={`flex flex-1 items-center justify-center border-t-2 px-2 text-center font-atelier-mono text-[10px] uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ink ${
              isCurrent ? "border-accent-ink text-ink" : "border-transparent text-ink-muted"
            }`}
          >
            {/* Wraps to two lines rather than truncating: without the index
                there is room, and "My Little World" reading as "My Little…"
                would be worse than a second line. */}
            <span className="leading-tight text-balance">{t(key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
