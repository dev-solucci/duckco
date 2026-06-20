import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/cards/Card";
import { cardById } from "@/data/cards";
import { cn } from "@/lib/utils";

// A small fanned showcase, not the full collection (that lives in /cartas).
const showcase = [
  { id: "luke-rich", className: "-rotate-6 sm:translate-y-3" },
  { id: "numero-7", className: "z-10 -translate-y-2 sm:-translate-y-4" },
  { id: "luke-runner", className: "rotate-6 sm:translate-y-3" },
];

export function CollectionSection() {
  return (
    <section id="colecao" className="bg-lucky-black px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
            Colecione o Luke
          </span>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none text-duck-cream sm:text-7xl">
            Sete faces, uma sorte
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm text-chrome-silver">
            Cada carta conta um pedaço da história do Luke. Abra packs, preencha
            o álbum em quadrinho e monte seu time pro duelo.
          </p>
          <Link
            href="/cartas"
            className="group mt-7 inline-flex items-center gap-2 border-2 border-lucky-yellow bg-lucky-yellow px-7 py-3.5 font-display text-xl uppercase tracking-wide text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
          >
            Ver as cartas
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center justify-center">
          <div className="flex items-center">
            {showcase.map((item, i) => {
              const card = cardById[item.id];
              if (!card) return null;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "w-28 transition-transform duration-300 hover:!translate-y-0 hover:!rotate-0 sm:w-40",
                    i > 0 && "-ml-10 sm:-ml-14",
                    item.className,
                  )}
                >
                  <Card card={card} />
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
