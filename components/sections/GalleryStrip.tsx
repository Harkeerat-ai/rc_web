"use client";

import { motion } from "framer-motion";
import PhotoCollage from "@/components/sections/PhotoCollage";
import { gallery } from "@/lib/data";

export default function GalleryStrip() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="mx-auto mb-10 flex max-w-6xl items-end justify-between gap-6 px-4 sm:px-6 lg:mb-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-goldtext">
            Glimpse of our
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Incredible{" "}
            <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
              Family
            </span>
          </h2>
          <p className="text-text-muted text-sm md:text-base">
            A glimpse into our journey of service and fellowship.
          </p>
        </motion.div>
      </div>

      <PhotoCollage items={gallery} />
    </section>
  );
}