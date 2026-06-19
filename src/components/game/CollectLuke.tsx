"use client";

import { motion } from "framer-motion";
import { lukeVariants } from "@/data/mascot";
import { brandAssets } from "@/data/assets";
import { useLuck } from "@/lib/luck";
import { cn } from "@/lib/utils";

export function CollectLuke() {
  const { collected, collect, addLuck } = useLuck();
  const total = lukeVariants.length;
  const have = collected.length;

  function pick(id: string) {
    if (collected.includes(id)) return;
    collect(id);
    addLuck(6);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-md font-sans text-sm text-chrome-silver">
          As sete faces do Luke. Toque para colecionar. Complete o álbum e
          desbloqueie a recompensa do clube.
        </p>
        <span className="font-mono text-sm font-bold text-lucky-yellow">
          {String(have).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lukeVariants.map((v, i) => {
          const owned = collected.includes(v.id);
          return (
            <motion.button
              key={v.id}
              onClick={() => pick(v.id)}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "group relative flex aspect-[3/4] flex-col justify-end overflow-hidden border-2 p-3 text-left transition",
                owned
                  ? "border-lucky-yellow bg-deep-green"
                  : "border-duck-cream/15 bg-lucky-black hover:border-duck-cream/40",
              )}
            >
              {/* Ghost mascot watermark */}
              <span
                aria-hidden
                className={cn(
                  "mask-asset absolute inset-x-3 top-3 h-1/2 transition",
                  owned
                    ? "text-lucky-yellow/90"
                    : "text-duck-cream/10 group-hover:text-duck-cream/20",
                )}
                style={
                  { "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties
                }
              />

              <span className="relative z-10">
                <span className="block font-mono text-[0.55rem] uppercase tracking-widest text-chrome-silver">
                  {owned ? "Coletado" : `No. ${String(i + 1).padStart(2, "0")}`}
                </span>
                <span
                  className={cn(
                    "block font-display text-lg uppercase leading-tight",
                    owned ? "text-lucky-black" : "text-duck-cream",
                  )}
                >
                  {v.name}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {have === total && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 border-2 border-dashed border-lucky-yellow px-5 py-3 text-center font-display text-xl uppercase text-lucky-yellow"
        >
          Álbum completo. Too Lucky To Lose.
        </motion.p>
      )}
    </div>
  );
}
