import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import type { Gender, JourneyStage, Season } from "@/lib/types";

/* Ported from design-reference/our collection.html (header). The breadcrumbs
   are live: each one becomes clickable only once the choice before it has
   been made, and they read back the current selection. */

interface Props {
  stage: JourneyStage;
  gender: Gender | null;
  season: Season | null;
  onGoToStage: (stage: JourneyStage) => void;
}

export function ArchiveHeader({ stage, gender, season, onGoToStage }: Props) {
  const t = useTranslations("collection");
  const tBrand = useTranslations("brand");
  const tPanels = useTranslations("collection.panels");

  const unselected = t("breadcrumbs.unselected");
  const genderLabel = gender ? tPanels(`${gender.toLowerCase()}.title`) : unselected;
  const seasonLabel = season ? tPanels(`${season.toLowerCase()}.title`) : unselected;

  /** Reachable crumbs are clickable; the one for the current stage is lit. */
  const crumb = (reachable: boolean, isCurrent: boolean) =>
    [
      "transition focus:outline-none",
      reachable ? "hover:text-accent-ink" : "cursor-default opacity-40",
      isCurrent ? "text-accent-ink" : "",
    ].join(" ");

  return (
    <header className="atelier-glass fixed inset-x-0 top-0 z-50 px-4 py-3.5 md:px-8">
      <div className="mx-auto flex max-w-[1840px] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
          <Image
            src="/images/logo.png"
            alt={tBrand("name")}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border border-accent-ink object-cover shadow-[0_0_12px_var(--accent-glow)] transition duration-300 group-hover:border-accent-ink"
          />
          <div className="flex flex-col">
            <span className="font-archive-serif text-sm font-medium uppercase tracking-[0.24em] text-ink transition group-hover:text-accent-ink md:text-base">
              {tBrand("name")}
            </span>
            <span className="font-archive-mono text-[9px] uppercase tracking-widest text-ink-muted">
              {t("subtitle")}
            </span>
          </div>
        </Link>

        {/* Live journey breadcrumbs */}
        <nav
          aria-label={t("breadcrumbs.archive")}
          className="hidden items-center gap-2 rounded-full border border-line bg-sunken px-4 py-1.5 font-archive-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted backdrop-blur-md md:flex"
        >
          <button
            type="button"
            onClick={() => onGoToStage(1)}
            aria-current={stage === 1 ? "step" : undefined}
            className={crumb(true, stage === 1)}
          >
            <span className="latin-telemetry">01</span> {t("breadcrumbs.archive")}
          </button>
          <span className="text-ink-faint">{"//"}</span>
          <button
            type="button"
            onClick={() => gender && onGoToStage(2)}
            disabled={!gender}
            aria-current={stage === 2 ? "step" : undefined}
            className={crumb(Boolean(gender), stage === 2)}
          >
            <span className="latin-telemetry">02</span> {t("breadcrumbs.gender")}:{" "}
            <span className="font-semibold text-ink">{genderLabel}</span>
          </button>
          <span className="text-ink-faint">{"//"}</span>
          <button
            type="button"
            onClick={() => gender && season && onGoToStage(3)}
            disabled={!gender || !season}
            aria-current={stage === 3 ? "step" : undefined}
            className={crumb(Boolean(gender && season), stage === 3)}
          >
            <span className="latin-telemetry">03</span> {t("breadcrumbs.season")}:{" "}
            <span className="font-semibold text-ink">{seasonLabel}</span>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <span className="latin-telemetry hidden rounded-full border border-accent-ink bg-accent-soft px-3 py-1 font-archive-mono text-[9px] tracking-[0.2em] text-accent-ink lg:inline-block">
            ARCHIVE 2026 // BESPOKE
          </span>
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
