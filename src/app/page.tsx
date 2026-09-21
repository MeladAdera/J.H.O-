import Link from "next/link";

/* Placeholder for page 1. Replaced in Step 2 by the real hero.
   For now it verifies that the atelier-* colour tokens and the hero's four
   fonts resolve. */

export default function HeroPage() {
  return (
    <main className="draft-canvas-grid flex min-h-screen flex-1 flex-col items-center justify-center gap-8 px-6 text-atelier-dark">
      <span className="inline-flex items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 font-atelier-mono text-[11px] uppercase tracking-wider shadow-sm">
        <span className="pulse-dot h-2 w-2 rounded-full bg-atelier-pink" />
        Sketch → Design → Shirt
      </span>

      <h1 className="text-center font-atelier-sans text-4xl font-bold uppercase leading-[1.03] tracking-tight sm:text-6xl">
        From an idea
        <span className="block font-atelier-serif text-5xl font-normal italic lowercase tracking-normal text-atelier-pink sm:text-7xl">
          to something real.
        </span>
      </h1>

      <p className="max-w-lg text-center font-atelier-sans text-atelier-muted">
        Step 1 placeholder — the hero animation arrives in Step 2.
      </p>

      <div className="flex gap-2">
        {[
          ["canvas", "bg-atelier-canvas"],
          ["grid", "bg-atelier-grid"],
          ["tape", "bg-atelier-tape"],
          ["pink-soft", "bg-atelier-pink-soft"],
          ["pink", "bg-atelier-pink"],
          ["pink-deep", "bg-atelier-pink-deep"],
          ["charcoal", "bg-atelier-charcoal"],
          ["dark", "bg-atelier-dark"],
        ].map(([name, cls]) => (
          <span
            key={name}
            title={name}
            className={`${cls} h-9 w-9 rounded border border-black/10`}
          />
        ))}
      </div>

      <nav className="flex gap-6 font-atelier-mono text-xs uppercase tracking-wider">
        <span className="text-atelier-dark underline decoration-atelier-pink underline-offset-4">
          Hero
        </span>
        <Link href="/collection" className="text-atelier-muted hover:text-atelier-dark">
          Our Collection
        </Link>
        <Link href="/my-little-world" className="text-atelier-muted hover:text-atelier-dark">
          My Little World
        </Link>
      </nav>
    </main>
  );
}
