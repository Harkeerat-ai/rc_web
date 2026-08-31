"use client";

import { motion } from "framer-motion";
import type { Avenue } from "@/lib/avenues";
import AvenueIcon from "./AvenueIcon";

export default function AvenueHero({ avenue }: { avenue: Avenue }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${avenue.gradient} p-8 sm:p-12 lg:p-16`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_60%)]" />
      <div className="relative max-w-3xl">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium uppercase tracking-widest mb-5">
          {avenue.kind === "main" ? "Main Avenue" : "Support Avenue"}
        </span>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {avenue.name}
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-body leading-relaxed max-w-xl">
          {avenue.tagline}
        </p>
      </div>
      <AvenueIcon
        name={avenue.icon}
        className="absolute -bottom-6 -right-6 w-40 h-40 text-white/10"
      />
    </motion.section>
  );
}
