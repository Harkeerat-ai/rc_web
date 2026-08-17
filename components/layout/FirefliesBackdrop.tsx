"use client";

import dynamic from "next/dynamic";

const Fireflies = dynamic(
  () => import("@/components/three/Fireflies"),
  { ssr: false }
);

export default function FirefliesBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(212,160,48,0.14), transparent 70%), radial-gradient(ellipse 55% 45% at 85% 100%, rgba(183,65,14,0.12), transparent 70%)",
        }}
      />
      <Fireflies />
    </div>
  );
}