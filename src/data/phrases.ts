import type { BrandPhrase } from "@/types";

export const SLOGAN = "Too Lucky To Lose";

/** Brand voice copy bank — pull from here for tees, tags, packaging, captions. */
export const phrases: BrandPhrase[] = [
  { text: "Too Lucky To Lose", lang: "en", context: "slogan" },
  { text: "Born Lucky", lang: "en", context: "tee" },
  { text: "Luck Looks Good", lang: "en", context: "tee" },
  { text: "Lucky Duck Club", lang: "en", context: "community" },
  { text: "No Luck, No Story", lang: "en", context: "tee" },
  { text: "Streetwear for the Lucky Ones", lang: "en", context: "campaign" },
  { text: "Good Luck Looks Better", lang: "en", context: "tee" },
  { text: "Duck Season Never Ends", lang: "en", context: "campaign" },
  { text: "Luck Follows Me", lang: "en", context: "tee" },
  { text: "Made for the Lucky Ones", lang: "en", context: "campaign" },
  { text: "Never Out of Luck", lang: "en", context: "tee" },
  { text: "Lucky Since Day One", lang: "en", context: "tee" },
  { text: "A Sorte Veste Bem", lang: "pt", context: "tee" },
  { text: "Sorte no Peito", lang: "pt", context: "tee" },
  { text: "Nascido Sortudo", lang: "pt", context: "tee" },
  { text: "Criado na Rua", lang: "pt", context: "tee" },
  { text: "O Azar Passa Longe", lang: "pt", context: "tee" },
  { text: "Quem Tem Sorte Tem Estilo", lang: "pt", context: "tee" },
];

/** Copy reserved for unboxing / packaging touchpoints. */
export const packagingPhrases: BrandPhrase[] = [
  { text: "You Got Lucky", lang: "en", context: "packaging" },
  { text: "Too Lucky To Lose", lang: "en", context: "packaging" },
  { text: "Luck Arrived", lang: "en", context: "packaging" },
  { text: "Open for Good Luck", lang: "en", context: "packaging" },
  { text: "Lucky Package", lang: "en", context: "packaging" },
  { text: "Duck Co. Approved", lang: "en", context: "packaging" },
  { text: "Luke Picked This One", lang: "en", context: "packaging" },
];

export const phrasesByContext = (context: BrandPhrase["context"]) =>
  [...phrases, ...packagingPhrases].filter((p) => p.context === context);
