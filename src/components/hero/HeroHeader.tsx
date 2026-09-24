import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { PageNav } from "@/components/shared/PageNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Ported from design-reference/code.html (header).

   The original carried a live stage stepper here. It is gone: HeroCopy has
   the same three stage controls beside the headline, plus a replay, so the
   stepper was a second copy of an existing control occupying the one place on
   this page where site-wide navigation could go. */

export function HeroHeader() {
  const t = useTranslations("hero");
  const tBrand = useTranslations("brand");

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b border-line bg-overlay px-6 py-4 backdrop-blur-md lg:px-14">
      <div className="flex items-center gap-4">
        {/* The mark is a self-contained opaque disc, so it reads on any
            ground. Only its ring follows the theme — plus the archive's pink
            halo, which needs a dark room to be visible at all. */}
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-surface p-0.5 shadow-sm dark:shadow-[0_0_12px_var(--accent-glow)]">
          <Image
            src="/images/logo.png"
            alt={tBrand("name")}
            width={36}
            height={36}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <span className="font-atelier-mono text-xs font-semibold uppercase tracking-wider text-ink">
            {tBrand("name")}
          </span>
          {/* Coordinates are telemetry: they stay Latin and left-to-right. */}
          <p className="latin-telemetry font-atelier-mono text-[11px] text-ink-muted">
            Latakia / SYRIA  •
          </p>
        </div>
      </div>

      <PageNav className="hidden md:flex" />

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 font-atelier-mono text-xs uppercase text-ink-muted sm:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal-ok" />
          <span>{t("commissionsOpen")}</span>
        </div>
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
