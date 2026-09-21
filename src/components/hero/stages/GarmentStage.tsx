import Image from "next/image";

/* Act 3 — the finished, physical garment.
   Ported from design-reference/code.html (Stage 3). */

export function GarmentStage() {
  return (
    <div data-stage="3" className="absolute inset-0 z-10 h-full w-full opacity-0">
      <Image
        data-garment-photo
        src="/images/hero-garment.jpg"
        alt="The finished garment — a custom bow rendered as a high-density puff print tee"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 620px"
        className="object-cover object-center contrast-[1.03]"
      />

      {/* Editorial lighting vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-lg border border-white/20 bg-black/60 px-3 py-1.5 font-atelier-mono text-[11px] text-white backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span>STAGE 03 // PHYSICAL PRODUCT VERIFIED</span>
      </div>

      <div className="absolute inset-x-5 bottom-5 z-20 flex items-end justify-between font-atelier-mono text-white">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-white/60">
            Specification Output
          </span>
          <p className="text-sm font-semibold tracking-wide text-white">
            360GSM French Terry • 3D Puff Embroidery
          </p>
          <p className="mt-0.5 text-xs text-atelier-pink-soft">
            Signature Atelier Bow Specimen #0884
          </p>
        </div>
        <div className="text-right">
          <span className="block text-[10px] uppercase tracking-widest text-white/60">
            Status
          </span>
          <span className="inline-block rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            1-OF-1 DELIVERED
          </span>
        </div>
      </div>
    </div>
  );
}
