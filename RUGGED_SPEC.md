# RUGGED.PK — Project Specification & Codebase Map

## What This Is

Rugged is Pakistan's first consumer preparedness brand. The website serves three purposes: free educational guides (the trust builder), a private community forum (the retention engine), and a shop selling curated kits and individual gear (the revenue).

Target audience: urban middle-class Pakistani families, primarily in Karachi. The primary marketing hook is geopolitical instability (India-Pakistan tensions, domestic political crises, border volatility) — NOT natural disasters. Natural disasters are secondary context.

The tone is direct, serious, and Pakistani. Not tacticool, not imported survival culture. Think field manual, not Army surplus catalog.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router, JSX — not TypeScript)
- **Styling**: Tailwind CSS 3.4 with custom design tokens
- **Dark mode**: Class strategy via ThemeProvider, persisted to localStorage, respects system preference
- **Fonts**: IBM Plex Mono (body/mono), Inter (headings/sans) — loaded via Google Fonts
- **Path aliases**: `@/*` maps to project root (configured in jsconfig.json)

### Future additions (not yet implemented):
- **Database**: Prisma + SQLite (dev) → PostgreSQL (prod)
- **Auth**: TBD — needed for forum and checkout
- **Payments**: TBD — must work in Pakistan (JazzCash, EasyPaisa, bank transfer likely)
- **CMS**: TBD — guides will eventually come from markdown files or a headless CMS
- **Hosting**: Vercel (primary), PWA offline caching for resilience
- **Image storage**: Local filesystem (dev) → Cloudinary or S3 (prod)

---

## Directory Structure

```
rugged-pk/
├── app/
│   ├── globals.css          # Tailwind directives, base styles, component classes, animations
│   ├── layout.jsx           # Root layout — ThemeProvider, Nav, Footer wrapper
│   ├── page.jsx             # Homepage — hero + featured guides + forum preview + shop highlight
│   ├── guides/
│   │   ├── page.jsx         # Guides listing — search, tag filters, illustrated cards
│   │   └── [slug]/
│   │       └── page.jsx     # Guide detail template — header, inline illustrations, content placeholder
│   ├── forum/
│   │   └── page.jsx         # Forum — topic filters, thread list, pinned threads
│   └── shop/
│       └── page.jsx         # Shop — curated kits, individual gear by category, coming-soon merch
├── components/
│   ├── ThemeProvider.jsx     # Dark mode context — class strategy, localStorage, system preference
│   ├── Nav.jsx               # Fixed nav — logo, page links with active states, dark mode toggle
│   ├── Footer.jsx            # Three-column footer — Resources, Shop, Connect
│   ├── Divider.jsx           # § section divider
│   └── Sketches.jsx          # SVG sketch illustrations — backpack, water, radio, houses, medical, food, shelter
├── lib/                      # Empty — future utilities, data fetching, constants
├── public/                   # Empty — future static assets, PWA manifest, favicons
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jsconfig.json
└── package.json
```

---

## Design System

### Colors (defined in tailwind.config.js)

**Rugged (accent — burnt orange):**
- `rugged-400: #e05a3e` — dark mode accent
- `rugged-500: #c94b30` — light mode accent (primary brand color)
- `rugged-600: #a33d26` — hover state

**Sand (neutrals — warm paper tones):**
- `sand-50: #f5f2f0` — lightest bg element
- `sand-100: #f2efec` — card backgrounds (light)
- `sand-200: #eae6e1` — page background (light)
- `sand-300: #ddd8d2` — CTA section bg (light)
- `sand-500: #908a82` — muted text (dark mode)
- `sand-600: #5c5c5c` — muted text (light mode)
- `sand-800: #1c1a17` — card backgrounds (dark)
- `sand-900: #141210` — page background (dark)
- `sand-950: #0d0c0a` — CTA section bg (dark)

**Tag colors (used inline, not in Tailwind config):**
- essentials/planning: rugged accent
- food & water: `text-cyan-700 / dark:text-cyan-400`
- comms/gear: `text-amber-800 / dark:text-amber-500`
- community: `text-emerald-700 / dark:text-emerald-400`
- medical: `text-rose-700 / dark:text-rose-400`
- family: `text-violet-700 / dark:text-violet-400`

