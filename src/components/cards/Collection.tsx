"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/cards/Card";
import { CardZoom } from "@/components/cards/CardZoom";
import { cards } from "@/data/cards";
import { useCards } from "@/lib/cards";
import type { CardDef } from "@/types";

export function Collection() {
  const { ownedCount, collectedCount, totalCards } = useCards();
  const [zoom, setZoom] = useState<CardDef | null>(null);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-md font-sans text-sm text-chrome-silver">
          Toda carta que você tira entra aqui. As bloqueadas aparecem como
          silhueta até você encontrar. Toque numa carta para ver de perto.
        </p>
        <span className="font-mono text-sm font-bold text-lucky-yellow">
          {String(collectedCount).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card, i) => {
          const count = ownedCount(card.id);
          const owned = count > 0;
          return (
            <Reveal key={card.id} delay={(i % 5) * 0.04}>
              <button
                type="button"
                onClick={() => owned && setZoom(card)}
                disabled={!owned}
                aria-label={owned ? `Ver ${card.name}` : "Carta bloqueada"}
                className={owned ? "block w-full cursor-zoom-in" : "block w-full cursor-default"}
              >
                <Card card={card} owned={owned} count={count} />
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {zoom && <CardZoom card={zoom} onClose={() => setZoom(null)} />}
      </AnimatePresence>
    </div>
  );
}
