"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Sparkles, X } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { useCards } from "@/lib/cards";
import { useLuck } from "@/lib/luck";
import type { CardDef } from "@/types";
import { cn } from "@/lib/utils";

export function PackOpener() {
  const { packs, canClaim, openPack, claimDaily } = useCards();
  const { addLuck } = useLuck();
  const [reveal, setReveal] = useState<CardDef[] | null>(null);

  function handleOpen() {
    const drawn = openPack();
    if (drawn.length) {
      setReveal(drawn);
      addLuck(4);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-chrome-silver">
        <Gift className="h-4 w-4 text-lucky-yellow" />
        {packs} {packs === 1 ? "pack" : "packs"} na mochila
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleOpen}
          disabled={packs <= 0}
          className={cn(
            "inline-flex items-center justify-center gap-2 border-2 px-8 py-3.5 font-display text-xl uppercase tracking-wide transition",
            packs > 0
              ? "border-lucky-yellow bg-lucky-yellow text-lucky-black hover:bg-transparent hover:text-lucky-yellow"
              : "cursor-not-allowed border-chrome-silver/30 text-chrome-silver/50",
          )}
        >
          <Sparkles className="h-5 w-5" />
          Abrir Lucky Pack
        </button>

        {canClaim && (
          <button
            onClick={() => claimDaily()}
            className="inline-flex items-center justify-center border-2 border-duck-cream/30 px-6 py-3.5 font-display text-xl uppercase tracking-wide text-duck-cream transition hover:border-lucky-yellow hover:text-lucky-yellow"
          >
            Pegar packs do dia
          </button>
        )}
      </div>

      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-lucky-black/85 p-4 backdrop-blur"
            onClick={() => setReveal(null)}
          >
            <div
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setReveal(null)}
                aria-label="Fechar"
                className="absolute -top-2 right-0 -translate-y-full text-duck-cream transition hover:text-lucky-yellow"
              >
                <X className="h-6 w-6" />
              </button>
              <p className="mb-4 text-center font-display text-2xl uppercase text-lucky-yellow">
                Você tirou
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {reveal.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotateY: 90, y: 20 }}
                    animate={{ opacity: 1, rotateY: 0, y: 0 }}
                    transition={{ delay: i * 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card card={card} />
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => setReveal(null)}
                className="mx-auto mt-6 block border-2 border-duck-cream/30 px-6 py-2 font-display text-lg uppercase text-duck-cream transition hover:border-lucky-yellow hover:text-lucky-yellow"
              >
                Guardar na coleção
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
