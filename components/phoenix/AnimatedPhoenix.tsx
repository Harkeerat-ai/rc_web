"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type HTMLMotionProps,
  type SVGMotionProps,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const wingStyle = {
  transformBox: "fill-box" as const,
};

export default function AnimatedPhoenix() {
  const reducedMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const lastMove = useRef(0);
  const wanderT = useRef(Math.random() * 100);

  const xSpring = useSpring(targetX, { stiffness: 55, damping: 16 });
  const ySpring = useSpring(targetY, { stiffness: 55, damping: 16 });
  const xVelocity = useVelocity(xSpring);
  const bank = useTransform(xVelocity, [-1200, 1200], [12, -12]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      lastMove.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, cursorX, cursorY]);

  useAnimationFrame((_, delta) => {
    const { innerWidth: w, innerHeight: h } = window;

    if (Date.now() - lastMove.current < 2000) {
      const px = Math.min(
        Math.max(cursorX.get() + 140, 140),
        w - 140
      );
      const py = Math.min(
        Math.max(cursorY.get() - 90, 120),
        h - 120
      );
      targetX.set(px);
      targetY.set(py);
    } else {
      wanderT.current += (delta / 1000) * 0.45;
      const t = wanderT.current;
      const cx = w / 2;
      const cy = h / 2;
      const ax = w / 2 - 160;
      const ay = h / 2 - 120;
      const x = cx + ax * (0.7 * Math.cos(t) + 0.3 * Math.sin(t * 0.37));
      const y = cy + ay * (0.65 * Math.sin(t * 1.23) + 0.35 * Math.cos(t * 0.71));
      targetX.set(x);
      targetY.set(y);
    }
  });

  const glowPulse: SVGMotionProps<SVGCircleElement> = reducedMotion
    ? {}
    : {
        animate: { opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      };

  const bodyBreath: SVGMotionProps<SVGGElement> = reducedMotion
    ? {}
    : {
        animate: { scale: [1, 1.02, 1] },
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      };

  const tailGlow: SVGMotionProps<SVGPathElement> = reducedMotion
    ? {}
    : {
        animate: { opacity: [0.4, 0.8, 0.4] },
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
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

  const phoenixSvg = (
    <motion.svg
      width="min(17vw, 180px)"
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
        <path
          d="M205 150 C 185 130, 165 116, 140 106 C 150 128, 155 150, 158 172 C 172 162, 190 156, 205 150 Z"
          fill="#A07820"
          opacity="0.5"
        />
        <path
          d="M245 185 C 225 168, 208 156, 188 148 C 196 168, 198 190, 198 212 C 214 200, 230 192, 245 185 Z"
          fill="#7A0B0B"
          opacity="0.4"
        />
      </motion.g>

      <motion.g style={{ ...wingStyle, transformOrigin: "8% 96%" }} {...rightFlap}>
        <path
          d="M265 225 C 300 170, 355 120, 425 80 C 465 56, 505 45, 545 52 C 520 70, 505 90, 498 110 C 518 102, 535 98, 552 102 C 528 124, 505 138, 480 144 C 492 156, 500 172, 505 190 C 478 184, 452 170, 428 148 C 395 172, 340 205, 265 225 Z"
          fill="url(#phx-wing)"
        />
        <path
          d="M355 145 C 335 120, 320 102, 310 88 C 318 112, 320 138, 318 164 C 330 156, 342 150, 355 145 Z"
          fill="#F5E7B8"
          opacity="0.45"
        />
        <path
          d="M400 115 C 382 96, 368 82, 358 72 C 364 96, 365 120, 362 146 C 374 138, 388 126, 400 115 Z"
          fill="#D9A441"
          opacity="0.5"
        />
        <path
          d="M300 195 C 282 178, 268 164, 258 152 C 266 174, 268 198, 266 222 C 278 212, 290 204, 300 195 Z"
          fill="#7A0B0B"
          opacity="0.4"
        />
      </motion.g>

      <motion.g style={{ ...wingStyle, transformOrigin: "12% 98%" }} {...rightFlap}>
        <path
          d="M250 220 C 285 165, 340 120, 405 85 C 435 68, 465 58, 495 55 C 470 72, 456 90, 450 108 C 468 102, 484 100, 498 103 C 476 120, 456 132, 432 138 C 444 150, 452 165, 456 182 C 430 176, 406 162, 384 142 C 352 168, 300 200, 250 220 Z"
          fill="url(#phx-body)"
          opacity="0.85"
        />
      </motion.g>

      <motion.g {...bodyBreath} style={{ transformBox: "fill-box" }}>
        <path
          d="M335 250 C 400 268, 470 300, 540 350 C 570 370, 590 392, 600 418 C 585 410, 565 398, 540 388 C 530 408, 522 428, 518 452 C 505 435, 495 414, 488 392 C 462 402, 432 408, 400 408 C 415 388, 432 366, 452 342 C 420 330, 385 320, 348 314 C 340 290, 336 270, 335 250 Z"
          fill="url(#phx-tail)"
        />
        <motion.path
          {...tailGlow}
          d="M420 330 C 455 330, 490 344, 520 370 C 540 388, 554 408, 560 430 C 540 420, 518 406, 496 388 C 492 408, 488 430, 486 452 C 470 434, 458 412, 450 386 C 428 392, 405 394, 380 390 C 396 366, 410 346, 420 330 Z"
          fill="#F97316"
          opacity="0.55"
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
      </motion.g>

      <motion.path
        {...tailGlow}
        d="M600 418 C 618 430, 632 446, 640 466 C 630 462, 618 454, 606 442 C 602 452, 598 464, 596 478 C 592 466, 590 452, 590 438 C 596 432, 600 426, 600 418 Z"
        fill="#F97316"
        opacity="0.7"
        filter="url(#phx-blur)"
      />

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
  );

  if (reducedMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 z-[45] pointer-events-none select-none"
        aria-hidden
      >
        {phoenixSvg}
      </motion.div>
    );
  }

  const flyIn: HTMLMotionProps<"div"> = {
    initial: { opacity: 0, x: "50vw" },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.8, ease: EASE, delay: 0.4 },
  };

  return (
    <motion.div
      {...flyIn}
      className="fixed inset-0 z-[45] pointer-events-none select-none overflow-hidden"
      aria-hidden
    >
      <motion.div
        style={{ x: xSpring, y: ySpring, rotate: bank }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {phoenixSvg}
        </div>
      </motion.div>
    </motion.div>
  );
}