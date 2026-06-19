import type { CardDef, CardRarity } from "@/types";

/**
 * The first Lucky Cards set: "Lucky Drop 001". Personas, gear and charms.
 * Art is procedural for now (rarity frame + Luke symbol / glyph); real card
 * art comes later. Numbers follow the race plate motif used across the site.
 */
export const cards: CardDef[] = [
  // --- Personas (the heroes) ---
  {
    id: "luke-classic",
    name: "Luke Classic",
    type: "persona",
    rarity: "drop",
    number: "001 / 250",
    stats: { estilo: 70, sorte: 80, flow: 72, hype: 75 },
    line: "Ele chega e tudo conspira a favor.",
    art: "luke-classic",
    ability: "Sorte base alta. Empata round a seu favor.",
  },
  {
    id: "luke-rich",
    name: "Luke Rich",
    type: "persona",
    rarity: "chrome",
    number: "002 / 120",
    stats: { estilo: 78, sorte: 70, flow: 74, hype: 92 },
    line: "Joias, brilho e pose de quem venceu.",
    art: "luke-rich",
    ability: "Hype dobra no contexto Balada.",
  },
  {
    id: "luke-runner",
    name: "Luke Runner",
    type: "persona",
    rarity: "drop",
    number: "003 / 250",
    stats: { estilo: 68, sorte: 74, flow: 88, hype: 70 },
    line: "Tracksuit, tênis e movimento.",
    art: "luke-runner",
    ability: "Flow dobra no contexto Quadra.",
  },
  {
    id: "luke-tokyo",
    name: "Luke Tokyo",
    type: "persona",
    rarity: "drop",
    number: "004 / 200",
    stats: { estilo: 90, sorte: 72, flow: 76, hype: 80 },
    line: "Fashion, peças amplas e patches.",
    art: "luke-tokyo",
    ability: "Estilo dobra no contexto Desfile.",
  },
  {
    id: "luke-london",
    name: "Luke London",
    type: "persona",
    rarity: "drop",
    number: "005 / 200",
    stats: { estilo: 80, sorte: 70, flow: 84, hype: 74 },
    line: "Grime, jaqueta e estética de rua fria.",
    art: "luke-london",
    ability: "Flow alto no contexto Rolê.",
  },
  {
    id: "luke-brasil",
    name: "Luke Brasil",
    type: "persona",
    rarity: "drop",
    number: "006 / 200",
    stats: { estilo: 74, sorte: 90, flow: 86, hype: 72 },
    line: "Malandragem, futebol e calor urbano.",
    art: "luke-brasil",
    ability: "Sorte dobra no contexto Loja.",
  },
  {
    id: "bad-luck-luke",
    name: "Bad Luck Luke",
    type: "persona",
    rarity: "grail",
    number: "007 / 007",
    stats: { estilo: 84, sorte: 40, flow: 82, hype: 95 },
    line: "Tudo dá errado, mas ele continua estiloso.",
    art: "bad-luck-luke",
    ability: "Inverte o resultado do round uma vez por partida.",
  },

  // --- Gear (the drop pieces) ---
  {
    id: "camiseta-preta",
    name: "Camiseta Preta Oversized",
    type: "gear",
    rarity: "street",
    number: "008 / 500",
    stats: { estilo: 62, sorte: 55, flow: 60, hype: 58 },
    line: "Luke grande nas costas. Base de tudo.",
    art: "gear",
  },
  {
    id: "moletom-patch",
    name: "Moletom com Patch",
    type: "gear",
    rarity: "drop",
    number: "009 / 250",
    stats: { estilo: 72, sorte: 60, flow: 66, hype: 70 },
    line: "Patch bordado do Luke. Peça de desejo.",
    art: "gear",
  },
  {
    id: "bone-luke",
    name: "Boné Cabeça do Luke",
    type: "gear",
    rarity: "street",
    number: "010 / 500",
    stats: { estilo: 66, sorte: 58, flow: 70, hype: 60 },
    line: "Cabeça do Luke bordada na frente.",
    art: "gear",
  },
  {
    id: "jaqueta-coach",
    name: "Jaqueta Coach Lucky Duck Club",
    type: "gear",
    rarity: "chrome",
    number: "011 / 120",
    stats: { estilo: 86, sorte: 64, flow: 72, hype: 84 },
    line: "Lucky Duck Club nas costas.",
    art: "gear",
  },

  // --- Charms (the luck items) ---
  {
    id: "trevo",
    name: "Trevo da Sorte",
    type: "charm",
    rarity: "street",
    number: "012 / 777",
    stats: { estilo: 40, sorte: 88, flow: 44, hype: 50 },
    line: "Sorte no bolso.",
    art: "clover",
    ability: "Soma sorte ao round.",
  },
  {
    id: "moeda",
    name: "Moeda da Virada",
    type: "charm",
    rarity: "drop",
    number: "013 / 250",
    stats: { estilo: 42, sorte: 84, flow: 48, hype: 56 },
    line: "Cara você ganha, coroa você ganha.",
    art: "coin",
    ability: "Refaz a vibe do round uma vez.",
  },
  {
    id: "numero-7",
    name: "Número 7",
    type: "charm",
    rarity: "grail",
    number: "777 / 777",
    stats: { estilo: 60, sorte: 99, flow: 60, hype: 77 },
    line: "O número que cai pro Luke.",
    art: "seven",
    ability: "Sorte máxima. Vence empates.",
  },
];

export const cardById = Object.fromEntries(
  cards.map((c) => [c.id, c]),
) as Record<string, CardDef>;

export const TOTAL_CARDS = cards.length;

/** Pack draw weights by rarity (higher = more common). */
export const rarityWeight: Record<CardRarity, number> = {
  street: 60,
  drop: 28,
  chrome: 10,
  grail: 2,
};

/** Visual styling tokens per rarity. */
export const rarityMeta: Record<
  CardRarity,
  { label: string; frame: string; glow: string; text: string }
> = {
  street: {
    label: "Street",
    frame: "border-duck-cream/25",
    glow: "",
    text: "text-chrome-silver",
  },
  drop: {
    label: "Drop",
    frame: "border-lucky-yellow",
    glow: "shadow-[0_0_24px_-6px_var(--color-lucky-yellow)]",
    text: "text-lucky-yellow",
  },
  chrome: {
    label: "Chrome",
    frame: "border-chrome-silver",
    glow: "shadow-[0_0_26px_-4px_var(--color-chrome-silver)]",
    text: "text-chrome-silver",
  },
  grail: {
    label: "Grail · 1 of 1",
    frame: "border-lucky-yellow",
    glow: "shadow-[0_0_40px_-2px_var(--color-lucky-yellow)]",
    text: "text-lucky-yellow",
  },
};
