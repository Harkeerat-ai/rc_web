"use client";

import { motion } from "framer-motion";
import Parallax from "@/components/motion/Parallax";
import ImageWithSkeleton from "@/components/ui/ImageWithSkeleton";
import type { GalleryItem } from "@/lib/data";

const SLOTS = [
  {
    size: "w-44 sm:w-52 lg:w-64",
    aspect: "aspect-[4/5]",
    rot: "-rotate-3",
    lift: "lg:translate-y-10",
  },
  {
    size: "w-40 sm:w-48 lg:w-56",
    aspect: "aspect-square",
    rot: "rotate-2",
    lift: "lg:-translate-y-6",
  },
  {
    size: "w-48 sm:w-60 lg:w-72",
    aspect: "aspect-[3/4]",
    rot: "-rotate-1",
    lift: "lg:translate-y-4",
  },
  {
    size: "w-40 sm:w-48 lg:w-60",
    aspect: "aspect-[4/5]",
    rot: "rotate-3",
    lift: "lg:translate-y-14",
  },
  {
    size: "w-44 sm:w-52 lg:w-64",
    aspect: "aspect-square",
    rot: "-rotate-2",
    lift: "lg:-translate-y-8",
  },
];

export default function PhotoCollage({ items }: { items: GalleryItem[] }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,178,80,0.16),transparent_65%)] blur-2xl"
      />
      <div className="flex flex-wrap items-start justify-center gap-6 lg:gap-10 lg:px-4">
        {items.map((item, i) => {
          const slot = SLOTS[i % SLOTS.length];
          return (
            <Parallax key={item.id} speed={i % 2 === 0 ? 26 : -26}>
              <motion.figure
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.08 }}
                className={`group relative ${slot.size}`}
              >
                <div
                  className={`${slot.rot} ${slot.lift} transition-transform duration-500 group-hover:rotate-0`}
                >
                  <div className="overflow-hidden rounded-[42%_58%_58%_42%/42%_42%_58%_58%] shadow-[0_20px_45px_rgba(0,0,0,0.10)] ring-1 ring-gold/10">
                    <ImageWithSkeleton
                      src={item.image}
                      alt={item.title}
                      aspect={slot.aspect}
                      skeletonClassName="rounded-none"
                      imgClassName="duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-primary/70 px-4 py-1.5 font-heading text-xs font-semibold tracking-wider text-ivory shadow-lg backdrop-blur-sm">
                    {item.title}
                  </span>
                </div>
              </motion.figure>
            </Parallax>
          );
        })}
      </div>
    </div>
  );
}