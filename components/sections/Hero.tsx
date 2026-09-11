"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clubStats } from "@/lib/data";
import HeroPhotoRail from "@/components/sections/HeroPhotoRail";
import { heroRailLeft, heroRailRight } from "@/lib/photoRail";

const heroChips = [
  `${clubStats.yearFounded} · Chartered`,
  `RID ${clubStats.district}`,
  clubStats.motto,
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(227,178,80,0.12),transparent_55%)]" />

      <HeroPhotoRail
        items={heroRailLeft}
        direction="up"
        side="left"
        className="absolute inset-y-0 left-0 z-0 w-16 px-2 md:w-36 md:px-4 lg:w-44 lg:px-6"
      />
      <HeroPhotoRail
        items={heroRailRight}
        direction="down"
        side="right"
        className="absolute inset-y-0 right-0 z-0 w-16 px-2 md:w-36 md:px-4 lg:w-44 lg:px-6"
      />

      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/rcbw-logo-full.png"
          alt=""
          className="h-[74vh] w-auto opacity-[0.05]"
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-goldtext"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rust shadow-[0_0_8px_rgba(200,90,30,0.9)]" />
          Est. 1969 · Rotaract District 3141
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold text-center text-ivory"
        >
          Rise Above
          <br />
          <span className="bg-gradient-to-r from-goldtext to-rusttext bg-clip-text text-transparent">
            Yourself
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-text-muted text-sm md:text-base mt-6 max-w-md text-center"
        >
          Join a community of changemakers! At RCBW, we believe in rising
          above ourselves to create meaningful impact. Explore vibrant events,
          inspiring projects, and a family beyond Rotaract. Together, we make a
          difference!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-goldtext text-sm hover:bg-gold/20 transition-all duration-300 cursor-pointer"
          >
            Discover Our Story
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {heroChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-gold/15 bg-surface/50 px-4 py-2 text-xs font-medium tracking-wide text-text-muted backdrop-blur-sm"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center text-text-muted transition-colors hover:text-goldtext cursor-pointer"
      >
        <svg
          className="h-6 w-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.a>
    </section>
  );
}