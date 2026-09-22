import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/* Locale routing. Next 16 renamed the `middleware` file convention to
   `proxy`; the named export is called `proxy` as the upgrade guide
   recommends, even though a default export would also be picked up.
   See node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md */

export const proxy = createMiddleware(routing);

export default proxy;

export const config = {
  /* Every path except Next internals, the API, and anything with a file
     extension (our images in /public). */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
