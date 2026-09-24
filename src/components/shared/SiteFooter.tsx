"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { PAGES } from "@/data/pages";

/* The colophon: one line at the foot of every page, like the last page of a
   book. Brand on one side, the page that follows on the other, the small print
   between. On a phone it becomes three clean rows, the next page taking a
   full-width row of its own so it is the one thing the thumb lands on.

   This is also the site's only navigation forward. There is no menu: the
   pages are meant to be read in order, and the link at the foot of each is
   how you turn the page. It carries no "next" label — the serif and the
   accent do that work, and the arrow says which way.

   Mounted inside each page's own column rather than once in the layout, on
   purpose. The hero is composed as a single screen — a flex column that fills
   the viewport — and a footer placed after that column would land below the
   fold. Inside it, the main area gives up the ~50px and the screen holds.

   From the last page the link wraps to the first and says so, because "My
   Little World → Hero" reads like a menu item where "Back to the start" reads
   like the end of a sequence.

   When the footer is reached — 60% of it in the viewport — the arrow beckons:
   two nudges forward, then still. Once per page, never looping; a looping
   attention-grab at the foot of a gallery reads as a notification. The
   observer unobserves after the first hit, and reduced motion turns the
   keyframes off in globals.css. On the hero the footer is in view from the
   start, so there it plays on load. */

export function SiteFooter() {
  const t = useTranslations("footer");
  const tBrand = useTranslations("brand");
  const tNav = useTranslations("nav");
  const pathname = usePathname();

  const ref = useRef<HTMLElement | null>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArrived(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const index = Math.max(0, PAGES.findIndex((p) => p.href === pathname));
  const wraps = index === PAGES.length - 1;
  const next = PAGES[(index + 1) % PAGES.length];

  return (
    <footer
      ref={ref}
      className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line px-6 py-4 lg:px-14">
      <div className="min-w-0">
        <div className="font-editorial text-[15px] tracking-[0.16em] text-ink">
          {tBrand("name")}
        </div>
        <div className="font-atelier-mono text-[9px] uppercase tracking-[0.22em] text-accent-ink">
          {tBrand("tagline")}
        </div>
      </div>

      {/* The archive version is telemetry, so it stays Latin and left-to-right
          inside an Arabic sentence. The copyright is just the year — the brand
          it belongs to is the line above it. */}
      <div className="order-last flex w-full flex-wrap items-center gap-x-3 font-atelier-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint md:order-none md:w-auto">
        <span>{t("copyright")}</span>
        <span aria-hidden="true">·</span>
        <span>{t("location")}</span>
        <span aria-hidden="true">·</span>
        <span className="latin-telemetry">{t("archive")}</span>
      </div>

      <Link
        href={next.href}
        aria-label={t("nextAria", { page: wraps ? t("backToStart") : tNav(next.key) })}
        className="group flex w-full items-center justify-between gap-4 border-t border-line pt-3 text-accent-ink transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ink md:w-auto md:border-0 md:pt-0"
      >
        <span className="font-editorial text-xl leading-tight">
          {wraps ? t("backToStart") : tNav(next.key)}
        </span>
        {/* flip-arrow mirrors it in RTL; the hover nudge follows the reading
            direction too, so it always moves the way the page turns. */}
        <span
          aria-hidden="true"
          className={`flip-arrow font-atelier-mono text-xl transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 ${
            arrived ? "beckon" : ""
          }`}
        >
          ⟶
        </span>
      </Link>
    </footer>
  );
}
