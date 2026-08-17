"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhoenixIcon from "@/components/chat/PhoenixIcon";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 mb-8"
      >
        <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center">
          <PhoenixIcon className="w-12 h-12" />
        </div>
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-heading text-7xl sm:text-8xl md:text-9xl font-bold leading-none"
        >
          <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-md mb-10">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-ivory mb-3">
          This page has gone up in flames.
        </h2>
        <p className="text-text-muted text-sm sm:text-base leading-relaxed">
          But don&apos;t worry — like the phoenix, this club always rises.
          Let&apos;s get you back to solid ground.
        </p>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.45 }} className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gold text-primary font-semibold text-sm hover:bg-gold/90 transition-all duration-300"
        >
          Back Home
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm hover:bg-gold/20 transition-all duration-300"
        >
          Explore Projects
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-transparent border border-ivory/20 text-ivory/80 text-sm hover:border-ivory/40 hover:text-ivory transition-all duration-300"
        >
          Contact Us
        </Link>
      </motion.div>
    </div>
  );
}