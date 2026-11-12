"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OriginRoom } from "./OriginRoom";
import { ArtifactCards } from "./ArtifactCards";
import { ArchivePlates } from "./ArchivePlates";
import { OriginEpilogue } from "./OriginEpilogue";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { STATIONS } from "@/data/stations";
import type { StationIndex } from "@/lib/types";

/* The single client boundary for page 3 — the same shape as HeroExperience
   on page 1. The waypoint picker, the HUD, the scene, the artifact cards and
   the epilogue's re-centre button all read or write the active station, so
   it lives here and flows down as props.

   The room tours itself: the camera walks the stations on a timer so the
   page is doing something before anyone touches it. Any deliberate act —
   picking a station, clicking a prop, choosing a card — stops the tour, on
   the same principle as the hero's stage pills pausing its loop. Nothing
   yanks the camera away while someone is looking at something. */

/** How long the camera dwells before moving on. Long enough to read the card. */
const DWELL_MS = 7000;

export function WorldExperience() {
  const [station, setStation] = useState<StationIndex>(0);
  const [touring, setTouring] = useState(true);
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement | null>(null);

  /** A deliberate choice — from the picker or from clicking a prop. */
  const select = useCallback((next: StationIndex) => {
    setStation(next);
    setTouring(false);
  }, []);

  /** Any touch of the room itself — a click on empty floor, a drag, a zoom. */
  const stopTour = useCallback(() => setTouring(false), []);
  const toggleTour = useCallback(() => setTouring((on) => !on), []);

  /* A choice made below the fold — an artifact card, or the epilogue's
     re-centre — also brings the frame back up. Without that the glide would
     play to nobody, and the card would seem to have done nothing. */
  const focus = useCallback(
    (next: StationIndex) => {
      select(next);
      frameRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [select, reducedMotion],
  );

  /* Reduced motion opts out entirely: an unattended camera glide every seven
     seconds is exactly the kind of movement that setting asks us not to make. */
  useEffect(() => {
    if (!touring || reducedMotion) return;
    const timer = window.setInterval(() => {
      setStation((current) => ((current + 1) % STATIONS.length) as StationIndex);
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [touring, reducedMotion]);

  return (
    <>
      <OriginRoom
        station={station}
        touring={touring}
        reducedMotion={reducedMotion}
        onSelect={select}
        onInteract={stopTour}
        onToggleTour={toggleTour}
        frameRef={frameRef}
      />
      <ArtifactCards active={station} onSelect={focus} />
      <ArchivePlates />
      <OriginEpilogue onRecenter={() => focus(0)} />
    </>
  );
}
