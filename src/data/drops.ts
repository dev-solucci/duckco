import type { Drop } from "@/types";

/** The drop system — each release explores a facet of Luke. */
export const drops: Drop[] = [
  {
    id: "lucky-drop-001",
    number: 1,
    name: "Lucky Drop 001",
    concept: "A primeira aparição oficial de Luke e da Duck Clothes Company.",
    status: "upcoming",
    items: [
      {
        slug: "camiseta-preta-oversized",
        name: "Camiseta Preta Oversized",
        category: "tee",
        description: "Duck Co. no peito, Luke grande nas costas.",
      },
      {
        slug: "camiseta-creme-luke-classic",
        name: "Camiseta Creme Luke Classic",
        category: "tee",
        description: "Luke Classic com a frase Too Lucky To Lose.",
      },
      {
        slug: "moletom-patch-luke",
        name: "Moletom com Patch do Luke",
        category: "hoodie",
        description: "Cinza ou preto, patch bordado do Luke.",
      },
      {
        slug: "bone-cabeca-luke",
        name: "Boné Cabeça do Luke",
        category: "cap",
        description: "Preto, cabeça do Luke bordada na frente.",
      },
      {
        slug: "jaqueta-coach-lucky-duck-club",
        name: "Jaqueta Coach Lucky Duck Club",
        category: "jacket",
        description: "Lucky Duck Club nas costas.",
      },
      {
        slug: "meias-pegada-de-pato",
        name: "Meias Pegada de Pato",
        category: "accessory",
        description: "Pequeno símbolo de pegada de pato.",
      },
      {
        slug: "pack-stickers-luke",
        name: "Pack de Stickers do Luke",
        category: "accessory",
        description: "Variações do Luke.",
      },
    ],
  },
  {
    id: "lucky-duck-club",
    number: null,
    name: "Lucky Duck Club",
    concept: "Comunidade, patch, jaquetas, bonés e peças mais clássicas.",
    status: "concept",
    items: [],
  },
  {
    id: "bad-luck-still-looks-good",
    number: null,
    name: "Bad Luck Still Looks Good",
    concept: "Drop irônico sobre azar, caos e estilo.",
    status: "concept",
    items: [],
  },
  {
    id: "duck-season",
    number: null,
    name: "Duck Season",
    concept: "Drop mais agressivo, com visual de campanha urbana.",
    status: "concept",
    items: [],
  },
  {
    id: "luke-got-lucky",
    number: null,
    name: "Luke Got Lucky",
    concept: "Drop mais trap — joias, noite, flash e vitória.",
    status: "concept",
    items: [],
  },
  {
    id: "tokyo-luck",
    number: null,
    name: "Tokyo Luck",
    concept: "Influência japonesa, silhuetas amplas e grafismos refinados.",
    territory: "japan",
    status: "concept",
    items: [],
  },
  {
    id: "london-luck",
    number: null,
    name: "London Luck",
    concept: "Tracksuits, jaquetas, clima frio e atitude grime.",
    territory: "uk",
    status: "concept",
    items: [],
  },
  {
    id: "brasil-lucky-club",
    number: null,
    name: "Brasil Lucky Club",
    concept: "Humor, rua brasileira, futebol, verão urbano e malandragem.",
    territory: "brazil",
    status: "concept",
    items: [],
  },
];

export const dropById = Object.fromEntries(
  drops.map((d) => [d.id, d]),
) as Record<string, Drop>;

export const featuredDrop = drops[0];

/** All sellable items across every drop, paired with their drop. */
export const allProducts = drops.flatMap((drop) =>
  drop.items.map((item) => ({ item, drop })),
);

/** Look up a product (and its drop) by item slug. */
export function findProductBySlug(slug: string) {
  return allProducts.find(({ item }) => item.slug === slug) ?? null;
}

/** The single hero highlight: the black oversized tee. */
export const heroProduct = featuredDrop.items[0];
