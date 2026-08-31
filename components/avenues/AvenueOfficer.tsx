"use client";

import { motion } from "framer-motion";
import type { Avenue } from "@/lib/avenues";

export default function AvenueOfficer({ avenue }: { avenue: Avenue }) {
  const { officer } = avenue;
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 sm:p-8 rounded-2xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${avenue.gradient} flex items-center justify-center text-white font-heading font-bold text-lg shadow-lg`}
          >
            {officer.name.charAt(0)}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              Avenue Lead
            </p>
            <h3 className="font-heading text-lg font-bold text-ivory">
              {officer.name}
            </h3>
            <p className="text-goldtext text-sm">{officer.role}</p>
          </div>
        </div>
        {officer.contact && (
          <a
            href={`mailto:${officer.contact}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-goldtext text-xs hover:bg-gold/20 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
              />
            </svg>
            Contact
          </a>
        )}
      </div>
    </motion.section>
  );
}
