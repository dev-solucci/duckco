"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLuck } from "@/lib/luck";
import { levelBadges } from "@/data/assets";
import { cn } from "@/lib/utils";

/** Compact meter for the nav: a thin bar plus the current level name. */
export function LuckMeterMini() {
  const { luck, level } = useLuck();
  return (
    <div className="flex items-center gap-2" aria-label={`Sorte ${luck} de 100`}>
      <div className="hidden font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver sm:block">
        {level.name}
      </div>
      <div className="relative h-2 w-16 overflow-hidden border border-duck-cream/30 sm:w-24">
        <motion.div
          className="absolute inset-y-0 left-0 bg-lucky-yellow"
          animate={{ width: `${luck}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
      <span className="font-mono text-[0.6rem] font-bold text-lucky-yellow">
        {String(luck).padStart(2, "0")}
      </span>
    </div>
  );
}

/** Full meter block for the gamification section. */
export function LuckMeterFull({ className }: { className?: string }) {
  const { luck, level, next, progress } = useLuck();
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            key={level.id}
            initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24"
          >
            <Image
              src={levelBadges[level.id]}
              alt={`Badge ${level.name}`}
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"
            />
          </motion.div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-money-green">
              Seu nível no clube
            </div>
            <div className="font-display text-4xl uppercase leading-none text-lucky-black sm:text-5xl">
              {level.name}
            </div>
          </div>
        </div>
        <div className="text-right font-mono text-lucky-black">
          <div className="text-3xl font-bold leading-none">{luck}</div>
          <div className="text-[0.6rem] uppercase tracking-widest opacity-60">
            de 100 luck
          </div>
        </div>
      </div>

      {/* Segmented level track */}
      <div className="relative h-4 w-full overflow-hidden border-2 border-lucky-black bg-duck-cream">
        <motion.div
          className="absolute inset-y-0 left-0 bg-money-green"
          animate={{ width: `${luck}%` }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
        />
      </div>

      <div className="mt-2 font-mono text-xs text-lucky-black/70">
        {next ? (
          <>
            Faltam{" "}
            <span className="font-bold text-money-green">
              {next.min - luck} luck
            </span>{" "}
            para {next.name}. {Math.round(progress * 100)}% do caminho.
          </>
        ) : (
          <span className="font-bold text-money-green">
            Nível máximo. Too Lucky To Lose.
          </span>
        )}
      </div>
    </div>
  );
}
