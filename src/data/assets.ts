/**
 * Brand asset manifest. Files live in `public/brand/` (served statically) and
 * are mirrored from the design source in `/assets`. Reference assets through
 * this manifest so paths stay in one place.
 */
export interface BrandAsset {
  id: string;
  /** Public path, usable directly in <img src> / next/image. */
  src: string;
  alt: string;
  /** True when the art is a single ink color and adapts to currentColor. */
  monochrome: boolean;
}

export const brandAssets = {
  wordmark: {
    id: "wordmark",
    src: "/brand/logo.svg",
    alt: "Duck Co.",
    monochrome: true,
  },
  slogan: {
    id: "slogan",
    src: "/brand/slogan.svg",
    alt: "Too Lucky To Lose",
    monochrome: true,
  },
  /** Luke's head as a single color line icon — the brand symbol. */
  symbol: {
    id: "symbol",
    src: "/brand/luke-avatar.svg",
    alt: "Luke, the Luck Duck",
    monochrome: true,
  },
  /** Full body Luke, confident smirk — the hero pose. */
  lukeFront: {
    id: "lukeFront",
    src: "/brand/luke-front.svg",
    alt: "Luke, the Luck Duck",
    monochrome: false,
  },
  /** Full body Luke, unbothered "bleh" expression — alternate mood. */
  lukeBleh: {
    id: "lukeBleh",
    src: "/brand/luke-bleh.svg",
    alt: "Luke, the Luck Duck",
    monochrome: false,
  },
} satisfies Record<string, BrandAsset>;

export type BrandAssetId = keyof typeof brandAssets;
