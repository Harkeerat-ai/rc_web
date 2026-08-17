"use client";

import { motion } from "framer-motion";
import Parallax from "@/components/motion/Parallax";
import { gallery } from "@/lib/data";

export default function GalleryStrip() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 lg:mb-12 flex justify-between items-end gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Moments of{" "}
            <span className="bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-text-muted text-sm md:text-base">
            A glimpse into our journey of service and fellowship.
          </p>
        </motion.div>
      </div>

      <Parallax speed={24} className="flex gap-4 px-4 sm:px-6 lg:px-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
        {gallery.map((item) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="flex-none w-80 h-96 rounded-xl overflow-hidden snap-center relative group bg-surface/50 border border-gold/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)] transition-all duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white font-heading text-sm font-semibold">
                {item.title}
              </span>
            </div>
          </motion.figure>
        ))}
      </Parallax>
    </section>
  );
}