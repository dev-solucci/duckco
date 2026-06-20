import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { LuckMeterFull } from "@/components/game/LuckMeter";
import { ClubLevels } from "@/components/game/ClubLevels";
import { DailySpin } from "@/components/game/DailySpin";
import { brandAssets } from "@/data/assets";

export function ClubSection() {
  return (
    <section
      id="clube"
      className="relative overflow-hidden bg-duck-cream px-4 py-20 text-lucky-black sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-widest text-money-green">
            Não é loja, é clube
          </span>
          <h2 className="mt-2 font-display text-5xl uppercase leading-none sm:text-7xl">
            Lucky Duck Club
          </h2>
          <p className="mt-3 font-sans text-sm text-lucky-black/70">
            Quanto mais você joga, mais a sorte trabalha pra você. Explore, gire a
            roleta e suba de nível para liberar acesso antecipado e peças
            exclusivas.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Progress and ladder */}
          <Reveal className="flex flex-col gap-8">
            <LuckMeterFull />
            <div>
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-money-green">
                Os níveis
              </h3>
              <ClubLevels />
            </div>
          </Reveal>

          {/* Daily spin, framed like a lucky ticket with the Luke stamp */}
          <Reveal
            delay={0.1}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-4 border-money-green bg-deep-green px-6 pb-12 pt-16 text-duck-cream shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
          >
            {/* Dashed ticket inner frame */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-2.5 rounded-xl border-2 border-dashed border-lucky-yellow/40"
            />

            {/* Stamp slapped on top, crooked */}
            <Image
              src={brandAssets.stamp.src}
              alt={brandAssets.stamp.alt}
              width={120}
              height={120}
              className="absolute -top-3 left-1/2 z-10 w-20 -translate-x-1/2 -rotate-6 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
            />

            <span className="relative mt-2 font-mono text-xs uppercase tracking-[0.3em] text-lucky-yellow">
              Gira uma vez por dia
            </span>
            <h3 className="relative mb-2 mt-1 font-display text-4xl uppercase leading-none text-duck-cream sm:text-5xl">
              Roleta da Sorte
            </h3>
            <p className="relative mb-8 max-w-xs text-center font-sans text-sm text-duck-cream/75">
              Puxe a sorte do Luke e leve cupom, sticker ou acesso a drop.
            </p>
            <DailySpin />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
