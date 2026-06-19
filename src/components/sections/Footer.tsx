import { ArrowRight } from "lucide-react";
import { MaskedAsset } from "@/components/brand/MaskedAsset";
import { Marquee } from "@/components/ui/Marquee";
import { brandAssets } from "@/data/assets";
import { brand } from "@/lib/brand";
import { luckyNumber } from "@/data/game";

const columns = [
  {
    title: "Loja",
    links: ["Lucky Drop 001", "Camisetas", "Moletons", "Bonés", "Acessórios"],
  },
  {
    title: "Clube",
    links: ["Lucky Duck Club", "Daily Spin", "Níveis", "Coleção do Luke"],
  },
  {
    title: "Marca",
    links: ["Manifesto", "Luke, the Luck Duck", "Drops", "Contato"],
  },
];

export function Footer() {
  return (
    <footer className="bg-lucky-black text-duck-cream">
      <div className="border-y-2 border-duck-cream/15 bg-lucky-yellow py-3 font-display text-2xl uppercase text-lucky-black">
        <Marquee
          items={[
            "Streetwear for the Lucky Ones",
            "Quem Tem Sorte Tem Estilo",
            "Duck Co. Approved",
            "Born Lucky",
          ]}
          durationSeconds={26}
          reverse
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center text-lucky-yellow">
              <MaskedAsset
                src={brandAssets.symbol.src}
                label="Luke"
                className="h-11 w-11"
              />
              <MaskedAsset
                src={brandAssets.wordmark.src}
                label="Duck Co."
                className="-ml-2 h-6 w-28 text-duck-cream"
              />
            </div>
            <p className="mt-5 max-w-sm font-sans text-sm text-chrome-silver">
              Entre pro clube. Receba os drops antes de todo mundo e um pouco mais
              de sorte no caminho.
            </p>
            <form className="mt-5 flex max-w-sm border-2 border-duck-cream/20 focus-within:border-lucky-yellow">
              <input
                type="email"
                required
                placeholder="seu melhor email"
                aria-label="Seu email"
                className="w-full bg-transparent px-4 py-3 font-mono text-sm text-duck-cream outline-none placeholder:text-chrome-silver/50"
              />
              <button
                type="submit"
                aria-label="Assinar"
                className="flex items-center justify-center bg-lucky-yellow px-4 text-lucky-black transition hover:bg-duck-cream"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-lucky-yellow">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-chrome-silver transition hover:text-duck-cream"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-duck-cream/10 pt-6 sm:flex-row sm:items-center">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
            {brand.name} · Lote No. {luckyNumber(brand.name)}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
            {brand.slogan}
          </span>
        </div>
      </div>
    </footer>
  );
}
