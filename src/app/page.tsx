import { brand, featuredDrop } from "@/lib/brand";

// Structural placeholder — proves the brand data layer wires through.
// Visual design comes in a later pass.
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-lucky-yellow">
        {brand.mascot.name}, {brand.mascot.intlTitle}
      </p>
      <h1 className="font-display text-6xl uppercase leading-none text-duck-cream sm:text-8xl">
        {brand.shortName}
      </h1>
      <p className="font-display text-2xl uppercase text-lucky-yellow sm:text-3xl">
        {brand.slogan}
      </p>
      <p className="max-w-md font-sans text-sm text-chrome-silver">
        {brand.positioning}
      </p>
      <p className="mt-4 font-sans text-xs uppercase tracking-widest text-street-brown">
        Próximo: {featuredDrop.name}
      </p>
    </main>
  );
}
