import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { CATALOG } from "@/data/catalog";
import type { Fit, Gender, Season, Specimen } from "@/lib/types";
import { SpecimenCard } from "./SpecimenCard";

/* Stage 3 — the filtered lookbook.
   Ported from design-reference/our collection.html (:369-561, renderCatalog).

   Behaviour change worth knowing: the original's fallback (:999-1004) threw
   away the gender and season filters whenever a combination matched fewer
   than two items, so choosing WOMEN + SUMMER + REGULAR — one true match —
   silently displayed men's garments as if they belonged to that selection.
   Here the true matches are shown as matches, and anything else of the same
   fit appears below an explicit divider instead of being passed off. */

interface Props {
  gender: Gender;
  season: Season;
  fit: Fit;
  onSetFit: (fit: Fit) => void;
  onSelect: (specimen: Specimen) => void;
}

export function LookbookGrid({ gender, season, fit, onSetFit, onSelect }: Props) {
  const t = useTranslations("collection.lookbook");
  const tPanels = useTranslations("collection.panels");

  const genderLabel = tPanels(`${gender.toLowerCase()}.title`);
  const seasonLabel = tPanels(`${season.toLowerCase()}.title`);

  const { matches, alsoInArchive } = useMemo(() => {
    const matches = CATALOG.filter(
      (item) => item.gender === gender && item.season === season && item.fit === fit,
    );
    const matchIds = new Set(matches.map((item) => item.id));
    const alsoInArchive =
      matches.length >= 2
        ? []
        : CATALOG.filter((item) => item.fit === fit && !matchIds.has(item.id));
    return { matches, alsoInArchive };
  }, [gender, season, fit]);

  const fitButton = (value: Fit) =>
    value === fit
      ? "rounded-full bg-archive-pink px-5 py-1.5 font-archive-mono text-xs font-semibold uppercase tracking-wider text-archive-black shadow-[0_0_12px_rgba(255,117,151,0.3)] transition duration-300 focus:outline-none"
      : "rounded-full px-5 py-1.5 font-archive-mono text-xs uppercase tracking-wider text-archive-muted transition duration-300 hover:text-archive-chalk focus:outline-none";

  return (
    <section className="mx-auto flex w-full max-w-[1840px] flex-col px-4 py-10 md:px-12">
      {/* Banner */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 pt-4 lg:flex-row lg:items-end">
        <div>
          <div className="mb-2.5 flex items-center gap-3 font-archive-mono text-xs uppercase tracking-widest text-archive-pink">
            <span className="rounded-full border border-archive-pink/30 bg-archive-pink/10 px-3 py-0.5">
              {seasonLabel} <span className="latin-telemetry">2026</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-archive-chalk">{t("archiveLabel", { gender: genderLabel })}</span>
          </div>
          <h1 className="font-archive-serif text-4xl font-light tracking-tight text-archive-chalk md:text-5xl lg:text-6xl">
            {t("title", { season: seasonLabel, gender: genderLabel })}
          </h1>
          <p className="mt-2 max-w-xl font-archive-sans text-xs font-light leading-relaxed tracking-wide text-archive-muted md:text-sm">
            {t("intro")}
          </p>
        </div>

        {/* Fit switcher */}
        <div className="flex flex-col gap-2.5 sm:items-end">
          <div className="flex items-center gap-3">
            <span className="font-archive-mono text-[10px] uppercase tracking-[0.2em] text-archive-muted">
              {t("fitLabel")}
            </span>
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 p-1 shadow-inner backdrop-blur-md">
              <button type="button" onClick={() => onSetFit("REGULAR")} className={fitButton("REGULAR")}>
                {t("regular")}
              </button>
              <button type="button" onClick={() => onSetFit("OVERSIZED")} className={fitButton("OVERSIZED")}>
                {t("oversized")}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 font-archive-mono text-[10px] tracking-wide text-archive-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-archive-pink" />
            <span className="latin-telemetry">
              {fit === "REGULAR" ? t("specRegular") : t("specOversized")}
            </span>
          </div>
        </div>
      </div>

      {matches.length === 0 && alsoInArchive.length === 0 ? (
        <p className="py-20 text-center font-archive-mono text-xs uppercase tracking-[0.3em] text-archive-muted">
          {t("empty")}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {matches.map((specimen, index) => (
          <SpecimenCard key={specimen.id} specimen={specimen} index={index} onSelect={onSelect} />
        ))}
      </div>

      {alsoInArchive.length > 0 && (
        <>
          <div className="my-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-archive-mono text-[10px] uppercase tracking-[0.3em] text-archive-muted">
              {t("alsoInArchive")}
            </span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {alsoInArchive.map((specimen, index) => (
              <SpecimenCard
                key={specimen.id}
                specimen={specimen}
                index={matches.length + index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
