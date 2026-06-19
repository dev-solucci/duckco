import type { CulturalTerritory } from "@/types";

/**
 * Single source of truth for Duck Co. brand identity.
 * Data collections live in `@/data/*`; this file holds the top-level facts
 * and re-exports the collections for convenient `@/lib/brand` imports.
 */
export const brand = {
  name: "Duck Clothes Company",
  shortName: "Duck Co.",
  slogan: "Too Lucky To Lose",
  mascot: {
    name: "Luke",
    title: "o pato sortudo",
    intlTitle: "the Luck Duck",
  },
  positioning:
    "Marca streetwear de personagem, sorte e cultura urbana — global com alma brasileira.",
  pillars: [
    "Confiante",
    "Sortuda",
    "Descolada",
    "Irônica",
    "Carismática",
  ],
  communityNames: [
    "Lucky Duck Club",
    "Duck Co. Club",
    "The Lucky Ones",
    "Luke's Circle",
    "Duck Season Club",
  ],
} as const;

export const territories: Record<
  CulturalTerritory,
  { label: string; brings: string }
> = {
  japan: {
    label: "Japão",
    brings: "Construção de universo, força do personagem e precisão visual.",
  },
  uk: {
    label: "Inglaterra",
    brings: "Postura, contraste e energia urbana mais seca.",
  },
  usa: {
    label: "Estados Unidos",
    brings: "Escala, produto e linguagem comercial de streetwear.",
  },
  brazil: {
    label: "Brasil",
    brings: "Alma, tempero, linguagem e personalidade.",
  },
};

export * from "@/data/colors";
export * from "@/data/phrases";
export * from "@/data/mascot";
export * from "@/data/drops";
