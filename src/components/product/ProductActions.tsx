"use client";

import { useState } from "react";
import { Bell, Check } from "lucide-react";
import { useLuck } from "@/lib/luck";
import { cn } from "@/lib/utils";

/** Notify / save action on the product page. Rewards luck the first time. */
export function ProductActions({ slug }: { slug: string }) {
  const { addLuck } = useLuck();
  const [saved, setSaved] = useState(false);

  function save() {
    if (saved) return;
    setSaved(true);
    addLuck(5);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={save}
        className={cn(
          "inline-flex items-center justify-center gap-2 border-2 px-7 py-3.5 font-display text-xl uppercase tracking-wide transition",
          saved
            ? "border-money-green bg-money-green text-duck-cream"
            : "border-lucky-yellow bg-lucky-yellow text-lucky-black hover:bg-transparent hover:text-lucky-yellow",
        )}
        data-slug={slug}
      >
        {saved ? (
          <>
            <Check className="h-5 w-5" />
            Na sua lista
          </>
        ) : (
          <>
            <Bell className="h-5 w-5" />
            Avise me no lançamento
          </>
        )}
      </button>
      {saved && (
        <span className="self-center font-mono text-xs text-money-green">
          mais 5 de sorte no bolso
        </span>
      )}
    </div>
  );
}
