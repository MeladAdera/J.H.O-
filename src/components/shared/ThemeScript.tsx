import { THEME_INIT_SCRIPT } from "@/lib/theme";

/* Applies the stored theme to <html> before the first paint.

   A plain <script>, not next/script: `beforeInteractive` is preloaded early
   but its execution does not block painting, whereas an inline script in
   <head> runs during HTML parsing. This is the shape Next's own guide
   prescribes — node_modules/next/dist/docs/01-app/02-guides/
   preventing-flash-before-hydration.md, "Themes".

   The cookie variant in that guide is deliberately not used: reading a cookie
   in the layout would opt every route out of static prerendering, and this
   app is fully static via generateStaticParams + setRequestLocale. */

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
}
