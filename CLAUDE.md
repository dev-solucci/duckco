# Duck Clothes Company — notes for Claude

Streetwear brand site. Mascot **Luke, the Luck Duck**; slogan **Too Lucky To Lose**.
Stack: Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4.

## Project rules (always honor)

1. **Gamified direction.** The store is built as an experience with game
   mechanics (luck, levels, unlocks, collecting), not a plain catalog. See the
   gamification section in [`docs/visual-reference.md`](docs/visual-reference.md).
2. **No hyphen / dash characters in any user facing copy.** Never use `-` or
   `—` in visible text, UI strings or prose. Rewrite around it (split into two
   sentences, use "e", "até", parentheses, a colon). The ONLY exceptions are
   where the platform requires kebab case: file names, CSS variable / Tailwind
   token ids, and URL slugs.
3. **Never use emojis.** Anywhere: UI, copy, commits, chat.
4. **Always use the design skills** when building or styling any UI
   (`frontend-design`, `web-design-guidelines`, `landing-page-design`,
   `emil-design-eng`, `design-critique`). Invoke them, do not freehand.
5. **Always follow usability and design best practices** (accessibility,
   hierarchy, contrast, touch targets, focus states).
6. **Do not skimp on components or interactivity.** Rich, polished, animated.
7. **Mobile first, always responsive.** Every screen works on small viewports.

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
