import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { LuckyBadge } from "@/components/ui/LuckyBadge";
import { LoginButtons } from "@/components/auth/LoginButtons";
import { MaskedAsset } from "@/components/brand/MaskedAsset";
import { brandAssets } from "@/data/assets";

export const metadata: Metadata = {
  title: "Entrar no clube",
  description: "Entre no Lucky Duck Club e leve sua coleção pra qualquer lugar.",
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="grain relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6">
        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-lucky-yellow/10 blur-[120px]" />
        <div className="relative w-full max-w-md text-center">
          <MaskedAsset
            src={brandAssets.symbol.src}
            label="Luke"
            className="mx-auto mb-6 h-16 w-16 text-lucky-yellow"
          />
          <LuckyBadge className="text-lucky-yellow">Lucky Duck Club</LuckyBadge>
          <h1 className="mt-3 font-display text-5xl uppercase leading-[0.9] text-duck-cream sm:text-6xl">
            Entre no clube
          </h1>
          <p className="mx-auto mt-3 max-w-sm font-sans text-sm text-chrome-silver">
            Sua coleção, seus packs e seus duelos salvos na conta. Acesse de
            qualquer lugar e leve a sorte com você.
          </p>
          <div className="mt-8 text-left">
            <LoginButtons />
          </div>
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver/60">
            Sem senha. Você entra com um toque.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
