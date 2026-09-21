import Link from "next/link";
import { CATALOG } from "@/data/catalog";

/* Placeholder for page 2. Replaced in Step 3 by the real archive journey.
   For now it verifies the archive-* tokens, the collection's three fonts,
   and that the typed CATALOG imports cleanly. */

export default function CollectionPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-archive-black px-6 text-archive-chalk">
      <div className="film-grain" aria-hidden="true" />

      <span className="rounded-full border border-archive-pink/30 bg-archive-pink/10 px-3 py-1 font-archive-mono text-[10px] uppercase tracking-[0.2em] text-archive-pink">
        Archive 2026 // Bespoke
      </span>

      <h1 className="text-center font-archive-serif text-5xl font-light tracking-tight sm:text-6xl">
        Specimen Archive
      </h1>

      <p className="max-w-lg text-center font-archive-sans text-sm font-light text-archive-muted">
        Step 1 placeholder — the gender → season → lookbook journey arrives in Step 3.
        {" "}
        <span className="text-archive-chalk">{CATALOG.length} specimens</span> loaded from
        the typed catalog.
      </p>

      <div className="flex gap-2">
        {[
          ["black", "bg-archive-black"],
          ["deep", "bg-archive-deep"],
          ["charcoal", "bg-archive-charcoal"],
          ["surface", "bg-archive-surface"],
          ["muted", "bg-archive-muted"],
          ["chalk", "bg-archive-chalk"],
          ["pink", "bg-archive-pink"],
          ["pink-soft", "bg-archive-pink-soft"],
        ].map(([name, cls]) => (
          <span
            key={name}
            title={name}
            className={`${cls} h-9 w-9 rounded border border-white/15`}
          />
        ))}
      </div>

      <nav className="flex gap-6 font-archive-mono text-xs uppercase tracking-wider">
        <Link href="/" className="text-archive-muted hover:text-archive-chalk">
          Hero
        </Link>
        <span className="underline decoration-archive-pink underline-offset-4">
          Our Collection
        </span>
        <Link href="/my-little-world" className="text-archive-muted hover:text-archive-chalk">
          My Little World
        </Link>
      </nav>
    </main>
  );
}
