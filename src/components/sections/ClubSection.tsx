import { Reveal } from "@/components/ui/Reveal";
import { LuckMeterFull } from "@/components/game/LuckMeter";
import { ClubLevels } from "@/components/game/ClubLevels";
import { DailySpin } from "@/components/game/DailySpin";

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

          {/* Daily spin */}
          <Reveal
            delay={0.1}
            className="flex flex-col items-center justify-center border-2 border-lucky-black bg-lucky-black px-6 py-12 text-duck-cream"
          >
            <span className="mb-1 font-mono text-xs uppercase tracking-widest text-lucky-yellow">
              Uma vez por dia
            </span>
            <h3 className="mb-8 font-display text-3xl uppercase sm:text-4xl">
              Daily Spin do Luke
            </h3>
            <DailySpin />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
