"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget"),
  { ssr: false, loading: () => null }
);

const MusicPlayer = dynamic(
  () => import("@/components/music/MusicPlayer"),
  { ssr: false, loading: () => null }
);

export default function LazyWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const kick = () => {
      if (!cancelled) setReady(true);
    };

    const ric =
      typeof window !== "undefined"
        ? window.requestIdleCallback?.bind(window)
        : undefined;

    if (ric) {
      const id = ric(kick);
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const id = window.setTimeout(kick, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <ChatWidget />
      <MusicPlayer />
    </>
  );
}