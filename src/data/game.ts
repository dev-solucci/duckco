// Gamification data. The store runs on a persistent "luck" score (0 to 100)
// that grows as the visitor explores, spins and collects. See the gamification
// section of docs/visual-reference.md.

export interface ClubLevel {
  id: string;
  name: string;
  /** Minimum luck score to reach this level. */
  min: number;
  /** Short perk line, no hyphens in copy. */
  perk: string;
}

/** Lucky Duck Club tiers, ordered by threshold. */
export const clubLevels: ClubLevel[] = [
  { id: "rookie", name: "Rookie", min: 0, perk: "Bem vindo ao clube" },
  { id: "lucky", name: "Lucky", min: 25, perk: "Stickers digitais do Luke" },
  { id: "hot-streak", name: "Hot Streak", min: 60, perk: "Acesso antecipado aos drops" },
  {
    id: "too-lucky",
    name: "Too Lucky To Lose",
    min: 90,
    perk: "Peças exclusivas e número da sorte premiado",
  },
];

export function levelForLuck(luck: number): ClubLevel {
  return [...clubLevels].reverse().find((l) => luck >= l.min) ?? clubLevels[0];
}

export function nextLevel(luck: number): ClubLevel | null {
  return clubLevels.find((l) => l.min > luck) ?? null;
}

export type RewardKind =
  | "luck"
  | "discount"
  | "shipping"
  | "sticker"
  | "access"
  | "again";

export interface SpinSegment {
  id: string;
  label: string;
  kind: RewardKind;
  /** Luck granted when this segment lands. */
  luck: number;
  color: string; // palette token id used for the wedge
}

/** Daily Spin wheel. Eight wedges, alternating colors. */
export const spinSegments: SpinSegment[] = [
  { id: "off5", label: "5% OFF", kind: "discount", luck: 8, color: "lucky-yellow" },
  { id: "sticker", label: "STICKER", kind: "sticker", luck: 5, color: "duck-cream" },
  { id: "ship", label: "FRETE GRÁTIS", kind: "shipping", luck: 12, color: "lucky-yellow" },
  { id: "again1", label: "QUASE", kind: "again", luck: 2, color: "duck-cream" },
  { id: "off10", label: "10% OFF", kind: "discount", luck: 15, color: "lucky-yellow" },
  { id: "access", label: "DROP ACCESS", kind: "access", luck: 20, color: "duck-cream" },
  { id: "luck", label: "+25 LUCK", kind: "luck", luck: 25, color: "lucky-yellow" },
  { id: "again2", label: "QUASE", kind: "again", luck: 2, color: "duck-cream" },
];

/** Deterministic lucky number for a label, formatted like a race plate. */
export function luckyNumber(seed: string, max = 250): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const n = (h % max) + 1;
  return `${String(n).padStart(3, "0")} / ${max}`;
}
