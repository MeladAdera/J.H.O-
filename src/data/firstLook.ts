/* The products pinned to the home page's first-look scrapbook.

   Each image is a crop of the matching specimen's product flyer
   (public/images/specimen-NN.jpg), cut to the garment so the flyer's printed
   Arabic copy and doodles stay out of the frame. They are stand-ins: when
   clean product shots exist, drop them into public/images/first-look/ under
   the same names and nothing else changes.

   `key` addresses the copy in messages (firstLook.items.<key>); `code` is
   telemetry and stays Latin in both languages. */

export type FirstLookKey = "n09" | "n10" | "n11" | "n12" | "n14";

export interface FirstLookPhoto {
  key: FirstLookKey;
  code: string;
  img: string;
}

/** The polaroid on the gingham square. */
export const FIRST_LOOK_LEAD: FirstLookPhoto = {
  key: "n14",
  code: "N°14",
  img: "/images/first-look/n14-white-fox.jpg",
};

/** The four plain cards, in reading order. */
export const FIRST_LOOK_CARDS: FirstLookPhoto[] = [
  { key: "n12", code: "N°12", img: "/images/first-look/n12-say-yes.jpg" },
  { key: "n10", code: "N°10", img: "/images/first-look/n10-sea.jpg" },
  { key: "n09", code: "N°09", img: "/images/first-look/n09-street-76.jpg" },
  { key: "n11", code: "N°11", img: "/images/first-look/n11-garfield.jpg" },
];
