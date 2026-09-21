"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { HeroStage } from "@/lib/types";

/* The hero's three-act metamorphosis: a pencil sketch draws itself, dissolves
   into a polished vector, then into a photograph of the real garment — on a
   loop, with manual jumps.

   Ported from the inline script in design-reference/code.html (initMetamorphosis
   / jumpToStage / the mousemove parallax). Two things differ here:

   1. Everything lives inside useGSAP, which reverts the timeline and kills the
      tweens on unmount. The original never cleaned up — it left a live repeating
      timeline and a window mousemove listener behind on every navigation.
   2. The stroke dash offset is set here rather than hardcoded in CSS, so the
      sketch still renders complete if JavaScript never runs. */

/** Stages are found by data attribute within the scope, so this hook does not
    care how the components nest. */
const stageSelector = (stage: HeroStage) => `[data-stage="${stage}"]`;

const ALL_STAGES = [1, 2, 3] as const;

interface Handlers {
  jump: (stage: HeroStage) => void;
  restart: () => void;
}

interface Options {
  /** Fires whenever the active act changes, so the UI can follow along. */
  onStageChange: (stage: HeroStage) => void;
}

export function useMetamorphosis({ onStageChange }: Options) {
  /** Attach to the viewport frame: scopes GSAP's selectors and receives the tilt. */
  const scope = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  /* Built inside the GSAP effect below, where contextSafe is available, so the
     tweens these create are still torn down with the component. */
  const handlers = useRef<Handlers | null>(null);

  // Held in a ref so a changing callback identity never rebuilds the timeline.
  const onStageChangeRef = useRef(onStageChange);
  useEffect(() => {
    onStageChangeRef.current = onStageChange;
  }, [onStageChange]);

  const reducedMotion = useRef(false);

  useGSAP(
    (_context, contextSafe) => {
      const announce = (stage: HeroStage) => onStageChangeRef.current(stage);
      const [stage1, stage2, stage3] = ALL_STAGES.map(stageSelector);

      // Opening positions: the sketch sits on top, undrawn.
      gsap.set(".sketch-path", { strokeDashoffset: 1000 });
      gsap.set(stage1, { opacity: 1, scale: 1, filter: "blur(0px)", zIndex: 30 });
      gsap.set(stage2, { opacity: 0, scale: 0.96, filter: "blur(8px)", zIndex: 20 });
      gsap.set(stage3, { opacity: 0, scale: 1.04, filter: "blur(8px)", zIndex: 10 });

      reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /** Pause the loop and cut to a single act. */
      const jump = contextSafe!((stage: HeroStage) => {
        timeline.current?.pause();
        onStageChangeRef.current(stage);

        ALL_STAGES.forEach((candidate) => {
          const isActive = candidate === stage;
          gsap.to(stageSelector(candidate), {
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : candidate > stage ? 0.96 : 1.04,
            filter: isActive ? "blur(0px)" : "blur(6px)",
            zIndex: isActive ? 30 : 10,
            duration: 0.8,
          });
        });

        // Jumping back to the sketch should show it drawn, not blank.
        if (stage === 1) {
          gsap.to(".sketch-path", { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" });
        }
      });

      /** Replay the whole transformation from the first pencil stroke. */
      const restart = contextSafe!(() => {
        if (!timeline.current) return;
        gsap.set(".sketch-path", { strokeDashoffset: 1000 });
        timeline.current.restart();
      });

      handlers.current = { jump, restart };

      if (reducedMotion.current) {
        // No looping animation: present the finished sketch and stay there.
        gsap.set(".sketch-path", { strokeDashoffset: 0 });
        announce(1);
        return;
      }

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 4.5,
        defaults: { ease: "power2.inOut" },
      });
      timeline.current = tl;

      tl
        // --- Act 1: the sketch draws itself, stroke by stroke ---
        .to(".sketch-path", {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.08,
          ease: "power2.out",
          onStart: () => announce(1),
        })
        .to({}, { duration: 1.6 }) // hold, to take the sketch in

        // --- Act 1 → 2: the sketch becomes a clean vector ---
        .to(
          stage1,
          {
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
            duration: 1.2,
            onStart: () => {
              announce(2);
              gsap.set(stage2, { zIndex: 30 });
              gsap.set(stage1, { zIndex: 10 });
            },
          },
          "sketchToVector",
        )
        .to(stage2, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2 }, "sketchToVector")
        .from(
          "[data-vector-artwork]",
          {
            scale: 0.92,
            boxShadow: "0 0 0 rgba(255,123,154,0)",
            duration: 1,
            ease: "back.out(1.4)",
          },
          "sketchToVector+=0.3",
        )
        .to({}, { duration: 2 }) // hold on the vector

        // --- Act 2 → 3: the vector becomes the real garment ---
        .to(
          stage2,
          {
            opacity: 0,
            scale: 0.94,
            filter: "blur(12px)",
            duration: 1.4,
            onStart: () => {
              announce(3);
              gsap.set(stage3, { zIndex: 30 });
              gsap.set(stage2, { zIndex: 10 });
            },
          },
          "vectorToGarment",
        )
        .to(stage3, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4 }, "vectorToGarment")
        .from(
          "[data-garment-photo]",
          { scale: 1.08, duration: 2, ease: "power1.out" },
          "vectorToGarment",
        )
        .to({}, { duration: 3.5 }); // hold on the finished shirt
    },
    { scope },
  );

  /* Mouse parallax over the frame. The original bound this to window and never
     removed it; here it is torn down with the component. */
  useEffect(() => {
    const viewport = scope.current;
    if (!viewport || reducedMotion.current) return;

    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 16;
      gsap.to(viewport, {
        rotationY: x * 0.4,
        rotationX: -y * 0.4,
        ease: "power1.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const jumpToStage = useCallback((stage: HeroStage) => handlers.current?.jump(stage), []);
  const restart = useCallback(() => handlers.current?.restart(), []);

  return { scope, jumpToStage, restart };
}
