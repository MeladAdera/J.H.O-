import { useTranslations } from "next-intl";
import { OVERSIZED_SCALES, REGULAR_SIZES } from "@/lib/types";
import type { Fit, SpecimenSize } from "@/lib/types";

/* The size module changes shape with the garment: tailored letter sizes for a
   regular cut, volumetric scale codes for an oversized one.
   Ported from design-reference/our collection.html (:1077-1145).

   The original compared rendered button text ("CODE 1") against state with
   endsWith to work out which pill was active. Here the value is compared
   directly, so that class of bug cannot happen. */

interface Props {
  fit: Fit;
  selected: SpecimenSize | null;
  onSelect: (size: SpecimenSize) => void;
}

export function SizeSelector({ fit, selected, onSelect }: Props) {
  const t = useTranslations("collection.modal");

  const pill = (isActive: boolean) =>
    [
      "flex h-10 items-center justify-center rounded-lg border font-archive-mono text-xs font-medium transition duration-200 focus:outline-none",
      isActive
        ? "border-archive-pink bg-archive-pink font-bold text-archive-black shadow-[0_0_15px_rgba(255,117,151,0.3)]"
        : "border-white/20 text-archive-chalk hover:border-archive-pink",
    ].join(" ");

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-archive-mono text-[10px] uppercase tracking-wider text-archive-chalk">
          {fit === "REGULAR" ? t("selectSize") : t("selectScale")}
        </span>
        <span className="font-archive-mono text-[9px] tracking-wide text-archive-pink">
          {fit === "REGULAR" ? t("sizeHelper") : t("scaleHelper")}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        {fit === "REGULAR"
          ? REGULAR_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onSelect(size)}
                aria-pressed={selected === size}
                className={`${pill(selected === size)} latin-telemetry w-12`}
              >
                {size}
              </button>
            ))
          : OVERSIZED_SCALES.map(({ code }) => (
              <button
                key={code}
                type="button"
                onClick={() => onSelect(code)}
                aria-pressed={selected === code}
                className={`${pill(selected === code)} gap-1 px-4`}
              >
                <span className="uppercase">{t("scaleGuide").replace(":", "")}</span>
                <strong className={selected === code ? "" : "text-archive-pink"}>{code}</strong>
              </button>
            ))}
      </div>

      {fit === "OVERSIZED" && (
        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 font-archive-mono text-[10px] leading-relaxed text-archive-muted">
          <span className="text-archive-pink">{t("scaleGuide")}</span>{" "}
          {OVERSIZED_SCALES.map(({ code }, index) => (
            <span key={code}>
              {index > 0 && " • "}
              <span className="latin-telemetry text-archive-chalk">{code}</span> ={" "}
              {t(`scale${code}` as "scale0" | "scale1" | "scale2")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
