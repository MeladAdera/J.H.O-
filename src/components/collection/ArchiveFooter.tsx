import { useTranslations } from "next-intl";

/* Ported from design-reference/our collection.html (footer). */

export function ArchiveFooter() {
  const tBrand = useTranslations("brand");

  return (
    <footer className="mt-12 w-full border-t border-line bg-ground px-6 py-8 font-archive-mono text-xs text-ink-muted md:px-12">
      <div className="mx-auto flex max-w-[1840px] flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="font-archive-serif text-sm font-medium uppercase tracking-[0.2em] text-ink">
            {tBrand("name")}
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent-ink">
            {tBrand("tagline")}
          </span>
        </div>

        {/* Coordinates and archive version are telemetry: Latin, left-to-right. */}
        <div className="latin-telemetry flex items-center gap-6 text-center text-[10px] uppercase tracking-wider text-ink-muted">
          <span>PARIS [48.8566° N]</span>
          <span className="text-ink-faint">•</span>
          <span>TOKYO [35.6762° N]</span>
          <span className="text-ink-faint">•</span>
          <span className="text-ink-muted">ARCHIVE SPECIMEN V2.6</span>
        </div>

        <div className="latin-telemetry text-[10px] tracking-wider text-ink-faint">
          © 2026 J.H.O ATELIER &amp; LAB. ALL SPECIMEN RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
