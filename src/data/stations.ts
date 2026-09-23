import type { Station } from "@/lib/types";

/* The five camera waypoints of the origin room, ported verbatim from
   design-reference/my little world.html:740-746.

   Index 0 is always the wide overview — useOriginRoom starts there and the
   "reset view" control returns to it. The coordinates are tuned against the
   room's geometry, so moving a prop means re-aiming its waypoint. */

export const STATIONS: readonly Station[] = [
  { index: 0, id: "overview", cam: [13.5, 11.5, 15.5], look: [0, 1.6, 0] },
  { index: 1, id: "desk", cam: [5.2, 4.4, 4.8], look: [2.4, 1.7, 1.8] },
  { index: 2, id: "rack", cam: [-0.5, 4.2, 1.4], look: [-2.2, 2.6, -1.5] },
  { index: 3, id: "vanity", cam: [-2.2, 3.6, -1.8], look: [-3.4, 2.3, -4.5] },
  { index: 4, id: "laptop", cam: [3.6, 3.1, 2.9], look: [2.0, 1.8, 1.9] },
] as const;

/* The three photographic archive plates shown beneath the diorama. These are
   real photographs of the room, as opposed to the modelled version above. */
export const ARCHIVE_PLATES = [
  { key: "roomWide", img: "/images/archive-room-wide.jpg" },
  { key: "vanityMirror", img: "/images/archive-vanity-mirror.jpg" },
  { key: "coatrack", img: "/images/archive-coatrack.jpg" },
] as const;
