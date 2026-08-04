"use client";

import { useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type SVGMotionProps,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wingStyle = {
  transformBox: "fill-box" as const,
};

export default function AnimatedPhoenix() {
  const reducedMotion = useReducedMotion();
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);
  const xSpring = useSpring(xMotion, { stiffness: 90, damping: 20 });
  const ySpring = useSpring(yMotion, { stiffness: 90, damping: 20 });

  useEffect(() => {
    if (reducedMotion) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * innerWidth * 0.15;
      const y = (event.clientY / innerHeight - 0.5) * innerHeight * 0.08;
      xMotion.set(x);
      yMotion.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, xMotion, yMotion]);

  const flyIn: HTMLMotionProps<"div"> = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: "55vw", y: 30 },
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 1.8, ease: EASE, delay: 0.4 },
      };

  const hover: SVGMotionProps<SVGSVGElement> = reducedMotion
    ? {}
    : {
        animate: { y: [0, -14, 0], rotate: [0, -2, 0, 2, 0] },
        transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      };

  const rightFlap: SVGMotionProps<SVGGElement> = reducedMotion
    ? {}
    : {
        animate: { rotate: [0, -20, 0] },
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
      };

  const leftFlap: SVGMotionProps<SVGGElement> = reducedMotion
    ? {}
    : {
        animate: { rotate: [0, 20, 0] },
        transition: { duration: 0.9, repeat: Infinity, ease: "easeInOut" },
      };

  const glowPulse: SVGMotionProps<SVGCircleElement> = reducedMotion
    ? {}
    : {
        animate: { opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      };

  const embers = reducedMotion
    ? []
    : [
        { x: 470, y: 300, size: 5, delay: 0, dur: 2.6, drift: 40 },
        { x: 510, y: 340, size: 4, delay: 0.5, dur: 3.1, drift: -30 },
        { x: 545, y: 370, size: 6, delay: 1, dur: 2.4, drift: 25 },
        { x: 490, y: 260, size: 3, delay: 1.4, dur: 3.4, drift: -45 },
        { x: 575, y: 330, size: 4, delay: 1.8, dur: 2.8, drift: 35 },
        { x: 530, y: 410, size: 5, delay: 2.2, dur: 3.2, drift: -20 },
        { x: 460, y: 350, size: 3, delay: 2.6, dur: 2.9, drift: 50 },
        { x: 595, y: 395, size: 4, delay: 3, dur: 3.6, drift: -35 },
      ];

  return (
    <motion.div
      {...flyIn}
      className="pointer-events-none select-none absolute -right-6 top-[10%] z-[5] md:top-[6%]"
      aria-hidden
    >
      <motion.div style={{ x: xSpring, y: ySpring }}>
        <motion.svg
          {...hover}
          width="min(33.6vw, 368px)"
          viewBox="0 0 640 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="phx-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#D9A441" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="phx-body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F5E7B8" />
              <stop offset="35%" stopColor="#D9A441" />
              <stop offset="75%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#7A0B0B" />
            </linearGradient>
            <linearGradient id="phx-wing" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#7A0B0B" />
              <stop offset="45%" stopColor="#D9A441" />
              <stop offset="100%" stopColor="#F5E7B8" />
            </linearGradient>
            <linearGradient id="phx-wing-far" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#5A0808" />
              <stop offset="60%" stopColor="#A07820" />
              <stop offset="100%" stopColor="#E8C56A" />
            </linearGradient>
            <linearGradient id="phx-tail" x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0%" stopColor="#D9A441" />
              <stop offset="100%" stopColor="#7A0B0B" />
            </linearGradient>
            <filter id="phx-blur" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <motion.circle
            {...glowPulse}
            style={{ transformBox: "fill-box" }}
            cx="290"
            cy="250"
            r="230"
            fill="url(#phx-glow)"
            filter="url(#phx-blur)"
          />

          <motion.g style={{ ...wingStyle, transformOrigin: "85% 92%" }} {...leftFlap}>
            <path
              d="M295 235 C 260 175, 220 130, 160 95 C 120 75, 90 70, 62 80 C 82 92, 92 108, 95 125 C 80 118, 68 116, 55 120 C 72 138, 88 148, 105 152 C 95 162, 88 176, 85 192 C 108 190, 130 180, 150 163 C 175 190, 215 220, 295 235 Z"
              fill="url(#phx-wing-far)"
            />
          </motion.g>

          <motion.g style={{ ...wingStyle, transformOrigin: "8% 96%" }} {...rightFlap}>
            <path
              d="M265 225 C 300 170, 355 120, 425 80 C 465 56, 505 45, 545 52 C 520 70, 505 90, 498 110 C 518 102, 535 98, 552 102 C 528 124, 505 138, 480 144 C 492 156, 500 172, 505 190 C 478 184, 452 170, 428 148 C 395 172, 340 205, 265 225 Z"
              fill="url(#phx-wing)"
            />
          </motion.g>

          <motion.g style={{ ...wingStyle, transformOrigin: "12% 98%" }} {...rightFlap}>
            <path
              d="M250 220 C 285 165, 340 120, 405 85 C 435 68, 465 58, 495 55 C 470 72, 456 90, 450 108 C 468 102, 484 100, 498 103 C 476 120, 456 132, 432 138 C 444 150, 452 165, 456 182 C 430 176, 406 162, 384 142 C 352 168, 300 200, 250 220 Z"
              fill="url(#phx-body)"
              opacity="0.85"
            />
          </motion.g>

          <g>
            <path
              d="M335 250 C 400 268, 470 300, 540 350 C 570 370, 590 392, 600 418 C 585 410, 565 398, 540 388 C 530 408, 522 428, 518 452 C 505 435, 495 414, 488 392 C 462 402, 432 408, 400 408 C 415 388, 432 366, 452 342 C 420 330, 385 320, 348 314 C 340 290, 336 270, 335 250 Z"
              fill="url(#phx-tail)"
            />
            <path
              d="M330 258 C 385 278, 445 312, 505 355 C 530 372, 548 392, 558 414 C 542 406, 522 392, 498 378 C 492 396, 488 416, 486 438 C 472 422, 460 402, 452 380 C 425 392, 395 398, 362 398 C 378 376, 396 352, 418 328 C 388 316, 355 306, 342 300 Z"
              fill="url(#phx-body)"
              opacity="0.7"
            />
            <path
              d="M328 262 C 372 282, 425 316, 478 356 C 500 372, 515 390, 523 408 C 508 400, 490 386, 468 372 C 464 390, 462 408, 462 426 C 448 410, 437 390, 430 368 C 405 380, 375 386, 342 386 C 358 364, 376 340, 398 316 C 370 304, 340 294, 338 288 Z"
              fill="#F97316"
              opacity="0.75"
            />
          </g>

          <g>
            <path
              d="M300 250 C 275 215, 260 190, 258 165 C 256 145, 262 128, 275 115 C 300 130, 315 150, 320 175 C 325 200, 318 228, 300 250 Z"
              fill="url(#phx-body)"
            />
            <path
              d="M258 168 C 245 128, 242 92, 250 58 C 258 80, 272 105, 290 128 C 268 140, 258 154, 258 168 Z"
              fill="#D9A441"
            />
            <path
              d="M285 130 C 268 108, 252 92, 236 82 C 246 108, 252 132, 254 152 C 266 142, 278 136, 285 130 Z"
              fill="#F5E7B8"
              opacity="0.9"
            />
            <path
              d="M300 252 C 288 268, 272 282, 252 292 C 268 276, 282 260, 292 242 Z"
              fill="#B8860B"
            />
            <path
              d="M150 172 C 138 166, 130 162, 126 160 C 130 170, 138 176, 148 178 C 160 182, 172 180, 180 174 C 172 172, 162 170, 150 172 Z"
              fill="#7A0B0B"
              opacity="0.85"
            />
          </g>

          <circle cx="172" cy="150" r="26" fill="#B8860B" />
          <circle cx="176" cy="146" r="20" fill="url(#phx-body)" />
          <circle cx="166" cy="142" r="4" fill="#FFD700" />

          <path
            d="M158 158 C 142 152, 130 150, 122 152 C 132 160, 146 164, 162 164 Z"
            fill="#F97316"
          />

          {embers.map((e, i) => (
            <motion.circle
              key={i}
              cx={e.x}
              cy={e.y}
              r={e.size}
              fill="#F97316"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 0.9, 0], y: -70, x: e.drift }}
              transition={{
                duration: e.dur,
                delay: e.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{ transformBox: "fill-box" }}
            />
          ))}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
