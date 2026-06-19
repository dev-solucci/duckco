import { Clover, Coins, Ticket } from "lucide-react";
import { brandAssets } from "@/data/assets";
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

// Rarity controls the card stock rim, the gem and the foil.
const rarityByName: Record<
  CardRarity,
  { label: string; rim: string; gem: string; foil: boolean; glow: string }
> = {
  street: {
    label: "Street",
    rim: "from-zinc-600 via-zinc-800 to-zinc-900",
    gem: "bg-chrome-silver",
    foil: false,
    glow: "",
  },
  drop: {
    label: "Drop",
    rim: "from-[#caa024] via-[#8a6c14] to-[#3a2e08]",
    gem: "bg-lucky-yellow",
    foil: false,
    glow: "shadow-[0_8px_30px_-8px_var(--color-lucky-yellow)]",
  },
  chrome: {
    label: "Chrome",
    rim: "from-zinc-200 via-zinc-400 to-zinc-600",
    gem: "bg-chrome-silver",
    foil: true,
    glow: "shadow-[0_8px_34px_-8px_var(--color-chrome-silver)]",
  },
  grail: {
    label: "Grail · 1 of 1",
    rim: "from-[#f6d56b] via-[#caa024] to-[#7c5e10]",
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
  ["estilo", "EST"],
  ["sorte", "SOR"],
  ["flow", "FLW"],
  ["hype", "HYP"],
] as const;

function CardArt({ card }: { card: CardDef }) {
  const cls = "text-duck-cream/90";
  if (card.art === "clover")
    return <Clover className={cn("h-[55%] w-[55%]", cls)} strokeWidth={1.25} />;
  if (card.art === "coin")
    return <Coins className={cn("h-[55%] w-[55%]", cls)} strokeWidth={1.25} />;
  if (card.art === "ticket")
    return <Ticket className={cn("h-[55%] w-[55%]", cls)} strokeWidth={1.25} />;
  if (card.art === "seven")
    return (
      <span className="font-display text-[44cqi] leading-none text-lucky-yellow">
        7
      </span>
    );
  return (
    <span
      aria-hidden
      className={cn("mask-asset h-[68%] w-[68%]", cls)}
      style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
    />
  );
}

/** Locked cards show a Duck Co. card back, like a face down TCG card. */
function CardBack({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[5/7] w-full overflow-hidden rounded-[5%] bg-gradient-to-br from-deep-green via-lucky-black to-lucky-black [container-type:inline-size]",
        className,
      )}
    >
      <div className="absolute inset-[3.5cqi] flex flex-col items-center justify-center gap-[4cqi] rounded-[4%] border-[0.6cqi] border-lucky-yellow/30">
        <span
          aria-hidden
          className="mask-asset h-[40%] w-[40%] text-lucky-yellow/80"
          style={{ "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties}
        />
        <span className="font-display text-[9cqi] uppercase tracking-[0.2em] text-duck-cream/70">
          Lucky Cards
        </span>
        <span className="font-mono text-[4cqi] uppercase tracking-[0.3em] text-lucky-yellow/60">
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
        "relative aspect-[5/7] w-full select-none rounded-[5%] bg-gradient-to-br p-[3cqi] [container-type:inline-size]",
        rarity.rim,
        rarity.glow,
        className,
      )}
    >
      {/* Colored inner frame */}
      <div
        className={cn(
          "relative flex h-full flex-col gap-[2.2cqi] overflow-hidden rounded-[4%] p-[3cqi]",
          frame.ring,
        )}
      >
        {rarity.foil && <span className="foil-sheen" />}

        {/* Title bar */}
        <div
          className={cn(
            "flex items-center justify-between gap-[2cqi] rounded-[2cqi] bg-gradient-to-r px-[3cqi] py-[2cqi] shadow-[inset_0_0_0_0.4cqi_rgba(0,0,0,0.25)]",
            frame.title,
          )}
        >
          <h3 className="truncate font-display text-[7.2cqi] uppercase leading-none text-duck-cream">
            {card.name}
          </h3>
          <span className="flex h-[11cqi] w-[11cqi] shrink-0 items-center justify-center rounded-full border-[0.5cqi] border-lucky-black/40 bg-duck-cream text-lucky-black shadow">
            <Clover className="h-[6cqi] w-[6cqi]" strokeWidth={2} />
          </span>
        </div>

        {/* Art window */}
        <div
          className={cn(
            "relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.5cqi] border-[0.6cqi] border-lucky-black/50",
            frame.art,
          )}
        >
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_8cqi_rgba(0,0,0,0.45)]" />
          <CardArt card={card} />
          {count > 1 && (
            <span className="absolute bottom-[2cqi] right-[2cqi] rounded-[1cqi] bg-lucky-black/75 px-[2cqi] py-[0.8cqi] font-mono text-[4cqi] font-bold text-lucky-yellow">
              x{count}
            </span>
          )}
        </div>

        {/* Type line */}
        <div className="flex items-center justify-between rounded-[1.5cqi] bg-lucky-black/45 px-[3cqi] py-[1.6cqi]">
          <span className="font-mono text-[4cqi] uppercase tracking-widest text-duck-cream">
            {typeLabel[card.type]}
          </span>
          <span className="flex items-center gap-[2cqi]">
            <span className="font-mono text-[3.4cqi] uppercase tracking-wider text-duck-cream/70">
              {rarity.label}
            </span>
            <span
              className={cn("h-[3.4cqi] w-[3.4cqi] rotate-45 rounded-[0.6cqi]", rarity.gem)}
            />
          </span>
        </div>

        {/* Text box (parchment) */}
        <div className="flex flex-col gap-[1.6cqi] rounded-[1.5cqi] bg-duck-cream px-[3cqi] py-[2.4cqi] text-lucky-black">
          {card.ability && (
            <p className="text-[4cqi] font-semibold leading-tight">
              {card.ability}
            </p>
          )}
          <p className="text-[3.7cqi] italic leading-snug text-lucky-black/70">
            {card.line}
          </p>
          <div className="mt-[1cqi] grid grid-cols-4 gap-[1.2cqi] border-t border-lucky-black/15 pt-[1.6cqi]">
            {STAT_KEYS.map(([key, short]) => (
              <div key={key} className="flex flex-col items-center leading-none">
                <span className="font-mono text-[2.8cqi] uppercase tracking-wider text-lucky-black/55">
                  {short}
                </span>
                <span className="font-display text-[6cqi] text-money-green">
                  {card.stats[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Collector line */}
        <div className="flex items-center justify-between px-[1cqi] font-mono text-[2.9cqi] uppercase tracking-widest text-duck-cream/80">
          <span>{card.number}</span>
          <span className="flex items-center gap-[1.5cqi]">
            Lucky Drop 001
            <span
              aria-hidden
              className="mask-asset h-[4.5cqi] w-[4.5cqi] text-duck-cream/80"
              style={
                { "--asset": `url(${brandAssets.symbol.src})` } as React.CSSProperties
              }
            />
          </span>
        </div>
      </div>
    </article>
  );
}
