"use client";

import { motion } from "framer-motion";

export default function PageTransition({
  children,
  pageKey,
}: {
  children: React.ReactNode;
  pageKey: string;
}) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