### Typography
- **Body text**: IBM Plex Mono, 0.82–0.92rem, `leading-relaxed`
- **Headings**: Inter, `font-bold`, `tracking-tight`, sizes vary (text-xl to text-5xl)
- **Section labels**: Inter, `text-xs`, `font-medium`, `uppercase`, `tracking-[0.15em]`
- **Eyebrows/tags**: IBM Plex Mono, `text-xs`, `uppercase`, `tracking-wider`

### Component Classes (defined in globals.css)
- `.section-container` — max-w-1100px, centered, responsive padding
- `.section-title` — uppercase small label for section headers
- `.section-note` — faded annotation text
- `.btn-primary` — filled accent button
- `.btn-outline` — outlined accent button
- `.card` — elevated container with border, hover lift, dark mode support
- `.divider` / `.divider-line` / `.divider-symbol` — § section separator

### Visual Details
- Paper texture overlay on body via SVG noise filter (opacity 0.03)
- `fadeInUp` animation on homepage sections with staggered delays
- Borders use raw rgba values (NOT Tailwind opacity shorthand) inside @apply — this is a known Tailwind 3 limitation. Use `border: 1px solid rgba(...)` and `.dark` selector overrides instead of `border-black/10 dark:border-white/8` inside @apply.

---

## Page Specifications

### Homepage (`app/page.jsx`)

Sections in order:
1. **Hero** — eyebrow ("Pakistan's first preparedness brand"), main heading, subtitle, two CTAs (guides primary, shop secondary), stat card sidebar ("30 minutes")
2. **Featured Guides** — 2-column grid, top 2 guides with full excerpt, tag, date, read time, "Save offline" link
3. **Forum Preview** — 3 recent discussions with reply counts, intro text about private encrypted conversations
4. **Shop Highlight** — single hero product card (Urban Conflict Kit) with capability specs
5. **Bottom CTA** — "You don't need to buy anything. Start with the guides." — contrarian trust-building CTA

### Guides Listing (`app/guides/page.jsx`)

- **Client component** (uses useState for search and filters)
- **Search**: live text search across titles, subtitles, excerpts, tags, and section names
- **Tag filters**: "all" + unique tags from guide data, single-select, combine with search
- **Results count**: shown when filtering
- **Cards**: horizontal layout — sketch illustration on left, content on right
  - Each card shows: tag (colored), date, read time, title, subtitle, excerpt, section pills, "Read guide →", "Save offline"
- **Empty state**: message + clear filters button
- **7 guides currently stubbed** — each has a slug, title, subtitle, tag, date, excerpt, readTime, sketch reference, and sections array

### Guide Detail (`app/guides/[slug]/page.jsx`)

- **Server component** with hardcoded guide metadata lookup
- Breadcrumb back to guides
- Header with sketch, title, subtitle, meta, download + share buttons
- Content area is placeholder — shows template of how inline illustrations work:
  - Small sketch next to step text
  - Full-width illustration with caption
- "This guide is being written" notice card
- **Future**: content will come from markdown files or CMS

### Forum (`app/forum/page.jsx`)

- Header with tagline ("The conversation nobody else is having")
- Topic filters (stubbed, not functional)
- "Start a thread" button (stubbed)
- Thread list: title, author, time ago, tag, reply count, pinned indicator
- Hover state with subtle background
- **8 threads currently stubbed**
- **Future**: needs auth, database, real-time or polling updates, user profiles

### Shop (`app/shop/page.jsx`)

Three-tier structure:

**Tier 1 — Curated Kits** (top):
- 3-column grid, equal height cards (items-stretch + flex)
- Each card: highlight label, name, subtitle, price (Rs.), description, 6 capability specs, CTA button, "View full specs" link
- Urban Conflict Kit has hero treatment (accent border, badge, filled CTA)
- Kit specs lead with CAPABILITY not contents — meals/calories, water processing volume, component counts. Never list raw ingredients.

| Kit | Price | Duration | People |
|-----|-------|----------|--------|
| Starter | Rs. 10,000 | 72 hours | 1 |
| Family | Rs. 40,000 | 4–5 days | 4 |
| Urban Conflict | Rs. 95,000 | 5+ days | 4 |

