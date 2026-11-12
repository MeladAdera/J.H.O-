"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Types a few lines out once, on arrival, like a note being written under
   the headline. Plays a single time per page view and never loops: a
   looping type-on under a title reads as a marquee.

   The text is fully in the markup from the server — the untyped remainder
   is only invisible, not absent — so the lines take their final space
   before a character appears and nothing below them shifts. A <noscript>
   rule shows the whole text where scripts never run, and a visually hidden
   copy carries it for screen readers, which should not hear it letter by
   letter. Under reduced motion it simply appears. */

interface Line {
  text: string;
  className?: string;
}

interface Props {
  lines: Line[];
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds before the first character. */
  delay?: number;
}

/** The beat at the end of a line, and the shorter one after punctuation. */
const LINE_PAUSE = 520;
const MARK_PAUSE = 160;
const MARKS = /[.,،;:!?؟]/;

/** The running offset at which each line begins. */
function startsOf(lines: Line[]): number[] {
  let n = 0;
  return lines.map((line) => {
    const start = n;
    n += line.text.length;
    return start;
  });
}

export function TypedLines({ lines, speed = 32, delay = 500 }: Props) {
  const reducedMotion = useReducedMotion();
  const total = lines.reduce((n, line) => n + line.text.length, 0);
  const [typed, setTyped] = useState(0);
  // Reduced motion shows everything at once, derived rather than set.
  const shown = reducedMotion ? total : typed;
  const done = shown >= total;
  const starts = startsOf(lines);

  /* The effect keys on the text, not on the `lines` array: callers pass an
     inline array, which is a new object on every parent render, and the
     parent re-renders every time the camera moves. Keyed on the array, the
     typing would start over each time the tour advanced. */
  const script = lines.map((line) => line.text).join("\u0000");

  useEffect(() => {
    if (reducedMotion) return;

    /* Where each line ends, in the running count, so the typing can rest
       there before starting the next. */
    const texts = script.split("\u0000");
    const ends: number[] = [];
    texts.reduce((n, text) => {
      ends.push(n + text.length);
      return n + text.length;
    }, 0);
    const all = texts.join("");

    let count = 0;
    let timer = window.setTimeout(tick, delay);
    function tick() {
      count += 1;
      setTyped(count);
      if (count >= total) return;
      const justTyped = all[count - 1];
      const wait = ends.includes(count)
        ? LINE_PAUSE
        : MARKS.test(justTyped)
          ? MARK_PAUSE
          : speed;
      timer = window.setTimeout(tick, wait);
    }
    return () => window.clearTimeout(timer);
  }, [reducedMotion, script, total, delay, speed]);

  return (
    <div className="typed-lines flex flex-col gap-1">
      {/* Shows everything where scripts never run, so the block is not blank. */}
      <noscript>
        <style>{".typed-lines .typed-rest{visibility:visible}"}</style>
      </noscript>
      {lines.map((line, i) => {
        const start = starts[i];
        const revealed = Math.max(0, Math.min(line.text.length, shown - start));
        const typing = !done && shown >= start && revealed < line.text.length;
        return (
          <p key={i} className={line.className}>
            <span className="sr-only">{line.text}</span>
            <span aria-hidden="true">
              <span>{line.text.slice(0, revealed)}</span>
              {typing && <span className="typed-caret" />}
              <span className="typed-rest invisible">{line.text.slice(revealed)}</span>
            </span>
          </p>
        );
      })}
    </div>
  );
}
