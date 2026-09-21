import Link from "next/link";

/* Placeholder for page 3. Replaced in Step 4 by the real page and its
   Three.js diorama. For now it verifies the Material-style surface-* /
   primary tokens from DESIGN.md and the Bodoni + EB Garamond pairing. */

export default function MyLittleWorldPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-8 bg-surface-container-lowest px-6 text-on-background">
      <span className="inline-flex items-center gap-2.5 border border-outline-variant/40 bg-surface-container px-3.5 py-1.5 font-world-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
        <span className="pulse-glow inline-block h-2 w-2 rounded-full bg-primary-container" />
        Origin Archive • Room 402
      </span>

      <h1 className="font-editorial-heading text-center text-5xl font-normal tracking-tight sm:text-7xl">
        MY LITTLE WORLD
      </h1>

      <p className="max-w-lg text-center font-world-serif text-lg italic text-secondary">
        &ldquo;A small room. A lot of ideas.&rdquo;
      </p>

      <p className="max-w-lg text-center font-world-serif text-base text-on-surface-variant">
        Step 1 placeholder — the interactive 3D diorama arrives in Step 4.
      </p>

      <div className="flex gap-2">
        {[
          ["container-lowest", "bg-surface-container-lowest"],
          ["container-low", "bg-surface-container-low"],
          ["container", "bg-surface-container"],
          ["container-high", "bg-surface-container-high"],
          ["outline", "bg-outline"],
          ["primary", "bg-primary"],
          ["primary-container", "bg-primary-container"],
          ["secondary", "bg-secondary"],
        ].map(([name, cls]) => (
          <span
            key={name}
            title={name}
            className={`${cls} h-9 w-9 border border-outline-variant/40`}
          />
        ))}
      </div>

      <nav className="flex gap-6 font-world-mono text-xs uppercase tracking-wider">
        <Link href="/" className="text-outline hover:text-on-surface">
          Hero
        </Link>
        <Link href="/collection" className="text-outline hover:text-on-surface">
          Our Collection
        </Link>
        <span className="text-on-surface underline decoration-primary underline-offset-4">
          My Little World
        </span>
      </nav>
    </main>
  );
}
