import Image from "next/image";
import { Clover, Coins, Ticket } from "lucide-react";
import { brandAssets } from "@/data/assets";
import { cardArt } from "@/data/cardArt";
import type { CardDef, CardRarity, CardType } from "@/types";
import { cn } from "@/lib/utils";

// Frame palette by card type (like MTG color identity).
const frameByType: Record<
  CardType,
  { ring: string; art: string; title: string }
> = {
  persona: {
    ring: "bg-money-green",
    art: "bg-deep-green",
    title: "from-money-green to-deep-green",
  },
  gear: {
    ring: "bg-street-brown",
    art: "bg-[#3b2517]",
    title: "from-street-brown to-[#3b2517]",
  },
  charm: {
    ring: "bg-money-green",
    art: "bg-[#2a5d34]",
    title: "from-money-green to-deep-green",
  },
  scene: {
    ring: "bg-lucky-black",
    art: "bg-deep-green",
    title: "from-deep-green to-lucky-black",
  },
};

// Rarity controls the border, the gem and the foil.
const rarityByName: Record<
  CardRarity,
  { label: string; border: string; gem: string; foil: boolean; glow: string }
> = {
  street: {
    label: "Street",
    border: "border-duck-cream/25",
    gem: "bg-chrome-silver",
    foil: false,
    glow: "",
  },
  drop: {
    label: "Drop",
    border: "border-lucky-yellow",
    gem: "bg-lucky-yellow",
    foil: false,
    glow: "shadow-[0_8px_30px_-8px_var(--color-lucky-yellow)]",
  },
  chrome: {
    label: "Chrome",
    border: "border-chrome-silver",
    gem: "bg-chrome-silver",
    foil: true,
    glow: "shadow-[0_8px_34px_-8px_var(--color-chrome-silver)]",
  },
  grail: {
    label: "Grail · 1 of 1",
    border: "border-lucky-yellow",
    gem: "bg-lucky-yellow",
    foil: true,
    glow: "shadow-[0_10px_44px_-6px_var(--color-lucky-yellow)]",
  },
};

const typeLabel: Record<CardType, string> = {
  persona: "Persona",
  gear: "Gear",
  charm: "Amuleto",
  scene: "Cena",
};

const STAT_KEYS = [
  ["estilo", "Estilo"],
  ["sorte", "Sorte"],
  ["flow", "Flow"],
  ["hype", "Hype"],
] as const;

function CardArt({ card }: { card: CardDef }) {
  const cls = "text-duck-cream/90";
  if (card.art === "clover")
    return <Clover className={cn("h-1/2 w-1/2", cls)} strokeWidth={1.25} />;
  if (card.art === "coin")
    return <Coins className={cn("h-1/2 w-1/2", cls)} strokeWidth={1.25} />;
  if (card.art === "ticket")
    return <Ticket className={cn("h-1/2 w-1/2", cls)} strokeWidth={1.25} />;
  if (card.art === "seven")
    return (
      <span className="font-display text-6xl leading-none text-lucky-yellow">
        7
      </span>
    );
  return (
    <span
      aria-hidden
      className={cn("mask-asset h-[78%] w-[78%]", cls)}
      style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
    />
  );
}

/** Locked cards show a Duck Co. card back, like a face down TCG card. */
function CardBack({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[5/7] w-full items-stretch overflow-hidden rounded-xl bg-gradient-to-br from-deep-green via-lucky-black to-lucky-black p-1.5",
        className,
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-lucky-yellow/25">
        <span
          aria-hidden
          className="mask-asset h-2/5 w-2/5 text-lucky-yellow/80"
          style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
        />
        <span className="font-display text-[11px] uppercase tracking-[0.2em] text-duck-cream/70">
          Lucky Cards
        </span>
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-lucky-yellow/60">
          Duck Co.
        </span>
      </div>
    </div>
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
  if (!owned) return <CardBack className={className} />;

  const frame = frameByType[card.type];
  const rarity = rarityByName[card.rarity];

  return (
    <article
      className={cn(
        "relative flex aspect-[5/7] w-full select-none flex-col gap-1 overflow-hidden rounded-xl border-2 p-1.5",
        frame.ring,
        rarity.border,
        rarity.glow,
        className,
      )}
    >
      {rarity.foil && <span className="foil-sheen" />}

      {/* Title bar */}
      <div
        className={cn(
          "flex items-center justify-between gap-1 rounded-md bg-gradient-to-r px-1.5 py-1",
          frame.title,
        )}
      >
        <h3 className="truncate font-display text-[11px] uppercase leading-none text-duck-cream">
          {card.name}
        </h3>
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-lucky-black/40 bg-duck-cream text-lucky-black">
          <Clover className="h-2.5 w-2.5" strokeWidth={2} />
        </span>
      </div>

      {/* Art window */}
      <div
        className={cn(
          "relative flex flex-1 items-center justify-center overflow-hidden rounded-sm border border-lucky-black/50",
          frame.art,
        )}
      >
        {(() => {
          const art = card.image ?? cardArt[card.id];
          return art ? (
            <Image
              src={art}
              alt={card.name}
              fill
              sizes="(max-width: 768px) 45vw, 220px"
              className="object-cover"
            />
          ) : (
            <CardArt card={card} />
          );
        })()}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_rgba(0,0,0,0.45)]" />
        {count > 1 && (
          <span className="absolute bottom-1 right-1 rounded-[2px] bg-lucky-black/75 px-1 py-0.5 font-mono text-[8px] font-bold leading-none text-lucky-yellow">
            x{count}
          </span>
        )}
      </div>

      {/* Type line */}
      <div className="flex items-center justify-between rounded-sm bg-lucky-black/45 px-1.5 py-0.5">
        <span className="font-mono text-[8px] uppercase tracking-widest text-duck-cream">
          {typeLabel[card.type]}
        </span>
        <span className="flex items-center gap-1">
          <span className="font-mono text-[7px] uppercase tracking-wider text-duck-cream/70">
            {rarity.label}
          </span>
          <span className={cn("h-2 w-2 rotate-45 rounded-[1px]", rarity.gem)} />
        </span>
      </div>

      {/* Ability plus stat boxes */}
      <div className="rounded-sm bg-duck-cream p-1.5 text-lucky-black">
        {card.ability && (
          <p className="mb-1 text-[8px] font-semibold leading-tight">
            {card.ability}
          </p>
        )}
        <div className="grid grid-cols-2 gap-1">
          {STAT_KEYS.map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between rounded border border-lucky-black/15 bg-lucky-black/[0.04] px-1.5 py-1"
            >
              <span className="font-mono text-[7px] uppercase tracking-wide text-lucky-black/55">
                {label}
              </span>
              <span className="font-display text-base leading-none text-money-green">
                {card.stats[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Collector line */}
      <div className="flex items-center justify-between px-0.5 font-mono text-[6px] uppercase tracking-widest text-duck-cream/80">
        <span>{card.number}</span>
        <span className="flex items-center gap-1">
          Lucky Drop 001
          <span
            aria-hidden
            className="mask-asset h-2 w-2 text-duck-cream/80"
            style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
          />
        </span>
      </div>
    </article>
  );
}
