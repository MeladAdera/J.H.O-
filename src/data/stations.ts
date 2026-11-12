import type { Station, StationId, StationIndex } from "@/lib/types";

/* The five camera waypoints of the origin room, ported verbatim from
   design-reference/my little world.html:740-746.

   Index 0 is always the wide overview — useOriginRoom starts there and the
   "reset view" control returns to it. The coordinates are tuned against the
   room's geometry, so moving a prop means re-aiming its waypoint. */

/* Ordered as a walk, not as the reference listed them: the three desk-area
   stations run together before the camera crosses the room to the rack and
   the vanity. The auto-tour steps through in this order. */
export const STATIONS: readonly Station[] = [
  { index: 0, id: "overview", cam: [13.5, 11.5, 15.5], look: [0, 1.6, 0] },
  { index: 1, id: "desk", cam: [5.2, 4.4, 4.8], look: [2.4, 1.7, 1.8] },
  /* The lamp is at world (2.85, …, 2.45) and the laptop at (2.05, …, 1.95).
     The laptop is the bigger object, so any camera that lines the two up
     loses the lamp behind it — and both the obvious framings do exactly
     that: from the +z corner the two directions differ by only 4°.

     Separating them by angle does work — a perpendicular approach opens it
     to ~25° — but the room has only two walls and the desk sits in the far
     corner, so every perpendicular heading looks straight out of the room
     and strands the lamp on black. Half that frame came back void.

     So this solves it by distance instead: held ~1.4 units out, the lamp
     stands about the full height of the frame and the laptop, half again as
     far away and largely behind it, stops competing. The room still fills
     the background because the camera is looking back into it. */
  { index: 2, id: "lamp", cam: [3.9, 2.55, 3.35], look: [2.85, 2.15, 2.45] },
  { index: 3, id: "laptop", cam: [3.6, 3.1, 2.9], look: [2.0, 1.8, 1.9] },
  /* Backed off from the reference's [-0.5, 4.2, 1.4], which sat ~3.3 units
     from a 1.7-tall jacket and let it fill the frame. */
  { index: 4, id: "rack", cam: [0.6, 4.0, 2.2], look: [-2.1, 2.4, -1.4] },
  /* The reference's [-2.2, 3.6, -1.8] sat ~2.8 units from a mirror 2.7 wide,
     so the arch filled the frame and the desk it introduces was off-screen.
     Backing straight off is not enough either: the coat rack at x≈-2 stands
     between the room centre and the vanity, so the approach also has to be
     held out at x≈-3.3 to keep the sightline clear. */
  { index: 5, id: "vanity", cam: [-3.3, 3.2, 0.6], look: [-3.6, 1.8, -4.4] },
] as const;

/* Lets the scene tag a prop by name instead of by number. The builders and
   this list would otherwise have to agree on indices by hand, and reordering
   the tour would silently point every prop at the wrong card. */
export const STATION_INDEX = Object.fromEntries(
  STATIONS.map((s) => [s.id, s.index]),
) as Record<StationId, StationIndex>;

/** The diorama camera's field of view, in degrees. The telemetry readout over
    the canvas prints this, so it lives here rather than in the hook: a number
    typed twice is a number that drifts. */
export const CAMERA_FOV = 40;

/* The three photographic archive plates shown beneath the diorama. These are
   real photographs of the room, as opposed to the modelled version above.
   The capture times and reference codes are the plate's own telemetry —
   Latin in both locales, so they live here rather than in messages/. The
   third photograph is the portrait one. */
export const ARCHIVE_PLATES = [
  {
    key: "roomWide",
    img: "/images/world/room-wide.jpg",
    numeral: "I",
    portrait: false,
    time: "17:15:43",
    code: "DSC_0918_12",
  },
  {
    key: "vanityMirror",
    img: "/images/world/vanity-mirror.jpg",
    numeral: "II",
    portrait: false,
    time: "17:13:03",
    code: "DSC_0918_02",
  },
  {
    key: "coatrack",
    img: "/images/world/coat-rack.jpg",
    numeral: "III",
    portrait: true,
    time: "17:14:11",
    code: "DSC_0918_10",
  },
] as const;
