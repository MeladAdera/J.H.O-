import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { PageNav } from "@/components/shared/PageNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Ported from design-reference/our collection.html (header).

   The original carried live journey breadcrumbs across the middle. They are
   gone: the centre is the one place on this page wide enough for the site
   navigation, and the breadcrumbs were competing with it.

   They did carry one thing worth keeping, though — they were the only way
   back through the journey. That survives as the reset control, which appears
   only once a choice has been made. */

interface Props {
  /** True once the visitor has chosen at least a gender. */
  canReset: boolean;
  onReset: () => void;
}

export function ArchiveHeader({ canReset, onReset }: Props) {
  const t = useTranslations("collection");
  const tBrand = useTranslations("brand");

  return (
    <header className="atelier-glass fixed inset-x-0 top-0 z-50 px-4 py-3.5 md:px-8">
      <div className="mx-auto flex max-w-[1840px] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3.5 focus:outline-none">
          <Image
            src="/images/logo.png"
            alt={tBrand("name")}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full border border-accent-ink object-cover shadow-[0_0_12px_var(--accent-glow)] transition duration-300 group-hover:border-accent-ink"
          />
          <div className="flex flex-col">
            <span className="font-archive-serif text-sm font-medium uppercase tracking-[0.24em] text-ink transition group-hover:text-accent-ink md:text-base">
              {tBrand("name")}
            </span>
            <span className="font-archive-mono text-[9px] uppercase tracking-widest text-ink-muted">
              {t("subtitle")}
            </span>
          </div>
        </Link>

        <PageNav className="hidden md:flex" />

        <div className="flex items-center gap-3">
          {/* The journey's only way back, now that the breadcrumbs are gone.
              Hidden until there is something to undo, so the opening screen
              stays as quiet as it was. */}
          {canReset && (
            <button
              type="button"
              onClick={onReset}
              className="latin-telemetry hidden items-center gap-2 border border-line px-3 py-1.5 font-archive-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:border-accent-ink hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink sm:inline-flex"
            >
              <span className="flip-arrow">&larr;</span>
              {t("reset")}
            </button>
          )}
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
