# Duck Clothes Company, notes for Claude

Streetwear brand site. Mascot **Luke, the Luck Duck**. Slogan **Too Lucky To Lose**.
Stack: Next.js 16 (App Router), React 19, TypeScript strict, Tailwind 4.

## Project rules (always honor)

1. **Gamified direction.** The store is built as an experience with game
   mechanics (luck, levels, unlocks, collecting), not a plain catalog. See the
   gamification section in [`docs/visual-reference.md`](docs/visual-reference.md).
2. **Never use the `-` or `—` character in any visible text.** This covers UI
   copy, titles, prose, **code comments**, and **git commit messages**. The
   character is allowed only inside a word that is mandatorily spelled with it,
   never as a stylistic connector or for aesthetics. Rewrite around it: two
   sentences, the word "e" or "até", parentheses, a colon, or just a space. The
   one structural exception is where a platform requires kebab case to function:
   file names, CSS variable and Tailwind token ids, URL slugs, and code
   identifiers. Those are mandatory, not aesthetic.
3. **Never use emojis.** Anywhere: UI, copy, commits, chat.
4. **Always use the design skills** when building or styling any UI
   (`frontend-design`, `web-design-guidelines`, `landing-page-design`,
   `emil-design-eng`, `design-critique`). Invoke them, do not freehand.
5. **Always follow usability and design best practices** (accessibility,
   hierarchy, contrast, touch targets, focus states).
6. **Always innovate in design and usability.** Push for distinctive, original
   solutions. Avoid generic, default looking patterns. Bring fresh ideas.
7. **Do not skimp on components or interactivity.** Rich, polished, animated.
8. **Mobile first, always responsive.** Every screen works on small viewports.

## Conventions

- **Brand data is the source of truth.** Pull copy, colors, drops and mascot
  data from `@/lib/brand` (which re exports `@/data/*`). Do not hardcode brand
  strings or hex values in components.
- **Colors live in two synced places:** `src/app/globals.css` (`@theme` CSS vars)
  and `src/data/colors.ts` (data). Change both together. Token ids map to
  Tailwind utilities (`lucky-yellow` becomes `bg-lucky-yellow`).
- **Fonts:** `font-display` (Anton) for headlines and logo, `font-sans` (Archivo)
  for body, `font-mono` (Space Mono) for technical labels.
- **Class merging:** use `cn()` from `@/lib/utils`.
- **Path alias:** `@/*` maps to `src/*`.

## Brand voice

Short, confident, urban, ironic. Frase de camiseta energy. Not corporate, not
childish, not generic motivational. PT and EN copy both live in `data/phrases.ts`.

## Don't

Avoid: childish look, copying existing characters, casino overload, beach brand
vibes, startup generic streetwear. See brand brief item 23.
