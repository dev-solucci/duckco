import type { CardDef, CardStats } from "@/types";

// Fit Check duel engine (local prototype, runs client side). Each round opens a
// street context that favors one stat; luck adds upside on top; persona
// abilities bend the result. Best of the played cards wins the match.

export interface Context {
  id: string;
  name: string;
  stat: keyof CardStats;
  blurb: string;
}

export const contexts: Context[] = [
  { id: "desfile", name: "Desfile", stat: "estilo", blurb: "Quem tem mais estilo leva." },
  { id: "loja", name: "Loja", stat: "sorte", blurb: "A sorte decide o achado." },
  { id: "quadra", name: "Quadra", stat: "flow", blurb: "É flow e movimento." },
  { id: "balada", name: "Balada", stat: "hype", blurb: "O hype manda na pista." },
  { id: "role", name: "Rolê", stat: "flow", blurb: "Presença na rua." },
];

export const statLabel: Record<keyof CardStats, string> = {
  estilo: "Estilo",
  sorte: "Sorte",
  flow: "Flow",
  hype: "Hype",
};

// Persona abilities: which stat they double, and in which context's stat.
const doublesStat: Record<string, keyof CardStats> = {
  "luke-runner": "flow",
  "luke-tokyo": "estilo",
  "luke-brasil": "sorte",
  "luke-rich": "hype",
};

export function drawContext(): Context {
  return contexts[Math.floor(Math.random() * contexts.length)];
}

export interface CardScore {
  base: number;
  doubled: boolean;
  bonus: number;
  total: number;
  note?: string;
}

/** Flat charm bonuses added to the round, deterministic. */
const flatBonus: Record<string, number> = {
  trevo: 15,
  moeda: 15,
};

/**
 * Score a card in a context. Pure skill: the favored stat (doubled by some
 * abilities) plus deterministic charm bonuses. No randomness.
 */
export function cardScore(card: CardDef, ctx: Context): CardScore {
  let base = card.stats[ctx.stat];
  let doubled = false;
  let note: string | undefined;

  if (doublesStat[card.id] === ctx.stat) {
    base *= 2;
    doubled = true;
    note = "Habilidade: dobra";
  }

  const bonus = flatBonus[card.id] ?? 0;
  if (bonus) note = `Charm: +${bonus}`;

  return { base, doubled, bonus, total: base + bonus, note };
}

/** Cards that win a tie. */
const winsTies = (c: CardDef) => c.id === "numero-7" || c.id === "luke-classic";

function breakTie(a: CardDef, b: CardDef): "player" | "bot" {
  if (winsTies(a) !== winsTies(b)) return winsTies(a) ? "player" : "bot";
  if (a.stats.sorte !== b.stats.sorte)
    return a.stats.sorte > b.stats.sorte ? "player" : "bot";
  const sum = (c: CardDef) =>
    c.stats.estilo + c.stats.sorte + c.stats.flow + c.stats.hype;
  if (sum(a) !== sum(b)) return sum(a) > sum(b) ? "player" : "bot";
  return "player";
}

export interface RoundResult {
  context: Context;
  player: { card: CardDef; score: CardScore };
  bot: { card: CardDef; score: CardScore };
  winner: "player" | "bot";
  /** True when Bad Luck Luke saved a losing round. */
  stolen: boolean;
}

export function resolveRound(
  playerCard: CardDef,
  botCard: CardDef,
  ctx: Context,
): RoundResult {
  const p = cardScore(playerCard, ctx);
  const b = cardScore(botCard, ctx);

  let winner: "player" | "bot";
  if (p.total === b.total) winner = breakTie(playerCard, botCard);
  else winner = p.total > b.total ? "player" : "bot";

  // Bad Luck Luke does not lose the round it enters. Deterministic.
  let stolen = false;
  if (winner === "bot" && playerCard.id === "bad-luck-luke") {
    winner = "player";
    stolen = true;
  } else if (winner === "player" && botCard.id === "bad-luck-luke") {
    winner = "bot";
    stolen = true;
  }

  return {
    context: ctx,
    player: { card: playerCard, score: p },
    bot: { card: botCard, score: b },
    winner,
    stolen,
  };
}

/** Bot plays the strongest card for the context. */
export function botPick(hand: CardDef[], ctx: Context): CardDef {
  return [...hand].sort(
    (a, b) => cardScore(b, ctx).total - cardScore(a, ctx).total,
  )[0];
}

/** Random opponent deck of the given size from a card pool. */
export function randomDeck(pool: CardDef[], size: number): CardDef[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, size);
}

export const DECK_SIZE = 5;
export const MIN_DECK = 3;
