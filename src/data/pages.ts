/* The site's three pages in reading order. The colophon walks this to name
   the page that follows the current one; nothing else lists the pages, and
   that is deliberate — the site is read as a sequence, not browsed. */
export const PAGES = [
  { href: "/", key: "hero" },
  { href: "/collection", key: "collection" },
  { href: "/my-little-world", key: "myLittleWorld" },
] as const;
