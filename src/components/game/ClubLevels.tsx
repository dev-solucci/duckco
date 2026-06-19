"use client";

import { clubLevels } from "@/data/game";
import { useLuck } from "@/lib/luck";
import { cn } from "@/lib/utils";

export function ClubLevels() {
  const { level, luck } = useLuck();
  return (
    <ul className="flex flex-col">
      {clubLevels.map((l) => {
        const current = l.id === level.id;
        const reached = luck >= l.min;
        return (
          <li
            key={l.id}
            className={cn(
              "flex items-center gap-4 border-l-4 py-3 pl-4 transition",
              current
                ? "border-money-green bg-money-green/10"
                : reached
                  ? "border-money-green/40"
                  : "border-lucky-black/15",
            )}
          >
            <span
              className={cn(
                "font-mono text-xs font-bold tabular-nums",
                reached ? "text-money-green" : "text-lucky-black/40",
              )}
            >
              {String(l.min).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-display text-xl uppercase leading-none",
                    reached ? "text-lucky-black" : "text-lucky-black/45",
                  )}
                >
                  {l.name}
                </span>
                {current && (
                  <span className="bg-money-green px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-duck-cream">
                    Você
                  </span>
                )}
              </div>
              <span className="font-sans text-xs text-lucky-black/60">
                {l.perk}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
