import { Reveal } from "@/components/ui/Reveal";
import { brandAssets } from "@/data/assets";

const lines = [
  "Sorte é postura.",
  "É cair de pé.",
  "É a rua abrir pro Luke.",
  "É vestir o amuleto.",
];

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="grain relative overflow-hidden bg-money-green px-4 py-24 text-duck-cream sm:px-6 sm:py-32"
    >
      {/* Big watermark mascot */}
      <span
        aria-hidden
        className="mask-asset pointer-events-none absolute -right-10 bottom-0 h-[80%] w-1/2 text-deep-green opacity-60"
        style={{ "--asset": `url(${brandAssets.lukeBleh.src})` } as React.CSSProperties}
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
            Manifesto
          </span>
        </Reveal>
        <div className="mt-6 space-y-2">
          {lines.map((line, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="font-display text-3xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                {line}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-md font-sans text-base text-duck-cream/80">
            A gente não vende camiseta. Vende sorte vestida de rua.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <p className="mt-8 font-display text-4xl uppercase text-lucky-yellow sm:text-6xl">
            Too Lucky To Lose
          </p>
        </Reveal>
      </div>
    </section>
  );
}
