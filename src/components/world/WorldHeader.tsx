import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Page 3's own header, after design-reference/my little world.html:124-154:
   the brand, a telemetry pill naming the room, and one link — the pill out
   to the collection. The reference also had two links that jumped to
   sections of this page; they came out because they scrolled within a page
   that is one scroll long, and read as a menu. The three pages deliberately
   do not share a header (see README.md), but they do share the control
   cluster on the right.

   Width is the constraint, and nothing here may wrap or overflow. The
   reference rendered at 1920px with the pill broken onto two lines, and the
   first cut of this header pushed the language button off a phone's screen
   in English — the brand's second line is longer in English than in Arabic
   — and off a 1280px screen while the monospace face was still loading.

   So the two flexible things truncate rather than push: the brand column
   (min-w-0, so it can shrink; the controls cluster cannot) and the
   telemetry pill, which appears from xl and ellipsises if the row is
   tight. Below sm the brand's second line drops its second half. */

export function WorldHeader() {
  const t = useTranslations("world.header");
  const tBrand = useTranslations("brand");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-overlay backdrop-blur-atelier">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Shrinkable only on a phone, where the second line is already
            short; from sm up the pill is the one thing that gives way. */}
        <Link href="/" className="group flex min-w-0 items-center gap-3.5 sm:shrink-0">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-surface p-0.5">
            <Image
              src="/images/logo.png"
              alt={tBrand("name")}
              width={36}
              height={36}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-editorial-heading truncate text-sm tracking-[0.2em] text-ink transition-colors group-hover:text-accent-ink sm:text-base">
              {tBrand("name")}
            </span>
            <span className="text-mono-telemetry truncate text-[9px] uppercase text-ink-muted">
              {t("eyebrow")}
              <span className="hidden sm:inline"> • {t("eyebrowDetail")}</span>
            </span>
          </div>
        </Link>

        {/* The telemetry pill. Decoration in the reference and decoration
            here; hidden from assistive tech so the room is not announced
            twice. */}
        <div
          aria-hidden="true"
          className="text-mono-telemetry hidden min-w-0 items-center gap-2.5 rounded-full border border-line bg-sunken/80 px-4 py-1.5 text-[11px] text-ink-muted uppercase xl:flex"
        >
          <span className="pulse-glow inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="truncate">{t("telemetry")}</span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* The one link that leaves the page, so the one that is a pill:
              a wash of the accent that fills solid on hover. */}
          <nav aria-label={t("navLabel")} className="hidden md:block">
            <Link
              href="/collection"
              className="text-mono-telemetry inline-flex items-center rounded-full border border-accent-ink/30 bg-accent-ink/10 px-4 py-1.5 text-xs whitespace-nowrap text-accent-ink uppercase transition-all duration-300 hover:border-accent hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              {t("collection")}
            </Link>
          </nav>
          <span className="hidden h-5 w-px bg-line-strong md:block" aria-hidden="true" />
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
