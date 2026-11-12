import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FIRST_LOOK_CARDS, FIRST_LOOK_LEAD, type FirstLookPhoto } from "@/data/firstLook";
import { GinghamBow, RibbonCorner, SatinBow, ScrapDefs, TeeSketch, Watercolor } from "./Decorations";

/* The home page's second section: a first look at the products, pinned to a
   scrapbook sheet. Design: option A ("Pinboard") on the design canvas.

   The sheet is a raised surface on the drafting table: paper by day, a dark
   sheet at night. Everything on it paints with the --paper-* tokens from
   .scrap-sheet (globals.css), never the roles, so the scrapbook's
   materials switch with the mode together with the text.

   Two compositions, one shown at a time:
   - from lg up, the collage, laid out in the 1440px comp's own coordinates
     and converted to container-query units, so the whole sheet scales as one
     piece and nothing drifts apart between 1024 and 1440;
   - below lg, a single column: the cards zig-zag, tilt and overlap, with one
     strip of tape each, and the figures are dropped.

   Positions use inset-inline-start, so the collage mirrors in Arabic by
   itself; tilts flip through .scrap-tilt. The photographs and the pencil
   sketches never mirror. They are pictures of real things. */

/** A length in the 1440px comp, as container-query units of the stage. */
const u = (px: number) => `${+(px / 14.4).toFixed(3)}cqw`;

/** Absolute placement in comp coordinates. */
function place(x: number, y: number, w?: number, h?: number): CSSProperties {
  return {
    position: "absolute",
    insetInlineStart: u(x),
    top: u(y),
    ...(w !== undefined && { width: u(w) }),
    ...(h !== undefined && { height: u(h) }),
  };
}

/** A positioned box for a piece of SVG artwork. The box carries the
    placement, not the <svg>: globals.css gives every svg direction:ltr in
    Arabic, and inset-inline-start resolves against the element's OWN
    direction, so an svg placed directly would stay put while the rest of
    the collage mirrors around it (the same trap as .latin-telemetry). */
function At({ style, className, children }: { style?: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={className} style={style}>
      {children}
    </div>
  );
}

const art = "block h-full w-full";

const tilt = (deg: number) => ({ "--tilt": `${deg}deg` }) as CSSProperties;

/** Four strips of tape over a frame's corners, sized in comp units. */
function CornerTape() {
  const size = { width: u(92), height: u(30) };
  return (
    <>
      <span aria-hidden="true" className="scrap-tape scrap-tilt" style={{ ...size, ...tilt(-42), insetInlineStart: u(-46), top: u(-15) }} />
      <span aria-hidden="true" className="scrap-tape scrap-tilt" style={{ ...size, ...tilt(42), insetInlineEnd: u(-46), top: u(-15) }} />
      <span aria-hidden="true" className="scrap-tape scrap-tilt" style={{ ...size, ...tilt(42), insetInlineStart: u(-46), bottom: u(-15) }} />
      <span aria-hidden="true" className="scrap-tape scrap-tilt" style={{ ...size, ...tilt(-42), insetInlineEnd: u(-46), bottom: u(-15) }} />
    </>
  );
}

/** One strip across the top edge: the phone's single piece of tape. */
function TopTape({ deg = 0 }: { deg?: number }) {
  return (
    <span
      aria-hidden="true"
      className="scrap-tape scrap-tilt -top-3 left-1/2 h-6.5 w-20 -translate-x-1/2"
      style={tilt(deg)}
    />
  );
}

/** The code chip in a card's corner. Telemetry, so it stays Latin. */
function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="absolute inset-s-2 bottom-2 max-w-[calc(100%-1rem)] truncate bg-(--paper) px-1.5 py-0.5 font-atelier-mono text-[9px] whitespace-nowrap tracking-widest text-(--paper-ink) uppercase">
      <span className="latin-telemetry">{children}</span>
    </span>
  );
}

const ctaClass =
  "inline-flex h-12 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-(--paper-ink) px-7 font-atelier-mono text-[13px] font-medium tracking-wider text-(--paper) uppercase shadow-lg shadow-black/10 transition-colors duration-300 hover:bg-(--paper-accent) hover:text-(--paper) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--paper-accent)";

