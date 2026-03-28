# RUGGED.PK Architecture (Quick Onboarding)

Last updated: 2026-03-25
This doc is the short version of `BUILD_PLAN.md`.

## 1) What We’re Building

Rugged is a preparedness brand website with three pillars:

- Guides (trust builder)
- Private forum (retention engine)
- Shop (revenue)

Tone: Pakistani field manual, not imported survival culture.

## 2) Non-Negotiables

- **PostgreSQL from day one** (no SQLite detour).
- **Auth first** (forum + checkout depend on it).
- **Offline “Save guide” loop early** (brand promise).
- **Forum is moderation-first** (report queue + audit log + rate limits + new-user link limits).
- **Manual payments first** (bank transfer + COD), integrate processors later.
- **Content starts MDX in-repo**, CMS only when editorial load justifies it.

## 3) Current / Target Stack

- Next.js 14 App Router, JavaScript
- Tailwind CSS
- Prisma + PostgreSQL
- Auth.js (NextAuth) + Prisma adapter
  - email/password primary
  - email OTP for verification
  - Google login as convenience
  - SMS OTP deferred
- Guides: MDX/markdown in `content/guides/`
- PWA: minimal service worker focused on explicit “Save offline” guide caching
- Deployment: Vercel + managed Postgres (Neon/Supabase recommended starters)

## 4) Repo Layout (Recommended)

- `app/` — routes, layouts, UI composition
- `components/` — UI components
- `lib/` — shared helpers + domain services (keep business logic here)
- `content/guides/` — MDX/markdown guide source (frontmatter + body)
- `prisma/` — schema + migrations + seed
- `docs/` — product/architecture docs

Rule of thumb:

- Route handlers should be thin.
- Domain logic lives in `lib/domain/*`.
- UI should not “own” business rules.

## 5) Phase Map (What Ships When)

## Phase 0 — Foundation + Offline Loop (week 1–2)

- PostgreSQL + Prisma baseline schema
- Auth.js: credentials + email verification OTP + password reset + Google
- Roles: `user`, `moderator`, `admin`
- Minimal PWA:
  - “Save offline” for a guide → precache that guide route/assets
  - Don’t attempt whole-site offline yet

## Phase 1 — Guides Pipeline (week 2–3)

- Guides move from hardcoded stubs → `content/guides/*` MDX
- Rendering in `app/guides/*` reads filesystem content + metadata
- Keep the existing visual design; only swap data source

## Phase 2 — Shop + Manual Checkout (week 3–5)

- Products model (kits + gear)
- Cart (guest + authed)
- Checkout v1:
  - bank transfer instructions + order reference
  - COD
- Admin order board for status transitions and verification

## Phase 3 — Forum MVP (week 5–7)

MVP = safe, private, usable. Not “feature rich.”

- Threads + replies
- Reports → moderation queue
- Moderator actions logged (audit trail)
- Rate limits, keyword/profanity filter, strict new-user link limits
- Notifications (in-app) for replies/mentions

## Phase 1b (Optional) — CMS Upgrade (when needed)

Trigger conditions:

- Publishing cadence increases
- non-dev editors need to publish without PRs
- scheduled publishing + editorial workflow becomes painful

Then:

- adopt Payload (self-hosted) or Sanity (managed)
- migrate/sync guide data model to match the MDX frontmatter shape

## 6) Data Domains (High Level)

- Auth/User: users, sessions, roles
- Guides: metadata + body (MDX now, CMS later)
- Shop: products, cart, orders, fulfillment statuses, payment proof (optional)
- Forum: categories, threads, replies, reports, moderation actions, notifications

## 7) Security / Privacy Defaults

- Forum requires auth; minimal public surface area.
- No emails/phones exposed in UI.
- Keep moderation actions attributable and auditable.

