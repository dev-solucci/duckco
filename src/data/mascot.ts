import type { MascotVariant } from "@/types";

export const LUKE = {
  name: "Luke",
  fullName: "Luke, o pato sortudo",
  intlName: "Luke, the Luck Duck",
  personality: [
    "Charmoso",
    "Sortudo",
    "Confiante",
    "Malandro",
    "Elegante",
    "Divertido",
    "Despreocupado",
    "Estiloso",
    "Esperto",
    "Colecionável",
  ],
} as const;

/** Luke's personas — each one anchors a different drop / mood. */
export const lukeVariants: MascotVariant[] = [
  {
    id: "luke-classic",
    name: "Luke Classic",
    tagline: "A versão principal — sorrindo, confiante e sortudo.",
    description:
      "Versão canônica do mascote. Funciona em uma cor, em bordado e como sticker.",
  },
  {
    id: "luke-rich",
    name: "Luke Rich",
    tagline: "Trap, joias e pose de quem venceu.",
    description:
      "Mais brilho, óculos e atitude de vitória. Base do drop 'Luke Got Lucky'.",
  },
  {
    id: "luke-runner",
    name: "Luke Runner",
    tagline: "Esportivo, com tracksuit, tênis e movimento.",
    description: "Energia de corrida e sportswear. Base do drop 'Duck Season'.",
  },
  {
    id: "luke-tokyo",
    name: "Luke Tokyo",
    tagline: "Fashion, peças amplas, bolsa lateral e patches.",
    description: "Influência japonesa e grafismo refinado.",
    territory: "japan",
  },
  {
    id: "luke-london",
    name: "Luke London",
    tagline: "Grime, jaqueta, boné e estética de rua fria.",
    description: "Postura séria e visual mais cru.",
    territory: "uk",
  },
  {
    id: "luke-brasil",
    name: "Luke Brasil",
    tagline: "Humor, malandragem e rua brasileira — sem caricatura.",
    description: "Futebol, calor urbano e confiança de rua.",
    territory: "brazil",
  },
  {
    id: "bad-luck-luke",
    name: "Bad Luck Luke",
    tagline: "Tudo dá errado, mas ele continua estiloso.",
    description: "Versão irônica para drops especiais.",
  },
];

export const lukeVariantById = Object.fromEntries(
  lukeVariants.map((v) => [v.id, v]),
) as Record<string, MascotVariant>;
