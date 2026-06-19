# Duck Clothes Company

Streetwear brand of character, luck and urban culture — global with a Brazilian soul.
Mascot: **Luke, the Luck Duck**. Slogan: **Too Lucky To Lose**.

> This repo is the digital home of the brand: brand system, drops and (later)
> the store. Visual design is built on top of a typed brand-data foundation so
> everything stays consistent.

## Stack

- **Next.js 16** (App Router) · **React 19**
- **TypeScript 5** (strict)
- **Tailwind CSS 4** (tokens in `src/app/globals.css`)
- Helpers: `clsx` + `tailwind-merge` (`cn`), `framer-motion`, `lucide-react`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`.

## Structure

```
src/
├─ app/                # App Router (layout, pages, globals.css)
├─ components/         # UI primitives + brand/section components (to come)
├─ data/               # Brand data — single source of truth
│  ├─ colors.ts        #   palette + recommended combos
│  ├─ phrases.ts       #   slogan + copy bank
│  ├─ mascot.ts        #   Luke + his personas
│  └─ drops.ts         #   drop system + Lucky Drop 001
├─ lib/
│  ├─ brand.ts         # top-level brand facts + re-exports of data/*
│  └─ utils.ts         # cn()
└─ types/              # domain types
```

### Brand tokens

Colors are defined once as CSS variables in `src/app/globals.css` (`@theme`)
and mirrored as data in `src/data/colors.ts`. Token ids match Tailwind
utilities — e.g. `lucky-yellow` → `bg-lucky-yellow` / `text-lucky-yellow`.
**Keep the two files in sync when changing a color.**

Fonts: `--font-display` (Anton — headlines/logo) and `--font-sans` (Inter —
body), injected by `next/font` in `layout.tsx`.

## The universe

- **Palette** — Lucky Black, Duck Cream, Lucky Yellow, Money Green, Street Brown (+ support colors).
- **Luke's personas** — Classic, Rich, Runner, Tokyo, London, Brasil, Bad Luck Luke.
- **Drops** — Lucky Drop 001 (upcoming), then themed releases per territory/mood.
- **Territories** — Japan, UK, USA, Brazil.

Too Lucky To Lose.
