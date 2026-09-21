import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/shared/LocaleSwitcher";

/* Placeholder for page 3. Replaced later by the real page and its Three.js
   diorama of the origin room. */

export default async function MyLittleWorldPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-surface-container-lowest px-6 text-on-background">
      <span className="latin-telemetry inline-flex items-center gap-2.5 border border-outline-variant/40 bg-surface-container px-3.5 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
        <span className="pulse-glow inline-block h-2 w-2 rounded-full bg-primary-container" />
        ORIGIN ARCHIVE • ROOM 402
      </span>

      <h1 className="font-editorial-heading text-center text-5xl font-normal tracking-tight sm:text-7xl">
        {t("myLittleWorld")}
      </h1>

      <LocaleSwitcher theme="dark" />

      <nav className="flex gap-6 font-world-mono text-xs uppercase tracking-wider">
        <Link href="/" className="text-outline hover:text-on-surface">
          {t("hero")}
        </Link>
        <Link href="/collection" className="text-outline hover:text-on-surface">
          {t("collection")}
        </Link>
        <span className="text-on-surface underline decoration-primary underline-offset-4">
          {t("myLittleWorld")}
        </span>
      </nav>
    </main>
  );
}
