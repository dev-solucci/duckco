import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { DuelGame } from "@/components/duel/DuelGame";

export const metadata: Metadata = {
  title: "Fit Check · Duelo",
  description: "Monte seu time de Lucky Cards e duele. A sorte decide, o estilo vence.",
};

export default function DuelPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <section className="border-b border-duck-cream/10 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <LuckyBadge className="text-lucky-yellow">Protótipo · contra bot</LuckyBadge>
            <h1 className="mt-3 font-display text-6xl uppercase leading-[0.9] text-duck-cream sm:text-7xl">
              Fit Check
            </h1>
            <p className="mt-3 max-w-xl font-sans text-sm text-chrome-silver">
              Cada round abre um contexto de rua e a sorte decide qual atributo
              conta. As habilidades das personas viram o jogo. Em breve, contra
              outros membros do clube.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <DuelGame />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
