/* The products pinned to the home page's first-look scrapbook.

   Each image is a crop of the same product's flyer in
   public/images/products/, cut to the garment so the flyer's printed Arabic
   copy and doodles stay out of the frame, and it keeps the product's file
   name (products/n09-street-76.jpg → home/first-look/n09-street-76.jpg).
   They are stand-ins: when clean product shots exist, replace the files in
   public/images/home/first-look/ under the same names and nothing else
   changes.

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
  img: "/images/home/first-look/n14-white-fox-hibiscus.jpg",
};

/** The four plain cards, in reading order. */
export const FIRST_LOOK_CARDS: FirstLookPhoto[] = [
  { key: "n12", code: "N°12", img: "/images/home/first-look/n12-say-yes-baby.jpg" },
  { key: "n10", code: "N°10", img: "/images/home/first-look/n10-sea-calls-me.jpg" },
  { key: "n09", code: "N°09", img: "/images/home/first-look/n09-street-76.jpg" },
  { key: "n11", code: "N°11", img: "/images/home/first-look/n11-garfield-coffee.jpg" },
];
