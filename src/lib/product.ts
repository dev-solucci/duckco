import type { ProductCategory } from "@/types";

export const categoryLabel: Record<ProductCategory, string> = {
  tee: "Camiseta",
  hoodie: "Moletom",
  cap: "Boné",
  jacket: "Jaqueta",
  pants: "Calça",
  accessory: "Acessório",
};

// Alternating media tones, racing kit feel.
export const productTones = ["bg-deep-green", "bg-duck-cream", "bg-street-brown"];

export function toneForIndex(i: number): string {
  return productTones[i % productTones.length];
}

/** Light toned media need dark foreground marks. */
export function isLightTone(tone: string): boolean {
  return tone === "bg-duck-cream";
}
