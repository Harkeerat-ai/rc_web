# Rotaract Club of Bombay West — Immersive Digital Platform

## Overview

A Next.js-based immersive 3D web experience for RCBW, transitioning from a Wix site to a high-performance platform centered on the phoenix identity and "Rise Above Yourself" motto. Targeting the Best Rotaract Club Website award in District 3141.

## Architecture

```
app/
├── layout.tsx              Root layout (nav, footer, R3F context provider)
├── page.tsx                Home: Hero (3D Phoenix) + About section
├── projects/page.tsx       Ambient 3D particles + projects card grid
├── rotary/page.tsx         Ambient 3D + Rotary/District info
├── newsletter/page.tsx     Newsletter archive (PDF list)
└── contact/page.tsx        Contact form + social links

components/
├── three/
│   ├── PhoenixModel.tsx    Loaded Phoenix GLB (homepage only, dynamic import)
│   ├── AmbientScene.tsx    Particles/geometric shapes for other pages
│   └── SceneSetup.tsx      Lights, camera, post-processing
├── layout/
│   ├── Navbar.tsx          Glassmorphism nav with mobile hamburger
│   ├── Footer.tsx          Site footer with social links
│   └── ScrollProvider.tsx  Lenis scroll context (homepage)
└── sections/
    ├── Hero.tsx            3D canvas + overlay text
    ├── About.tsx           Parallax story + stats + district badge
    ├── ProjectCard.tsx     Tilt-hover card
    ├── NewsletterList.tsx  PDF archive list
    └── ContactForm.tsx     Animated form with validation
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| 3D Rendering | React Three Fiber + Three.js + Drei |
| Animations | Framer Motion |
| Scroll | Lenis (homepage only) |
| Styling | Tailwind CSS |
| 3D Model | Sketchfab "Phoenix Bird" by NORBERTO-3D (CC Attribution) |

### Approach: Hybrid 3D (Approach C)

- **Homepage**: Full Phoenix 3D scene with fire particles, ember trails, mouse-reactive rotation, and scroll-driven transitions
- **Secondary pages**: Lighter ambient 3D (particles, geometric shapes in phoenix theme colors) via dynamic imports — no heavy model loading
- All R3F components use `next/dynamic` with `ssr: false`

## Routes & Pages

| Route | Content | 3D Element |
|-------|---------|-----------|
| `/` | Hero + About | Phoenix model + particles |
| `/projects` | Projects gallery | Ambient particles |
| `/rotary` | Rotary/District info | Ambient particles |
| `/newsletter` | PDF archive | None (static list) |
| `/contact` | Form + social | Ambient particles |

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Primary BG | `#0A0B1A` | Page backgrounds |
| Surface | `#1A1B3A` | Cards, sections |
| Gold | `#D4A030` | CTAs, phoenix accents, highlights |
| Crimson | `#B91C1C` | Fire particles, hover states, energy |
| Text Primary | `#F8F9FA` | Body text on dark |
| Text Muted | `#94A3B8` | Secondary text |
| Glass | `rgba(212,160,48,0.15)` | Glassmorphism surfaces |

## Typography

- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)

## Hero Section (Homepage)

- Full-viewport R3F Canvas
- Phoenix model (4.1k tri, rigged) loaded via `useGLTF`
- Custom PBR material (gold-to-crimson gradient)
- Mouse-follow rotation with GSAP `lerp`
- Fire particles (custom shader, ~500 points)
- Ember rise particle trail from wings
- Framer Motion overlay: "Rotaract Club of Bombay West" + "Rise Above Yourself"
- On scroll past hero: Phoenix scales down + fades, About section parallax takes over

### Phoenix Model Workflow

1. Download GLB from Sketchfab (UID: `844ba0cf144a413ea92c779f18912042`)
2. Optimize with `gltf-transform` (dedupe, quantize, DRACO compress)
3. Import into R3F via `useGLTF` + `useAnimations`

## About Section (Homepage, below hero)

- Scroll-triggered Framer Motion reveals
- Phoenix symbolism narrative: rebirth, rising above
- Animated stat counters (Years active, Projects, Members)
- RID 3141 affiliation badge
- Parallax speed differential (text slower than bg particles)

## Projects Page (`/projects`)

- Ambient 3D ember-like floating particles
- Interactive card grid with Framer Motion 3D tilt on hover
- Cards: thumbnail, title, impact metric, short description
- Click opens expanded view or detail navigation
- Data from static local file (no CMS)

## Rotary & District Page (`/rotary`)

- Parent Rotary Club of Bombay West info card
- RID 3141 connection visual (animated SVG or lightweight 3D)
- Informational, minimal visual weight

## Newsletter Page (`/newsletter`)

- List view: title, date, download button per issue
- PDFs stored in `public/newsletters/`
- Simple `<a download>` links (optional embedded viewer later)

## Contact Page (`/contact`)

- Glassmorphism form card: Name, Email, Phone, Subject, Message
- Framer Motion animated validation (shake + highlight on error)
- Console log on submit
- Social links: Instagram, Facebook, LinkedIn — icon buttons with hover glow

## Global Components

### Navbar
- Fixed top, glassmorphism (`backdrop-blur`, semi-transparent background)
- Links: Home, Projects, Rotary, Newsletter, Contact
- Smooth scroll-to-section on homepage, standard nav on other pages
- Mobile hamburger with animated open/close

### Footer
- Social icons, copyright, Rotary affiliation

## Asset Pipeline

1. Download Phoenix GLB from Sketchfab
2. Run through `gltf-transform` for optimization
3. Place optimized GLB in `public/models/phoenix-optimized.glb`
4. Download newsletter PDFs into `public/newsletters/`

## Out of Scope (Future)

- CMS integration for projects/newsletters
- Email service for contact form
- Blog/news section
- Member portal / authentication
