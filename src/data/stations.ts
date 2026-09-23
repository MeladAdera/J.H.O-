import type { Station } from "@/lib/types";

/* The five camera waypoints of the origin room, ported verbatim from
   design-reference/my little world.html:740-746.

   Index 0 is always the wide overview — useOriginRoom starts there and the
   "reset view" control returns to it. The coordinates are tuned against the
   room's geometry, so moving a prop means re-aiming its waypoint. */

export const STATIONS: readonly Station[] = [
  { index: 0, id: "overview", cam: [13.5, 11.5, 15.5], look: [0, 1.6, 0] },
  { index: 1, id: "desk", cam: [5.2, 4.4, 4.8], look: [2.4, 1.7, 1.8] },
  /* Backed off from the reference's [-0.5, 4.2, 1.4], which sat ~3.3 units
     from a 1.7-tall jacket and let it fill the frame. */
  { index: 2, id: "rack", cam: [0.6, 4.0, 2.2], look: [-2.1, 2.4, -1.4] },
  /* The reference's [-2.2, 3.6, -1.8] sat ~2.8 units from a mirror 2.7 wide,
     so the arch filled the frame and the desk it introduces was off-screen.
     Backing straight off is not enough either: the coat rack at x≈-2 stands
     between the room centre and the vanity, so the approach also has to be
     held out at x≈-3.3 to keep the sightline clear. */
  { index: 3, id: "vanity", cam: [-3.3, 3.2, 0.6], look: [-3.6, 1.8, -4.4] },
  { index: 4, id: "laptop", cam: [3.6, 3.1, 2.9], look: [2.0, 1.8, 1.9] },
] as const;

/* The three photographic archive plates shown beneath the diorama. These are
   real photographs of the room, as opposed to the modelled version above. */
export const ARCHIVE_PLATES = [
  { key: "roomWide", img: "/images/archive-room-wide.jpg" },
  { key: "vanityMirror", img: "/images/archive-vanity-mirror.jpg" },
  { key: "coatrack", img: "/images/archive-coatrack.jpg" },
] as const;
