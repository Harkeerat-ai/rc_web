"use client";

import { motion } from "framer-motion";
import { gallery } from "@/lib/data";

export default function GalleryStrip() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto mb-8 flex max-w-6xl items-end justify-between gap-6 px-4 lg:mb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-goldtext">
            Glimpse of our
          </p>
          <h2 className="mb-3 font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
            Moments of{" "}
            <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-text-muted text-sm md:text-base">
            A glimpse into our journey of service and fellowship.
          </p>
        </motion.div>
      </div>

      <div className="hide-scrollbar flex gap-4 overflow-x-auto px-4 pb-8 pt-2 sm:px-6 lg:px-8 snap-x snap-mandatory">
        {gallery.map((item) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="group relative h-96 w-80 flex-none overflow-hidden rounded-xl border border-gold/10 bg-surface/50 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] snap-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="font-heading text-sm font-semibold text-white">
                {item.title}
              </span>
            </div>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}