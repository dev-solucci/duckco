# Comércio (Shopify headless)

> Decisão (2026 06 19): o comércio da Duck Co. roda em **Shopify headless**.
> O Shopify cuida de catálogo, estoque, pedidos, pagamento e frete. O nosso site
> Next.js é a **vitrine custom**, lendo os dados pela API do Shopify. O clube e
> as cartas seguem no Supabase.

## Como você gerencia os produtos

Tudo pelo **painel do Shopify**, sem código:
- Criar e editar produtos, com fotos, descrição e preço.
- **Variações** (tamanho, cor) com preço e **estoque** por variação.
- Coleções (que viram os drops na vitrine).
- Pedidos, clientes, cupons, frete e pagamento.

O nosso site busca esses produtos pela **Storefront API** e renderiza no design
da marca. Mudou algo no Shopify, aparece no site.

## Arquitetura

```
Shopify (catálogo, estoque, pedidos, pagamento, frete)
   |  Storefront API (leitura) e checkout
   v
Next.js (vitrine custom da Duck Co.)
   |
Supabase (clube, cartas, contas)
```

Ligação futura: quando um pedido é pago, um **webhook** do Shopify avisa o nosso
backend para liberar um pack de cartas ao membro (cada compra rende um pack).

## O que você faz (uma vez)

1. Criar a loja em shopify.com (tem teste grátis).
2. Cadastrar alguns produtos para testar.
3. Em **Settings, Apps and sales channels, Develop apps**, criar um app e gerar
   um **Storefront API access token** (é público, de leitura).
4. Pegar o domínio da loja (`suamarca.myshopify.com`).
5. Me passar o **domínio** e o **Storefront token**. Eu ligo a vitrine.
6. Pagamento e frete: configurar no painel do Shopify (Pix via gateway como
   Mercado Pago, frete via Melhor Envio ou Correios).

## O que eu faço (quando tiver o token)

- Cliente Shopify e consultas (produtos, coleções, carrinho).
- Trocar os produtos estáticos de `src/data/drops.ts` pelos dados reais do Shopify.
- Páginas de produto e grade do drop lendo do Shopify.
- Carrinho via Storefront API e checkout do Shopify.
- Webhook de pedido pago para liberar packs no clube.

## Variáveis de ambiente (quando ligar)

| Variável | O que é |
| --- | --- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `suamarca.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | Storefront API token (leitura, público) |

## Brasil

Shopify suporta o mercado brasileiro: Pix e cartão via gateways (Mercado Pago e
outros), frete via apps de Melhor Envio e Correios, e nota fiscal via apps como
Bling. Tudo configurado no painel, sem código nosso.
