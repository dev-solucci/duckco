import { brandAssets } from "@/data/assets";

export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="grain relative flex min-h-[85svh] items-center overflow-hidden bg-money-green px-4 py-24 text-duck-cream sm:px-6"
    >
      {/* A piece of Luke as a silhouette: head, chest and arm bleeding off the edge */}
      <span
        aria-hidden
        className="mask-asset pointer-events-none absolute -right-[18%] top-[-22%] h-[150%] w-[85%] text-deep-green sm:-right-[8%] sm:w-[60%] lg:w-[48%]"
        style={
          { "--asset": `url(${brandAssets.lukeFront.src})` } as React.CSSProperties
        }
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <span className="mb-4 block font-mono text-xs uppercase tracking-[0.3em] text-lucky-yellow">
          Manifesto
        </span>
        <p className="font-display uppercase leading-[0.8] text-duck-cream">
          <span className="block text-[clamp(4rem,17vw,13rem)]">Too</span>
          <span className="block text-[clamp(4rem,17vw,13rem)] text-lucky-yellow">
            Lucky
          </span>
          <span className="block text-[clamp(4rem,17vw,13rem)]">To Lose</span>
        </p>
      </div>
    </section>
  );
}
