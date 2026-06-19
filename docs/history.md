# Histórico

> Registro vivo do que foi construído, em ordem. Cada entrega nova entra aqui.
> Reconstruído a partir do histórico de commits.

## 2026 06 18 — Fundação

- Base do projeto: Next.js 16, React 19, Tailwind 4, TypeScript estrito.
- Camada de dados da marca: paleta, frases, personas do Luke, sistema de drops.
- Referência visual ("Lucky Sport") e prompts de geração da marca.
- Regras do projeto e camada de gamificação definidas.
- Integração dos assets reais (logo, slogan, Luke) e alinhamento da paleta à arte.

## 2026 06 19 — Site, marca e jogo

### Landing e identidade
- Landing gamificada completa: hero, drop, clube, coleção, manifesto, rodapé.
- Correção das fontes (Anton, Archivo, Space Mono) e ajuste dos logos.
- Hero passa a usar a ilustração do Luke como fundo.
- Card de produto flutuante no hero, páginas de produto e badges do clube.
- Ajustes finos: espaçamento do título e manifesto mais curto e pessoal.

### Lucky Cards (jogo)
- Proposta de design do jogo de cartas (colecionar mais duelar).
- Fase 1: coleção e álbum em quadrinho em `/cartas`, abertura de packs.
- Cartas redesenhadas com cara de carta TCG de verdade, depois simplificadas.
- Correção de layout das cartas e visualização ampliada com inclinação 3D.
- Prompts de arte para cada carta.

### Duelo
- Protótipo jogável do Fit Check em `/duelo`, contra bot, com sorte e habilidades.

### Backend
- Fundação Supabase: clientes, schema com RLS, guia de setup.
- Login Google e Apple (OAuth), middleware de sessão e sincronização da coleção.

### Processo
- Regras do projeto reforçadas: nunca usar hífen em texto visível, comentários
  ou commits; nunca emojis; sempre inovar em design e usabilidade.
- Documentação viva criada (empresa, marca, arquitetura, histórico, roadmap).
- Central de documentação dentro do site em `/docs`, fora do menu.
- Decisão de comércio: Shopify headless. Cliente da Storefront API montado.

### Lançamento
- **Site no ar na Vercel:** `https://duckco.vercel.app`. Repositório
  `dev-solucci/duckco`, deploy automático a cada push. Variáveis do Supabase
  configuradas na Vercel. Falta apenas registrar as URLs de produção no Supabase
  para o login funcionar online.

## Como manter

Ao concluir uma entrega relevante, adicione um item com a data. Use texto sem
hífen estético, igual ao resto do projeto.