export function FirstLook() {
  const t = useTranslations("firstLook");
  const alt = (p: FirstLookPhoto) => t(`items.${p.key}.alt`);

  return (
    <section id="first-look" aria-label={t("label")} className="relative px-3 py-16 sm:px-6 lg:px-10 lg:py-24">
      <div className="scrap-sheet relative mx-auto w-full max-w-360 overflow-hidden">
        {/* Inside the sheet, so the gingham ribbon's pattern resolves the
            sheet's --gingham-* tokens for the current mode. */}
        <ScrapDefs />

        {/* ---------------------------------------------------------------
            Phone and tablet: one column
            --------------------------------------------------------------- */}
        <div className="mx-auto flex max-w-sm flex-col px-4 pt-10 pb-24 lg:hidden">
          <At className="absolute inset-e-2 top-2 w-24 rtl:-scale-x-100">
            <RibbonCorner className={art} />
          </At>

          <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2.5 font-atelier-serif text-[44px] leading-[1.05] text-(--paper-accent) italic">
            {t("title")}
          </h2>
          <p className="mt-2.5 max-w-65 font-atelier-sans text-[15px] leading-normal text-(--paper-muted)">
            {t("lede")}
          </p>

          <div className="scrap-gingham relative mx-auto mt-7 aspect-square w-[80%]">
            <figure
              className="scrap-shadow scrap-tilt absolute inset-x-[11%] top-[7%] bottom-[4%] m-0 flex flex-col bg-(--paper-card) p-3 pb-0"
              style={tilt(-2)}
            >
              <div className="relative flex-1">
                <Image src={FIRST_LOOK_LEAD.img} alt={alt(FIRST_LOOK_LEAD)} fill sizes="260px" className="object-cover" />
              </div>
              <figcaption className="py-2.5 text-center font-atelier-serif text-[15px] text-(--paper-muted) italic">
                {t(`items.${FIRST_LOOK_LEAD.key}.name`)}
              </figcaption>
              <TopTape deg={-3} />
            </figure>
          </div>

          <Watercolor band className="mt-7 h-11 w-full" />

          {/* Each card lies on top of the next, so the overlap hides the next
              card's top edge rather than this card's code chip. */}
          <ul className="mt-6 flex flex-col" role="list">
            {FIRST_LOOK_CARDS.map((p, i) => (
              <li
                key={p.key}
                className={`scrap-tilt relative aspect-23/29 w-[62%] ${i ? "-mt-6" : ""} ${i % 2 ? "self-end" : "self-start"}`}
                style={{ ...tilt([-2, 2, -1.5, 2][i]), zIndex: FIRST_LOOK_CARDS.length - i }}
              >
                <figure className="scrap-shadow relative m-0 h-full overflow-hidden border border-(--paper-edge) bg-(--paper-card)">
                  <Image src={p.img} alt={alt(p)} fill sizes="240px" className="object-cover" />
                  <figcaption>
                    <Chip>{`${p.code} · ${t(`items.${p.key}.name`)}`}</Chip>
                  </figcaption>
                </figure>
                <TopTape />
              </li>
            ))}
          </ul>

          <aside className="scrap-shadow scrap-tilt relative mt-12 flex flex-col gap-2.5 bg-(--paper-note) px-6 py-8" style={tilt(-1)}>
            <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-accent) uppercase rtl:tracking-normal">
              {t("note.eyebrow")}
            </p>
            <p className="font-atelier-serif text-2xl leading-tight italic">{t("note.title")}</p>
            <p className="font-atelier-sans text-[15px] leading-relaxed text-(--paper-ink-soft)">{t("note.body")}</p>
            <TopTape deg={2} />
          </aside>
          <At className="relative -mt-7 me-9 w-26 self-end">
            <SatinBow className={art} />
          </At>

          <div className="mt-6 flex items-center justify-center gap-1.5">
            <GinghamBow className="w-16 shrink-0" />
            <div className="flex flex-col items-center gap-0.5 text-center font-atelier-mono text-[10px] tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal">
              <span>{t("brand")}</span>
              <span>{t("season")}</span>
            </div>
            <GinghamBow className="w-16 shrink-0" />
          </div>
          <div aria-hidden="true" className="mx-5 mt-4 h-0.75 bg-(--paper-rule)" />
          <Link href="/collection" className={`${ctaClass} mt-6 w-full`}>
            {t("cta")}
          </Link>

          <At className="absolute inset-s-1.5 bottom-1.5 w-22 -scale-y-100 rtl:-scale-x-100">
            <RibbonCorner className={art} />
          </At>
        </div>

        {/* ---------------------------------------------------------------
            Desktop: the collage, in comp coordinates
            --------------------------------------------------------------- */}
        {/* pb-10: the button keeps its 48px while the stage scales down, so
            it needs room below the comp's own foot at 1024. */}
        <div className="@container hidden pb-10 lg:block">
          <div className="relative" style={{ height: u(1080) }}>
            <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal" style={place(64, 40)}>
              {t("eyebrow")}
            </p>

            {/* The title block sits at the foot of the sheet, between the
                bows, but comes first in the document so it heads the section
                for anyone reading rather than looking. */}
            <div className="flex flex-col items-center gap-1 text-center" style={{ position: "absolute", insetInline: 0, top: u(886) }}>
              <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal">{t("brand")}</p>
              <h2
                className="font-atelier-serif leading-[1.1] text-(--paper-accent) italic"
                style={{ fontSize: `clamp(26px, ${u(34)}, 34px)` }}
              >
                {t("title")}
              </h2>
              <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal">{t("season")}</p>
            </div>

            <aside
              className="scrap-shadow flex flex-col bg-(--paper-note)"
              style={{ ...place(1076, 300, 260), minHeight: u(300), padding: `${u(40)} ${u(28)}`, gap: u(12) }}
            >
              <p className="font-atelier-mono text-[10px] tracking-widest text-(--paper-accent) uppercase rtl:tracking-normal">{t("note.eyebrow")}</p>
              <p className="font-atelier-serif leading-tight italic" style={{ fontSize: `clamp(18px, ${u(24)}, 24px)` }}>
                {t("note.title")}
              </p>
              <p className="font-atelier-sans leading-relaxed text-(--paper-ink-soft)" style={{ fontSize: `clamp(13px, ${u(14)}, 14px)` }}>
                {t("note.body")}
              </p>
              <CornerTape />
              {/* Hangs off the card's foot, so it follows the card when the
                  note runs longer at narrow widths instead of covering it. */}
              <At style={{ position: "absolute", insetInlineStart: u(42), top: `calc(100% - ${u(34)})`, width: u(170), height: u(212) }}>
                <SatinBow className={art} />
              </At>
            </aside>

            <At className="rtl:-scale-x-100" style={place(1256, 14, 160, 180)}>
              <RibbonCorner className={art} />
            </At>
            <At className="-scale-y-100 rtl:-scale-x-100" style={place(24, 880, 150, 170)}>
              <RibbonCorner className={art} />
            </At>

            <div aria-hidden="true" className="scrap-gingham" style={place(190, 170, 360, 360)} />
            <At style={place(36, 470, 200, 240)}>
              <Watercolor className={art} />
            </At>

            <figure
              className="scrap-shadow m-0 flex flex-col bg-(--paper-card)"
              style={{ ...place(240, 196, 260, 308), padding: `${u(14)} ${u(14)} 0` }}
            >
              <div className="relative flex-1">
                <Image src={FIRST_LOOK_LEAD.img} alt={alt(FIRST_LOOK_LEAD)} fill sizes="18vw" className="object-cover" />
              </div>
              <figcaption
                className="text-center font-atelier-serif text-(--paper-muted) italic"
                style={{ fontSize: `clamp(13px, ${u(17)}, 17px)`, paddingBlock: u(13) }}
              >
                {t(`items.${FIRST_LOOK_LEAD.key}.name`)}
              </figcaption>
              <CornerTape />
            </figure>

            {/* The pencil figures: the hero's sketch hand, standing in for
                the illustrated figures of the moodboard. */}
            <At className="text-(--paper-sketch)" style={place(606, 110, 160, 170)}>
              <TeeSketch className={art} />
            </At>
            <p className="font-atelier-mono text-[10px] leading-relaxed tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal" style={place(606, 292, 170)}>
              {t("fig1.label")}
              <br />
              {t("fig1.caption")}
            </p>
            <At className="text-(--paper-sketch)" style={place(616, 500, 160, 170)}>
              <TeeSketch sleeve="long" className={art} />
            </At>
            <p className="font-atelier-mono text-[10px] leading-relaxed tracking-widest text-(--paper-muted) uppercase rtl:tracking-normal" style={place(616, 682, 170)}>
              {t("fig2.label")}
              <br />
              {t("fig2.caption")}
            </p>

            <div aria-hidden="true" className="bg-(--paper-rule)" style={place(796, 200, 3, 500)} />

            <ul role="list">
              {FIRST_LOOK_CARDS.map((p, i) => {
                const box = [
                  [186, 560, 168, 246],
                  [366, 560, 210, 310],
                  [806, 60, 220, 420],
                  [806, 494, 220, 376],
                ][i];
                return (
                  <li key={p.key} style={place(box[0], box[1], box[2], box[3])}>
                    <figure className="relative m-0 h-full overflow-hidden border border-(--paper-edge) bg-(--paper-card)">
                      <Image src={p.img} alt={alt(p)} fill sizes="16vw" className="object-cover" />
                      <figcaption>
                        <Chip>{p.code}</Chip>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>

            <At style={place(486, 902, 150, 64)}>
              <GinghamBow className={art} />
            </At>
            <At style={place(864, 902, 150, 64)}>
              <GinghamBow className={art} />
            </At>
            <div aria-hidden="true" className="bg-(--paper-rule)" style={place(450, 984, 600, 3)} />
            <div className="flex justify-center" style={{ position: "absolute", insetInline: 0, top: u(1004) }}>
              <Link href="/collection" className={ctaClass}>
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
