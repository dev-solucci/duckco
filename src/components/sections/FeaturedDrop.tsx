import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { featuredDrop } from "@/data/drops";

// Editorial launch banner. The product list lives on /loja.
export function FeaturedDrop() {
  return (
    <section
      id="drop"
      className="relative flex min-h-[88svh] items-end overflow-hidden bg-lucky-black"
    >
      {/* Editorial campaign photo. Replace public/brand/editorial-001.png with
          the real launch editorial. */}
      <Image
        src="/brand/editorial-001.png"
        alt="Editorial Lucky Drop 001"
        fill
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-lucky-black via-lucky-black/55 to-lucky-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-lucky-black/70 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Reveal className="max-w-xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <LuckyBadge className="text-lucky-yellow">A primeira aparição</LuckyBadge>
            <LuckyBadge className="text-chrome-silver">
              {featuredDrop.items.length} peças
            </LuckyBadge>
          </div>
          <h2 className="font-display text-6xl uppercase leading-[0.9] text-duck-cream sm:text-8xl">
            {featuredDrop.name}
          </h2>
          <p className="mt-4 max-w-md font-sans text-base text-chrome-silver">
            {featuredDrop.concept}
          </p>
          <Link
            href="/loja"
            className="group mt-7 inline-flex items-center gap-2 border-2 border-lucky-yellow bg-lucky-yellow px-7 py-3.5 font-display text-xl uppercase tracking-wide text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
          >
            Ver os produtos
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
