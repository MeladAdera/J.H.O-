/* Shared vocabulary for the whole site. Defined once so a typo like
   'WOMENS' or a station index of 7 is caught while typing, in any file. */

// --- Page 1: hero -----------------------------------------------------------

/** The three acts of the metamorphosis: sketch → vector → real shirt. */
export type HeroStage = 1 | 2 | 3;

// --- Page 2: collection -----------------------------------------------------

export type Gender = "WOMEN" | "MEN";
export type Season = "SUMMER" | "WINTER";
export type Fit = "REGULAR" | "OVERSIZED";

export interface Specimen {
  id: string;
  /** Display code stamped on the card, e.g. "SPECIMEN N°01". */
  code: string;
  title: string;
  gender: Gender;
  season: Season;
  fit: Fit;
  /** Fabric telemetry line shown in the detail dossier. */
  fabric: string;
  /** Path under /public. */
  img: string;
  subtitle: string;
  priceNote: string;
}

/** REGULAR garments use letter sizes; OVERSIZED use volumetric scale codes. */
export const REGULAR_SIZES = ["S", "M", "L", "XL"] as const;
export const OVERSIZED_SCALES = [
  { code: "0", label: "RELAXED DRAPED" },
  { code: "1", label: "VOLUMINOUS STUDIO" },
  { code: "2", label: "EXAGGERATED MONUMENTAL" },
] as const;

export type RegularSize = (typeof REGULAR_SIZES)[number];
export type OversizedScale = (typeof OVERSIZED_SCALES)[number]["code"];
export type SpecimenSize = RegularSize | OversizedScale;

// --- Page 3: my little world ------------------------------------------------

/** The five diorama camera waypoints, in the order the scene defines them. */
export type StationId = "overview" | "desk" | "rack" | "vanity" | "laptop";

/** Index into the waypoints array — 0 is always the overview. */
export type StationIndex = 0 | 1 | 2 | 3 | 4;

export interface Station {
  index: StationIndex;
  id: StationId;
  /** HUD heading, e.g. "// 01 • THE ROUND DESK & STITCH LAMP". */
  title: string;
  desc: string;
}
