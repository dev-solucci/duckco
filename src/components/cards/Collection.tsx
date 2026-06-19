"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/cards/Card";
import { cards } from "@/data/cards";
import { useCards } from "@/lib/cards";

export function Collection() {
  const { ownedCount, collectedCount, totalCards } = useCards();
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-md font-sans text-sm text-chrome-silver">
          Toda carta que você tira entra aqui. As bloqueadas aparecem como
          silhueta até você encontrar.
        </p>
        <span className="font-mono text-sm font-bold text-lucky-yellow">
          {String(collectedCount).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card, i) => {
          const count = ownedCount(card.id);
          return (
            <Reveal key={card.id} delay={(i % 5) * 0.04}>
              <Card card={card} owned={count > 0} count={count} />
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
