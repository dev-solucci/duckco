"use client";

import { motion } from "framer-motion";
import { Gift, Check } from "lucide-react";
import { useCards } from "@/lib/cards";
import { cn } from "@/lib/utils";

export function AlbumProgress({ reward }: { reward: string }) {
  const { albumProgress } = useCards();
  const { filled, total, complete } = albumProgress;
  const pct = total > 0 ? (filled / total) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-widest">
        <span className="text-lucky-yellow">Progresso do capítulo</span>
        <span className="text-duck-cream">
          {filled} / {total}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden border-2 border-duck-cream/20 bg-lucky-black">
        <motion.div
          className="h-full bg-lucky-yellow"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 110, damping: 20 }}
        />
      </div>
      <div
        className={cn(
          "mt-3 flex items-center gap-2 border-2 border-dashed px-3 py-2 font-mono text-xs",
          complete
            ? "border-lucky-yellow text-lucky-yellow"
            : "border-duck-cream/20 text-chrome-silver",
        )}
      >
        {complete ? <Check className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
        <span>
          {complete ? "Recompensa liberada: " : "Complete e ganhe: "}
          <span className="text-duck-cream">{reward}</span>
        </span>
      </div>
    </div>
  );
}
