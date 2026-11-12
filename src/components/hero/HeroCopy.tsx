import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { HeroStage } from "@/lib/types";

/* The editorial column: headline, call to action, the manual stage pills and
   the phase footnotes. Ported from design-reference/code.html (left column). */

const PILLS: { stage: HeroStage; key: "sketch" | "design" | "shirt" }[] = [
  { stage: 1, key: "sketch" },
  { stage: 2, key: "design" },
  { stage: 3, key: "shirt" },
];

const PHASES = [
  { key: "one", accent: false },
  { key: "two", accent: false },
  { key: "three", accent: true },
] as const;

interface Props {
  stage: HeroStage;
  onJump: (stage: HeroStage) => void;
  onRestart: () => void;
}

export function HeroCopy({ stage, onJump, onRestart }: Props) {
  const t = useTranslations("hero");

  return (
    <div className="z-20 flex flex-col">
      <div className="mb-6 inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3.5 py-1.5 shadow-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        <span className="font-atelier-mono text-[11px] font-medium uppercase tracking-wider text-ink">
          {t("badge.flow")}
        </span>
        <span className="text-[10px] text-ink-faint">|</span>
        <span className="font-atelier-mono text-[10px] uppercase text-ink-muted">
          {t("badge.bespoke")}
        </span>
      </div>

      {/* The italic line uses accent-ink, not accent: at display size the
          brand pink is still only 2.3:1 on paper. accent-ink keeps the hue
          and clears AA. */}
      <h1 className="font-atelier-sans text-4xl font-bold uppercase leading-[1.03] tracking-tight text-ink sm:text-5xl xl:text-6xl 2xl:text-7xl">
        {t("headline.line1")}
        <span className="block py-1 pe-2 font-atelier-serif text-5xl font-normal italic lowercase tracking-normal text-accent-ink sm:text-6xl xl:text-7xl 2xl:text-8xl">
          {t("headline.line2")}
        </span>
      </h1>

      <p className="mt-6 max-w-lg font-atelier-sans text-base leading-relaxed text-ink-muted sm:text-lg">
        {t("intro")}
      </p>

      <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        {/* shrink-0 matters: overflow-hidden zeroes a flex item's automatic
            min-width, so without it the button squeezes below its own text
            and clips it. */}
        <Link
          href="/collection"
          className="group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-xl bg-inverse px-7 py-4 font-atelier-mono text-sm uppercase tracking-wider text-on-inverse shadow-lg shadow-black/10 transition-all duration-300 hover:gap-4 hover:bg-accent-ink hover:text-on-accent active:scale-95"
        >
          <span className="relative z-10 whitespace-nowrap font-medium">{t("cta")}</span>
          <div className="absolute inset-0 bg-linear-to-r from-accent-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Manual stage controls — these pause the loop */}
        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-surface p-1.5 shadow-sm">
          {PILLS.map(({ stage: pill, key }) => (
            <button
              key={pill}
              type="button"
              onClick={() => onJump(pill)}
              aria-pressed={pill === stage}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-atelier-mono text-xs font-medium transition-all ${
                pill === stage
                  ? "bg-inverse text-on-inverse shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <span className="latin-telemetry">{`0${pill}`}</span>
              <span>{t(`pills.${key}`)}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onRestart}
            title={t("pills.replay")}
            aria-label={t("pills.replay")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-ink-muted transition-all hover:bg-ink/5 hover:text-ink"
          >
            ↻
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 font-atelier-mono text-[11px]">
        {PHASES.map(({ key, accent }, index) => (
          <div key={key}>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">
              <span className="latin-telemetry">{`0${index + 1}`}</span>
            </div>
            <div className={`mt-0.5 font-medium ${accent ? "text-accent-ink" : "text-ink"}`}>
              {t(`phases.${key}.title`)}
            </div>
            <div className="mt-0.5 text-[10px] text-ink-muted">{t(`phases.${key}.note`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
