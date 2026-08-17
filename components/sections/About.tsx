"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Parallax from "@/components/motion/Parallax";
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
            <Parallax speed={30}>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                One of the Oldest Clubs
                <br />
                <span className="bg-gradient-to-r from-gold to-crimson bg-clip-text text-transparent">
                  in Rotaract Mumbai
                </span>
              </h2>

              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  The Rotaract Club of Bombay West is the youth wing of the
                  prestigious Rotary Club of Bombay West. We are a non-profit
                  organisation directed towards a large number of social and
                  environmental causes — a platform and an opportunity for
                  youngsters to be a part of something bigger and better.
                </p>
                <p>
                  Our identity dates back to{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.yearFounded}
                  </span>
                  , and since the club&apos;s revival in{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.yearRevived}
                  </span>
                  , this year&apos;s installation marks the{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.installations}
                    {clubStats.installations === 1
                      ? "st"
                      : clubStats.installations === 2
                      ? "nd"
                      : clubStats.installations === 3
                      ? "rd"
                      : "th"}
                  </span>{" "}
                  one. Our motto has always been{" "}
                  <span className="text-gold font-semibold">
                    &quot;Family Beyond Rotaract.&quot;
                  </span>{" "}
                  where everyone, regardless of gender, age, race, ethnicity,
                  religion, nationality, or occupation, is welcomed.
                </p>
                <p>
                  RC Bombay West is ranked{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.rank}
                    {clubStats.rank === 1 ? "st" : clubStats.rank === 2 ? "nd" : clubStats.rank === 3 ? "rd" : "th"}
                  </span>{" "}
                  amongst {clubStats.totalClubs}+ clubs, and placed as the{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.communityRank}
                    {clubStats.communityRank === 1 ? "st" : clubStats.communityRank === 2 ? "nd" : clubStats.communityRank === 3 ? "rd" : "th"}
                  </span>{" "}
                  best community-based club, across RI District{" "}
                  <span className="text-gold font-semibold">
                    {clubStats.district}
                  </span>
                  .
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-crimson flex items-center justify-center text-white font-bold text-sm">
                  RID
                </div>
                <div>
                  <p className="text-sm font-semibold">RID {clubStats.district}</p>
                  <p className="text-xs text-text-muted">
                    Rotary International District
                  </p>
                </div>
              </div>
            </Parallax>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Parallax speed={-30}>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <AnimatedCounter
                  value={clubStats.yearFounded}
                  label="Identity Since"
                />
                <AnimatedCounter
                  value={clubStats.yearRevived}
                  label="Revival Year"
                />
                <AnimatedCounter
                  value={clubStats.installations}
                  label="Installations"
                />
                <AnimatedCounter
                  value={clubStats.rank}
                  label={`Rank of ${clubStats.totalClubs}+ Clubs`}
                />
              </div>
            </Parallax>
          </motion.div>
        </div>
      </div>
    </section>
  );
}