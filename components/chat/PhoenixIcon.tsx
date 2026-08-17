"use client";

export default function PhoenixIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 640 520" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <defs>
        <linearGradient id="phx-icon-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E7B8" />
          <stop offset="35%" stopColor="#D9A441" />
          <stop offset="75%" stopColor="#E3B250" />
          <stop offset="100%" stopColor="#C85A1E" />
        </linearGradient>
      </defs>
      <path
        d="M295 235 C 260 175, 220 130, 160 95 C 120 75, 90 70, 62 80 C 82 92, 92 108, 95 125 C 80 118, 68 116, 55 120 C 72 138, 88 148, 105 152 C 95 162, 88 176, 85 192 C 108 190, 130 180, 150 163 C 175 190, 215 220, 295 235 Z"
        fill="url(#phx-icon-body)"
        opacity="0.9"
      />
      <path
        d="M265 225 C 300 170, 355 120, 425 80 C 465 56, 505 45, 545 52 C 520 70, 505 90, 498 110 C 518 102, 535 98, 552 102 C 528 124, 505 138, 480 144 C 492 156, 500 172, 505 190 C 478 184, 452 170, 428 148 C 395 172, 340 205, 265 225 Z"
        fill="url(#phx-icon-body)"
      />
      <path
        d="M335 250 C 400 268, 470 300, 540 350 C 570 370, 590 392, 600 418 C 585 410, 565 398, 540 388 C 530 408, 522 428, 518 452 C 505 435, 495 414, 488 392 C 462 402, 432 408, 400 408 C 415 388, 432 366, 452 342 C 420 330, 385 320, 348 314 C 340 290, 336 270, 335 250 Z"
        fill="url(#phx-icon-body)"
        opacity="0.85"
      />
      <path
        d="M300 250 C 275 215, 260 190, 258 165 C 256 145, 262 128, 275 115 C 300 130, 315 150, 320 175 C 325 200, 318 228, 300 250 Z"
        fill="url(#phx-icon-body)"
      />
      <path
        d="M258 168 C 245 128, 242 92, 250 58 C 258 80, 272 105, 290 128 C 268 140, 258 154, 258 168 Z"
        fill="#D9A441"
      />
      <circle cx="172" cy="150" r="26" fill="#B8860B" />
      <circle cx="176" cy="146" r="20" fill="url(#phx-icon-body)" />
      <circle cx="166" cy="142" r="4" fill="#FFD700" />
    </svg>
  );
}