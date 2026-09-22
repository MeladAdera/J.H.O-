import type { Gender, Season } from "@/lib/types";

/* The four full-screen choice panels: Women/Men, then Summer/Winter.

   In design-reference/our collection.html these are two duplicated blocks
   (:215-291 and :305-363) with identical markup and behaviour. Everything
   that actually differs between them lives here as data, so <SplitChoice>
   can render both screens.

   Text is not here — it comes from messages/{en,ar}.json under
   collection.panels.<key> — only the Latin telemetry codes and the styling
   that varies per panel. */

export interface ChoicePanel<T extends string = string> {
  /** Written into journey state when this panel is chosen. */
  value: T;
  /** Message key under `collection.panels`. */
  key: string;
  /** Latin telemetry stamped on the badge, e.g. "SPECIMEN 01 //". */
  badgeCode: string;
  /** Gender panels wrap their badge in square brackets; season panels do not. */
  bracketed?: boolean;
  /** Colour of the badge's status dot. */
  dotClass: string;
  img: string;
  /** How the photograph is cropped. */
  objectClass: string;
  /** Colour wash that fades in on hover. */
  tintClass: string;
  /** Vertical coordinate strip down the side — gender panels only. */
  coordinates?: string;
}

export const GENDER_PANELS: ChoicePanel<Gender>[] = [
  {
    value: "WOMEN",
    key: "women",
    badgeCode: "SPECIMEN 01 //",
    bracketed: true,
    dotClass: "bg-archive-pink",
    img: "/images/specimen-05.jpg",
    objectClass: "object-top",
    tintClass: "bg-gradient-to-r from-archive-pink/10 via-transparent to-transparent mix-blend-color-dodge",
    coordinates: "STRUCTURAL FLUIDITY • COUTURE ARCHITECTURE • 48.8566° N",
  },
  {
    value: "MEN",
    key: "men",
    badgeCode: "SPECIMEN 02 //",
    bracketed: true,
    dotClass: "bg-white/60",
    img: "/images/specimen-06.jpg",
    objectClass: "object-top",
    tintClass: "bg-gradient-to-l from-archive-pink/10 via-transparent to-transparent mix-blend-color-dodge",
    coordinates: "TAILORED PROPORTION • MINIMALIST CUT • 35.6762° N",
  },
];

export const SEASON_PANELS: ChoicePanel<Season>[] = [
  {
    value: "SUMMER",
    key: "summer",
    badgeCode: "SEASON 01 //",
    dotClass: "bg-amber-400",
    img: "/images/specimen-04.jpg",
    objectClass: "object-center",
    tintClass: "bg-amber-500/10 mix-blend-soft-light",
  },
  {
    value: "WINTER",
    key: "winter",
    badgeCode: "SEASON 02 //",
    dotClass: "bg-archive-pink",
    img: "/images/specimen-03.jpg",
    objectClass: "object-center",
    tintClass: "bg-archive-pink/15 mix-blend-color-dodge",
  },
];
