"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CHEER = "We Dream, We Rise, To Be The Best — We Are The Club Of Bombay West";
const WORDS = CHEER.split(" ");

const BEAT_MS = 900;
const NUM_PHASES = 4;

const ACCENT_PHASES: Record<string, number> = {
  Dream: 0,
  Rise: 1,
  Best: 2,
  Bombay: 3,
  West: 3,
};

const WORD_CLASS =
  "mx-3 font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text";

const IDLE_GLOW = "drop-shadow(0 0 6px rgba(227,178,80,0.35))";
const BEAT_GLOW = "drop-shadow(0 0 12px rgba(227,178,80,0.8))";

function CheerRow({ phase }: { phase: number }) {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word, i) => {
        const accentPhase = ACCENT_PHASES[word];
        const onBeat = accentPhase !== undefined && accentPhase === phase;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: onBeat ? 1.22 : 1,
              filter: onBeat ? BEAT_GLOW : IDLE_GLOW,
            }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: "easeOut",
              scale: { duration: 0.35, ease: "easeOut" },
              filter: { duration: 0.35, ease: "easeOut" },
            }}
            className={WORD_CLASS}
          >
            {word}
          </motion.span>
        );
      })}
      <span className="mx-6 text-gold/40" aria-hidden>
        ✦
      </span>
    </div>
  );
}

export default function CheerMarquee() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(
      () => setPhase((p) => (p + 1) % NUM_PHASES),
      BEAT_MS
    );
    return () => clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return (
      <div className="relative z-40 mt-16 lg:mt-20 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
        <p className="mx-auto max-w-6xl px-4 text-center font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text">
          {CHEER}
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-40 mt-16 lg:mt-20 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
      <div className="flex w-max animate-marquee will-change-transform">
        <CheerRow phase={phase} />
        <CheerRow phase={phase} />
      </div>
    </div>
  );
}