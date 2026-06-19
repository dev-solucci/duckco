# Arquitetura

> Visão técnica do projeto. Atualize quando a estrutura mudar.

## Stack

- **Next.js 16** (App Router) e **React 19**
- **TypeScript** estrito
- **Tailwind CSS 4** (tokens em `src/app/globals.css`)
- **Framer Motion** para animação, **lucide-react** para ícones
- **Supabase** (Auth, Postgres, RLS) para contas, coleção e duelos
- Helpers: `clsx` mais `tailwind-merge` via `cn()`

## Estrutura de pastas

```
src/
├─ app/                 Rotas (App Router)
│  ├─ page.tsx          Home (landing do clube e loja)
│  ├─ cartas/           Lucky Cards: packs, coleção, álbum
│  ├─ duelo/            Fit Check (duelo)
│  ├─ produto/[slug]/   Página de produto
│  ├─ entrar/           Login do clube
│  └─ auth/callback/    Retorno do OAuth
├─ components/          UI por domínio (brand, cards, duel, game, sections, ui)
├─ data/               Dados da marca e do jogo (fonte da verdade)
├─ lib/                brand, utils, luck, cards, duel, auth, supabase
├─ types/              Tipos de domínio
└─ middleware.ts       Refresh de sessão Supabase
```

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Landing: hero, drop, clube, coleção, manifesto |
| `/cartas` | Abrir packs, coleção TCG, álbum em quadrinho |
| `/duelo` | Fit Check contra bot (protótipo) |
| `/produto/[slug]` | Detalhe de produto (estático por item do drop) |
| `/entrar` | Login Google e Apple |
| `/auth/callback` | Troca o código OAuth por sessão |

## Estado no cliente

Dois stores locais, ambos com `useSyncExternalStore` mais `localStorage`,
pensados offline first:
- **Sorte e clube:** `src/lib/luck.tsx` (`duckco.luck.v1`)
- **Coleção de cartas:** `src/lib/cards.tsx` (`duckco.cards.v1`)

Quando o membro loga, `syncCollection()` concilia a coleção local com a da conta.

## Banco de dados (Supabase, Postgres)

Definição completa em [`supabase/schema.sql`](../supabase/schema.sql). Resumo:

| Tabela | Para que serve |
| --- | --- |
| `profiles` | Membro do clube, ligado a `auth.users`. Sorte e nível |
| `card_ownership` | Cartas que o membro possui (uma linha por cópia) |
| `decks` | Decks salvos para o duelo |
| `matches` | Duelos assíncronos, estado resolvido no servidor |
| `redeem_codes` | Ponte de carta física para a digital via código |

Segurança por linha (RLS) em todas as tabelas. As definições das cartas (o set)
ficam no código (`src/data/cards.ts`); o banco guarda só posse, decks e partidas.

## Comércio

Decisão: **Shopify headless** (ver [commerce-shopify.md](commerce-shopify.md)).
O Shopify guarda catálogo, estoque, pedidos, pagamento e frete; o site lê pela
Storefront API e usa o checkout do Shopify. Hoje os produtos ainda são estáticos
em `src/data/drops.ts`; serão trocados pelos dados reais do Shopify. O clube e as
cartas seguem no Supabase, ligados ao Shopify por webhook de pedido pago.

## Autenticação

OAuth Google e Apple via Supabase. Sessão mantida por cookies e renovada no
`middleware.ts`. Fluxo: `signInWith` redireciona ao provedor, retorna em
`/auth/callback`, que troca o código por sessão. Setup em
[backend-setup.md](backend-setup.md).

## Convenções

Ver [`CLAUDE.md`](../CLAUDE.md): dados da marca como fonte da verdade, cores em
dois lugares sincronizados, fontes (Anton, Archivo, Space Mono), `cn()` para
classes, alias `@/*` para `src/*`.
