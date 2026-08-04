"use client";

import dynamic from "next/dynamic";
import ContactForm from "@/components/sections/ContactForm";

const AmbientScene = dynamic(
  () => import("@/components/three/AmbientScene"),
  { ssr: false }
);

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AmbientScene />
      </div>

      <div className="relative z-10">
        <ContactForm />
      </div>
    </div>
  );
}
