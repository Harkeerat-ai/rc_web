"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEEN_KEY = "introSeen";
const START_TIMEOUT_MS = 5000;

// Plays once per session, on the home page only. The inline script in
// app/layout.tsx sets html[data-intro="skip"] before paint so a returning
// visitor never sees the overlay flash.
export default function IntroVideo() {
  const [open, setOpen] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setOpen(false);
  };

  useEffect(() => {
    if (document.documentElement.dataset.intro === "skip") {
      setOpen(false);
      return;
    }
    document.body.style.overflow = "hidden";
    // Autoplay blocked or video never starts: don't trap the visitor.
    const timer = setTimeout(() => {
      if (videoRef.current && videoRef.current.currentTime === 0) close();
    }, START_TIMEOUT_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) document.body.style.overflow = "";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Introduction video"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="intro-overlay fixed inset-0 z-[200] bg-black"
        >
          <video
            ref={videoRef}
            src="/intro/intro.mp4"
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            onEnded={close}
            onError={close}
            className="h-full w-full object-contain portrait:scale-[1.45]"
          />
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="absolute bottom-5 left-5 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur transition-colors hover:text-white sm:bottom-8 sm:left-8"
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="absolute bottom-5 right-5 rounded-full border border-white/25 bg-black/40 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur transition-colors hover:text-white sm:bottom-8 sm:right-8"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
