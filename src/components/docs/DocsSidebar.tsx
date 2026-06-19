"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { MaskedAsset } from "@/components/brand/MaskedAsset";
import { docSections } from "@/data/docs";
import { brandAssets } from "@/data/assets";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-duck-cream/10 bg-lucky-black/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/docs" className="flex items-center gap-1 text-duck-cream">
          <MaskedAsset src={brandAssets.symbol.src} label="Luke" className="h-7 w-7 text-lucky-yellow" />
          <span className="font-display text-lg uppercase">Docs</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar índice" : "Abrir índice"}
          className="text-duck-cream"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <aside
        className={cn(
          "border-duck-cream/10 lg:sticky lg:top-0 lg:block lg:h-dvh lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-r",
          open ? "block border-b" : "hidden",
        )}
      >
        <div className="px-5 py-6">
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="mb-6 hidden items-center gap-1 text-duck-cream lg:flex"
          >
            <MaskedAsset src={brandAssets.symbol.src} label="Luke" className="h-8 w-8 text-lucky-yellow" />
            <MaskedAsset src={brandAssets.wordmark.src} label="Duck Co." className="-ml-1 h-4 w-20" />
          </Link>

          <nav className="flex flex-col gap-5">
            {docSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 font-mono text-[0.6rem] uppercase tracking-widest text-money-green">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {section.docs.map((doc) => {
                    const active = pathname === `/docs/${doc.slug}`;
                    return (
                      <li key={doc.slug}>
                        <Link
                          href={`/docs/${doc.slug}`}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block border-l-2 py-1.5 pl-3 font-sans text-sm transition",
                            active
                              ? "border-lucky-yellow text-lucky-yellow"
                              : "border-transparent text-duck-cream/70 hover:border-duck-cream/30 hover:text-duck-cream",
                          )}
                        >
                          {doc.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver transition hover:text-lucky-yellow"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>
        </div>
      </aside>
    </>
  );
}
