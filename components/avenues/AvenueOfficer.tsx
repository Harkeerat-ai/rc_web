"use client";

import { motion } from "framer-motion";
import type { Avenue } from "@/lib/avenues";

export default function AvenueOfficer({ avenue }: { avenue: Avenue }) {
  const { directors } = avenue;
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-6 sm:p-8"
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Board of Directors
        </p>
        <h3 className="font-heading text-lg font-bold text-ivory">
          {avenue.name}
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {directors.map((director) => (
          <div
            key={director.name}
            className="flex items-center gap-4 rounded-xl border border-gold/15 bg-primary/40 px-5 py-4"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gold to-rust flex items-center justify-center shadow-lg shrink-0">
              {director.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={director.photo}
                  alt={director.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-heading text-lg font-bold">
                  {director.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h4 className="font-heading font-bold text-ivory">
                {director.name}
              </h4>
              <p className="text-goldtext text-sm">{director.role}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}