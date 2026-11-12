/* Material colours for the origin room, ported verbatim from
   design-reference/my little world.html:270-296, which derived them from
   photographs of the real room.

   These are object colours — the paint on the walls, the dye in the jacket —
   so they do NOT change with the theme. What changes is the light falling on
   them; see lighting.ts. That is also why three is pinned to 0.149.0: it
   predates the r152 colour-management overhaul, so these hex values are used
   as authored rather than being re-interpreted as sRGB. */

export const PALETTE = {
  plinth: 0x141317,
  floorTileA: 0x2d2b35,
  floorTileB: 0x1b1a22,
  wallWarm: 0x222029,
  yellowDrape: 0xe0b95b,
  yellowDrapeDark: 0xb58f38,
  stitchBlue: 0x2578d1,
  neonLime: 0x3eef70,
  neonLimeDark: 0x23aa48,
  blackBag: 0x151518,
  goldHardware: 0xdfb744,
  monogramTan: 0xcbb293,
  monogramBrown: 0x5a3e2b,
  woodDark: 0x483226,
  woodWarm: 0x6e4c3a,
  vanityWood: 0x54392b,
  pinkLinen: 0xe78ba5,
  fanWhite: 0xe5e7eb,
  screenCyan: 0xa8f2ff,
  mirrorGlass: 0xd8e8f8,
  mirrorGoldFrame: 0xd4af37,
  cosmeticPink: 0xf472b6,
  cosmeticGold: 0xfae8b0,
  vanityGlow: 0xffedd5,
} as const;
