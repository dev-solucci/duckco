# Lucky Cards — o jogo de cartas da Duck Co.

> Proposta de design e arquitetura para o jogo de cartas colecionáveis da marca.
> Dois pilares: **colecionar** (álbum que é uma história em quadrinhos) e
> **jogar** (duelos entre membros do clube). Conecta com a loja, o clube e a
> sorte que já existem no site.

---

## 1. Visão

Cada membro do Lucky Duck Club coleciona **Lucky Cards**. As cartas contam a
história do Luke, valem no mundo real (recompensas, peças, presentes) e são a
munição de um jogo de duelo entre membros.

Três verbos: **Colecionar. Completar. Duelar.**

O laço da marca:
```
Comprar na loja  ->  ganha packs de cartas  ->  preenche o álbum/HQ
       ^                                              |
       |                                              v
  recompensa real  <-  completar capítulos  ->  monta deck e duela
```

Tudo respeita as regras do projeto: gamificado, sem cassino óbvio, sem loot box
paga, mobile first, premium.

---

## 2. As cartas (o "set")

Categorias:
- **Luke (personas):** Classic, Rich, Runner, Tokyo, London, Brasil, Bad Luck.
  São as cartas herói, com habilidade especial.
- **Peças (gear):** as roupas dos drops (camiseta, moletom, boné, jaqueta...).
- **Amuletos (charms):** trevo, moeda, dado, ferradura, ticket, número 7.
- **Cenas (scene):** arte de quadrinho que avança a história (entram no álbum).

Raridade no código de drop/hype:
| Raridade | Nome | Vibe |
| --- | --- | --- |
| Comum | Street | base |
| Rara | Drop | tiragem limitada |
| Épica | Chrome | estética trap, brilho |
| Lendária | Grail | 1 de 1, numerada |

Toda carta tem **número da sorte** (`007 / 250`), igual à placa de corrida do
site. Mantém a assinatura visual.

**Stats da carta** (para o jogo):
- `estilo` — moda, caimento
- `sorte` — o fator Duck Co.
- `flow` — atitude, presença
- `hype` — desejo, drop

E uma `ability` opcional (só personas e algumas raras).

---

## 3. Colecionar: o álbum é uma HQ

O álbum não é uma grade chata. É uma **história em quadrinhos** que se revela
conforme você coleciona.

- O álbum tem **capítulos** (um por drop/arco): Origem (Drop 001), Lucky Duck
  Club, Tokyo Luck, London Luck, Brasil Lucky Club...
- Cada capítulo é uma sequência de **páginas** com layout de quadrinho (painéis).
- Alguns painéis são **arte fixa** (sempre visíveis); outros são **slots de
  carta**: ficam como silhueta bloqueada até você coletar aquela carta. Ao
  encaixar, o painel se preenche com a arte da carta e revela a fala/legenda,
  avançando a narrativa.
- Ou seja: **a história é literalmente contada pelas cartas que você encaixa.**
- Completar o capítulo desbloqueia o próximo arco da história.

Isso é "álbum de figurinhas encontra graphic novel". Distinto, colecionável,
muito da marca.

---

## 4. Servir pra alguma coisa (mundo real)

Por que colecionar importa:
- **Completar um capítulo** -> cupom, acesso antecipado a drop, sticker digital,
  ou um empurrão de nível no clube.
- **Completar o álbum** -> recompensa real: peça exclusiva, pack físico de
  cartas, item 1 de 1, nome no mural "The Lucky Ones".
- **Ponte para o físico:** cada compra na loja entrega um pack. Cartas físicas
  (em packs enviados com pedidos) trazem um código/QR que destrava a versão
  digital. Comprar -> colecionar -> jogar.
- **Enfeitar e presentear:** wallpapers, arte para imprimir, modo AR, e
  trade/gift de cartas entre membros.
- **Ganhar jogando:** vencer duelos rende sorte, moedas e cartas.

Economia (sem cassino):
- **Lucky Coins** (mole): ganha jogando, no Daily Spin e comprando.
- **Packs:** vêm de compra, engajamento, nível e recompensas — **não** vendidos
  como caixa aleatória paga (evita loot box e mantém o bom gosto). Decisão a
  confirmar.

---

## 5. Jogar: o duelo (precisa ser um jogo de verdade)

**Fit Check / Drop Duel** — um duelo de cartas simples de aprender, com sorte e
estilo, pensado para **async** (desafiar alguém sem os dois estarem online).

