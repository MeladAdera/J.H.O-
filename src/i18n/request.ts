import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/* The copy is split into one file per page, per language:

     messages/<locale>/common.json      brand, nav, footer
     messages/<locale>/home.json        hero, firstLook
     messages/<locale>/collection.json  collection
     messages/<locale>/world.json       world

   Each file holds whole namespaces, so components still ask for
   useTranslations("hero") and never know which file it came from. This list
   is the one place to touch when a page gets a file of its own; run
   `npm run check:content` afterwards to confirm both languages match. */
export const MESSAGE_FILES = ["common", "home", "collection", "world"] as const;

type Messages = Record<string, unknown>;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const parts: Messages[] = await Promise.all(
    MESSAGE_FILES.map(
      async (file) => (await import(`../../messages/${locale}/${file}.json`)).default as Messages,
    ),
  );

  const messages: Messages = {};
  parts.forEach((part, i) => {
    for (const namespace of Object.keys(part)) {
      /* Two files claiming one namespace would silently drop the first. */
      if (process.env.NODE_ENV !== "production" && namespace in messages) {
        throw new Error(
          `messages/${locale}/${MESSAGE_FILES[i]}.json redefines "${namespace}", which another message file already holds.`,
        );
      }
      messages[namespace] = part[namespace];
    }
  });

  return { locale, messages };
});
