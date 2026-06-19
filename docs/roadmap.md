# Roadmap

> O que vem pela frente. Atualize conforme as prioridades mudam.

## Agora

- **Login real:** habilitar Google no Supabase, testar o fluxo de ponta a ponta
  e confirmar a sincronização da coleção na conta. Ver [backend-setup.md](backend-setup.md).

## Próximo

- **Duelo PvP assíncrono:** levar o Fit Check para a tabela `matches`, com
  desafio entre membros e resolução no servidor.
- **Arte das cartas:** gerar a arte única de cada carta e trocar o placeholder.
- **Loja real:** preços, carrinho e checkout. Hoje os produtos mostram "Em breve".
- **Packs por compra:** cada pedido na loja entrega um pack de cartas.

## Depois

- **Cartas físicas:** códigos QR que destravam a carta digital (`redeem_codes`).
- **Mais capítulos do álbum** e novas personas do Luke.
- **Trade e gift** de cartas entre membros.
- **Temporadas** de cartas atreladas aos drops.

## Comércio (futuro, já considerado na arquitetura)

A marca vai **vender de verdade**, com integração de envio e gestão de estoque.
Hoje os produtos são dados estáticos em `src/data/drops.ts` e mostram "Em breve".
Para evitar retrabalho, o caminho pensado é:

- **Catálogo no banco:** migrar produtos para tabelas no Supabase com
  variantes (tamanho, cor), preço e **estoque** por variante. O mesmo padrão
  já usado para cartas e contas.
- **Pedidos e checkout:** tabelas de `orders` e `order_items`, reserva de
  estoque no momento do pedido, status de pagamento e de envio.
- **Pagamento (Brasil):** Mercado Pago ou Stripe, com **Pix**, cartão e boleto.
- **Envio (Brasil):** integração com **Melhor Envio** (ou Correios) para cálculo
  de frete por CEP, etiqueta e rastreio.
- **Estoque:** baixa automática ao confirmar pagamento, alerta de baixo estoque.
- **Fiscal:** emissão de nota (NF e), via serviço como Bling ou similar.

**Decisão tomada (2026 06 19): Shopify headless.** O Shopify cuida de catálogo,
estoque, pedidos, pagamento e frete, com painel pronto; a nossa vitrine Next.js
lê os produtos pela Storefront API. Detalhes em
[commerce-shopify.md](commerce-shopify.md). O salto principal é tirar o catálogo
do código (`src/data/drops.ts`) e ler do Shopify.

## Institucional

- Termos de uso, política de privacidade e LGPD, trocas, frete.
- Regras do clube e dos sorteios. Ver [company.md](company.md).