**Tier 2 — Individual Gear** (middle):
- 6 categories: Communication, Power, Water, Food, Medical, Shelter & Tools
- Each item: name, price, optional badge ("branded" or "local"), hover-reveal "+ Add" button
- Compact row layout, not cards

**Tier 3 — Merch** (bottom):
- Coming soon placeholder: "Hoodies, masks, caps. Wear the signal."
- Intentionally held until community exists

**Trust strip** at bottom: Locally sourced, Tested not theoretical, Rotation reminders

---

## Illustrations (`components/Sketches.jsx`)

Seven hand-drawn SVG components, all black and white, rough stroke style:
- `SketchBackpack` — grab bag / evacuation
- `SketchWater` — water bottle with filter marks and drops
- `SketchRadio` — walkie-talkie with signal waves
- `SketchHouses` — three houses with connection lines (community)
- `SketchMedical` — medical bag with cross
- `SketchFood` — sattu bag, dates cluster, chana scattered
- `SketchShelter` — tent with guy ropes

All use `currentColor` so they inherit text color and work in both themes. Exported individually and via `sketchMap` object for dynamic lookup.

---

## Important Technical Constraints

1. **No Tailwind opacity shorthand inside @apply** — `border-white/8` breaks in Tailwind 3 within @apply directives. Use raw CSS `border: 1px solid rgba(...)` with `.dark` selector overrides instead. Opacity shorthand works fine in JSX className strings, just not in globals.css @apply.

2. **@import must be first line in globals.css** — CSS spec requires @import before all other rules including @tailwind directives.

3. **Walkie-talkie range claims must be conservative** — 1–2km for standard pairs, 2–3km for long-range, in urban Karachi conditions (concrete buildings). Never use manufacturer open-field specs (5km, 10km).

4. **Solar panel claims must be honest** — "daytime recharge in sun" not "indefinite charge". It tops up a power bank during a sunny day. It's grid-independent, not infinite energy.

5. **Kit descriptions lead with capability specs** — meals + calories/day, water volume processed, component counts. NOT ingredient lists. "9 meals — 1,800+ cal/day" not "dried dates, apricots & chana". The contents are for the detail page, not the card.

6. **Food should sound like nutrition, not groceries** — "shelf-stable local foods" not "chana and sattu". The specific items (sattu, dates, apricots, roasted chana) are a genuine differentiator and should appear in guides and detail pages, but kit cards should lead with what the food DOES (calories, duration, people fed).

---

## What Needs Building Next

### High Priority
- [ ] Admin panel for managing products/guides
- [ ] Database schema (Prisma) for products, guides, forum threads, users
- [ ] User authentication (for forum + checkout)
- [ ] Cart and checkout flow
- [ ] Payment integration (Pakistan-compatible: JazzCash, EasyPaisa, bank transfer)
- [ ] Guide content system (markdown files → rendered pages with inline illustrations)
- [ ] PWA service worker for offline guide caching

### Medium Priority
- [ ] Forum backend (create threads, reply, user profiles)
- [ ] Product detail pages for individual kits
- [ ] Search across entire site (not just guides)
- [ ] Image management for products (upload, optimize, serve)
- [ ] SEO metadata per page
- [ ] Mobile responsive audit (current layout is desktop-first)

### Lower Priority
- [ ] Merch section (activate when community exists)
- [ ] Notification system (guide published, thread reply, kit rotation reminders)
- [ ] Analytics integration
- [ ] Local Pakistan hosting mirror (StormFiber/NayaTel) for resilience
- [ ] Newsletter/WhatsApp broadcast integration

---

## Brand Voice Rules

- Direct, casual, punchy. Short sentences. Uses ".." naturally.
- Never sounds like a marketing template or AI-generated listicle
- Avoids excessive dashes and structured formatting
- Can be vulnerable without being dramatic
- Conflict-first positioning — geopolitical anxiety is the hook, not earthquakes
- "The kit we wish didn't need to exist" energy
- Never tacticool, never imported American survival culture
- Pakistani context always: Karachi geography, KESC, sattu, local markets, neighbourhood clusters
