# RCBW Immersive Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (\- [ ]\) syntax for tracking.

**Goal:** Build a multi-page Next.js immersive 3D website for the Rotaract Club of Bombay West featuring a phoenix-themed hero, scroll-driven storytelling, and dark gold/crimson design system.

**Architecture:** Next.js 14 App Router with a multi-page layout (homepage with Hero + About, separate pages for Projects, Rotary, Newsletter, Contact). Hybrid 3D approach � full Phoenix model on homepage via React Three Fiber, lighter ambient 3D particles on secondary pages. All R3F components dynamically imported with \ssr: false\.

**Tech Stack:** Next.js 14 (App Router), React Three Fiber + Three.js + Drei, Framer Motion, Tailwind CSS, Lenis scroll, Space Grotesk + Inter (Google Fonts)

## Live Verification

Keep `npm run dev` running throughout development. After each task, refresh `http://localhost:3000` to verify changes live. The dev server auto-reloads on file saves.

```powershell
# Start dev server
npm run dev
# Visit: http://localhost:3000

# For network access (check on phone/tablet):
npm run dev -- --host 0.0.0.0
# Find your IP with: ipconfig
# Visit http://<YOUR_IP>:3000
```

---

## File Structure

\\\
app/
+-- layout.tsx
+-- page.tsx
+-- globals.css
+-- projects/page.tsx
+-- rotary/page.tsx
+-- newsletter/page.tsx
+-- contact/page.tsx

components/
+-- layout/
�   +-- Navbar.tsx
�   +-- Footer.tsx
�   +-- ScrollProvider.tsx
+-- sections/
�   +-- Hero.tsx
�   +-- About.tsx
�   +-- ProjectCard.tsx
�   +-- ContactForm.tsx
+-- three/
    +-- PhoenixModel.tsx
    +-- HeroScene.tsx
    +-- AmbientScene.tsx

lib/
+-- utils.ts
+-- data.ts

public/
+-- models/phoenix-optimized.glb
+-- newsletters/
\\\

---

### Task 1: Project Scaffolding + Dependencies

**Files:** \package.json\, \	sconfig.json\, \
ext.config.js\, \postcss.config.js\

- [ ] **Step 1:** \
px create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm\
- [ ] **Step 2:** \
pm install three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion @studio-freight/lenis clsx tailwind-merge\ and \
pm install --save-dev @gltf-transform/cli\
- [ ] **Step 3:** Verify \
pm run dev\ works at localhost:3000

---

### Task 2: Tailwind Config + Global CSS

**Files:** Modify \	ailwind.config.ts\, \pp/globals.css\

