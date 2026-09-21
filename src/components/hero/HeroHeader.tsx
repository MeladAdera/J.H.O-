import Image from "next/image";
import { useTranslations } from "next-intl";
import type { HeroStage } from "@/lib/types";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";

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
    <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b border-black/[0.07] bg-atelier-canvas/80 px-6 py-4 backdrop-blur-md lg:px-14">
      <div className="flex items-center gap-4">
        <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-black/10 bg-white p-0.5 shadow-sm">
          <Image
            src="/images/logo.png"
            alt={tBrand("name")}
            width={36}
            height={36}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <span className="font-atelier-mono text-xs font-semibold uppercase tracking-wider text-atelier-dark">
            {tBrand("name")}
          </span>
          {/* Coordinates are telemetry: they stay Latin and left-to-right. */}
          <p className="latin-telemetry font-atelier-mono text-[11px] text-atelier-muted">
            Latakia / SYRIA  •
          </p>
        </div>
      </div>

      {/* Live stage stepper */}
      <div className="hidden items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/85 px-3 py-1.5 shadow-sm md:flex">
        {STEPS.map(({ stage: step, key }, index) => {
          const isDone = step < stage;
          const isCurrent = step === stage;
          return (
            <div key={step} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="flip-arrow font-atelier-mono text-[10px] text-atelier-muted/40">
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
                      ? "bg-atelier-pink"
                      : isDone
                        ? "bg-emerald-500"
                        : "bg-atelier-muted/40"
                  }`}
                />
                <span
                  className={`uppercase transition-colors ${
                    isCurrent
                      ? "font-semibold text-atelier-dark"
                      : isDone
                        ? "font-medium text-atelier-dark"
                        : "font-medium text-atelier-muted"
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
        <div className="hidden items-center gap-2 font-atelier-mono text-xs uppercase text-atelier-muted sm:flex">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{t("commissionsOpen")}</span>
        </div>
        <LocaleSwitcher theme="light" />
      </div>
    </header>
  );
}
