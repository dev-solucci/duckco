# Duck Clothes Company — notes for Claude

Streetwear brand site. Mascot **Luke, the Luck Duck**; slogan **Too Lucky To Lose**.
Stack: Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4.

## Conventions

- **Brand data is the source of truth.** Pull copy, colors, drops and mascot
  data from `@/lib/brand` (which re-exports `@/data/*`) — don't hardcode brand
  strings or hex values in components.
- **Colors live in two synced places:** `src/app/globals.css` (`@theme` CSS vars)
  and `src/data/colors.ts` (data). Change both together. Token ids = Tailwind
  utilities (`lucky-yellow` → `bg-lucky-yellow`).
- **Fonts:** `font-display` (Anton) for headlines/logo, `font-sans` (Inter) for body.
- **Class merging:** use `cn()` from `@/lib/utils`.
- **Path alias:** `@/*` → `src/*`.

## Brand voice

Short, confident, urban, ironic. Frase-de-camiseta energy. Not corporate, not
childish, not generic-motivational. PT and EN copy both live in `data/phrases.ts`.

## Don't

Avoid: childish look, copying existing characters, casino-overload, beach-brand
vibes, startup-generic streetwear. See brand brief §23.
