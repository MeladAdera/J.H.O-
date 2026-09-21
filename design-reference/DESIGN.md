---
name: Atelier & Gallery Aesthetic
colors:
  surface: '#141316'
  surface-dim: '#141316'
  surface-bright: '#3a383c'
  surface-container-lowest: '#0f0e11'
  surface-container-low: '#1c1b1e'
  surface-container: '#201f22'
  surface-container-high: '#2b292d'
  surface-container-highest: '#363438'
  on-surface: '#e6e1e5'
  on-surface-variant: '#ddbfc3'
  inverse-surface: '#e6e1e5'
  inverse-on-surface: '#313033'
  outline: '#a58a8e'
  outline-variant: '#564145'
  surface-tint: '#ffb1c0'
  primary: '#ffb1c0'
  on-primary: '#660029'
  primary-container: '#ff7597'
  on-primary-container: '#740430'
  inverse-primary: '#a83255'
  secondary: '#e8c177'
  on-secondary: '#402d00'
  secondary-container: '#5f4504'
  on-secondary-container: '#d9b36b'
  tertiary: '#ffb1c4'
  on-tertiary: '#5a172f'
  tertiary-container: '#e4869f'
  on-tertiary-container: '#651f37'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c0'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#88183e'
  secondary-fixed: '#ffdea3'
  secondary-fixed-dim: '#e8c177'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5c4202'
  tertiary-fixed: '#ffd9e0'
  tertiary-fixed-dim: '#ffb1c4'
  on-tertiary-fixed: '#3e011a'
  on-tertiary-fixed-variant: '#772d45'
  background: '#141316'
  on-background: '#e6e1e5'
  surface-variant: '#363438'
typography:
  display-xl:
    fontFamily: Bodoni Moda
    fontSize: 5.5rem
    fontWeight: '400'
    lineHeight: 6rem
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Bodoni Moda
    fontSize: 3rem
    fontWeight: '400'
    lineHeight: 3.5rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 3.25rem
    fontWeight: '400'
    lineHeight: 3.75rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 2.25rem
    fontWeight: '400'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 1.5rem
    fontWeight: '400'
    lineHeight: 2rem
    letterSpacing: 0em
  body-lg:
    fontFamily: EB Garamond
    fontSize: 1.25rem
    fontWeight: '400'
    lineHeight: 1.875rem
    letterSpacing: 0.01em
  body-md:
    fontFamily: EB Garamond
    fontSize: 1.0625rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: 0.01em
  body-sm:
    fontFamily: EB Garamond
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0.01em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.08em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0.12em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: '400'
    lineHeight: 0.875rem
    letterSpacing: 0.16em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies the intersection of an haute couture fashion atelier, a museum-grade contemporary art installation, and a precision spatial design studio. It prioritizes deliberate curation over density, treating the screen as a gallery wall where negative space commands presence.

The aesthetic fuses **Minimalism** and **Tactile / Skeuomorphic Modernity**: deep, velvet-toned charcoal environments punctured by ultra-fine luminous metadata, delicate blush accents, and understated antique gold trim. The emotional tone is architectural, exclusive, cerebral, and uncompromisingly quiet. Interactivity feels calculated and weightless—hover states mirror the soft reflection of gallery spotlighting, while layout structures recall curated art monographs and archival portfolios.

## Colors

The foundation is built on deep, absorptive warm black and obsidian-charcoal surfaces. Accents are applied with surgical restraint, echoing silk linings and brushed brass hardware in a dark showroom.

- **Base Surfaces:** Canvas background sits at `#0c0b0e` (Obsidian Base), while elevated surfaces utilize `#141318` (Atelier Charcoal) and `#1c1a22` (Gallery Surface).
- **Primary Accent (`#ff7597` / `#df829b`):** Radiant and muted silk blush. Used sparingly for curated focal points, active state indicators, and signature interactive callouts.
- **Secondary Accent (`#c8a45d`):** Couture brushed gold. Reserved for edition numbering, catalog classifications, and micro-accents.
- **Text & Telemetry Neutral:** Primary editorial copy renders in `#f4f2f5` (Raw Silk). Secondary annotations and data points render in `#8c8894` (Graphite Silver) and `#4a4652` (Deep Ash).

## Typography

The typographic tension pairs high-contrast Italian modern serif headlines with scholarly body text and microscopic technical telemetry.

