"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/* The closing block, from design-reference/my little world.html:1184-1213:
   the room's story turned toward the collection, with the two things a
   reader might do next — go there, or go back up and look again. The "402"
   watermark is the room number, set huge and nearly invisible, as the
   reference has it. */

export function OriginEpilogue({ onRecenter }: { onRecenter: () => void }) {
  const t = useTranslations("world.epilogue");

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden border border-line bg-surface p-8 shadow-2xl sm:p-12 lg:p-16">
        <div className="relative z-10 flex max-w-3xl flex-col gap-6">
          <span className="text-mono-telemetry text-[11px] uppercase text-accent-ink">
            {t("eyebrow")}
          </span>
          <h3 className="font-editorial-heading text-3xl text-balance text-ink sm:text-4xl">
            {t("title")}
          </h3>
          <p className="font-world-serif text-lg leading-relaxed text-ink-muted">{t("body")}</p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 bg-inverse px-8 py-3.5 font-atelier-mono text-xs uppercase tracking-widest text-on-inverse shadow-md transition-all duration-300 hover:bg-accent hover:text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              {t("discover")}
              <span className="flip-arrow inline-block" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={onRecenter}
              className="inline-flex items-center gap-2 border border-line bg-sunken px-6 py-3.5 font-atelier-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {t("recenter")}
            </button>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="latin-telemetry pointer-events-none absolute -end-6 -bottom-10 font-editorial-heading text-[180px] leading-none text-ink opacity-5 select-none"
        >
          402
        </div>
      </div>
    </section>
  );
}
