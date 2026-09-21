import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";
import { CATALOG } from "@/data/catalog";

/* Placeholder for page 2. Replaced in the next step by the real archive
   journey: gender → season → lookbook → specimen dossier. */

export default async function CollectionPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-archive-black px-6 text-archive-chalk">
      <div className="film-grain" aria-hidden="true" />

      <span className="latin-telemetry rounded-full border border-archive-pink/30 bg-archive-pink/10 px-3 py-1 font-archive-mono text-[10px] uppercase tracking-[0.2em] text-archive-pink">
        ARCHIVE 2026 // BESPOKE
      </span>

      <h1 className="text-center font-archive-serif text-5xl font-light tracking-tight sm:text-6xl">
        {t("collection")}
      </h1>

      <p className="max-w-lg text-center font-archive-sans text-sm font-light text-archive-muted">
        {CATALOG.length} specimens loaded from the typed catalog.
      </p>

      <LocaleSwitcher theme="dark" />

      <nav className="flex gap-6 font-archive-mono text-xs uppercase tracking-wider">
        <Link href="/" className="text-archive-muted hover:text-archive-chalk">
          {t("hero")}
        </Link>
        <span className="underline decoration-archive-pink underline-offset-4">
          {t("collection")}
        </span>
        <Link href="/my-little-world" className="text-archive-muted hover:text-archive-chalk">
          {t("myLittleWorld")}
        </Link>
      </nav>
    </main>
  );
}
