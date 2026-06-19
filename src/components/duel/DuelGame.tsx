"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Swords, Trophy, ArrowRight } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { cards } from "@/data/cards";
import { useCards } from "@/lib/cards";
import { useLuck } from "@/lib/luck";
import {
  botPick,
  drawContext,
  randomDeck,
  resolveRound,
  statLabel,
  DECK_SIZE,
  MIN_DECK,
  type Context,
  type RoundResult,
} from "@/lib/duel";
import type { CardDef } from "@/types";
import { cn } from "@/lib/utils";

type Phase = "lobby" | "playing" | "over";

export function DuelGame() {
  const { ownedCount } = useCards();
  const { addLuck } = useLuck();

  const owned = cards.filter((c) => ownedCount(c.id) > 0);

  const [phase, setPhase] = useState<Phase>("lobby");
  const [deck, setDeck] = useState<CardDef[]>([]);
  const [pHand, setPHand] = useState<CardDef[]>([]);
  const [bHand, setBHand] = useState<CardDef[]>([]);
  const [ctx, setCtx] = useState<Context | null>(null);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [pWins, setPWins] = useState(0);
  const [bWins, setBWins] = useState(0);
  const [round, setRound] = useState(1);
  const [outcome, setOutcome] = useState<"win" | "lose" | "draw">("draw");

  function toggle(card: CardDef) {
    setDeck((d) =>
      d.includes(card)
        ? d.filter((c) => c !== card)
        : d.length < DECK_SIZE
          ? [...d, card]
          : d,
    );
  }

  function start() {
    if (deck.length < MIN_DECK) return;
    setBHand(randomDeck(cards, deck.length));
    setPHand(deck);
    setPWins(0);
    setBWins(0);
    setRound(1);
    setCtx(drawContext());
    setResult(null);
    setPhase("playing");
  }

  function play(card: CardDef) {
    if (result || !ctx) return;
    const botCard = botPick(bHand, ctx);
    const r = resolveRound(card, botCard, ctx);
    setResult(r);
    setPHand((h) => h.filter((c) => c !== card));
    setBHand((h) => h.filter((c) => c !== botCard));
    if (r.winner === "player") setPWins((w) => w + 1);
    else setBWins((w) => w + 1);
  }

  function next() {
    if (pHand.length === 0) {
      const finalP = pWins;
      const finalB = bWins;
      const res = finalP > finalB ? "win" : finalP < finalB ? "lose" : "draw";
      setOutcome(res);
      addLuck(res === "win" ? 15 : res === "draw" ? 8 : 5);
      setPhase("over");
      return;
    }
    setRound((r) => r + 1);
    setCtx(drawContext());
    setResult(null);
  }

  function reset() {
    setDeck([]);
    setPhase("lobby");
  }

  // --- Lobby ---------------------------------------------------------
  if (phase === "lobby") {
    return (
      <div>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-4xl uppercase leading-none text-duck-cream sm:text-5xl">
              Monte seu time
            </h2>
            <p className="mt-2 font-sans text-sm text-chrome-silver">
              Escolha até {DECK_SIZE} cartas para duelar com o Lukão Bot.
            </p>
          </div>
          <span className="font-mono text-sm font-bold text-lucky-yellow">
            {deck.length} / {DECK_SIZE}
          </span>
        </div>

        {owned.length < MIN_DECK ? (
          <div className="border-2 border-dashed border-duck-cream/20 p-8 text-center">
            <p className="font-display text-2xl uppercase text-duck-cream">
              Coleção pequena demais
            </p>
            <p className="mt-2 font-sans text-sm text-chrome-silver">
              Você precisa de pelo menos {MIN_DECK} cartas. Abra alguns packs
              primeiro.
            </p>
            <Link
              href="/cartas"
              className="mt-4 inline-flex items-center gap-2 border-2 border-lucky-yellow bg-lucky-yellow px-6 py-3 font-display text-lg uppercase text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
            >
              Abrir packs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {owned.map((card) => {
                const selected = deck.includes(card);
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggle(card)}
                    className={cn(
                      "block w-full transition",
                      selected
                        ? "scale-95 opacity-100"
                        : "opacity-80 hover:opacity-100",
                    )}
                  >
                    <span
                      className={cn(
                        "block",
                        selected && "ring-2 ring-lucky-yellow ring-offset-2 ring-offset-lucky-black",
                      )}
                    >
                      <Card card={card} />
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={start}
              disabled={deck.length < MIN_DECK}
              className={cn(
                "mt-8 inline-flex items-center gap-2 border-2 px-8 py-4 font-display text-2xl uppercase tracking-wide transition",
                deck.length >= MIN_DECK
                  ? "border-lucky-yellow bg-lucky-yellow text-lucky-black hover:bg-transparent hover:text-lucky-yellow"
                  : "cursor-not-allowed border-chrome-silver/30 text-chrome-silver/50",
              )}
            >
              <Swords className="h-6 w-6" />
              Duelar
            </button>
          </>
        )}
      </div>
    );
  }

  // --- Over ----------------------------------------------------------
  if (phase === "over") {
    const title =
      outcome === "win" ? "Você venceu" : outcome === "draw" ? "Empate" : "Você perdeu";
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <Trophy
          className={cn(
            "h-16 w-16",
            outcome === "win" ? "text-lucky-yellow" : "text-chrome-silver",
          )}
        />
        <h2 className="font-display text-6xl uppercase leading-none text-duck-cream sm:text-8xl">
          {title}
        </h2>
        <p className="font-mono text-lg text-lucky-yellow">
          Você {pWins} · {bWins} Bot
        </p>
        <p className="border-2 border-dashed border-lucky-yellow px-5 py-2 font-mono text-sm text-lucky-yellow">
          mais {outcome === "win" ? 15 : outcome === "draw" ? 8 : 5} de sorte no bolso
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="border-2 border-lucky-yellow bg-lucky-yellow px-7 py-3 font-display text-xl uppercase text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
          >
            Jogar de novo
          </button>
          <Link
            href="/cartas"
            className="border-2 border-duck-cream/30 px-7 py-3 font-display text-xl uppercase text-duck-cream transition hover:border-lucky-yellow hover:text-lucky-yellow"
          >
            Voltar pra coleção
          </Link>
        </div>
      </div>
    );
  }

  // --- Playing -------------------------------------------------------
  return (
    <div>
      {/* Scoreboard */}
      <div className="mb-6 flex items-center justify-between border-y-2 border-duck-cream/15 py-3">
        <Side name="Você" wins={pWins} highlight />
        <div className="text-center">
          <div className="font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver">
            Round {round} / {deck.length}
          </div>
          <Swords className="mx-auto mt-1 h-5 w-5 text-lucky-yellow" />
        </div>
        <Side name="Lukão Bot" wins={bWins} align="right" />
      </div>

      {/* Context */}
      {ctx && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2 bg-deep-green px-4 py-3">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-lucky-yellow">
              Contexto
            </span>
            <p className="font-display text-2xl uppercase leading-none text-duck-cream">
              {ctx.name}
            </p>
            <p className="font-sans text-xs text-duck-cream/70">{ctx.blurb}</p>
          </div>
          <span className="border-2 border-lucky-yellow px-3 py-1 font-mono text-xs uppercase tracking-widest text-lucky-yellow">
            Vale: {statLabel[ctx.stat]}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-8">
              <Played label="Você" data={result.player} win={result.winner === "player"} />
              <Played label="Bot" data={result.bot} win={result.winner === "bot"} />
            </div>
            <p className="mt-5 text-center font-display text-3xl uppercase text-lucky-yellow">
              {result.winner === "player" ? "Round seu" : "Round do bot"}
              {result.inverted && (
                <span className="block font-mono text-xs text-signal-red">
                  Bad Luck Luke virou o jogo
                </span>
              )}
            </p>
            <div className="mt-6 text-center">
              <button
                onClick={next}
                className="inline-flex items-center gap-2 border-2 border-lucky-yellow bg-lucky-yellow px-7 py-3 font-display text-xl uppercase text-lucky-black transition hover:bg-transparent hover:text-lucky-yellow"
              >
                {pHand.length === 0 ? "Ver resultado" : "Próximo round"}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-chrome-silver">
              Sua mão · escolha uma carta
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {pHand.map((card) => (
                <button
                  key={card.id}
                  onClick={() => play(card)}
                  className="w-28 shrink-0 transition hover:-translate-y-1 hover:[filter:drop-shadow(0_8px_16px_rgba(236,183,30,0.4))]"
                >
                  <Card card={card} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Side({
  name,
  wins,
  highlight,
  align,
}: {
  name: string;
  wins: number;
  highlight?: boolean;
  align?: "right";
}) {
  return (
    <div className={cn(align === "right" && "text-right")}>
      <div className="font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver">
        {name}
      </div>
      <div
        className={cn(
          "font-display text-4xl leading-none",
          highlight ? "text-lucky-yellow" : "text-duck-cream",
        )}
      >
        {wins}
      </div>
    </div>
  );
}

function Played({
  label,
  data,
  win,
}: {
  label: string;
  data: RoundResult["player"];
  win: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2", win && "")}>
      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-chrome-silver">
        {label}
      </span>
      <div className={cn("w-32", win && "[filter:drop-shadow(0_0_16px_rgba(236,183,30,0.5))]")}>
        <Card card={data.card} />
      </div>
      <div className="text-center font-mono text-xs text-duck-cream">
        <span className="text-lg font-bold text-lucky-yellow">{data.score.total}</span>
        <div className="text-[0.6rem] text-chrome-silver">
          base {data.score.base}
          {data.score.bonus > 0 && ` +${data.score.bonus}`} · sorte +{data.score.luck}
        </div>
      </div>
    </div>
  );
}
