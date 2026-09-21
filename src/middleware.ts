import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /* Run on every path except Next internals, the API, and anything with a
     file extension (our images in /public). */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
