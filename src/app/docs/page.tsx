import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { docSections } from "@/data/docs";
import { coreColors } from "@/data/colors";
import { cardById } from "@/data/cards";
import { brandAssets } from "@/data/assets";

export default function DocsIndex() {
  const sample = cardById["luke-classic"];

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="grain relative mb-10 overflow-hidden rounded-2xl border border-duck-cream/10 bg-deep-green/30 p-6 sm:p-10">
        <div className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-lucky-yellow/15 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Image
            src={brandAssets.lukeFront.src}
            alt="Luke"
            width={120}
            height={170}
            className="w-24 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] sm:w-28"
          />
          <div>
            <LuckyBadge className="text-lucky-yellow">Interno · Duck Co.</LuckyBadge>
            <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] text-duck-cream sm:text-6xl">
              Documentação
            </h1>
            <p className="mt-3 max-w-md font-sans text-sm text-chrome-silver">
              A base viva da marca: empresa, identidade, produto, jogo,
              tecnologia e histórico. Tudo num lugar só.
            </p>
          </div>
        </div>
      </div>

      {/* Palette strip, a visual taste of the brand */}
      <div className="mb-12">
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-money-green">
          Paleta da marca
        </h2>
        <div className="flex overflow-hidden rounded-lg border border-duck-cream/10">
          {coreColors.map((c) => (
            <div key={c.id} className="group relative h-16 flex-1" style={{ backgroundColor: c.hex }}>
              <span className="absolute inset-x-0 bottom-1 text-center font-mono text-[0.5rem] uppercase tracking-wider text-lucky-black/70 opacity-0 transition group-hover:opacity-100">
                {c.hex}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Doc sections */}
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-12">
        <div className="flex flex-col gap-10">
          {docSections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 font-display text-2xl uppercase text-duck-cream">
                {section.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group flex items-start justify-between gap-3 rounded-lg border border-duck-cream/12 bg-lucky-black/40 p-4 transition hover:border-lucky-yellow"
                  >
                    <span>
                      <span className="block font-display text-lg uppercase leading-tight text-duck-cream">
                        {doc.title}
                      </span>
                      <span className="mt-0.5 block font-sans text-xs text-chrome-silver">
                        {doc.blurb}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-chrome-silver transition group-hover:rotate-45 group-hover:text-lucky-yellow" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* A real card, just to show the universe */}
        {sample && (
          <div className="hidden w-44 shrink-0 lg:block">
            <div className="sticky top-12">
              <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-widest text-money-green">
                Do universo
              </p>
              <Card card={sample} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
