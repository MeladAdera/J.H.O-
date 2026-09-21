import Image from "next/image";
import { useTranslations } from "next-intl";

/* Act 3 — the finished, physical garment.
   Ported from design-reference/code.html (Stage 3). */

export function GarmentStage() {
  const t = useTranslations("hero.garmentStage");

  return (
    <div data-stage="3" className="absolute inset-0 z-10 h-full w-full opacity-0">
      <Image
        data-garment-photo
        src="/images/hero-garment.jpg"
        alt={t("signature")}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 620px"
        className="object-cover object-center contrast-[1.03]"
      />

      {/* Editorial lighting vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      <div className="absolute start-4 top-4 z-20 flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 font-atelier-mono text-[11px] uppercase text-white backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span>
          <span className="latin-telemetry">STAGE 03 //</span> {t("verified")}
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-20 flex items-end justify-between font-atelier-mono text-white">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-white/60">
            {t("specLabel")}
          </span>
          {/* Fabric spec is measurement data — stays Latin and LTR. */}
          <p className="latin-telemetry text-sm font-semibold tracking-wide text-white">
            360GSM French Terry • 3D Puff Embroidery
          </p>
          <p className="mt-0.5 text-xs text-atelier-pink-soft">
            {t("signature")} <span className="latin-telemetry">#0884</span>
          </p>
        </div>
        <div className="text-end">
          <span className="block text-[10px] uppercase tracking-widest text-white/60">
            {t("statusLabel")}
          </span>
          <span className="inline-block rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium uppercase text-emerald-300">
            {t("status")}
          </span>
        </div>
      </div>
    </div>
  );
}
