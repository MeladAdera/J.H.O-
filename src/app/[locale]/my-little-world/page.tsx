import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

/* Placeholder for page 3. Replaced later by the real page and its Three.js
   diorama of the origin room. */

export default async function MyLittleWorldPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main
      data-skin="world"
      className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-ground px-6 text-ink"
    >
      <span className="latin-telemetry inline-flex items-center gap-2.5 border border-line bg-surface px-3.5 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.2em] text-gold">
        <span className="pulse-glow inline-block h-2 w-2 rounded-full bg-accent" />
        ORIGIN ARCHIVE • ROOM 402
      </span>

      <h1 className="font-editorial-heading text-center text-5xl font-normal tracking-tight sm:text-7xl">
        {t("myLittleWorld")}
      </h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>

      <nav className="flex gap-6 font-world-mono text-xs uppercase tracking-wider">
        <Link href="/" className="text-ink-muted hover:text-ink">
          {t("hero")}
        </Link>
        <Link href="/collection" className="text-ink-muted hover:text-ink">
          {t("collection")}
        </Link>
        <span className="text-ink underline decoration-accent-ink underline-offset-4">
          {t("myLittleWorld")}
        </span>
      </nav>
    </main>
  );
}
