"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Fireflies = dynamic(
  () => import("@/components/three/Fireflies"),
  { ssr: false }
);

const GRAIN_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E`;

function EmberMote({
  size,
  duration,
  delay,
  left,
  color,
}: {
  size: number;
  duration: number;
  delay: number;
  left: string;
  color: string;
}) {
  return (
    <motion.span
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ y: "-110vh", opacity: [0, 0.7, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.4, 1],
      }}
      className="absolute rounded-full"
      style={{
        left,
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
      }}
    />
  );
}

export default function FirefliesBackdrop() {
  const embers = useMemo(() => {
    const colors = ["#E3B250", "#C85A1E", "#F0C469"];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: 2 + Math.random() * 4,
      duration: 7 + Math.random() * 6,
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.12, 1.05, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(227,178,80,0.22), transparent 65%)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.1, 1.15, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-15%] w-[65%] h-[65%] rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(200,90,30,0.2), transparent 65%)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -25, 20, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[45%] w-[55%] h-[55%] rounded-full mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(140,70,25,0.16), transparent 65%)",
        }}
      />

      {embers.map((e) => (
        <EmberMote
          key={e.id}
          size={e.size}
          duration={e.duration}
          delay={e.delay}
          left={e.left}
          color={e.color}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      <Fireflies />
    </div>
  );
}