- [ ] **Step 1:** Custom Tailwind theme with colors (primary #0A0B1A, surface #1A1B3A, gold #D4A030, crimson #B91C1C, text-primary #F8F9FA, text-muted #94A3B8), fonts (Space Grotesk + Inter), animations (float, glow, ember)
- [ ] **Step 2:** globals.css with dark body bg, custom scrollbar styling
- [ ] **Step 3:** Verify dark bg renders at localhost:3000

---

### Task 3: Utility Functions + Static Data

**Files:** Create \lib/utils.ts\, \lib/data.ts\

- [ ] **Step 1:** \cn()\ helper using clsx + tailwind-merge
- [ ] **Step 2:** \Project\, \Newsletter\, \SocialLink\ interfaces + 6 projects, 5 newsletters, 3 social links, clubStats (10 years, 45 projects, 35 members, district 3141)

---

### Task 4: Navbar Component

**Files:** Create \components/layout/Navbar.tsx\

- [ ] **Step 1:** Glassmorphism fixed nav (\ackdrop-blur-xl\ on scroll), RCBW logo, 5 nav links (Home, Projects, Rotary, Newsletter, Contact), mobile hamburger with Framer Motion animated open/close. All clickable elements have \cursor-pointer\.

---

### Task 5: Footer Component

**Files:** Create \components/layout/Footer.tsx\

- [ ] **Step 1:** RCBW + RID 3141 branding, social icon buttons (Instagram, Facebook, LinkedIn inline SVGs with hover glow), copyright. Imports \socialLinks\ from data.

---

### Task 6: Root Layout

**Files:** Modify \pp/layout.tsx\

- [ ] **Step 1:** Load Space Grotesk + Inter via \
ext/font/google\ as CSS vars. Metadata with title, description, keywords, OpenGraph. Structure: Navbar > main > Footer.

---

### Task 7: 3D Ambient Scene + Scene Setup

**Files:** Create \components/three/SceneSetup.tsx\, \components/three/AmbientScene.tsx\

- [ ] **Step 1:** SceneSetup with ambientLight (0.2), gold + crimson directionalLights, Environment (night), ContactShadows
- [ ] **Step 2:** AmbientScene � 100 gold particles animated with sine wave Y oscillation, AdditiveBlending

---

### Task 8: 3D Phoenix Model

**Files:** Create \components/three/PhoenixModel.tsx\

- [ ] **Step 1:** Load GLB (\/models/phoenix-optimized.glb\) via \useGLTF\, clone scene. Mouse-follow rotation (lerp 0.05), scroll-driven scale (1 to 0.3) + Y offset
- [ ] **Step 2:** Download GLB from Sketchfab UID \844ba0cf144a413ea92c779f18912042\, place at \public/models/phoenix-optimized.glb\, optimize with gltf-transform (dedup, quantize, draco)

---

### Task 9: Hero 3D Scene

**Files:** Create \components/three/HeroScene.tsx\

- [ ] **Step 1:** Canvas (camera [0,0,6], fov 50, alpha). SceneSetup + 500 crimson FireParticles (additive, rise-and-reset) + PhoenixModel

---

### Task 10: Hero Section (Text Overlay)

**Files:** Create \components/sections/Hero.tsx\

- [ ] **Step 1:** Full-viewport section, dynamic import of HeroScene (ssr:false). Framer Motion overlay: club name (gold uppercase), "Rise Above Yourself" heading (gradient on "Yourself"), subtitle, CTA button, scroll-down mouse indicator with bounce

---

### Task 11: About Section

**Files:** Create \components/sections/About.tsx\

- [ ] **Step 1:** Two-column layout. Left: phoenix symbolism narrative, motto, RID 3141 badge. Right: 4 animated stat counters (Years 10+, Projects 45+, Members 35+, District 3141) using \useInView\

---

### Task 12: Homepage Page

**Files:** Modify \pp/page.tsx\

- [ ] **Step 1:** \"use client"\, renders \<Hero />\ + \<About />\
- [ ] **Step 2:** Verify at localhost:3000

---

### Task 13: ProjectCard Component

**Files:** Create \components/sections/ProjectCard.tsx\

- [ ] **Step 1:** Card with gradient placeholder, tag pills, title, description, impact indicator. \whileHover\ tilt (rotateX/Y 3), \cursor-pointer\

---

### Task 14: Projects Page

**Files:** Create \pp/projects/page.tsx\

- [ ] **Step 1:** Fixed AmbientScene bg (dynamic, ssr:false). "Our Impact" heading, 3-column grid of ProjectCards with staggered animation
- [ ] **Step 2:** Verify at /projects

---

### Task 15: Rotary Page

**Files:** Create \pp/rotary/page.tsx\

- [ ] **Step 1:** AmbientScene bg. Two glassmorphism cards (Rotary Club of Bombay West + District 3141). Affiliate badge with pulsing dot
- [ ] **Step 2:** Verify at /rotary

---

### Task 16: ContactForm Component

**Files:** Create \components/sections/ContactForm.tsx\

- [ ] **Step 1:** 5-field form (Name, Email, Phone, Subject, Message). Validation errors (crimson), success state with checkmark, social icons inline. Console.log on submit

---

### Task 17: Contact Page

**Files:** Create \pp/contact/page.tsx\

- [ ] **Step 1:** AmbientScene bg + ContactForm
- [ ] **Step 2:** Verify at /contact

---

### Task 18: Newsletter Page

**Files:** Create \pp/newsletter/page.tsx\

- [ ] **Step 1:** "Publications" heading, newsletter list with doc icon, title, date, download button. Staggered Framer Motion reveal
- [ ] **Step 2:** Create placeholder PDFs in \public/newsletters/\
- [ ] **Step 3:** Verify at /newsletter

---

### Task 19: Lenis Smooth Scroll

**Files:** Create \components/layout/ScrollProvider.tsx\, Modify \pp/layout.tsx\

- [ ] **Step 1:** ScrollProvider creates Lenis (duration 1.2, smoothWheel), RAF loop, cleanup on destroy. Wraps children
- [ ] **Step 2:** Import and wrap \<main>\ content in layout.tsx

---

### Task 20: Performance + Build

**Files:** Modify \
ext.config.js\

- [ ] **Step 1:** \
ext.config.js\ with canvas external + webpack config
- [ ] **Step 2:** \
pm run build\ � all 5 routes compile
- [ ] **Step 3:** \
pm run start\ � verify all routes render correctly

---

## Self-Review

**Spec Coverage:** All 5 routes, 3D hero + fire particles, About with counters + RID badge, Projects with tilt cards + ambient 3D, Rotary with info cards, Newsletter with PDF list, Contact with validated form, glassmorphism navbar, Lenis scroll, hybrid 3D, dynamic imports, custom fonts, exact colors.

**Types consistent:** \Project\, \Newsletter\, \SocialLink\ from data.ts used across all consumers.

---

Plan complete. Two execution options:

**1. Subagent-Driven (recommended)** � I dispatch a fresh subagent per task, review between tasks.

**2. Inline Execution** � Execute in this session with checkpoints.

Which approach?
