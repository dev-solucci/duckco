# Duck Co. — Referência Visual (Loja & Marca)

> Direção de arte para o site/loja e para a identidade. Síntese de **Nike** +
> **Fox Racing**, puxada para algo mais **moderno, novo e diferente**.
> Complementa o brand brief e a paleta em [`src/data/colors.ts`](../src/data/colors.ts).

---

## 1. O que pegamos de cada referência

### Nike — _confiança e silêncio_
- Minimalismo radical: muito respiro, poucos elementos por tela.
- Tipografia **gigante, bold, condensada** como protagonista.
- Base monocromática (preto/branco) + **um** acento que explode.
- Produto como herói: foto grande, fundo limpo, foco total.
- Grid editorial, modular, ritmado. Movimento sutil e proposital.
- **Uma marca, um símbolo** — o swoosh carrega tudo.

### Fox Racing — _adrenalina e atitude_
- Energia de corrida: contraste alto, fundos escuros, tensão.
- Formas **angulares**, badges, números, estética técnica/utilitária.
- A **cabeça da raposa** como ícone que vale sozinho.
  → paralelo direto: a **cabeça do Luke** é o nosso símbolo.
- Linguagem de "equipe", patrocínio, número de corrida, kit.

### O que NÃO copiamos
Nike é frio/corporativo demais; Fox é macho/moto demais. Duck Co. tem
**humor, sorte, malandragem e um personagem cartoon**. Esse é o tempero que
nenhum dos dois tem — é por aí que a gente fica diferente.

---

## 2. A direção própria: **"Lucky Sport"**

Sportswear minimalista (Nike) **encontra** badge de corrida (Fox) **encontra**
mascote cartoon vintage + cultura de drop. Uma loja que parece **uma equipe
esportiva de um time que não existe** — o _Lucky Duck Club_ — com alma de rua
brasileira e acabamento premium.

Três palavras-âncora: **Bold. Lucky. Premium.**

O que torna a loja "nova/diferente":
1. **Mascote no centro**, do jeito que Nike/Fox não fazem — Luke aparece grande,
   com personalidade, reagindo às coisas (não é um logo parado).
2. **Sistema gráfico de sorte como linguagem de UI** — ticket, recibo, número
   da sorte, selo, carimbo viram componentes reais (badges de drop, tags de
   preço, divisores).
3. **Editorial + esportivo ao mesmo tempo** — respiro Nike, mas com a textura,
   o grão e o calor de um pôster de rua.

---

## 3. Cor aplicada na web

- **Base escura por padrão** (`lucky-black`) — moderno, premium, faz o amarelo
  saltar. Seções de respiro/produto em `duck-cream` / `off-white`.
- **`lucky-yellow` é o "swoosh"**: o acento que carrega CTA, hover, destaque,
  número da sorte. Usar com disciplina — pouco e forte.
- **`money-green`** para superfícies premium/seções de comunidade.
- **`signal-red`** só em drop ao vivo / urgência (contador, "live now").
- Regra: no máximo **1 acento por tela**. Dark + cream + 1 punch.

## 4. Tipografia na web

- **Display (Anton / condensada bold)** — headlines em CAIXA ALTA, enormes,
  coladas, ocupando a largura. É o herói visual.
- **Sans (Inter)** — todo o resto: nav, preço, descrição, e-commerce.
- **Apoio (mono / carimbo)** — números de drop, SKUs, "001/250", labels
  técnicas. Dá o ar de badge/corrida.
- Hierarquia brutal: ou é GIGANTE ou é pequeno e discreto. Nada no meio-termo.

## 5. Layout & componentes

- **Grid modular** com blocos de tamanhos contrastantes (1 bloco herói + grid
  de produtos menor).
- **Nav** minimalista, fixa, com o ícone do Luke no canto + carrinho. Some no
  scroll para baixo.
- **Product card**: foto limpa, nome em sans, preço, e um **badge de número**
  (estilo placa de corrida) no canto. Hover troca para o Luke ou para o verso.
- **Drop badge**: estética de ticket/selo com `lucky-yellow`.
- **Bordas/divisores**: linha tracejada de cupom, perfuração de ticket.
- **Cantos**: mistura de retangular cru (Fox) com selo arredondado (mascote).

## 6. Foto & arte

- Foto urbana real: flash, asfalto, loja de conveniência, quadra, estação.
- Oversized, postura natural, atitude — nunca "modelo de catálogo".
- Grão/textura leve por cima (não-digital demais). Asfalto molhado, néon.
- O Luke pode invadir a foto como sticker/recorte — colagem de rua.

## 7. Movimento

- Sutil e confiante (Nike), com **um** momento de energia por seção (Fox).
- Texto que entra deslizando, número que "vira" como roleta/odômetro, Luke que
  pisca ou ajeita o boné no hover. Nada de exagero.
- `framer-motion` (já instalado) para entradas e micro-interações.

## 8. Régua rápida (faça / evite)

| Faça | Evite |
| --- | --- |
| Dark base + 1 amarelo | Arco-íris da paleta numa tela só |
| Headline gigante condensada | Texto médio genérico |
| Luke com personalidade | Logo parado e sem alma |
| Badge de número/ticket | Cassino óbvio (cartas, fichas, dados em excesso) |
| Respiro + 1 punch de energia | Tela cheia e barulhenta |
| Premium e cru ao mesmo tempo | Limpo startup ou moto macho |

---

## 9. Camada de gamificação (regra central do projeto)

A loja não é catálogo, é experiência. A sorte vira mecânica de jogo. Tudo
abaixo deve nascer de dados tipados (futuro `src/data/game.ts`) e respeitar
usabilidade, acessibilidade e mobile first.

**Conceito guia:** entrar na Duck Co. é entrar no _Lucky Duck Club_. O visitante
acumula sorte, sobe de nível e desbloqueia coisas. Quanto mais joga, mais a
marca conspira a favor dele.

Mecânicas (do leve ao forte):
- **Luck Meter.** Um medidor de sorte persistente no topo que enche conforme o
  visitante navega, interage e compra. Estética de barra de energia de game.
- **Daily Spin.** Roleta diária do Luke (estilo odômetro) que dá cupom, sticker
  digital ou prévia de drop. Animação de número girando.
- **Níveis do clube.** Rookie, Lucky, Hot Streak, Too Lucky To Lose. Cada nível
  abre acesso antecipado a drops e peças exclusivas.
- **Colecionar o Luke.** As 7 personas viram colecionáveis digitais; completar a
  coleção desbloquea recompensa. Conecta com os stickers físicos.
- **Lucky Number.** Cada peça e cada pedido recebe um número da sorte (placa de
  corrida). Números premiados geram brindes.
- **Streak.** Voltar em dias seguidos aumenta a sorte. Reforça hábito sem ser
  agressivo.
- **Scratch / reveal.** Card de "raspadinha" no checkout ou no unboxing digital.
- **Quests leves.** "Monte um look", "siga no Instagram", "primeiro drop" dão
  XP de sorte.

Regras de bom gosto (para não virar cassino nem joguinho infantil):
- A gamificação é **tempero premium**, não o prato. Nunca polui o produto.
- Feedback satisfatório: micro animações, som opcional, haptics no mobile.
- Honesto e acessível: estados de foco, sem padrões escuros, recompensa real.
- Tudo funciona e é bonito **no mobile primeiro**.

---

_Too Lucky To Lose._
