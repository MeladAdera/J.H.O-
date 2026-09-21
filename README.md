# J.H.O Atelier & Lab

Landing site for a bespoke clothing label — *your idea → design → real*.

Three pages, each a distinct interactive experience, ported from standalone
HTML designs into Next.js.

| Route | Page | What it does |
|---|---|---|
| `/` | Hero | A GSAP three-stage "metamorphosis": a self-drawing pencil sketch becomes a polished vector, then a photograph of the finished garment. Loops, with manual stage controls. |
| `/collection` | Specimen Archive | A guided journey — gender → season → a lookbook filtered by silhouette fit → a specimen detail dossier with fit-aware sizing. |
| `/my-little-world` | Origin Room | An interactive Three.js diorama of the bedroom where the label started, with five camera waypoints, drag-orbit and scroll-zoom, alongside photographic archives. |

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css`
- **GSAP** (`gsap` + `@gsap/react`) — the hero timeline
- **Three.js**, pinned to `0.149.0` — see the note below

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build     # production build
npm run lint      # eslint
npx tsc --noEmit  # typecheck
```

## Project structure

```
design-reference/     the original HTML designs + screenshots, kept as the source of truth
public/images/        photography and artwork
src/
  app/                routes only — one folder per URL
  components/         one folder per page; shared/ holds only what two pages really share
  data/               content (product catalog, diorama stations)
  hooks/              the GSAP and Three.js behaviour
  lib/types.ts        shared vocabulary: Gender, Season, Fit, Specimen, StationId…
```

Components are grouped **by page rather than by kind**, because the three pages
share almost nothing — different headers, footers, palettes and typefaces. Each
page's folder is self-contained.

## Two things worth knowing

**Three.js is pinned to `0.149.0` on purpose.** It is the last release before
the colour-management (r152) and physical-lighting (r155) overhauls. The diorama
was authored against the old behaviour, so upgrading changes how the scene is
lit and coloured. Any upgrade means re-tuning the six lights.

**The product photos are placeholders.** `public/images/specimen-01.jpg` …
`specimen-06.jpg` are generated stand-ins. Replace them with real product
photography using the same filenames — no code changes needed.
