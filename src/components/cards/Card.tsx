import { Clover, Coins, Lock, Ticket } from "lucide-react";
import { rarityMeta } from "@/data/cards";
import { brandAssets } from "@/data/assets";
import type { CardDef } from "@/types";
import { cn } from "@/lib/utils";

const toneByType: Record<CardDef["type"], string> = {
  persona: "bg-deep-green",
  gear: "bg-street-brown",
  charm: "bg-money-green",
  scene: "bg-lucky-black",
};

const STAT_KEYS = [
  ["estilo", "ES"],
  ["sorte", "SO"],
  ["flow", "FL"],
  ["hype", "HY"],
] as const;

function CardArt({ card }: { card: CardDef }) {
  if (card.art === "clover") return <Clover className="h-1/2 w-1/2" strokeWidth={1.5} />;
  if (card.art === "coin") return <Coins className="h-1/2 w-1/2" strokeWidth={1.5} />;
  if (card.art === "ticket") return <Ticket className="h-1/2 w-1/2" strokeWidth={1.5} />;
  if (card.art === "seven")
    return <span className="font-display text-7xl leading-none">7</span>;
  return (
    <span
      aria-hidden
      className="mask-asset h-2/3 w-2/3"
      style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
    />
  );
}

export function Card({
  card,
  owned = true,
  count = 1,
  className,
}: {
  card: CardDef;
  owned?: boolean;
  count?: number;
  className?: string;
}) {
  const meta = rarityMeta[card.rarity];
  const shimmer = card.rarity === "chrome" || card.rarity === "grail";

  if (!owned) {
    return (
      <div
        className={cn(
          "flex aspect-[3/4] flex-col items-center justify-center border-2 border-duck-cream/10 bg-lucky-black text-duck-cream/30",
          className,
        )}
      >
        <Lock className="h-6 w-6" />
        <span className="mt-2 font-mono text-[0.55rem] uppercase tracking-widest">
          Bloqueada
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex aspect-[3/4] flex-col overflow-hidden border-2 bg-lucky-black",
        meta.frame,
        meta.glow,
        className,
      )}
    >
      {/* header */}
      <div className="flex items-center justify-between px-2 pt-1.5">
        <span className="font-mono text-[0.5rem] font-bold uppercase tracking-widest text-duck-cream/70">
          {card.number}
        </span>
        <span
          className={cn(
            "font-mono text-[0.5rem] font-bold uppercase tracking-widest",
            meta.text,
          )}
        >
          {meta.label}
        </span>
      </div>

      {/* art */}
      <div
        className={cn(
          "relative mx-2 mt-1 flex flex-1 items-center justify-center overflow-hidden text-duck-cream/85",
          toneByType[card.type],
        )}
      >
        {shimmer && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-duck-cream/15 to-transparent" />
        )}
        <CardArt card={card} />
        {count > 1 && (
          <span className="absolute bottom-1 right-1 bg-lucky-black/70 px-1.5 py-0.5 font-mono text-[0.5rem] font-bold text-lucky-yellow">
            x{count}
          </span>
        )}
      </div>

      {/* name + stats */}
      <div className="px-2 py-2">
        <h3 className="truncate font-display text-sm uppercase leading-none text-duck-cream">
          {card.name}
        </h3>
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {STAT_KEYS.map(([key, short]) => (
            <div
              key={key}
              className="flex flex-col items-center bg-lucky-black/60 py-0.5"
            >
              <span className="font-mono text-[0.45rem] uppercase tracking-wider text-chrome-silver">
                {short}
              </span>
              <span className="font-mono text-[0.7rem] font-bold leading-none text-lucky-yellow">
                {card.stats[key]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
