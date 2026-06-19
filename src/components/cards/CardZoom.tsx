"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Card } from "@/components/cards/Card";
import type { CardDef } from "@/types";

const BASE_W = 200;
const RATIO = 7 / 5; // card height / width

/** Largest scale that keeps the card within the viewport. */
function useFitScale() {
  const [scale, setScale] = useState(1.6);
  useEffect(() => {
    function calc() {
      const byWidth = Math.min(window.innerWidth * 0.82, 380) / BASE_W;
      const byHeight = (window.innerHeight * 0.82) / (BASE_W * RATIO);
      setScale(Math.max(1.1, Math.min(byWidth, byHeight)));
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return scale;
}

/** Full screen card viewer with a 3D tilt that follows the pointer. */
export function CardZoom({
  card,
  onClose,
}: {
  card: CardDef;
  onClose: () => void;
}) {
  // Normalized pointer position, -0.5 to 0.5.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 15,
  });

  const glareX = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(246,231,197,0.35), transparent 50%)`;

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  const scale = useFitScale();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-7 bg-lucky-black/85 p-6 backdrop-blur-md"
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-5 top-5 text-duck-cream transition hover:text-lucky-yellow"
      >
        <X className="h-7 w-7" />
      </button>

      <div
        style={{ perspective: 1100 }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="[transform-origin:center]"
        >
          <div
            className="relative origin-center"
            style={{ width: BASE_W, transform: `scale(${scale})` }}
          >
            <Card card={card} />
            <motion.div
              aria-hidden
              style={{ background: glare, mixBlendMode: "screen" }}
              className="pointer-events-none absolute inset-0 rounded-xl"
            />
          </div>
        </motion.div>
      </div>

      <p className="hidden font-mono text-xs uppercase tracking-widest text-chrome-silver sm:block">
        Mexa o mouse para inclinar
      </p>
    </motion.div>
  );
}
