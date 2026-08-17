"use client";

import { motion } from "framer-motion";

export default function RotaryPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Rotary &{" "}
            <span className="bg-gradient-to-r from-gold to-rust bg-clip-text text-transparent">
              District
            </span>
          </h1>
          <p className="text-text-muted max-w-xl text-sm md:text-base">
            Rooted in the values of Rotary International, we are proud members
            of District 3141 — a leading Rotaract club in Mumbai.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-rust flex items-center justify-center mb-6">
              <span className="text-white font-heading font-bold text-lg">RC</span>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              Rotary Club of Bombay West
            </h2>
            <p className="text-text-muted leading-relaxed">
              The Rotary Club of Bombay West is a leading Rotary club in Mumbai
              that supports impactful initiatives in health, education, and
              community development. It also serves as the parent and partner
              Rotary club to the Rotaract Club of Bombay West, guiding our
              vision of creating lasting change through community action and
              youth empowerment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rust to-gold flex items-center justify-center mb-6">
              <span className="text-white font-heading font-bold text-lg">
                RID
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              District 3141
            </h2>
            <p className="text-text-muted leading-relaxed">
              The Rotaract Club of Bombay West is a youth-led club under
              Rotaract District 3141 — the Mumbai District ranging from Palghar
              to Mulund in Maharashtra. The District works actively in sectors
              like community service, leadership, and personal development, and
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
