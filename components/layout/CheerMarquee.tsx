"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CHEER = "We Dream, We Rise, To Be The Best — We Are The Club Of Bombay West";
const PHRASES = [
  "We Dream!",
  "We Rise!",
  "To Be The Best!",
  "We Are The Club Of Bombay West!",
];
const BEAT_MS = 1000;
const LAST_PHRASE_MS = 2600;
const TOTAL_PHASES = PHRASES.length + 1;

function phaseDuration(phase: number): number {
  if (phase < PHRASES.length - 1) return BEAT_MS;
  if (phase === PHRASES.length - 1) return LAST_PHRASE_MS;
  return BEAT_MS;
}

const PHRASE_CLASS =
  "font-heading text-sm sm:text-base uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text [filter:drop-shadow(0_0_8px_rgba(227,178,80,0.5))]";

export default function CheerMarquee() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduce) return undefined;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      setPhase((p) => {
        const next = (p + 1) % TOTAL_PHASES;
        id = setTimeout(tick, phaseDuration(next));
        return next;
      });
    };
    id = setTimeout(tick, phaseDuration(0));
    return () => clearTimeout(id);
  }, [reduce]);

  const activeIndex = phase < PHRASES.length ? phase : null;

  if (reduce) {
    return (
      <div className="relative z-40 mt-16 lg:mt-20 overflow-hidden border-b border-gold/20 bg-primary/60 py-3 backdrop-blur-sm">
        <p className="mx-auto max-w-6xl px-4 text-center font-heading text-sm sm:text-base uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text">
          {CHEER}
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-40 mt-16 lg:mt-20 overflow-hidden border-b border-gold/20 bg-primary/60 py-3 backdrop-blur-sm">
      <div
        aria-hidden
        className="mx-auto flex min-h-[2.5rem] max-w-6xl items-center justify-center px-4 text-center"
      >
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={PHRASE_CLASS}
            >
              {PHRASES[activeIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}