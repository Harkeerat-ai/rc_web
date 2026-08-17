"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnimatedPhoenix from "@/components/phoenix/AnimatedPhoenix";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gradient-to-b from-primary to-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="text-text-muted text-xs font-body tracking-widest uppercase">
            Rising...
          </p>
        </div>
      </div>
    ),
  }
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fireY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const phoenixY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div style={{ y: fireY }} className="absolute inset-0">
        <ErrorBoundary>
          <HeroScene />
        </ErrorBoundary>
      </motion.div>

      <motion.div
        style={{ y: phoenixY }}
        className="absolute inset-0 z-[5] pointer-events-none"
      >
        <AnimatedPhoenix />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-gold text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase mb-4"
        >
          Rotaract Club of Bombay West
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold text-center text-ivory"
        >
          Rise Above
          <br />
          <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm hover:bg-gold/20 transition-all duration-300 cursor-pointer"
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
      </motion.div>

      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center"
        >
          <motion.div className="w-1 h-3 bg-gold/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}