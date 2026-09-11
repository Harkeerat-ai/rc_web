"use client";

import { motion } from "framer-motion";
import HeroPhotoRail from "@/components/sections/HeroPhotoRail";
import { heroRailLeft, heroRailRight } from "@/lib/photoRail";

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

      <div className="relative mx-auto flex max-w-6xl items-stretch justify-center gap-8 px-4 sm:gap-12 sm:px-6 lg:gap-20 lg:px-8">
        <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,178,80,0.14),transparent_65%)] blur-2xl" />
        <HeroPhotoRail
          className="h-[34rem] shrink-0 w-24 px-3 md:h-[38rem] md:w-44 md:px-4 lg:h-[42rem] lg:w-56 lg:px-5"
          items={heroRailLeft}
          direction="up"
          side="left"
        />
        <HeroPhotoRail
          className="h-[34rem] shrink-0 w-24 px-3 md:h-[38rem] md:w-44 md:px-4 lg:h-[42rem] lg:w-56 lg:px-5"
          items={heroRailRight}
          direction="down"
          side="right"
        />
      </div>
    </section>
  );
}