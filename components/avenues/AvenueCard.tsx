"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Avenue } from "@/lib/avenues";
import AvenueIcon from "./AvenueIcon";

export default function AvenueCard({
  avenue,
  index,
}: {
  avenue: Avenue;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        href={`/avenues/${avenue.slug}`}
        className="group relative block glass-card p-6 overflow-hidden transition-all duration-300 hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
      >
        <div
          className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${avenue.gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-20`}
        />
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${avenue.gradient} flex items-center justify-center text-white mb-5 shadow-lg`}
        >
          <AvenueIcon name={avenue.icon} className="w-7 h-7" />
        </div>
        <h3 className="font-heading text-lg font-bold text-ivory mb-1 group-hover:text-goldtext transition-colors duration-300">
          {avenue.name}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
          {avenue.tagline}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-goldtext text-xs font-medium uppercase tracking-wider">
          Explore
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
