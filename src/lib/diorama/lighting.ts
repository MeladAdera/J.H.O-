import type { Theme } from "@/lib/theme";

/* The room at two times of day.

   The geometry and its material colours never change — only the light
   falling on them. Dark mode is the reference scene verbatim
   (design-reference/my little world.html:298-326): lamps on, sun low, the
   room lit by its own fixtures at night. Light mode is authored here: the
   window takes over, the lamps drop to a trace, and the background lifts to
   the page's own paper so the diorama sits in the room rather than floating
   on a mismatched black rectangle.

   Every field is a plain number or hex so the whole preset can be tweened
   componentwise — see tweenLighting below. */

export interface LightingPreset {
  /** Scene clear colour. Matches --role-ground so the stage joins the page. */
  background: number;
  /** ACES exposure. Daylight needs less help than lamplight. */
  exposure: number;
  ambient: { color: number; intensity: number };
  /** The window. Key light in daylight, a weak moon at night. */
  sun: { color: number; intensity: number };
  /** Cool bounce off the opposite wall. */
  fill: { color: number; intensity: number };
  /** The three practical lamps in the room. */
  stitch: { color: number; intensity: number };
  vanity: { color: number; intensity: number };
  bed: { color: number; intensity: number };
}

/* Night: the reference rig, unchanged. The room is lit by its own lamps. */
const NIGHT: LightingPreset = {
  background: 0x141316,
  exposure: 1.3,
  ambient: { color: 0xd9d5e6, intensity: 1.15 },
  sun: { color: 0xfff1dc, intensity: 2.1 },
  fill: { color: 0x8fa4bf, intensity: 0.65 },
  stitch: { color: 0xfff3da, intensity: 2.8 },
  vanity: { color: 0xfff6ea, intensity: 2.4 },
  bed: { color: 0xffab7e, intensity: 1.5 },
};

/* Day: sunlight through the window carries the room, so the practical lamps
   fall back to a trace rather than switching off — a lamp left on in daylight
   still catches, and zeroing them flattens the props they were placed to
   model. Ambient rises and warms to stand in for skylight bouncing around a
   small room; exposure drops because there is far more light to begin with. */
const DAY: LightingPreset = {
  background: 0xfaf8f5,
  exposure: 1.0,
  ambient: { color: 0xfff4e6, intensity: 2.4 },
  sun: { color: 0xfffaf0, intensity: 3.4 },
  fill: { color: 0xcfe0f5, intensity: 1.1 },
  stitch: { color: 0xfff3da, intensity: 0.55 },
  vanity: { color: 0xfff6ea, intensity: 0.5 },
  bed: { color: 0xffab7e, intensity: 0.3 },
};

export const LIGHTING: Record<Theme, LightingPreset> = { light: DAY, dark: NIGHT };
