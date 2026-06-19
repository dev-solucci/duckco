"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { spinSegments, type SpinSegment } from "@/data/game";
import { useLuck } from "@/lib/luck";
import { colorById } from "@/data/colors";
import { cn } from "@/lib/utils";

const SEG = 360 / spinSegments.length;

export function DailySpin() {
  const { addLuck, markSpun, spunToday } = useLuck();
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinSegment | null>(null);
  const pending = useRef<SpinSegment | null>(null);

  // Conic gradient stops, one wedge per segment.
  const gradient = `conic-gradient(${spinSegments
    .map((s, i) => {
      const c = colorById[s.color]?.hex ?? "#ECB71E";
      return `${c} ${i * SEG}deg ${(i + 1) * SEG}deg`;
    })
    .join(", ")})`;

  function spin() {
    if (spinning || spunToday) return;
    setResult(null);
    const i = Math.floor(Math.random() * spinSegments.length);
    const seg = spinSegments[i];
    pending.current = seg;

    const center = i * SEG + SEG / 2;
    const desiredMod = ((-center % 360) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const forward = ((desiredMod - currentMod) % 360 + 360) % 360;
    setRotation(rotation + 360 * 5 + forward);
    setSpinning(true);
  }

  function onRest() {
    if (!spinning) return;
    setSpinning(false);
    const seg = pending.current;
    if (seg) {
      addLuck(seg.luck);
      markSpun();
      setResult(seg);
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-64 w-64 sm:h-72 sm:w-72">
        {/* Pointer */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1">
          <div className="h-0 w-0 border-x-[12px] border-t-[20px] border-x-transparent border-t-signal-red drop-shadow" />
        </div>

        {/* Wheel */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-lucky-black shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
          style={{ background: gradient }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={onRest}
        >
          {spinSegments.map((s, i) => (
            <div
              key={s.id}
              className="absolute left-1/2 top-1/2 origin-left"
              style={{
                transform: `rotate(${i * SEG + SEG / 2}deg) translateX(8px)`,
              }}
            >
              <span className="block w-24 font-mono text-[0.6rem] font-bold uppercase tracking-tight text-lucky-black">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-lucky-black bg-duck-cream">
          <span className="font-display text-2xl leading-none text-lucky-black">
            7
          </span>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning || spunToday}
        className={cn(
          "group relative border-2 border-lucky-yellow px-8 py-3 font-display text-xl uppercase tracking-wide transition",
          spunToday
            ? "cursor-not-allowed border-chrome-silver/40 text-chrome-silver/50"
            : "bg-lucky-yellow text-lucky-black hover:bg-transparent hover:text-lucky-yellow",
        )}
      >
        {spinning ? "Girando" : spunToday ? "Volte amanhã" : "Girar a sorte"}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-1 border-2 border-dashed border-lucky-yellow bg-lucky-black/60 px-6 py-3 text-center"
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-chrome-silver">
              {result.kind === "again" ? "Quase lá" : "Você ganhou"}
            </span>
            <span className="font-display text-3xl uppercase text-lucky-yellow">
              {result.label}
            </span>
            <span className="font-mono text-[0.6rem] text-money-green">
              mais {result.luck} de sorte no bolso
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
