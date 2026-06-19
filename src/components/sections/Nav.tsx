"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { MaskedAsset } from "@/components/brand/MaskedAsset";
import { LuckMeterMini } from "@/components/game/LuckMeter";
import { brandAssets } from "@/data/assets";
import { cn } from "@/lib/utils";

const links = [
  { label: "Drop", href: "#drop" },
  { label: "Clube", href: "#clube" },
  { label: "Coleção", href: "#colecao" },
  { label: "Manifesto", href: "#manifesto" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setSolid(y > 40);
    if (!open) setHidden(y > last && y > 280);
    setLast(y);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-duck-cream/10 bg-lucky-black/90 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center text-duck-cream">
          <MaskedAsset
            src={brandAssets.symbol.src}
            label="Luke"
            className="h-9 w-9 text-lucky-yellow"
          />
          <MaskedAsset
            src={brandAssets.wordmark.src}
            label="Duck Co."
            className="-ml-1.5 h-4 w-20"
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-widest text-duck-cream/80 transition hover:text-lucky-yellow"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-duck-cream">
          <LuckMeterMini />
          <button
            aria-label="Sacola"
            className="relative transition hover:text-lucky-yellow"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="transition hover:text-lucky-yellow md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-duck-cream/10 bg-lucky-black md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-duck-cream/10 py-3 font-display text-2xl uppercase text-duck-cream transition hover:text-lucky-yellow"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
