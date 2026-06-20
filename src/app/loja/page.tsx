import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { ProductGrid } from "@/components/product/ProductGrid";
import { featuredDrop } from "@/data/drops";

export const metadata: Metadata = {
  title: "Loja",
  description: "As peças do Lucky Drop 001 da Duck Co.",
};

export default function StorePage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-10">
              <LuckyBadge className="text-lucky-yellow">
                {featuredDrop.name}
              </LuckyBadge>
              <h1 className="mt-3 font-display text-6xl uppercase leading-[0.9] text-duck-cream sm:text-8xl">
                A loja
              </h1>
              <p className="mt-3 max-w-lg font-sans text-sm text-chrome-silver">
                {featuredDrop.concept}
              </p>
            </Reveal>
            <ProductGrid items={featuredDrop.items} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
