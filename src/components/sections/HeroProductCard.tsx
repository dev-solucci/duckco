"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProductMedia } from "@/components/product/ProductMedia";
import { heroProduct } from "@/data/drops";
import { categoryLabel } from "@/lib/product";
import { luckyNumber } from "@/data/game";
import { cn } from "@/lib/utils";

/** Floating featured product card. Links to the product detail page. */
export function HeroProductCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("lg:animate-float", className)}
    >
      <Link
        href={`/produto/${heroProduct.slug}`}
        className="group block border-2 border-duck-cream/20 bg-lucky-black/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-lucky-yellow"
      >
        <div className="flex items-center gap-3">
          <ProductMedia
            tone="bg-deep-green"
            number="01"
            hover
            className="h-20 w-20 shrink-0"
          />
          <div className="min-w-0 flex-1 pr-1">
            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-lucky-yellow">
              Destaque do drop
            </span>
            <h3 className="truncate font-display text-lg uppercase leading-tight text-duck-cream">
              {heroProduct.name}
            </h3>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver">
              {categoryLabel[heroProduct.category]} · No. {luckyNumber(heroProduct.name)}
            </span>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-lucky-yellow text-lucky-black transition group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