- **Headlines (`Bodoni Moda`):** High drama, extreme stroke contrast, and sharp vertical stems. Always set at regular weight (`400`) to evoke publication mastheads and high-fashion title treatments.
- **Body & Longform (`EB Garamond`):** Classical, literary cadence with generous line heights, providing a warm, bookish editorial quality that counterbalances the dark environment.
- **Metadata & Telemetry (`JetBrains Mono`):** Precision monospace set with expanded letter-spacing in all uppercase or technical codes. Used for inventory reference codes, curation dimensions, coordinates, timestamps, and interface interactions.

## Layout & Spacing

The layout model is anchored by an asymmetrical 12-column architectural grid on desktop, scaling to 6 columns on tablet and 2 columns on mobile devices.

- **Canvas & Frame:** Broad framing margins (`margin: 4rem`) create a matte-board effect around digital exhibits, ensuring artwork and editorial photography remain central without touching the screen perimeter.
- **Rhythm:** Spacing follows an airy cadence. Editorial components favor vertical expansion with deliberate voids of `space-xl` between sections to force contemplation.
- **Reflow:** On mobile, dual-column metadata cards collapse into a stacked editorial sequence, preserving the monospace telemetry headers above primary visuals.

## Elevation & Depth

This design system avoids heavy drop shadows and extruded neomorphic physical effects. Depth is achieved strictly through **Tonal Layering** and **Subtle Luminous Glassmorphism**.

1. **Floor (Ground Canvas):** Matte `#0c0b0e` surface with zero elevation.
2. **Pedestal (Surface 1):** `#141318` bounded by a 1px ghost border rendered in `rgba(255, 255, 255, 0.06)`.
3. **Plinth (Surface 2 / Overlays):** `#1c1a22` with a subtle blush-tinted ambient halo: `0 24px 48px -12px rgba(12, 11, 14, 0.8), 0 0 1px 1px rgba(223, 130, 155, 0.08)`.
4. **Frosted Curtains (Modal / Float Panels):** Glass surfaces utilize `backdrop-filter: blur(24px)` coupled with `background: rgba(20, 19, 24, 0.72)` and an ultra-fine border: `1px solid rgba(200, 164, 93, 0.18)`.

## Shapes

The shape architecture is strictly **Sharp (`0`)**. 

All boundaries, containers, image frames, and interactive components feature clean `0px` corners. This sharp geometry reinforces architectural precision, gallery frames, and razor-cut couture tailoring. Interactive feedback is conveyed through border state transitions, color shifts, and inner stroke animations rather than rounded geometry.

## Components

### Buttons
- **Primary Action:** Solid raw silk background (`#f4f2f5`), obsidian monospace text (`#0c0b0e`), zero radius. On hover, background shifts to silk blush (`#ff7597`) with smooth 200ms transition.
- **Secondary / Atelier Action:** Obsidian background (`#141318`), 1px solid border in muted gold (`#c8a45d`), gold text. On hover, fills with delicate blush pink (`#df829b`) at 10% opacity, border brightening to full gold intensity.
- **Ghost Action:** Monospace uppercase with letter-spacing `0.16em`, underlined by a 1px border with a 4px gap. Hover triggers a subtle forward slide (`transform: translateX(4px)`).

### Input Fields & Selectors
- Flat obsidian background (`#141318`) with a bottom-only 1px hairline border (`#4a4652`).
- Focus state elevates the bottom border to couture gold (`#c8a45d`) with an auxiliary monospace label fading in above in blush (`#df829b`).
- Typography inside inputs defaults to `JetBrains Mono` for precise typographic alignment.

### Cards & Exhibition Panels
- Pure rectilinear frames (`0px` radius) with `1px` borders in `rgba(255, 255, 255, 0.06)`.
- Image containers maintain 4:5 or 1:1 gallery proportions with a slight desaturated overlay that lifts to full richness upon focus.
- Metadata bars run along the bottom of cards featuring item catalog number, edition status, and price, split by hairline rules.

### Chips & Badges
- Ultra-compact monospace badges with 1px hairline borders (`#c8a45d` for limited editions, `#4a4652` for standard catalog).
- Background uses transparent obsidian (`rgba(20, 19, 24, 0.6)`). No pill shapes; strictly rectangular.

### Checkboxes & Selection Controls
- Square 14px boxes, 1px solid border (`#8c8894`).
- Selected state fills with obsidian charcoal and renders an inner razor square in blush pink (`#ff7597`).

### Curatorial Index & Lists
- Table and list items are demarcated by horizontal hairlines (`1px solid rgba(255, 255, 255, 0.05)`).
- Hovering over a row highlights the index number in blush pink (`#df829b`) and reveals miniature floating visual previews anchored to the cursor.