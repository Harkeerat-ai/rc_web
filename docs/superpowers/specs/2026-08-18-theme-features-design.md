# Theme Features — Design Spec

**Date:** 2026-08-18
**Status:** Approved (design), pending user spec review
**Phases:** 1. Light/dark toggle · 2. Club cheer marquee

## Overview

Add polish features to the RCBW site, shipped as independent phases, each verified (lint + build) and committed separately. The biggest architectural lift is Phase 1: the site is currently 100% dark-themed with hardcoded hex colors and no theming infrastructure.

## Phase 1 — Light/Dark Toggle

### Infrastructure
- Use `next-themes` (`npm i next-themes`) with `darkMode: "class"` in `tailwind.config.ts`.
- Wrap `app/layout.tsx` (server component) children in a new client `ThemeProvider` component; add the `next-themes` inline `<head>` script to prevent FOUC.
- Persist selection to `localStorage`; default to system preference on first visit.

### Token refactor
- Convert `tailwind.config.ts` hex tokens to CSS variables:
  - `--color-primary` (dark `#1E1610` / light `#FCF7EC` warm paper)
  - `--color-surface` (dark `#2E241B` / light `#FFFDF6`)
  - `--color-gold` `#E3B250`, `--color-rust` `#C85A1E` (unchanged both themes)
  - `--color-ivory` (dark `#FCF7EC` text / light `#2E241B` text)
  - `--color-text-muted` (dark `#C9BCA8` / light `#6B5D4A`)
  - `--color-glass` (dark `rgba(227,178,80,0.2)` / light `rgba(200,90,30,0.15)`)
- Map Tailwind tokens to `rgb(var(--color-x) / <alpha>)` so existing opacity modifiers (`/10`, `/20`) keep working.
- Update the ~200 color-token usages across components (audited) to keep the same class names where possible; where a token's dark/light meaning differs, the CSS-variable swap handles it.
- Dark scrim overlays stay dark in BOTH themes: the modal backdrop `bg-[#1E1610]/70` in `ProjectDetailModal.tsx` remains as-is (a true dimming scrim behind content).
- The navbar is NOT a scrim — it is a surface the links sit on. Its `bg-[#1E1610]/80` (scrolled) and `bg-[#1E1610]/95` (mobile dropdown) in `Navbar.tsx` must become theme-aware (`bg-primary/80`, `bg-primary/95`) so `text-text-muted` links stay legible in light mode.
- Add `.dark` class + `@media (prefers-color-scheme)` overrides in `globals.css` for `body` bg/text, `::selection`, scrollbar, `.glass-card`, `.shimmer`.
### Light-mode hazards
- Audit the 9 `text-white` / `bg-white/10` / `from-black/60` sites per-context: white text over images/gradients and black scrims (GalleryStrip overlay, ProjectDetailModal) are fine to keep; white text on a light background (e.g., some ChatWidget/ContactForm button labels) must become theme-aware via variables.

### Theme-independent visuals
- Ember SVG/Three.js palettes (AnimatedPhoenix, PhoenixIcon, FirefliesBackdrop, three/*) and the 6 gold `rgba(227,178,80,…)` glow shadows stay as-is — warm ember colors read fine on both themes.

### Toggle UI
- Sun/moon icon button in `Navbar.tsx` (client), right side after the hamburger, visible at all breakpoints. Rotates + swaps icon on change. `aria-label` set per state.

## Phase 2 — Club Cheer Marquee

### Component
- New `components/layout/CheerMarquee.tsx`, mounted in `layout.tsx` after `<Navbar />`.
- Slim full-width strip. Cheer: **"We Dream, We Rise, To Be The Best — We Are The Club Of Bombay West"**.
- Word-by-word rise + glow entrance (framer-motion, staggered), then the line marquees/scrolls horizontally, pauses, loops.
- Reduced-motion: static centered line, no marquee.
- Gold gradient text on a translucent dark strip; adapts to light theme via tokens.

## Phase 3 — Background Music

> **Removed 2026-08-18.** The floating music player (Phase 3) was removed at the user's request after the chosen track URL proved unreliable in playback. `components/music/MusicPlayer.tsx` and its `MUSIC_URL` constant were deleted; `LazyWidgets` now lazy-loads only the chat widget.

## Sequencing & Verification

1. Phase 1 → `npm run lint` + `npm run build` → commit.
2. Phase 2 → verify → commit.
3. Push each to `main` after commit (per prior workflow).

## Out of Scope
- No payload-cutting refactors (per user priority: UX polish).
- No visual changes to phoenix/fireflies/hero Three.js art.
- No new routes.

## Files (expected)
- New: `components/providers/ThemeProvider.tsx`, `components/layout/CheerMarquee.tsx`
- Edit: `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `components/layout/Navbar.tsx`, `components/sections/ProjectDetailModal.tsx`, all components using color tokens (Phase 1 sweep)
- Install: `next-themes`