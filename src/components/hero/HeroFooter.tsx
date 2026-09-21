import { useTranslations } from "next-intl";
import type { HeroStage } from "@/lib/types";

/* Telemetry bar. Ported from design-reference/code.html (footer). */

const STAGE_KEY: Record<HeroStage, "sketch" | "vector" | "shirt"> = {
  1: "sketch",
  2: "vector",
  3: "shirt",
};

export function HeroFooter({ stage }: { stage: HeroStage }) {
  const t = useTranslations("hero");

  return (
    <footer className="z-20 flex w-full flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] bg-white/70 px-6 py-3 font-atelier-mono text-[11px] uppercase text-atelier-muted backdrop-blur-sm lg:px-14">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 font-medium text-atelier-dark">
          <span className="h-2 w-2 rounded-full bg-atelier-pink" />
          <span>{t("footer.lab")}</span>
        </span>
        <span className="hidden text-black/20 sm:inline">|</span>
        <span className="hidden sm:inline">{t("footer.cycle")}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-black/40">{t("footer.transformation")}</span>
          <span className="font-semibold text-atelier-dark">
            <span className="latin-telemetry">{`0${stage}`}</span>{" "}
            {t(`steps.${STAGE_KEY[stage]}`)}
          </span>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <span className="text-black/40">{t("footer.latency")}</span>
          <span className="font-medium text-emerald-600">{t("footer.archive")}</span>
        </div>
        <a
          href="#start"
          className="font-medium underline decoration-atelier-pink underline-offset-4 transition-colors hover:text-black"
        >
          {t("footer.submit")}
        </a>
      </div>
    </footer>
  );
}
