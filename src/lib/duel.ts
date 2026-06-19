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
  luck: number;
  total: number;
  note?: string;
}

/** Score a card in a context. Skill (the favored stat) plus luck upside. */
export function cardScore(
  card: CardDef,
  ctx: Context,
  withLuck = true,
): CardScore {
  let base = card.stats[ctx.stat];
  let doubled = false;
  let note: string | undefined;

  if (doublesStat[card.id] === ctx.stat) {
    base *= 2;
    doubled = true;
    note = "Habilidade: dobra";
  }

  let bonus = 0;
  if (card.id === "trevo") {
    bonus += 20;
    note = "Trevo: mais sorte";
  }

  const luck = withLuck
    ? Math.floor(Math.random() * (Math.round(card.stats.sorte / 7) + 1))
    : 0;

  return { base, doubled, bonus, luck, total: base + bonus + luck, note };
}

export interface RoundResult {
  context: Context;
  player: { card: CardDef; score: CardScore };
  bot: { card: CardDef; score: CardScore };
  winner: "player" | "bot";
  inverted: boolean;
}

export function resolveRound(
  playerCard: CardDef,
  botCard: CardDef,
  ctx: Context,
): RoundResult {
  const p = cardScore(playerCard, ctx);
  const b = cardScore(botCard, ctx);

  let winner: "player" | "bot";
  if (p.total === b.total) {
    if (playerCard.id === "numero-7") winner = "player";
    else if (botCard.id === "numero-7") winner = "bot";
    else winner = playerCard.stats.sorte >= botCard.stats.sorte ? "player" : "bot";
  } else {
    winner = p.total > b.total ? "player" : "bot";
  }

  // Bad Luck Luke can flip the round.
  let inverted = false;
  if (
    (playerCard.id === "bad-luck-luke" || botCard.id === "bad-luck-luke") &&
    Math.random() < 0.4
  ) {
    winner = winner === "player" ? "bot" : "player";
    inverted = true;
  }

  return {
    context: ctx,
    player: { card: playerCard, score: p },
    bot: { card: botCard, score: b },
    winner,
    inverted,
  };
}

/** Greedy bot: play the card with the best effective stat for the context. */
export function botPick(hand: CardDef[], ctx: Context): CardDef {
  return [...hand].sort(
    (a, b) => cardScore(b, ctx, false).total - cardScore(a, ctx, false).total,
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
