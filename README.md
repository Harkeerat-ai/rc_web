# RCBW Website — Rotaract Club of Bombay West

Official site for the Rotaract Club of Bombay West (RID 3141): projects,
newsletters, and an AI-powered club assistant chat.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) · React 18 · TypeScript (strict) |
| Styling | Tailwind CSS 3.4 (CSS-variable theme tokens) |
| Motion | framer-motion · Lenis smooth scroll · Three.js / react-three-fiber |
| Chat | SSE streaming via a hardened same-origin proxy → FastAPI backend |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires Node 18.17+. Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Environment variables

Copy `.env.example` → `.env.local`:

| Var | Required | Notes |
|---|---|---|
| `CHAT_API_URL` | for chat | Base URL of the FastAPI backend. ⚠️ Must be the **real** deployed URL — a placeholder like `https://your-railway-url.up.railway.app` resolves to someone else's app and makes chat silently 404/offline. |
| `CHAT_BRAND` | for chat | Brand slug used in backend paths. Site default: `rcbw`. Must match the backend exactly. |

## Project structure

```
app/                    Routes (/, /projects, /rotary, /newsletter, /contact) + api/chat proxy
  api/chat/[...path]/   Hardened proxy to the chat backend (allowlist, body cap, rate limits)
components/
  sections/             Page sections (Hero, About, ProjectsGrid, ContactForm, …)
  layout/               Navbar, Footer, providers, error boundaries
  motion/               Reveal + Parallax animation primitives
  three/                Hero 3D scene (lazy, ssr:false)
  chat/                 ChatWidget (SSE client)
lib/                    Data (data.ts), chat types/i18n (chat.ts), rate limiter (rateLimit.ts)
public/                 og-image.png, sw.js, newsletter PDFs
```

## Chat backend API contract

The site proxies **only** these endpoints (`/api/chat/*` → `<CHAT_API_URL>/api/<CHAT_BRAND>/*`):

| Backend route | Method | Contract |
|---|---|---|
| `/api/{brand}/health` | GET | any JSON, 200 |
| `/api/{brand}/chat/stream` | POST | body `{message, session_id, language, stream}` → **SSE** `data: {JSON}\n\n` frames; incremental `{token}` frames, final `{answer, message_id:int, sources[], citations[], urls[]}` |
| `/api/{brand}/suggestions/{message_id}` | GET | `{"suggestions": ["…"]}` — polled ~10× @1.5 s; non-200 ignored |
| `/api/{brand}/feedback` | POST | body `{message_id, rating:±1, session_id}` → 200 |

Requirements: SSE lines must be exactly `data: {valid JSON}\n\n`; final frame keyed on `"answer"`; `message_id` numeric; content type `text/event-stream`. Languages: en, es, ar, hi, mr, ta, gu, pa.

### Deploying the backend on Render

1. Repo with `main.py` + `requirements.txt` (`fastapi`, `uvicorn[standard]`)
2. Render → New Web Service:
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Health Check Path: `/health`
3. Set `CHAT_API_URL=https://<your-service>.onrender.com` in `.env.local` (local) and Vercel env vars (production)

Free instances sleep after idle — expect a slow first message after a break.

## Security hardening (proxy)

- Method+path allowlist only — everything else 404
- Request bodies capped at 32 KB → 413
- Per-IP fixed-window limits: stream/feedback 10/min, suggestions 30/min, health 20/min → 429 with `Retry-After`
- Security headers on all routes incl. CSP (see `next.config.mjs`)
- Stale service workers self-unregister via `public/sw.js`

## SEO & accessibility

- PNG Open Graph image, Twitter cards, canonicals, `sitemap.xml`, robots rules
- WCAG AA text contrast tokens (`goldtext`/`rusttext`), full form semantics, skip link, keyboard-managed mobile nav

## Deploy (site)

Vercel-ready. Set both env vars in project settings; push to deploy.
