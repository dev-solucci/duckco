// Core domain types for the Duck Clothes Company universe.

/** A single color in the brand palette. */
export interface BrandColor {
  /** kebab-case token id, e.g. "lucky-yellow" — matches the Tailwind theme variable. */
  id: string;
  /** Human-readable name, e.g. "Lucky Yellow". */
  name: string;
  hex: `#${string}`;
  /** "core" colors carry the brand; "support" colors are accents. */
  role: "core" | "support";
  /** Short note on where/how the color is used. */
  usage: string;
}

/** A recommended foreground/background pairing. */
export interface ColorCombo {
  on: string; // background color id
  use: string; // foreground color id
  note?: string;
}

/** Where a brand phrase is meant to live. */
export type PhraseContext =
  | "slogan"
  | "tee"
  | "tag"
  | "packaging"
  | "campaign"
  | "community";

export interface BrandPhrase {
  text: string;
  lang: "en" | "pt";
  context: PhraseContext;
}

/** One of Luke's personas. */
export interface MascotVariant {
  /** kebab-case id, e.g. "luke-rich". */
  id: string;
  name: string;
  /** One-line essence of the persona. */
  tagline: string;
  description: string;
  /** Cultural territory this variant leans into, if any. */
  territory?: CulturalTerritory;
}

export type CulturalTerritory = "japan" | "uk" | "usa" | "brazil";

// --- Lucky Cards (the card game) ---------------------------------------

export type CardType = "persona" | "gear" | "charm" | "scene";

/** Rarity in drop / hype language, ordered from common to grail. */
export type CardRarity = "street" | "drop" | "chrome" | "grail";

export interface CardStats {
  estilo: number;
  sorte: number;
  flow: number;
  hype: number;
}

export interface CardDef {
  /** kebab-case id, e.g. "luke-rich". */
  id: string;
  name: string;
  type: CardType;
  rarity: CardRarity;
  /** Race plate serial, e.g. "007 / 250". */
  number: string;
  stats: CardStats;
  /** Short flavor / comic line. */
  line: string;
  /** Persona variant id, or charm glyph key, used to pick the art. */
  art?: string;
  /** Special ability text (personas / rares), used later by the duel. */
  ability?: string;
}

/** One slot in a comic page: fixed art panel or a card slot. */
export type AlbumPanel =
  | { kind: "art"; caption: string; span?: number }
  | { kind: "slot"; cardId: string; caption: string; span?: number };

export interface AlbumPage {
  panels: AlbumPanel[];
}

export interface AlbumChapter {
  id: string;
  title: string;
  /** The drop / arc this chapter tells. */
  subtitle: string;
  pages: AlbumPage[];
  /** Reward unlocked when every slot in the chapter is filled. */
  reward: string;
}

export type ProductCategory =
  | "tee"
  | "hoodie"
  | "cap"
  | "jacket"
  | "pants"
  | "accessory";

export interface DropItem {
  /** Stable url slug, e.g. "camiseta-preta-oversized". */
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
}

/** A themed release. */
export interface Drop {
  /** Stable id / order key, e.g. "lucky-drop-001". */
  id: string;
  /** Sequential drop number, null for evergreen lines. */
  number: number | null;
  name: string;
  concept: string;
  territory?: CulturalTerritory;
  items: DropItem[];
  status: "upcoming" | "live" | "archived" | "concept";
}
