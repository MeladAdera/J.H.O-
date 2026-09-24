import Image from "next/image";
import { useTranslations } from "next-intl";
import type { HeroStage } from "@/lib/types";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Ported from design-reference/code.html (header). The telemetry stepper
   tracks the live stage: completed steps go green, the current one pink. */

const STEPS: { stage: HeroStage; key: "sketch" | "vector" | "shirt" }[] = [
  { stage: 1, key: "sketch" },
  { stage: 2, key: "vector" },
  { stage: 3, key: "shirt" },
];

interface Props {
  stage: HeroStage;
  onJump: (stage: HeroStage) => void;
}

export function HeroHeader({ stage, onJump }: Props) {
  const t = useTranslations("hero");
  const tBrand = useTranslations("brand");

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b border-line bg-overlay px-6 py-4 backdrop-blur-md lg:px-14">
      <div className="flex items-center gap-4">
        {/* The mark is a self-contained opaque disc, so it reads on any
            ground. Only its ring follows the theme — plus the archive's pink
            halo, which needs a dark room to be visible at all. */}
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-surface p-0.5 shadow-sm dark:shadow-[0_0_12px_var(--accent-glow)]">
          <Image
            src="/images/logo.png"
            alt={tBrand("name")}
            width={36}
            height={36}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <span className="font-atelier-mono text-xs font-semibold uppercase tracking-wider text-ink">
            {tBrand("name")}
          </span>
          {/* Coordinates are telemetry: they stay Latin and left-to-right. */}
          <p className="latin-telemetry font-atelier-mono text-[11px] text-ink-muted">
            Latakia / SYRIA  •
          </p>
        </div>
      </div>

      {/* Live stage stepper */}
      <div className="hidden items-center gap-1.5 rounded-full border border-line bg-overlay px-3 py-1.5 shadow-sm backdrop-blur-sm md:flex">
        {STEPS.map(({ stage: step, key }, index) => {
          const isDone = step < stage;
          const isCurrent = step === stage;
          return (
            <div key={step} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="flip-arrow font-atelier-mono text-[10px] text-ink-faint">
                  →
                </span>
              )}
              <button
                type="button"
                onClick={() => onJump(step)}
                aria-current={isCurrent ? "step" : undefined}
                className="flex items-center gap-2 rounded-full px-3 py-1 font-atelier-mono text-xs transition-all duration-300"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isCurrent
                      ? "bg-accent"
                      : isDone
                        ? "bg-signal-ok"
                        : "bg-ink-faint"
                  }`}
                />
                <span
                  className={`uppercase transition-colors ${
                    isCurrent
                      ? "font-semibold text-ink"
                      : isDone
                        ? "font-medium text-ink"
                        : "font-medium text-ink-muted"
                  }`}
                >
                  <span className="latin-telemetry">{`0${step}.`}</span> {t(`steps.${key}`)}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 font-atelier-mono text-xs uppercase text-ink-muted sm:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-signal-ok" />
          <span>{t("commissionsOpen")}</span>
        </div>
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
