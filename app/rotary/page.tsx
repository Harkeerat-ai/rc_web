"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const AmbientScene = dynamic(
  () => import("@/components/three/AmbientScene"),
  { ssr: false }
);

export default function RotaryPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AmbientScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Rotary &{" "}
            <span className="bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent">
              District
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            Rooted in the values of Rotary International, we are proud members
            of District 3141.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface/30 border border-gold/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-crimson flex items-center justify-center mb-6">
              <span className="text-white font-heading font-bold text-lg">RC</span>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              Rotary Club of Bombay West
            </h2>
            <p className="text-text-muted leading-relaxed">
              Our parent club, the Rotary Club of Bombay West, has been a beacon
              of service and ethical leadership in Mumbai. As their Rotaract
              counterpart, we carry forward their vision of creating lasting
              change through community action and youth empowerment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-surface/30 border border-gold/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-crimson to-gold flex items-center justify-center mb-6">
              <span className="text-white font-heading font-bold text-lg">
                RID
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              District 3141
            </h2>
            <p className="text-text-muted leading-relaxed">
              Rotary International District 3141 encompasses the greater Mumbai
              region, bringing together clubs dedicated to service above self.
              RCBW is proud to represent the energy and ambition of Rotaract
              within this vibrant district.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gold/5 border border-gold/10 rounded-full px-6 py-3">
            <span className="w-3 h-3 rounded-full bg-gold animate-pulse" />
            <span className="text-sm text-text-muted">
              Proudly serving under the Rotary International umbrella
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
