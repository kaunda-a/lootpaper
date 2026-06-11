# Lootpaper

Free marketing tools, curated software deals, and resources for makers. No signup, no account required.

## Tools

### GitHub Tools (public API, no auth)
- **GitHub SEO Analyzer** — `/seo` — Score your repo's SEO readiness (0-100) with checklist and recommendations
- **GitHub Profile Analyzer** — `/github-profile` — View stats, top repos, and language breakdown for any user
- **GitHub Repo Compare** — `/compare-repos` — Side-by-side comparison of two repos

### Developer Utilities (all client-side)
- **Password Generator** — `/password-generator` — Secure passwords with strength meter
- **UUID Generator** — `/uuid-generator` — v4 and v1 identifiers
- **Hash Generator** — `/hash-generator` — MD5, SHA-1, SHA-256, SHA-512 (Web Crypto API)
- **Number Base Converter** — `/number-base` — Binary, octal, decimal, hex
- **JSON Formatter** — `/json-formatter` — Format, minify, validate
- **Case Converter** — `/case-converter` — 11 text format conversions
- **Base64 Encoder** — `/base64-encoder` — Encode/decode base64
- **URL Encoder** — `/url-encoder` — Encode/decode URLs

### Marketing & Design Tools
- **Currency Converter** — `/currency-converter` — Real-time exchange rates (Frankfurter API)
- **URL Shortener** — `/url-shortener` — Shorten links (CleanURI API)
- **Favicon Finder** — `/favicon-finder` — Grab any site's favicon + HTML/MD code
- **Color Converter** — `/color-converter` — HEX, RGB, HSL with live preview
- **Email Validator** — `/email-validator` — Format, disposable domain, TLD checks
- **QR Generator** — `/qr-generator` — QR codes for any text/URL, download PNG
- **Word Counter** — `/word-counter` — Words, chars, sentences, readability score
- **IP Lookup** — `/ip-lookup` — Public IP, ISP, location, timezone, currency
- **Lorem Ipsum Generator** — `/lorem-ipsum` — Placeholder text in paragraphs/sentences/words

## Stack

- **Astro 6** — static site generation, file-based routing
- **Tailwind CSS v4** — utility-first with shadcn/ui design tokens
- **React 19** — interactive components (navbar, UI primitives)
- **shadcn/ui** — accessible component primitives (Button, Card, Input, Badge, Tabs, Sheet)
- **Motion** — animations (resizable navbar, scroll effects)
- **@astrojs/sitemap** — auto-generated sitemap for SEO
- **@fontsource-variable/inter** — Inter font variable

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |

## Design

- Brand gradient: `#D76D77` → `#ffca7b`
- Rabbit silhouette logo with gradient fill
- Dark mode default with localStorage-persisted toggle (no flash)
- Premium CSS effects: shimmer buttons, moving borders, card spotlight, gradient glow
- View transitions (SPA-like navigation) via Astro ClientRouter
- Custom 404 page, blog with reading progress + table of contents

## Deployment

Static site — `dist/` folder deploys to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
