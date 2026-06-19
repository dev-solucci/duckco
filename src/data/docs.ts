// On site documentation index (metadata only, no filesystem). Safe to import
// from client components. The markdown is read in src/lib/docs.ts.

export interface DocMeta {
  slug: string;
  title: string;
  blurb: string;
}

export interface DocSection {
  title: string;
  docs: DocMeta[];
}

export const docSections: DocSection[] = [
  {
    title: "Empresa e marca",
    docs: [
      { slug: "company", title: "Empresa", blurb: "Missão, visão, valores e dados legais" },
      { slug: "brand", title: "Marca", blurb: "Conceito, voz, mascote e drops" },
      { slug: "visual-reference", title: "Identidade visual", blurb: "Direção de arte e gamificação" },
    ],
  },
  {
    title: "Produto e jogo",
    docs: [
      { slug: "card-game", title: "Lucky Cards", blurb: "Design do jogo de cartas" },
      { slug: "lucky-cards-art-prompts", title: "Arte das cartas", blurb: "Prompts por carta" },
      { slug: "lucky-drop-001-prompts", title: "Lucky Drop 001", blurb: "Prompts da primeira coleção" },
      { slug: "brand-image-prompts", title: "Geração da marca", blurb: "Prompts de logo e mascote" },
    ],
  },
  {
    title: "Tecnologia",
    docs: [
      { slug: "architecture", title: "Arquitetura", blurb: "Stack, rotas e banco de dados" },
      { slug: "backend-setup", title: "Backend Supabase", blurb: "Setup e OAuth" },
      { slug: "commerce-shopify", title: "Comércio Shopify", blurb: "Produtos, estoque e checkout" },
      { slug: "deploy", title: "Publicação", blurb: "Checklist de deploy" },
    ],
  },
  {
    title: "Processo",
    docs: [
      { slug: "history", title: "Histórico", blurb: "O que foi construído" },
      { slug: "roadmap", title: "Roadmap", blurb: "O que vem pela frente" },
    ],
  },
];

export const allDocs: DocMeta[] = docSections.flatMap((s) => s.docs);

export const docBySlug = Object.fromEntries(
  allDocs.map((d) => [d.slug, d]),
) as Record<string, DocMeta>;
