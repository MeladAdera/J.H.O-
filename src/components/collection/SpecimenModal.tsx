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
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim p-3 backdrop-blur-2xl md:p-8"
    >
      <div className="atelier-glass relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl border border-line-strong shadow-2xl md:flex-row">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute inset-e-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-on-photo/20 bg-photo-scrim/70 text-on-photo transition duration-300 hover:border-accent hover:text-accent focus:outline-none"
        >
          ✕
        </button>

        {/* Inspection view */}
        <div className="relative flex min-h-95 w-full items-center justify-center overflow-hidden border-b border-line bg-sunken md:min-h-145 md:w-1/2 md:border-b-0 md:border-e">
          <Image
            src={specimen.img}
            alt={specimen.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center brightness-95"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-photo-scrim/85 via-transparent to-photo-scrim/20" />
          <div className="absolute bottom-4 inset-s-4 rounded-full border border-on-photo/10 bg-photo-scrim/70 px-3 py-1.5 font-archive-mono text-[9px] uppercase tracking-widest text-on-photo/70 backdrop-blur-md">
            {t("telemetry")}
          </div>
        </div>

        {/* Dossier */}
        <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-10">
          <div>
            {/* pe-12 keeps the season badge clear of the close button, which
                sits in the same corner — they overlapped in the original. */}
            <div className="mb-3 flex items-center justify-between pe-12 font-archive-mono text-[11px] uppercase tracking-widest text-accent-ink">
              <span className="latin-telemetry">{specimen.code}</span>
              <span className="latin-telemetry">{specimen.season} 2026</span>
            </div>

            <h2 className="mb-2 font-archive-serif text-3xl font-light text-ink md:text-4xl">
              {specimen.title}
            </h2>
            <p className="mb-6 font-archive-mono text-xs tracking-wider text-ink-muted">
              {specimen.priceNote} {"//"} {t("commissionNote")}
            </p>

            <div className="mb-6 space-y-3.5 border-y border-line py-4 font-archive-sans text-xs">
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 font-archive-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {t("fabric")}
                </span>
                <span className="latin-telemetry text-end font-light text-ink">
                  {specimen.fabric}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-archive-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {t("silhouette")}
                </span>
                <span className="rounded-full border border-accent-ink bg-accent/10 px-2.5 py-0.5 font-archive-mono text-[10px] uppercase tracking-widest text-accent-ink">
                  {tLookbook(specimen.fit === "REGULAR" ? "regular" : "oversized")}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 font-archive-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  {t("artisan")}
                </span>
                <span className="text-end font-light text-ink-muted">
                  {t("artisanValue")}
                </span>
              </div>
            </div>

            <SizeSelector fit={specimen.fit} selected={size} onSelect={onSelectSize} />
          </div>

          <div className="space-y-3 border-t border-line pt-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-inverse px-6 py-3.5 font-archive-mono text-xs font-semibold uppercase tracking-widest text-on-accent shadow-[0_0_20px_var(--inverse-glow)] transition duration-300 hover:bg-accent focus:outline-none"
            >
              {t("commission")}
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-transparent px-6 py-2.5 font-archive-mono text-[11px] uppercase tracking-widest text-ink transition duration-300 hover:border-accent-ink hover:text-accent-ink focus:outline-none"
            >
              <span>{t("customize")}</span>
              <span className="text-[10px] text-accent-ink">✦</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
