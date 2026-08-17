"use client";

import { useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  axis?: "y" | "x";
}

export default function Parallax({
  children,
  className,
  style,
  speed = 40,
  axis = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const distance = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const transformStyle = axis === "x" ? { x: distance } : { y: distance };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, ...transformStyle }}
    >
      {children}
    </motion.div>
  );
}