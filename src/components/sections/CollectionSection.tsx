import { Reveal } from "@/components/ui/Reveal";
import { CollectLuke } from "@/components/game/CollectLuke";

export function CollectionSection() {
  return (
    <section id="colecao" className="bg-lucky-black px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
            Colecione o Luke
          </span>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none text-duck-cream sm:text-7xl">
            Sete faces, uma sorte
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <CollectLuke />
        </Reveal>
      </div>
    </section>
  );
}
