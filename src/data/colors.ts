import type { BrandColor, ColorCombo } from "@/types";

/**
 * The Duck Co. palette. Token ids map 1:1 to CSS variables defined in
 * globals.css (`--color-<id>`) and to Tailwind utilities (`bg-<id>`, etc.).
 */
export const palette: BrandColor[] = [
  {
    id: "lucky-black",
    name: "Lucky Black",
    hex: "#0E110C",
    role: "core",
    usage: "Streetwear base, tees, backgrounds, tags, high contrast. Luke's ink.",
  },
  {
    id: "duck-cream",
    name: "Duck Cream",
    hex: "#F6E7C5",
    role: "core",
    usage: "Vintage backgrounds, labels, silk, retro language. Luke's tee.",
  },
  {
    id: "lucky-yellow",
    name: "Lucky Yellow",
    hex: "#ECB71E",
    role: "core",
    usage: "Primary mascot yellow, luck, energy, Luke himself.",
  },
  {
    id: "money-green",
    name: "Money Green",
    hex: "#2D783B",
    role: "core",
    usage: "Luck, money, victory, premium feel. Luke's shorts.",
  },
  {
    id: "street-brown",
    name: "Street Brown",
    hex: "#5A3A25",
    role: "core",
    usage: "Warm, vintage, mature urban tone.",
  },
  {
    id: "deep-green",
    name: "Deep Green",
    hex: "#334023",
    role: "support",
    usage: "Darker olive green from the artwork. Premium surfaces, depth, shadows.",
  },
  {
    id: "off-white",
    name: "Off White",
    hex: "#F8F4EA",
    role: "support",
    usage: "Clean base for prints and applications.",
  },
  {
    id: "deep-navy",
    name: "Deep Navy",
    hex: "#111827",
    role: "support",
    usage: "Fashion-leaning alternative to black.",
  },
  {
    id: "signal-red",
    name: "Signal Red",
    hex: "#D72638",
    role: "support",
    usage: "Drops, tags, impact messaging — used sparingly.",
  },
  {
    id: "chrome-silver",
    name: "Chrome Silver",
    hex: "#C9C9C9",
    role: "support",
    usage: "Jewelry, shine, trap accents.",
  },
];

export const coreColors = palette.filter((c) => c.role === "core");
export const supportColors = palette.filter((c) => c.role === "support");

export const colorById = Object.fromEntries(
  palette.map((c) => [c.id, c]),
) as Record<string, BrandColor>;

/** Recommended, easy-to-apply pairings from the brand guide. */
export const colorCombos: ColorCombo[] = [
  { on: "lucky-black", use: "lucky-yellow" },
  { on: "lucky-black", use: "duck-cream" },
  { on: "duck-cream", use: "money-green" },
  { on: "street-brown", use: "duck-cream" },
  { on: "money-green", use: "lucky-yellow" },
  { on: "lucky-black", use: "chrome-silver" },
  { on: "off-white", use: "lucky-black" },
  { on: "deep-navy", use: "duck-cream" },
  { on: "lucky-black", use: "signal-red", note: "Accent only — pontual." },
];
