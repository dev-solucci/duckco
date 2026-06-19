import type { AlbumChapter } from "@/types";

/**
 * The album is a comic. Each chapter is an arc; pages are panel grids. "art"
 * panels are always visible narration; "slot" panels stay locked until you own
 * the card, then they fill in and reveal their caption, advancing the story.
 */
export const chapters: AlbumChapter[] = [
  {
    id: "origem",
    title: "Origem",
    subtitle: "Lucky Drop 001 · a primeira aparição do Luke",
    reward: "Cupom do primeiro drop e um empurrão no clube",
    pages: [
      {
        panels: [
          {
            kind: "art",
            caption: "A cidade nunca dorme. E a sorte também não.",
            span: 2,
          },
          {
            kind: "slot",
            cardId: "luke-classic",
            caption: "Aí ele aparece. Luke, o pato sortudo.",
          },
          {
            kind: "slot",
            cardId: "trevo",
            caption: "Sorte no bolso, sempre.",
          },
          {
            kind: "slot",
            cardId: "camiseta-preta",
            caption: "A primeira peça. Luke grande nas costas.",
          },
          {
            kind: "slot",
            cardId: "bone-luke",
            caption: "Boné virado. Do jeito certo.",
          },
        ],
      },
      {
        panels: [
          {
            kind: "slot",
            cardId: "moeda",
            caption: "A moeda cai. E cai pra ele.",
          },
          {
            kind: "slot",
            cardId: "moletom-patch",
            caption: "O patch bordado. Marca de clube.",
          },
          {
            kind: "art",
            caption: "O sinal abre. O rolê vira história.",
            span: 2,
          },
          {
            kind: "slot",
            cardId: "numero-7",
            caption: "O sete aparece. Too Lucky To Lose.",
            span: 2,
          },
        ],
      },
    ],
  },
];

export const chapterById = Object.fromEntries(
  chapters.map((c) => [c.id, c]),
) as Record<string, AlbumChapter>;

/** Every card id that has a slot somewhere in the album. */
export const albumCardIds = chapters.flatMap((c) =>
  c.pages.flatMap((p) =>
    p.panels.flatMap((panel) => (panel.kind === "slot" ? [panel.cardId] : [])),
  ),
);
