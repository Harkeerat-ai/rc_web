# Theme Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a light/dark theme toggle, a global club-cheer marquee, and a floating background-music player to the RCBW site, shipped as three independent phases.

**Architecture:** Phase 1 converts the hardcoded dark palette to CSS-variable-driven tokens (`rgb(var(--color-x) / <alpha-value>)`) so every existing `bg-primary` / `text-ivory` / `border-gold` class automatically adapts to light/dark via `next-themes` (`attribute="class"`, `defaultTheme="system"`). Phase 2 adds a word-by-word rise-then-marquee cheer strip (framer-motion + a Tailwind `marquee` keyframe). Phase 3 adds a self-contained floating music player using a module-level `Audio` singleton so playback survives client-side navigation.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS 3, framer-motion, `next-themes` (new dependency).

**Verification convention:** This repo has NO test framework. Every phase is verified with `npm run lint` + `npm run build` (must pass) plus a manual browser check (`npm run dev`) of the behavior described. Each phase is committed separately.

---

## File Structure

| File | Responsibility | Status |
|---|---|---|
| `tailwind.config.ts` | CSS-var color tokens, `darkMode: "class"`, `marquee` keyframe/animation | Modify |
| `app/globals.css` | `:root` (light) + `.dark` variable blocks; variable-driven `body`, `::selection`, scrollbar, `.glass-card`, `.shimmer`, `color-scheme` | Modify |
| `app/layout.tsx` | Mount `ThemeProvider`; add `suppressHydrationWarning` to `<html>`; mount `CheerMarquee` + `MusicPlayer` | Modify |
| `components/providers/ThemeProvider.tsx` | Thin client wrapper around `next-themes` provider | Create |
| `components/layout/Navbar.tsx` | Theme toggle button (sun/moon); swap `bg-[#1E1610]` scrims for `bg-primary` | Modify |
| `components/layout/CheerMarquee.tsx` | Global cheer strip: word-by-word rise then marquee loop | Create |
| `components/music/MusicPlayer.tsx` | Floating play/pause/mute/volume player (bottom-left) | Create |
| `package.json` | Add `next-themes` | Modify |

---

## Phase 1 — Light/Dark Toggle

### Task 1: Install next-themes

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the dependency**

Run: `npm i next-themes`
Expected: adds `"next-themes": "^0.4.x"` to `dependencies` in `package.json`, creates `node_modules/next-themes`.

- [ ] **Step 2: Confirm install**

Run: `npm ls next-themes`
Expected: lists `next-themes@^0.4.x`.

---

### Task 2: Add theme CSS variables to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add variable blocks and switch hardcoded values to variables**

Replace the entire current file content with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Light theme (default) */
:root {
  color-scheme: light;
  --color-primary: 252 247 236;
  --color-surface: 255 253 246;
  --color-gold: 227 178 80;
  --color-rust: 200 90 30;
  --color-ivory: 46 36 27;
  --color-text-muted: 107 93 74;
  --color-glass: 200 90 30;
}

/* Dark theme */
.dark {
  color-scheme: dark;
  --color-primary: 30 22 16;
  --color-surface: 46 36 27;
  --color-gold: 227 178 80;
  --color-rust: 200 90 30;
  --color-ivory: 252 247 236;
  --color-text-muted: 201 188 168;
  --color-glass: 227 178 80;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: rgb(var(--color-primary));
  color: rgb(var(--color-ivory));
  font-family: "Inter", sans-serif;
  overflow-x: hidden;
}

::selection {
  background-color: rgb(var(--color-gold) / 0.4);
  color: rgb(var(--color-ivory));
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(var(--color-primary));
}

::-webkit-scrollbar-thumb {
  background: rgb(var(--color-gold));
  border-radius: 3px;
}

