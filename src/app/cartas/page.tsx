import type { Metadata } from "next";
import { Swords } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { PackOpener } from "@/components/cards/PackOpener";
import { AlbumProgress } from "@/components/cards/AlbumProgress";
import { AlbumChapter } from "@/components/cards/AlbumChapter";
import { Collection } from "@/components/cards/Collection";
import { chapters } from "@/data/album";

export const metadata: Metadata = {
  title: "Lucky Cards",
  description:
    "Colecione as Lucky Cards, preencha o álbum em quadrinho e desafie o clube.",
};

export default function CardsPage() {
  const chapter = chapters[0];

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Intro + pack opening */}
        <section className="grain relative overflow-hidden border-b border-duck-cream/10 px-4 py-16 sm:px-6 sm:py-20">
          <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-lucky-yellow/10 blur-[120px]" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="mb-8 max-w-2xl">
              <LuckyBadge className="text-lucky-yellow">O jogo da marca</LuckyBadge>
              <h1 className="mt-3 font-display text-6xl uppercase leading-[0.9] text-duck-cream sm:text-8xl">
                Lucky Cards
              </h1>
              <p className="mt-4 font-sans text-base text-chrome-silver">
                Colecione, preencha o álbum que é uma história em quadrinhos e,
                em breve, desafie outros membros do clube. Cada carta conta um
                pedaço da história do Luke.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <PackOpener />
            </Reveal>
          </div>
        </section>

        {/* Album as comic */}
        <section className="bg-lucky-black px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
                O Álbum da Sorte · Capítulo {chapter.title}
              </span>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none text-duck-cream sm:text-6xl">
                {chapter.title}
              </h2>
              <p className="mt-2 font-sans text-sm text-chrome-silver">
                {chapter.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <AlbumProgress reward={chapter.reward} />
            </Reveal>
            <Reveal delay={0.1}>
              <AlbumChapter chapter={chapter} />
            </Reveal>
          </div>
        </section>

        {/* Collection */}
        <section className="border-t border-duck-cream/10 bg-lucky-black px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
                Sua coleção
              </span>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none text-duck-cream sm:text-6xl">
                As cartas
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <Collection />
            </Reveal>
          </div>
        </section>

        {/* Duel teaser */}
        <section className="bg-money-green px-4 py-16 text-duck-cream sm:px-6 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
                Em breve
              </span>
              <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">
                Fit Check · o duelo
              </h2>
              <p className="mt-2 max-w-md font-sans text-sm text-duck-cream/80">
                Monte um deck com as cartas que você tem e desafie outros membros
                do clube. A sorte decide, o estilo vence.
              </p>
            </div>
            <span className="flex items-center gap-2 border-2 border-duck-cream/40 px-5 py-3 font-display text-xl uppercase">
              <Swords className="h-5 w-5" />
              Logo logo
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
