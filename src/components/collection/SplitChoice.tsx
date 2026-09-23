import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ChoicePanel } from "@/data/panels";

/* One component for BOTH full-screen choice screens.

   design-reference/our collection.html duplicates this block twice — once for
   Women/Men (:215-291) and once for Summer/Winter (:305-363) — with identical
   markup and identical expand/collapse behaviour. Everything that genuinely
   differs is data in src/data/panels.ts, so the interaction is written once.

   Choosing a panel expands it to full width and collapses the other; the
   parent advances the stage once that transition has played. */

interface Props<T extends string> {
  panels: ChoicePanel<T>[];
  /** Latin telemetry prefix for the phase pill, e.g. "Phase 01 //". */
  phaseCode: string;
  phaseLabel: string;
  /** The chosen value, or null while the screen is still waiting. */
  chosen: T | null;
  onChoose: (value: T) => void;
}

export function SplitChoice<T extends string>({
  panels,
  phaseCode,
  phaseLabel,
  chosen,
  onChoose,
}: Props<T>) {
  const t = useTranslations("collection.panels");

  return (
    <section className="relative flex h-[calc(100vh-60px)] w-full flex-col overflow-hidden md:flex-row">
      {/* Phase indicator */}
      <div className="pointer-events-none absolute top-5 left-1/2 z-30 -translate-x-1/2 text-center">
        <div className="flex items-center gap-2 rounded-full border border-on-photo/10 bg-photo-scrim/85 px-4 py-1.5 font-archive-mono text-[9px] uppercase tracking-[0.3em] text-on-photo/70 shadow-2xl backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>
            <span className="latin-telemetry">{phaseCode}</span> {phaseLabel}
          </span>
        </div>
      </div>

      {panels.map((panel, index) => {
        const isChosen = chosen === panel.value;
        const isDismissed = chosen !== null && !isChosen;

        return (
          <button
            key={panel.value}
            type="button"
            onClick={() => onChoose(panel.value)}
            aria-label={t(`${panel.key}.title`)}
            className={[
              "split-panel group relative h-1/2 w-full flex-1 cursor-pointer overflow-hidden bg-sunken text-start md:h-full md:w-1/2",
              index === 0 ? "border-b border-on-photo/10 md:border-b-0 md:border-e" : "",
              isChosen ? "panel-expanded" : "",
              isDismissed ? "panel-collapsed" : "",
            ].join(" ")}
          >
            {/* Specimen photograph */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={panel.img}
                alt={t(`${panel.key}.title`)}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`specimen-img ${panel.objectClass} object-cover brightness-[0.88] contrast-[1.04] transition duration-1000 ease-atelier group-hover:brightness-100 group-hover:contrast-100`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-photo-scrim via-photo-scrim/45 to-photo-scrim/20 opacity-85 transition duration-700 group-hover:opacity-60" />
              <div
                className={`absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 ${panel.tintClass}`}
              />
            </div>

            {/* Technical index stamp. On desktop the second panel's badge
                starts just right of centre, where the phase pill sits, so it
                drops a line to clear it — in the original the two overlapped. */}
            <div
              className={`absolute inset-s-7 top-7 z-20 flex items-center gap-2.5 font-archive-mono text-[9px] uppercase tracking-[0.25em] text-on-photo/70 ${
                index === 1 ? "md:top-16" : ""
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${panel.dotClass}`} />
              <span className="text-on-photo/70">
                {panel.bracketed && "[ "}
                <span className="latin-telemetry">{panel.badgeCode}</span>{" "}
                {t(`${panel.key}.badge`)}
                {panel.bracketed && " ]"}
              </span>
            </div>

            {/* Vertical coordinates — gender panels only */}
            {panel.coordinates && (
              <div className="pointer-events-none absolute bottom-32 inset-s-8 z-20 hidden lg:block">
                <p className="text-vertical latin-telemetry font-archive-mono text-[9px] uppercase tracking-[0.45em] text-on-photo/35">
                  {panel.coordinates}
                </p>
              </div>
            )}

            {/* Title block */}
            <div className="absolute inset-x-6 bottom-8 z-20 flex items-end justify-between transition duration-500 md:inset-x-14">
              <div className="max-w-md transform transition duration-500 group-hover:-translate-y-1">
                <span className="mb-1.5 block font-archive-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  {t(`${panel.key}.kicker`)}
                </span>
                <h2 className="mb-3 font-archive-serif text-5xl font-light uppercase tracking-wide text-on-photo/90 transition duration-300 group-hover:text-on-photo sm:text-7xl lg:text-8xl">
                  {t(`${panel.key}.title`)}
                </h2>
                <p className="line-clamp-2 text-xs font-light leading-relaxed tracking-wide text-on-photo/70 sm:text-sm md:line-clamp-none">
                  {t(`${panel.key}.description`)}
                </p>
              </div>

              <div className="circle-reveal-btn ms-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-on-photo/25 bg-photo-scrim/40 text-on-photo backdrop-blur-md group-hover:shadow-[0_0_20px_var(--accent-glow-strong)]">
                <svg
                  className="arrow-ne h-4 w-4 -rotate-45 transition duration-500 group-hover:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                  />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </section>
  );
}
