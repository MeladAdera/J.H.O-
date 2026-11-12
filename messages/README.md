# Messages — all the site's text

One folder per language, one file per page. The same files exist in both.

```
messages/
  en/                    English
    common.json          brand, nav, footer      — on every page
    home.json            hero, firstLook         — the home page (/)
    collection.json      collection              — /collection
    world.json           world                   — /my-little-world
  ar/                    Arabic — the same four files, the same keys
```

Inside a file, the first level is the section a component asks for
(`useTranslations("firstLook")`), and everything under it is that section's
text.

## Change a text

Edit the value in `en/<page>.json` and the same key in `ar/<page>.json`.

## Add a text

1. Add the key to the right file in **both** `en/` and `ar/`, at the same place.
2. Use it in the component: `t("yourKey")`.
3. Run `npm run check:content`.

## Remove a text

Delete the key from **both** languages, remove its `t("…")` from the
component, then run `npm run check:content`.

## Give a new page its own file

1. Create `en/<page>.json` and `ar/<page>.json`.
2. Add `"<page>"` to `MESSAGE_FILES` in `src/i18n/request.ts`. Files not in
   that list are never loaded.
3. Run `npm run check:content`.

`npm run check:content` fails if a key exists in one language but not the
other, if a file is missing from one language, or if a file is not listed in
`MESSAGE_FILES`.
