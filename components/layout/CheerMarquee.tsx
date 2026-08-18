"use client";

import { motion, useReducedMotion } from "framer-motion";

const CHEER = "We Dream, We Rise, To Be The Best — We Are The Club Of Bombay West";
const WORDS = CHEER.split(" ");

const WORD_CLASS =
  "mx-3 font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text [filter:drop-shadow(0_0_6px_rgba(227,178,80,0.35))]";

function CheerRow() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className={WORD_CLASS}
        >
          {word}
        </motion.span>
      ))}
      <span className="mx-6 text-gold/40" aria-hidden>
        ✦
      </span>
    </div>
  );
}

export default function CheerMarquee() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="relative z-40 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
        <p className="mx-auto max-w-6xl px-4 text-center font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text">
          {CHEER}
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-40 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
      <div className="flex w-max animate-marquee will-change-transform">
        <CheerRow />
        <CheerRow />
      </div>
    </div>
  );
}
