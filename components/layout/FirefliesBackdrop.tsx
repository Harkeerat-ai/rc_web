"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const showCanvas = pathname === "/" && !reducedMotion;
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

      {showCanvas && <Fireflies />}
    </div>
  );
}