Como funciona:
1. Cada jogador monta um **deck** pequeno (ex.: 8 cartas) da sua coleção.
2. A partida tem rounds. Cada round abre um **contexto de rua** (Rolê, Quadra,
   Loja, Balada, Desfile).
3. Uma "vibe" do round, decidida por sorte (o número 7, cara ou coroa do Luke),
   define **qual stat conta** naquele round.
4. Cada um joga uma carta virada; revela; o maior stat relevante vence o round.
5. Habilidades das personas mudam o jogo (Luke Rich +hype, Bad Luck inverte o
   resultado, Lucky Yellow dobra a sorte...).
6. Melhor de N rounds vence a partida.

É "Top Trumps com torção de sorte e heróis com habilidade". Acessível, mobile,
com profundidade via deckbuilding + habilidades. Skill + luck, a cara da marca.

Modos: **Desafio direto** (link para um membro), **fila rápida**, **ranking
semanal** do clube. Partidas resolvidas no servidor (anticheat).

---

## 6. Arquitetura técnica

O que existe hoje: Next.js 16, React 19, Tailwind 4, estado só no cliente
(localStorage). Para multiplayer e propriedade de cartas, precisamos de backend.

Recomendação (alinha com o projeto vizinho `solucci-magic`):
- **Supabase** — Auth (membro do clube = conta), Postgres (cartas, decks,
  partidas, trades), Row Level Security, Realtime opcional.
- **Motor de partida autoritativo no servidor** (Next.js route handlers / server
  actions, ou Supabase Edge Functions) para impedir trapaça com cartas.
- **Async por padrão:** partida turn based salva no banco + notificação. Live
  (Realtime/socket) vira upgrade depois.

Modelo de dados (resumo):
```
card_defs (o set: id, nome, tipo, raridade, numero, stats, ability, art)
profiles (membro do clube)
ownership (profile_id, card_def_id, serial, origem)
decks (profile_id, lista de cartas)
matches (jogadores, estado, rounds, vencedor)  -- resolvido no servidor
trades / gifts
redeem_codes (ponte carta física -> digital)
album_progress (capitulos/paineis preenchidos)
```

A camada de coleção/álbum (single player) pode começar **local** (como a sorte
hoje) para um protótipo rápido, já modelada para migrar ao Supabase quando
entrar a conta.

---

## 7. Roadmap por fases

- **Fase 0 — Lock de design.** Este doc + decisões.
- **Fase 1 — O Set + Álbum HQ (single player).** Definir as cartas, abrir packs,
  o álbum como quadrinho, recompensa ao completar capítulo. Começa local, já
  modelado para backend. É o mais cara de marca e o mais rápido de mostrar.
- **Fase 2 — Contas + backend (Supabase).** Login, propriedade persistente,
  packs vindos de compra, resgate de código físico.
- **Fase 3 — O Jogo (PvP).** Deckbuilder + motor de duelo, desafio assíncrono
  entre membros, ranking, recompensas.
- **Fase 4 — Live ops.** Trade/gift, cartas físicas, temporadas atreladas a
  drops, modo ao vivo.

---

## 8. Nomes para decidir

- Coleção: **Lucky Cards** · Álbum: **O Álbum da Sorte** / **The Lucky Album**
- Duelo: **Fit Check** · **Drop Duel** · **Street Duel**
- Moeda: **Lucky Coins** · Pack: **Lucky Pack**

---

## 9. Decisões travadas (2026-06-19)

- **Começar pela Fase 1:** o Álbum HQ + coleção, single player, estado local.
- **Multiplayer assíncrono** (por vez) quando chegar o duelo.
- **Backend: Supabase** na Fase 2.
- **Mecânica do duelo: Fit Check com sorte** (Top Trumps + sorte + habilidades).

Build da Fase 1 (estado local, `useSyncExternalStore` + localStorage, igual à
sorte): set inicial de cartas, abertura de packs, coleção e o álbum em quadrinho
do capítulo Origem. Rota dedicada `/cartas`. Modelado para migrar ao Supabase.

## 10. Riscos e cuidados

- **Loot box / cassino:** não vender packs aleatórios pagos. Packs por compra de
  produto e engajamento. Mantém bom gosto e foge de regulação.
- **Pay to win:** habilidades e raridade não podem tornar o jogo só sobre quem
  gastou. Balancear; dar caminho de ganhar cartas jogando.
- **Escopo:** é uma plataforma. Entregar em fases, cada uma utilizável sozinha.
