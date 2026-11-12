# Images — one folder per page

```
public/images/
  brand/                 logo.png — the logo in every page header
  home/
    hero-garment.jpg     the finished shirt in the hero's stage 3
    first-look/          the scrapbook photos on the home page
  products/              one photo per product in the collection
  world/                 the room photographs on /my-little-world
```

## Naming

Products are named by their number and name, so the number matches N°09 on
the site and the name tells you which tee it is:

```
n09-street-76.jpg        N°09  The Street 76 Oversize Tee
n11-garfield-coffee.jpg  N°11  The Garfield Coffee Tee
```

Lowercase, words joined by `-`, no spaces. A first-look photo has the same
name as its product (`home/first-look/n09-street-76.jpg`).

## Swap a photo

Save the new photo over the old one, with exactly the same name. Nothing
else needs to change.

## Add a product photo

1. Put it in `products/` as `nNN-product-name.jpg`.
2. Add the product's entry to `src/data/catalog.ts` with
   `img: "/images/products/nNN-product-name.jpg"`.
3. Run `npm run check:content`.

To show it on the home page as well, put a crop in `home/first-look/` under
the same name and add it to `src/data/firstLook.ts` (plus its name and alt
text under `firstLook.items` in `messages/en/home.json` and
`messages/ar/home.json`).

## Remove a photo

Delete the file **and** the line that points at it (search the code for its
file name), then run `npm run check:content`.

`npm run check:content` fails when the code points at a photo that isn't
here, and lists any photo here that nothing uses, so leftovers are easy to
spot.
