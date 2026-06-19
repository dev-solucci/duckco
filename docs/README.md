# Duck Co. — Documentação viva

> Documentação central e viva da Duck Clothes Company. Reúne empresa, marca,
> identidade visual, produto, jogo, tecnologia, banco de dados, histórico e
> roadmap. **Viva** quer dizer que cresce a cada entrega: sempre que criamos
> algo, registramos aqui.
>
> Dados marcados como **(fictício, atualizar)** são preenchimentos provisórios.
> Substitua pelos valores reais quando tiver.

Última atualização: 2026 06 19.

## Mapa da documentação

### Empresa e marca
- [Empresa, missão, visão, valores e dados legais](company.md)
- [Marca: conceito, posicionamento, personalidade, voz, mascote](brand.md)
- [Identidade visual e direção de arte](visual-reference.md)

### Produto e jogo
- Drops e primeira coleção: ver a seção de drops em [brand.md](brand.md) e os
  prompts em [lucky-drop-001-prompts.md](lucky-drop-001-prompts.md)
- [Jogo de cartas Lucky Cards: design e plano](card-game.md)
- [Prompts de arte das cartas](lucky-cards-art-prompts.md)
- [Prompts de geração da marca](brand-image-prompts.md)

### Tecnologia
- [Arquitetura, stack, rotas e banco de dados](architecture.md)
- [Setup do backend Supabase](backend-setup.md)
- Schema do banco: [`supabase/schema.sql`](../supabase/schema.sql)

### Processo
- [Histórico do que foi construído](history.md)
- [Roadmap](roadmap.md)
- Regras do projeto: [`CLAUDE.md`](../CLAUDE.md)

## Fontes da verdade no código

A documentação descreve; o código decide. Estes arquivos são a fonte da verdade:
- Marca e dados: `src/lib/brand.ts` e `src/data/*`
- Cores: `src/data/colors.ts` mais `src/app/globals.css`
- Cartas e álbum: `src/data/cards.ts`, `src/data/album.ts`
- Jogo: `src/lib/duel.ts`, `src/lib/cards.tsx`
- Banco: `supabase/schema.sql`
