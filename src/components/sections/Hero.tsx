"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { HeroProductCard } from "@/components/sections/HeroProductCard";
import { brandAssets } from "@/data/assets";
import { brand } from "@/lib/brand";
import { luckyNumber } from "@/data/game";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      {/* Background: Luke walking the street, biased to the right so the copy
          sits on the darker left. */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={brandAssets.hero01.src}
          alt={brandAssets.hero01.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-lucky-black via-lucky-black/85 to-lucky-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-lucky-black via-lucky-black/20 to-lucky-black/40" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-10 sm:px-6">
        {/* Copy */}
        <div className="max-w-2xl lg:max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <LuckyBadge className="text-lucky-yellow">
              Lucky Drop 001
            </LuckyBadge>
            <LuckyBadge className="text-chrome-silver">
              No. {luckyNumber("lucky-drop-001")}
            </LuckyBadge>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-duck-cream/70">
              {brand.mascot.name}, {brand.mascot.intlTitle}
            </span>
          </motion.div>

          <h1 className="font-display uppercase leading-[0.95] text-duck-cream [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            {["Too", "Lucky", "To Lose"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className={cn(
                  "block text-[clamp(3.5rem,13vw,9rem)]",
                  i === 1 && "text-sweep",
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-6 max-w-md font-sans text-base text-duck-cream/85"
          >
            Streetwear de personagem, sorte e cultura urbana. Quem chega na Duck
            Co. já entra com a sorte no bolso.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#drop"
              className="group inline-flex items-center justify-center gap-2 border-2 border-lucky-yellow bg-lucky-yellow px-7 py-3.5 font-display text-xl uppercase tracking-wide text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
            >
              Ver o drop
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#clube"
              className="inline-flex items-center justify-center border-2 border-duck-cream/40 bg-lucky-black/30 px-7 py-3.5 font-display text-xl uppercase tracking-wide text-duck-cream backdrop-blur-sm transition hover:border-lucky-yellow hover:text-lucky-yellow"
            >
              Entrar no clube
            </a>
          </motion.div>
        </div>

        {/* Floating featured product */}
        <HeroProductCard className="mt-10 w-full sm:max-w-sm lg:mt-0 lg:absolute lg:bottom-12 lg:right-0 lg:w-80" />
      </div>

      {/* Ticker */}
      <div className="relative border-y-2 border-duck-cream/15 bg-lucky-black/60 py-3 font-display text-xl uppercase tracking-wide text-duck-cream backdrop-blur-sm">
        <Marquee
          items={[
            "Too Lucky To Lose",
            "Lucky Duck Club",
            "Born Lucky",
            "A Sorte Veste Bem",
            "No Luck No Story",
            "Duck Season Never Ends",
          ]}
          durationSeconds={30}
        />
      </div>
    </section>
  );
}
