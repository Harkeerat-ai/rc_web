"use client";

import { cn } from "@/lib/utils";
import type { RailPhoto } from "@/lib/photoRail";

const ROTS = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];

export default function HeroPhotoRail({
  items,
  direction = "up",
  side,
  className,
}: {
  items: RailPhoto[];
  direction?: "up" | "down";
  side: "left" | "right";
  className?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div aria-hidden className={cn("pointer-events-none", className)}>
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
                "mb-4 w-full shrink-0 overflow-hidden bg-surface shadow-[0_16px_38px_rgba(46,36,27,0.16)] ring-1 ring-gold/15",
                ROTS[i % ROTS.length]
              )}
            >
              {photo.video ? (
                <video
                  src={photo.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden
                  className="aspect-square w-full object-cover opacity-60 blur-[2px] md:opacity-100 md:blur-0"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover opacity-60 blur-[2px] md:opacity-100 md:blur-0"
                />
              )}
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