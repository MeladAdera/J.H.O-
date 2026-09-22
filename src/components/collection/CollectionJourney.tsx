"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Fit, Gender, JourneyStage, Season, Specimen, SpecimenSize } from "@/lib/types";
import { GENDER_PANELS, SEASON_PANELS } from "@/data/panels";
import { ArchiveHeader } from "./ArchiveHeader";
import { ArchiveFooter } from "./ArchiveFooter";
import { SplitChoice } from "./SplitChoice";
import { LookbookGrid } from "./LookbookGrid";
import { SpecimenModal } from "./SpecimenModal";

/* The single client boundary for the archive.

   One state object drives everything: which stage is showing, what has been
   chosen, and which specimen is open. The original spread the same state
   across module-level variables and rewrote className strings by hand in a
   dozen places. */

interface JourneyState {
  stage: JourneyStage;
  gender: Gender | null;
  season: Season | null;
  fit: Fit;
  selected: Specimen | null;
  size: SpecimenSize | null;
}

const INITIAL: JourneyState = {
  stage: 1,
  gender: null,
  season: null,
  fit: "REGULAR",
  selected: null,
  size: null,
};

/** Matches the panel expand/collapse transition in globals.css. */
const PANEL_TRANSITION_MS = 850;

export function CollectionJourney() {
  const [state, setState] = useState<JourneyState>(INITIAL);
  const t = useTranslations("collection");

  /* The stage advance is delayed so the chosen panel can finish expanding.
     Held in a ref and cleared on unmount so a pending advance never fires
     into an unmounted tree. */
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const goToStage = useCallback((stage: JourneyStage) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Stepping back clears the choices that came after.
    setState((prev) => ({
      ...prev,
      stage,
      gender: stage === 1 ? null : prev.gender,
      season: stage <= 2 ? null : prev.season,
      selected: null,
    }));
  }, []);

  /** Record a choice, then advance once the panel animation has played. */
  const choose = useCallback((patch: Partial<JourneyState>, nextStage: JourneyStage) => {
    setState((prev) => ({ ...prev, ...patch }));
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setState((prev) => ({ ...prev, stage: nextStage }));
    }, PANEL_TRANSITION_MS);
  }, []);

  const chooseGender = useCallback((gender: Gender) => choose({ gender }, 2), [choose]);
  const chooseSeason = useCallback((season: Season) => choose({ season }, 3), [choose]);

  const setFit = useCallback((fit: Fit) => setState((prev) => ({ ...prev, fit })), []);

  /** Open a specimen, defaulting the size the way the original did: the
      second option — M for a tailored cut, scale 1 for an oversized one. */
  const openSpecimen = useCallback((specimen: Specimen) => {
    setState((prev) => ({
      ...prev,
      selected: specimen,
      size: specimen.fit === "REGULAR" ? "M" : "1",
    }));
  }, []);

  const closeSpecimen = useCallback(
    () => setState((prev) => ({ ...prev, selected: null })),
    [],
  );

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-between bg-archive-black text-archive-chalk">
      <div className="film-grain" aria-hidden="true" />

      <ArchiveHeader
        stage={state.stage}
        gender={state.gender}
        season={state.season}
        onGoToStage={goToStage}
      />

      <main className="relative flex w-full flex-1 flex-col justify-center pt-15">
        {state.stage === 1 && (
          <SplitChoice
            panels={GENDER_PANELS}
            phaseCode="Phase 01 //"
            phaseLabel={t("phase.gender")}
            chosen={state.gender}
            onChoose={chooseGender}
          />
        )}

        {state.stage === 2 && (
          <SplitChoice
            panels={SEASON_PANELS}
            phaseCode="Phase 02 //"
            phaseLabel={t("phase.season")}
            chosen={state.season}
            onChoose={chooseSeason}
          />
        )}

        {state.stage === 3 && state.gender && state.season && (
          <LookbookGrid
            gender={state.gender}
            season={state.season}
            fit={state.fit}
            onSetFit={setFit}
            onSelect={openSpecimen}
          />
        )}
      </main>

      {state.selected && (
        <SpecimenModal
          specimen={state.selected}
          size={state.size}
          onSelectSize={(size) => setState((prev) => ({ ...prev, size }))}
          onClose={closeSpecimen}
        />
      )}

      <ArchiveFooter />
    </div>
  );
}
