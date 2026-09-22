"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Specimen, SpecimenSize } from "@/lib/types";
import { SizeSelector } from "./SizeSelector";

/* Stage 4 — the tailoring dossier.
   Ported from design-reference/our collection.html (:567-643, openModal).

   The original set document.body.style.overflow on open and cleared it on
   close, so navigating away while the dialog was open left the page
   permanently unscrollable. Here the lock lives in an effect whose cleanup
   always restores the previous value. */

interface Props {
  specimen: Specimen;
  size: SpecimenSize | null;
  onSelectSize: (size: SpecimenSize) => void;
  onClose: () => void;
}

export function SpecimenModal({ specimen, size, onSelectSize, onClose }: Props) {
  const t = useTranslations("collection.modal");
  const tLookbook = useTranslations("collection.lookbook");
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock scrolling while open; always restore, even if unmounted mid-open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Escape closes; focus starts on the close button.
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={specimen.title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-2xl md:p-8"
    >
      <div className="atelier-glass relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-white/15 shadow-2xl md:flex-row">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute inset-e-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-archive-muted transition duration-300 hover:border-archive-pink hover:text-archive-pink focus:outline-none"
        >
          ✕
        </button>

        {/* Inspection view */}
        <div className="relative flex min-h-95 w-full items-center justify-center overflow-hidden border-b border-white/10 bg-archive-deep md:min-h-145 md:w-1/2 md:border-b-0 md:border-e">
          <Image
            src={specimen.img}
            alt={specimen.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center brightness-95"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/20" />
          <div className="absolute bottom-4 inset-s-4 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-archive-mono text-[9px] uppercase tracking-widest text-archive-muted backdrop-blur-md">
            {t("telemetry")}
          </div>
        </div>

        {/* Dossier */}
        <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-10">
          <div>
            {/* pe-12 keeps the season badge clear of the close button, which
                sits in the same corner — they overlapped in the original. */}
            <div className="mb-3 flex items-center justify-between pe-12 font-archive-mono text-[11px] uppercase tracking-widest text-archive-pink">
              <span className="latin-telemetry">{specimen.code}</span>
              <span className="latin-telemetry">{specimen.season} 2026</span>
            </div>

            <h2 className="mb-2 font-archive-serif text-3xl font-light text-archive-chalk md:text-4xl">
              {specimen.title}
            </h2>
            <p className="mb-6 font-archive-mono text-xs tracking-wider text-white/50">
              {specimen.priceNote} {"//"} {t("commissionNote")}
            </p>

            <div className="mb-6 space-y-3.5 border-y border-white/10 py-4 font-archive-sans text-xs">
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 font-archive-mono text-[10px] uppercase tracking-wider text-archive-muted">
                  {t("fabric")}
                </span>
                <span className="latin-telemetry text-end font-light text-archive-chalk">
                  {specimen.fabric}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-archive-mono text-[10px] uppercase tracking-wider text-archive-muted">
                  {t("silhouette")}
                </span>
                <span className="rounded-full border border-archive-pink/30 bg-archive-pink/10 px-2.5 py-0.5 font-archive-mono text-[10px] uppercase tracking-widest text-archive-pink">
                  {tLookbook(specimen.fit === "REGULAR" ? "regular" : "oversized")}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 font-archive-mono text-[10px] uppercase tracking-wider text-archive-muted">
                  {t("artisan")}
                </span>
                <span className="text-end font-light text-archive-chalk/80">
                  {t("artisanValue")}
                </span>
              </div>
            </div>

            <SizeSelector fit={specimen.fit} selected={size} onSelect={onSelectSize} />
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-archive-chalk px-6 py-3.5 font-archive-mono text-xs font-semibold uppercase tracking-widest text-archive-black shadow-[0_0_20px_rgba(245,245,247,0.2)] transition duration-300 hover:bg-archive-pink focus:outline-none"
            >
              {t("commission")}
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-2.5 font-archive-mono text-[11px] uppercase tracking-widest text-archive-chalk transition duration-300 hover:border-archive-pink-soft hover:text-archive-pink-soft focus:outline-none"
            >
              <span>{t("customize")}</span>
              <span className="text-[10px] text-archive-pink">✦</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
