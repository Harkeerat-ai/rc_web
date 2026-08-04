"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clubStats } from "@/lib/data";

function AnimatedCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent"
      >
        {isInView ? value : 0}
        {suffix}
      </motion.p>
      <p className="text-text-muted text-sm mt-1">{label}</p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 lg:py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Rising From the
              <br />
              <span className="bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent">
                Ashes of Mediocrity
              </span>
            </h2>

            <div className="space-y-4 text-text-muted leading-relaxed">
              <p>
                Like the mythical phoenix, the Rotaract Club of Bombay West
                embodies the spirit of renewal and relentless ambition. We are
                not just a club — we are a movement of young minds who believe
                that true leadership is forged through service.
              </p>
              <p>
                Founded with the vision to create impactful change in Mumbai,
                our members rise above challenges to serve communities, build
                skills, and forge lifelong bonds. Every project, every drive,
                every initiative is a testament to our commitment to{" "}
                <span className="text-gold font-semibold">
                  &quot;Rise Above Yourself.&quot;
                </span>
              </p>
              <p>
                As part of Rotary International District{" "}
                <span className="text-gold font-semibold">3141</span>, we are
                proudly guided by the Rotary Club of Bombay West, carrying
                forward a legacy of ethical leadership and community service.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-crimson flex items-center justify-center text-white font-bold text-sm">
                RID
              </div>
              <div>
                <p className="text-sm font-semibold">RID 3141</p>
                <p className="text-xs text-text-muted">
                  Rotary International District
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            <AnimatedCounter
              value={clubStats.yearsActive}
              label="Years of Service"
              suffix="+"
            />
            <AnimatedCounter
              value={clubStats.projectsCompleted}
              label="Projects Completed"
              suffix="+"
            />
            <AnimatedCounter
              value={clubStats.activeMembers}
              label="Active Members"
              suffix="+"
            />
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent"
              >
                {clubStats.district}
              </motion.p>
              <p className="text-text-muted text-sm mt-1">RID District</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
