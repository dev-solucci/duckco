"use client";

import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cardById } from "@/data/cards";
import { brandAssets } from "@/data/assets";
import { useCards } from "@/lib/cards";
import type { AlbumChapter as Chapter, AlbumPanel } from "@/types";
import { cn } from "@/lib/utils";

function SlotArt({ artId }: { artId?: string }) {
  if (artId === "seven")
    return <span className="font-display text-5xl leading-none text-lucky-yellow">7</span>;
  return (
    <span
      aria-hidden
      className="mask-asset h-24 w-24 text-lucky-yellow"
      style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
    />
  );
}

function Panel({ panel, owned }: { panel: AlbumPanel; owned: boolean }) {
  const span = panel.span === 2 ? "col-span-2" : "";

  if (panel.kind === "art") {
    return (
      <div
        className={cn(
          "relative flex min-h-[150px] items-end border-4 border-lucky-black bg-deep-green p-3",
          span,
        )}
      >
        <span
          aria-hidden
          className="mask-asset absolute right-2 top-2 h-16 w-16 text-money-green"
          style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
        />
        <p className="relative max-w-[22ch] bg-duck-cream px-2 py-1 font-display text-base uppercase leading-tight text-lucky-black sm:text-lg">
          {panel.caption}
        </p>
      </div>
    );
  }

  const card = cardById[panel.cardId];

  if (!owned) {
    return (
      <div
        className={cn(
          "relative flex min-h-[150px] flex-col items-center justify-center gap-2 border-4 border-lucky-black bg-lucky-black text-duck-cream/30",
          span,
        )}
      >
        <Lock className="h-7 w-7" />
        <span className="font-mono text-[0.55rem] uppercase tracking-widest">
          Carta {card?.number}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={cn(
        "relative flex min-h-[150px] items-end justify-center overflow-hidden border-4 border-lucky-black bg-street-brown p-3",
        span,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <SlotArt artId={card?.art} />
      </div>
      <p className="relative max-w-[24ch] bg-lucky-black/80 px-2 py-1 font-display text-sm uppercase leading-tight text-duck-cream sm:text-base">
        {panel.caption}
      </p>
    </motion.div>
  );
}

export function AlbumChapter({ chapter }: { chapter: Chapter }) {
  const { ownedCount } = useCards();
  return (
    <div className="flex flex-col gap-6">
      {chapter.pages.map((page, pi) => (
        <div key={pi} className="grid grid-cols-2 gap-2 sm:gap-3">
          {page.panels.map((panel, i) => (
            <Panel
              key={i}
              panel={panel}
              owned={panel.kind === "slot" ? ownedCount(panel.cardId) > 0 : true}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
