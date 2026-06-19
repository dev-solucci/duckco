"use client";

import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { ProductMedia } from "@/components/product/ProductMedia";
import { featuredDrop } from "@/data/drops";
import { luckyNumber } from "@/data/game";
import { useLuck } from "@/lib/luck";
import { categoryLabel, toneForIndex } from "@/lib/product";
import type { DropItem } from "@/types";
import { cn } from "@/lib/utils";

export function FeaturedDrop() {
  return (
    <section id="drop" className="relative bg-lucky-black px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-lucky-yellow">
              A primeira aparição
            </span>
            <h2 className="mt-2 font-display text-5xl uppercase leading-none text-duck-cream sm:text-7xl">
              {featuredDrop.name}
            </h2>
            <p className="mt-3 max-w-lg font-sans text-sm text-chrome-silver">
              {featuredDrop.concept}
            </p>
          </div>
          <LuckyBadge className="text-lucky-yellow">
            {featuredDrop.items.length} peças
          </LuckyBadge>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {featuredDrop.items.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 4) * 0.06}>
              <ProductCard item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, index }: { item: DropItem; index: number }) {
  const { addLuck } = useLuck();
  const [saved, setSaved] = useState(false);
  const tone = toneForIndex(index);

  function save() {
    if (saved) return;
    setSaved(true);
    addLuck(4);
  }

  return (
    <div className="group flex flex-col border-2 border-duck-cream/12 transition hover:border-lucky-yellow">
      <div className="relative">
        <Link
          href={`/produto/${item.slug}`}
          aria-label={item.name}
          className="block"
        >
          <ProductMedia
            tone={tone}
            number={String(index + 1).padStart(2, "0")}
            hover
            className="aspect-[4/5]"
          />
        </Link>
        <button
          onClick={save}
          aria-label={saved ? "Na lista" : "Salvar na lista"}
          className={cn(
            "absolute bottom-2 right-2 z-10 flex h-9 w-9 items-center justify-center border-2 transition",
            saved
              ? "border-lucky-yellow bg-lucky-yellow text-lucky-black"
              : "border-current bg-lucky-black/30 text-duck-cream hover:bg-lucky-yellow hover:text-lucky-black",
          )}
        >
          {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 bg-lucky-black p-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-lucky-yellow">
          {categoryLabel[item.category]}
        </span>
        <Link href={`/produto/${item.slug}`}>
          <h3 className="font-display text-lg uppercase leading-tight text-duck-cream transition hover:text-lucky-yellow">
            {item.name}
          </h3>
        </Link>
        <p className="line-clamp-2 font-sans text-xs text-chrome-silver/80">
          {item.description}
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-duck-cream/10 pt-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver">
            No. {luckyNumber(item.name)}
          </span>
          <span className="font-display text-sm uppercase text-lucky-yellow">
            Em breve
          </span>
        </div>
      </div>
    </div>
  );
}
