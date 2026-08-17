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
      className="fixed inset-0 z-0 pointer-events-none"
    >
      <Fireflies />
    </div>
  );
}