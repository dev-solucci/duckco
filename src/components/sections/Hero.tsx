"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { brandAssets } from "@/data/assets";
import { brand } from "@/lib/brand";
import { luckyNumber } from "@/data/game";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-lucky-yellow/15 blur-[120px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-money-green/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12">
        {/* Copy */}
        <div className="order-2 lg:order-1 lg:col-span-7">
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
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-duck-cream/60">
              {brand.mascot.name}, {brand.mascot.intlTitle}
            </span>
          </motion.div>

          <h1 className="font-display uppercase leading-[0.95] text-duck-cream">
            {["Too", "Lucky", "To Lose"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
                className="block text-[clamp(3.5rem,13vw,9rem)]"
                style={i === 1 ? { color: "var(--color-lucky-yellow)" } : undefined}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-6 max-w-md font-sans text-base text-chrome-silver"
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
              className="inline-flex items-center justify-center border-2 border-duck-cream/30 px-7 py-3.5 font-display text-xl uppercase tracking-wide text-duck-cream transition hover:border-lucky-yellow hover:text-lucky-yellow"
            >
              Entrar no clube
            </a>
          </motion.div>
        </div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative order-1 flex justify-center lg:order-2 lg:col-span-5"
        >
          <div className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-lucky-yellow/20 blur-2xl sm:h-80 sm:w-80" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brandAssets.lukeFront.src}
            alt={brandAssets.lukeFront.alt}
            className="animate-float relative w-56 drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] sm:w-72 lg:w-full lg:max-w-sm"
          />
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="relative border-y-2 border-duck-cream/15 bg-lucky-black/40 py-3 font-display text-xl uppercase tracking-wide text-duck-cream">
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
