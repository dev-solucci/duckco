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

export type ProductCategory =
  | "tee"
  | "hoodie"
  | "cap"
  | "jacket"
  | "pants"
  | "accessory";

export interface DropItem {
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
