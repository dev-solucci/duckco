import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { ProductMedia } from "@/components/product/ProductMedia";
import { ProductActions } from "@/components/product/ProductActions";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { allProducts, findProductBySlug } from "@/data/drops";
import { luckyNumber } from "@/data/game";
import { categoryLabel, toneForIndex } from "@/lib/product";

export function generateStaticParams() {
  return allProducts.map(({ item }) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findProductBySlug(slug);
  return { title: found ? found.item.name : "Produto" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findProductBySlug(slug);
  if (!found) notFound();

  const { item, drop } = found;
  const index = drop.items.findIndex((i) => i.slug === item.slug);
  const tone = toneForIndex(index);
  const related = drop.items.filter((i) => i.slug !== item.slug).slice(0, 4);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
        <nav className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
          <Link href="/" className="transition hover:text-lucky-yellow">
            Início
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#drop" className="transition hover:text-lucky-yellow">
            {drop.name}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-duck-cream">{item.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          <ProductMedia
            tone={tone}
            number={String(index + 1).padStart(2, "0")}
            className="aspect-square w-full border-2 border-duck-cream/12"
          />

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <LuckyBadge className="text-lucky-yellow">{drop.name}</LuckyBadge>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
                {categoryLabel[item.category]}
              </span>
            </div>

            <h1 className="font-display text-5xl uppercase leading-[0.95] text-duck-cream sm:text-6xl">
              {item.name}
            </h1>

            <p className="mt-5 max-w-md font-sans text-base text-chrome-silver">
              {item.description}
            </p>

            <div className="mt-6 flex items-center gap-4 border-y border-duck-cream/10 py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-chrome-silver">
                Número da sorte
              </span>
              <span className="font-mono text-lg font-bold text-lucky-yellow">
                {luckyNumber(item.name)}
              </span>
              <span className="ml-auto font-display text-2xl uppercase text-duck-cream">
                Em breve
              </span>
            </div>

            <div className="mt-7">
              <ProductActions slug={item.slug} />
            </div>

            <Link
              href="/#drop"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-chrome-silver transition hover:text-lucky-yellow"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o drop
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 font-display text-3xl uppercase text-duck-cream">
              Outras peças do drop
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {related.map((r) => {
                const ri = drop.items.findIndex((i) => i.slug === r.slug);
                return (
                  <Link
                    key={r.slug}
                    href={`/produto/${r.slug}`}
                    className="group flex flex-col border-2 border-duck-cream/12 transition hover:border-lucky-yellow"
                  >
                    <ProductMedia
                      tone={toneForIndex(ri)}
                      number={String(ri + 1).padStart(2, "0")}
                      hover
                      className="aspect-[4/5]"
                    />
                    <div className="bg-lucky-black p-3">
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-lucky-yellow">
                        {categoryLabel[r.category]}
                      </span>
                      <h3 className="font-display text-base uppercase leading-tight text-duck-cream">
                        {r.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
