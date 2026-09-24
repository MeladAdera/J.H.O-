import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { PageNav } from "@/components/shared/PageNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Page 3's own header. The three pages deliberately do not share one — see
   the note in README.md — but they do share the control cluster on the right. */

export function WorldHeader() {
  const t = useTranslations("world");
  const tBrand = useTranslations("brand");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-overlay backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3.5">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-surface p-0.5">
            <Image
              src="/images/logo.png"
              alt={tBrand("name")}
              width={36}
              height={36}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial-heading text-sm tracking-[0.2em] text-ink transition-colors group-hover:text-accent-ink sm:text-base">
              {tBrand("name")}
            </span>
            <span className="text-mono-telemetry text-[9px] uppercase text-ink-muted">
              {t("eyebrow")}
            </span>
          </div>
        </Link>

        <PageNav className="hidden md:flex" />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
