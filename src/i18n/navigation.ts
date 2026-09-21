import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/* Locale-aware replacements for next/link and the navigation hooks. Import
   Link from here rather than from next/link so hrefs such as "/collection"
   automatically resolve to /en/collection or /ar/collection. */

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
