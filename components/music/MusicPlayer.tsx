"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_URL =
  "https://www.free-stock-music.com/music/alex-productions/mp3/alex-productions-ambient-music-nature.mp3";

const VOLUME_KEY = "rcbw-music-volume";

let sharedAudio: HTMLAudioElement | null = null;

function getAudio() {
  if (!sharedAudio) {
    sharedAudio = new Audio(MUSIC_URL);
    sharedAudio.loop = true;
    sharedAudio.preload = "none";
  }
  return sharedAudio;
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = getAudio();
    audioRef.current = audio;
    const stored = window.localStorage.getItem(VOLUME_KEY);
    if (stored !== null) {
      const v = Math.min(1, Math.max(0, parseFloat(stored)));
      if (!Number.isNaN(v)) {
        audio.volume = v;
        setVolume(v);
      }
    } else {
      audio.volume = 0.5;
    }

    const onVisibility = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  const togglePlay = () => {
    const audio = getAudio();
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          setPlaying(false);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  const handleVolume = (v: number) => {
    const audio = getAudio();
    audio.volume = v;
    setVolume(v);
    window.localStorage.setItem(VOLUME_KEY, String(v));
  };

  return (
    <div className="fixed bottom-6 left-6 z-[70] flex items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-card flex flex-col items-center gap-3 p-4"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => handleVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              className="w-28 accent-gold"
            />
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="text-gold hover:text-ivory transition-colors cursor-pointer"
            >
              {muted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 9l-6 6m0-6l6 6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide volume controls" : "Show volume controls"}
        aria-expanded={open}
        className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-gold hover:text-ivory transition-colors cursor-pointer"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        )}
      </button>

      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause music" : "Play music"}
        className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-gold hover:text-ivory transition-colors cursor-pointer"
      >
        {playing ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}