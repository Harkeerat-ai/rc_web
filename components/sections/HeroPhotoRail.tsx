"use client";

import { cn } from "@/lib/utils";
import type { RailPhoto } from "@/lib/photoRail";

const BLOBS = [
  "rounded-[42%_58%_58%_42%/42%_42%_58%_58%]",
  "rounded-[58%_42%_42%_58%/48%_52%_52%_48%]",
  "rounded-[44%_56%_54%_46%/56%_44%_58%_42%]",
];

const ROTS = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];

export default function HeroPhotoRail({
  items,
  direction = "up",
  side,
}: {
  items: RailPhoto[];
  direction?: "up" | "down";
  side: "left" | "right";
}) {
  const loop = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-y-0 z-0 w-12 px-2 md:w-24 md:px-3 lg:w-28",
        side === "left" ? "left-0" : "right-0"
      )}
    >
      <div className="group relative h-full w-full overflow-hidden">
        <div
          className={cn(
            "flex flex-col",
            direction === "up" ? "animate-rail-up" : "animate-rail-down",
            "group-hover:[animation-play-state:paused]"
          )}
        >
          {loop.map((photo, i) => (
            <figure
              key={i}
              className={cn(
                "mb-4 w-full shrink-0 overflow-hidden bg-surface ring-1 ring-gold/15 shadow-[0_16px_38px_rgba(46,36,27,0.16)]",
                BLOBS[i % BLOBS.length],
                ROTS[i % ROTS.length]
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[2/3] w-full object-cover opacity-60 blur-[2px] md:opacity-100 md:blur-0"
              />
            </figure>
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary to-transparent md:h-24" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-primary md:h-24" />
        {side === "left" ? (
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-primary md:w-1/4" />
        ) : (
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-primary md:w-1/4" />
        )}
      </div>
    </div>
  );
}