@layer utilities {
  .shimmer {
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      100deg,
      rgb(var(--color-ivory) / 0.06) 20%,
      rgb(var(--color-gold) / 0.14) 40%,
      rgb(var(--color-ivory) / 0.06) 60%
    );
    background-size: 200% 100%;
    animation: shimmer 1.8s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .shimmer {
      animation: none;
      background: rgb(var(--color-ivory) / 0.06);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
}

@layer components {
  .glass-card {
    background: linear-gradient(
      135deg,
      rgb(var(--color-ivory) / 0.14),
      rgb(var(--color-ivory) / 0.05)
    );
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgb(var(--color-gold) / 0.25);
    border-radius: 0.75rem;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgb(var(--color-ivory) / 0.12);
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
```

Note: keep the existing `hide-scrollbar` / `text-balance` utilities exactly as above.

- [ ] **Step 2: Verify no leftover hardcoded hex in globals.css**

Run: `rg -n "#1E1610|#FCF7EC|#2E241B|#C9BCA8|#E3B250" app/globals.css`
Expected: no matches (all moved into the `:root`/`.dark` variable blocks).

---

### Task 3: Convert Tailwind tokens to CSS-variable colors + add marquee animation

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update the config**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        rust: "rgb(var(--color-rust) / <alpha-value>)",
        shadowblack: "rgb(var(--color-primary) / <alpha-value>)",
        ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        "text-primary": "rgb(var(--color-ivory) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        glass: "rgb(var(--color-glass) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        ember: "ember 3s ease-out infinite",
        marquee: "marquee 22s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(226, 168, 60, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(226, 168, 60, 0.6)" },
        },
        ember: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-100px) scale(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "90%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "phoenix-gold": "linear-gradient(135deg, #E3B250, #C85A1E)",
      },
    },
  },
  plugins: [],
};
export default config;
```

The `90%→100%` hold in the `marquee` keyframe creates the "pause" at loop end. All existing token class names (`bg-primary/80`, `border-gold/30`, `from-gold`, `text-text-muted`, etc.) now resolve through the CSS variables — no component sweep needed.

- [ ] **Step 2: Verify build still compiles tokens**

Run: `npm run build`
Expected: compiles successfully (9 static routes). If any token class was missed, Tailwind warns `Cannot find color` — resolve by confirming the token exists in the config above.

---

### Task 4: Create ThemeProvider wrapper

**Files:**
- Create: `components/providers/ThemeProvider.tsx`

- [ ] **Step 1: Write the provider**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

- [ ] **Step 2: Confirm file compiles (no standalone check; validated in Task 6)**

---

### Task 5: Wrap the layout with ThemeProvider

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add import and wrap body content**

Add `import ThemeProvider from "@/components/providers/ThemeProvider";` after the other component imports, and add `suppressHydrationWarning` to `<html>`. Replace the `<body>` block so every child (FirefliesBackdrop, AnimatedPhoenix, ChatWidget, Navbar, MainErrorBoundary, Footer) is wrapped in `<ThemeProvider>`:

```tsx
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider>
          <FirefliesBackdrop />
          <AnimatedPhoenix />
          <ChatWidget />
          <Navbar />
          <MainErrorBoundary>
            <main className="min-h-screen">
              <LayoutWrapper>
                <ScrollProvider>{children}</ScrollProvider>
              </LayoutWrapper>
            </main>
          </MainErrorBoundary>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
```

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

---

### Task 6: Add theme toggle to Navbar + swap dark scrims for theme-aware tokens

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Add imports and toggle state**

At the top, add `import { useTheme } from "next-themes";`. Inside the component, after the existing `mobileOpen` state, add:

```tsx
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
```

- [ ] **Step 2: Swap hardcoded scrim classes for theme-aware tokens**

Change line 31 `"bg-[#1E1610]/80 backdrop-blur-xl border-b border-gold/20"` → `"bg-primary/80 backdrop-blur-xl border-b border-gold/20"`.

Change line 85 `className="md:hidden bg-[#1E1610]/95 backdrop-blur-xl border-b border-gold/20 overflow-hidden"` → `className="md:hidden bg-primary/95 backdrop-blur-xl border-b border-gold/20 overflow-hidden"`.

- [ ] **Step 3: Add the toggle button after the hamburger**

Insert between the hamburger `</button>` (line 75) and the closing `</div>` of the flex row:

```tsx
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-2 w-8 h-8 flex items-center justify-center cursor-pointer text-gold hover:text-ivory transition-colors duration-200"
          >
            {mounted ? (
              isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )
            ) : (
              <span className="w-4 h-4 rounded-full border border-gold/40" />
            )}
          </button>
```

Note: `mounted` guard prevents a hydration mismatch on the icon (server renders the placeholder span).

- [ ] **Step 4: Verify lint + build + manual theme check**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

Run: `npm run dev`, open http://localhost:3000.
Manual checks:
1. Toggle sits beside the hamburger, visible on desktop and mobile widths.
2. Click toggles dark↔light; site switches immediately; icon swaps.
3. Reload keeps the choice (localStorage).
4. In light mode: navbar links legible, glass cards visible, text readable, gallery/project placeholders readable.
5. `.dark` matches the original dark look exactly.

- [ ] **Step 5: Commit Phase 1**

```bash
git add package.json package-lock.json app/globals.css tailwind.config.ts app/layout.tsx components/providers/ThemeProvider.tsx components/layout/Navbar.tsx
git commit -m "Add light/dark theme toggle via CSS-variable tokens and next-themes"
```

---

## Phase 2 — Club Cheer Marquee

### Task 7: Create CheerMarquee component

**Files:**
- Create: `components/layout/CheerMarquee.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const CHEER = "We Dream, We Rise, To Be The Best — We Are The Club Of Bombay West";
const WORDS = CHEER.split(" ");

const WORD_CLASS =
  "mx-3 font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text [filter:drop-shadow(0_0_6px_rgba(227,178,80,0.35))]";

function CheerRow() {
  return (
    <div className="flex shrink-0 items-center">
      {WORDS.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className={WORD_CLASS}
        >
          {word}
        </motion.span>
      ))}
      <span className="mx-6 text-gold/40" aria-hidden>
        ✦
      </span>
    </div>
  );
}

export default function CheerMarquee() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className="relative z-40 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
        <p className="mx-auto max-w-6xl px-4 text-center font-heading text-xs sm:text-sm uppercase tracking-widest text-transparent bg-gradient-to-r from-gold to-rust bg-clip-text">
          {CHEER}
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-40 overflow-hidden border-b border-gold/20 bg-primary/60 py-2 backdrop-blur-sm">
      <div className="flex w-max animate-marquee will-change-transform">
        <CheerRow />
        <CheerRow />
      </div>
    </div>
  );
}
```

The track duplicates the row twice; the `marquee` keyframe translates `-50%` so the loop is seamless, with a 10% dwell at the end for the "pause". The word-by-word rise plays on mount (both copies animate identically).

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

---

### Task 8: Mount CheerMarquee in the layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and mount after Navbar**

Add `import CheerMarquee from "@/components/layout/CheerMarquee";` and insert `<CheerMarquee />` immediately after `<Navbar />` (inside `ThemeProvider`):

```tsx
          <Navbar />
          <CheerMarquee />
```

- [ ] **Step 2: Verify lint + build + manual marquee check**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

Run: `npm run dev`, open http://localhost:3000.
Manual checks:
1. A slim strip appears just below the navbar on every page.
2. Words rise in one-by-one with a gold glow, then the line scrolls horizontally, pauses, and loops.
3. The gradient text is legible in both dark and light mode.
4. With OS reduced-motion on, a static centered line renders (no scroll).

- [ ] **Step 3: Commit Phase 2**

```bash
git add app/layout.tsx components/layout/CheerMarquee.tsx tailwind.config.ts
git commit -m "Add global club cheer marquee with word-by-word rise animation"
```

---

## Phase 3 — Background Music

### Task 9: Create MusicPlayer component

**Files:**
- Create: `components/music/MusicPlayer.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
    audio.muted = muted;
    setMuted(audio.muted);

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
      audio.play();
      setPlaying(true);
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
```

The module-level `sharedAudio` singleton means the audio element survives page transitions (App Router keeps the layout mounted), so playback continues across navigation. Volume persists to `localStorage`. Music pauses when the tab is hidden.

- [ ] **Step 2: Verify lint + build**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

---

### Task 10: Mount MusicPlayer in the layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and mount after ChatWidget**

Add `import MusicPlayer from "@/components/music/MusicPlayer";` and insert `<MusicPlayer />` immediately after `<ChatWidget />`:

```tsx
          <ChatWidget />
          <MusicPlayer />
```

- [ ] **Step 2: Verify lint + build + manual music check**

Run: `npm run lint; if ($?) { npm run build }`
Expected: both pass.

Run: `npm run dev`, open http://localhost:3000.
Manual checks:
1. A circular play button (♪) floats bottom-left, opposite the chat widget.
2. First click starts the ambient track; button becomes pause; click pauses.
3. Clicking the volume icon opens the panel with a slider; volume persists after reload.
4. Navigating between pages keeps music playing.
5. Minimizing the tab pauses playback.
6. Both light and dark themes render the control legibly.

- [ ] **Step 3: Commit Phase 3**

```bash
git add app/layout.tsx components/music/MusicPlayer.tsx
git commit -m "Add floating background music player with persisted volume"
```

---

### Task 11: Push all three commits

- [ ] **Step 1: Confirm three new commits and push**

Run: `git log --oneline -4`
Expected: the three Phase commits on top of `main`.

Run: `git push origin main`
Expected: pushed; Vercel deploys the new build.

---

## Self-Review Notes (spec coverage)

- Phase 1: CSS vars (Tasks 2-3) ✓ · next-themes infra (Tasks 1, 4, 5) ✓ · navbar toggle + scrim fix (Task 6) ✓ · modal scrim stays dark (unchanged, per spec) ✓ · light-mode hazards (all `text-white` sites sit on gold/rust gradients or black image scrims — verified fine in both themes, no edits needed) ✓
- Phase 2: global marquee (Tasks 7-8) ✓ · word-by-word rise + pause + loop (marquee keyframe 90%/100% hold) ✓ · reduced-motion static line ✓
- Phase 3: floating player bottom-left z-[70] (Tasks 9-10) ✓ · streamed URL constant ✓ · play/pause + mute + volume ✓ · survives navigation (module singleton) ✓ · tab-hidden pause ✓
- Sequencing/verification: each phase lint+build+manual, committed separately, push at end ✓
