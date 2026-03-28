# RUGGED.PK Build Plan (Living Document)

Last updated: 2026-03-25
Owner: jiyad + AI assistants
Status: active working plan

## 1) Product Direction (Locked)

- Public repo is fine now.
- Focus on building forward, not milestone cosmetics.
- Keep one main repo for now (monorepo style folders are optional later).
- Start with practical payments: manual bank transfer + cash on delivery (matches how most Pakistani e‑commerce runs at small scale; automate JazzCash/EasyPaisa only after orders flow—those APIs and sandboxes are finicky).
- Guides ship **markdown/MDX in-repo first** (fast, version-controlled). Add a **headless CMS (e.g. Payload or Sanity) only when publishing volume or non-dev editors make git-based content a bottleneck—adding CMS later is easier than removing one that was too heavy too early.
- Auth should support both:
  - email/password + OTP verification
  - social login
- Forum should launch as a real product feature (not a placeholder).
- Maintain brand voice guardrails in-repo.

## 2) Recommended Long-Term Stack (Minimize Switching)

These choices are selected to avoid major rewrites later:

- Frontend/App: Next.js 14 App Router (already in place), JavaScript
- Styling: Tailwind CSS (already in place)
- Database: PostgreSQL from day 1 (skip SQLite to avoid migration churn; you will want Postgres for forum **full-text search** and everything else)
  - On Vercel, **Neon** or **Supabase** free tiers connect cleanly with Prisma
- ORM: Prisma
- Auth: Auth.js (NextAuth) with Prisma adapter
  - **Email/password first** (Google accounts are not universal in Pakistan; social is additive)
  - OTP: **email OTP** for verification (and optional step-up) — cheap and predictable
  - **SMS OTP only when revenue/users justify it** — needs a local telco/aggregator (e.g. Jazz/Zong routes); do not pay for SMS until there is clear demand
  - Social providers: Google first, add more only when needed
- Content (guides, early copy): **Markdown/MDX in-repo** rendered in-app (e.g. `next-mdx-remote` or equivalent). Optional **simple admin UI** in the app for products, orders, and forum moderation (same deploy as the site).
- CMS upgrade path (when editorial load demands it): **Payload** (self-hosted, Postgres) or **Sanity** (managed). Treat this as a deliberate upgrade, not week-one complexity—Payload is powerful but is effectively a second app to host and operate.
- Background jobs/events: Upstash Redis + QStash (or simple cron at first)
- File/media storage: Cloudinary (fast setup) or S3-compatible bucket
- Transactional email: Resend
- Deployment: Vercel for app, managed PostgreSQL (Neon/Supabase/Railway/Render)
- Observability: Sentry (errors) + PostHog (product analytics, optional phase 2)

## 3) Repo Strategy

Use a single repo now:

- `app/` -> user-facing Next.js app
- `lib/` -> shared server/client utilities
- `prisma/` -> schema + migrations + seed
- `content/guides/` → markdown/MDX source for guides (until/unless a CMS replaces or syncs from it)
- `docs/` -> architecture, product plans, voice rules, forum specs

Add strict boundaries as complexity grows:

- Keep domain modules in `lib/domain/*` (guides, forum, shop, auth, checkout).
- Keep API handlers thin; business logic in domain services.
- Keep UI components separate from data logic.

When to split repos later:

- Only split if you need separate deployment cycles or different teams.
- Until then, single repo is faster and safer.

## 4) Architecture Principles

- PostgreSQL is source of truth for products, users, orders, forum.
- Guides start as **git-versioned content** (MDX + frontmatter); later, a CMS can own editorial workflow if needed.
- Shop catalog can stay in the app DB with admin tooling; marketing copy can stay in MDX or move to CMS when you adopt one.
- Auth and permissions are centralized (RBAC + moderation roles).
- Feature flags for risky launches (forum posting, checkout flow pieces).
- Every major workflow is auditable (admin actions, moderation actions, order status changes).

## 5) Delivery Phases

## Phase 0 - Foundation (1-2 weeks)

**Run in parallel from day one:** database + auth **and** a minimal PWA/offline story for guides (see below)—offline “saved guides” is core to the brand promise, not a late polish item.

- Set up PostgreSQL + Prisma baseline schema.
- Implement Auth.js with:
  - credentials signup/login (**primary path**)
  - email verification OTP
  - password reset
  - Google login (secondary convenience)
- Add role model: `user`, `moderator`, `admin`.
- Add core env structure and secret management pattern.
- Add error + request logging.
- **PWA / offline guides (v1, scoped):**
  - service worker + web app manifest
  - user explicitly **“Save offline”** for a guide → precache that guide’s HTML/static assets (or a static export slice); avoid over-engineering full-site offline
  - goal: a few hours of focused work to prove the loop, then iterate

Exit criteria:

- User can sign up, verify email, login via password or Google.
- Admin account can be designated safely.
- At least one guide can be opened offline after an explicit save (happy path).

## Phase 1 - Markdown Guides + Content Pipeline (1-2 weeks)

- Store guides as **MDX/markdown in-repo** under `content/guides/` (or similar) with frontmatter: slug, title, subtitle, tag(s), excerpt, readTime, dates, sections, SEO fields.
- Render with **next-mdx-remote** (or equivalent) in `app/guides/*`; replace hardcoded stub data with filesystem/Git-based source.
- Optional: minimal **admin-only** routes later for products/orders; guide editing can stay PR-based until CMS.
- **When to add Payload/Sanity:** non-dev editors need self-serve publishing, high cadence, scheduled posts, or structured blocks outgrow MDX—then integrate CMS and migrate content.

Exit criteria:

- New guide can ship via **merge to main** (or agreed content branch) without touching JSX stubs.
- Guides list and detail pages read from the markdown pipeline + shared metadata types.

## Phase 1b - CMS (Optional, When Needed)

- Integrate Payload or Sanity; map collections to existing guide frontmatter shape.
- Migrate or sync MDX → CMS when editorial workflow demands it.

Exit criteria:

- Guides can be published/updated by editors without a deploy, if that is the trigger for this phase.

## Phase 2 - Shop + Checkout (2-3 weeks)

- Product data model:
  - kits, gear items, categories, capability specs
  - pricing, stock state, publish state
- Cart:
  - guest cart in cookie/local storage
  - authenticated cart persisted server-side
- Checkout v1:
  - customer details + address
  - payment method: bank transfer or COD
  - order creation with status workflow
- Admin order board:
  - pending payment proof
  - confirmed
  - packed
  - dispatched
  - delivered/cancelled

Exit criteria:

- Real order can be placed and tracked internally end-to-end.

## Phase 3 - Forum MVP (2-3 weeks)

**Moderation-first.** A preparedness forum in Pakistan will draw political takes, conspiracy content, and bad actors. **Unsafe or ignored early moderation kills the exact audience you want.** Growth features (reputation, fancy discovery) come after the safety loop is trustworthy.

- Private forum launch with auth required.
- Core thread + reply experience.
- **v1 moderation and abuse controls (non-negotiable):**
  - report queue with resolver workflow
  - full **audit log** of moderator actions
  - **profanity / basic keyword filter** (tunable list, Urdu/English as you learn)
  - **link limits and throttling for new accounts** (expand caps as trust builds)
  - rate limits on post/reply/report
- Notifications for replies/mentions.

Exit criteria:

- Users can create threads/replies; moderators can safely run the space.
- Reports are actionable; every moderation action is attributable and auditable.

## Phase 4 - Hardening + Growth

- Payment processor integrations (JazzCash/EasyPaisa via aggregator/partner APIs).
- Deeper PWA/offline (broader precache policies, update strategies, UX polish) if Phase 0 scope was intentionally minimal.
- Performance, SEO, analytics, content ops scaling.

## 6) Full Forum Specs (MVP + Expandable)

## 6.1 Goals

- Trustworthy private space for Pakistani preparedness discussion.
- Practical, local, signal-heavy discussions over noise.
- Strong moderation from day one.

## 6.2 User Roles

- Guest: can view limited public teaser pages only.
- Member: can read/post/reply/react/report.
- Moderator: can edit tags, lock/hide threads, remove replies, warn users.
- Admin: full controls, role management, moderation logs.

## 6.3 Core Entities

- Category
  - name, slug, description, sortOrder, visibility
- Thread
  - id, authorId, categoryId, title, body, tags[]
  - isPinned, isLocked, isHidden
  - createdAt, updatedAt, lastActivityAt
  - replyCount, viewCount
- Reply
  - id, threadId, authorId, body
  - parentReplyId (for 1-level nesting optional)
  - isHidden, createdAt, updatedAt
- Reaction
  - userId, targetType(thread/reply), targetId, emoji/type
- Report
  - reporterId, targetType, targetId, reason, notes, status
- ModerationAction
  - actorId, actionType, targetType, targetId, reason, metadata, createdAt
- Notification
  - userId, type, payload, readAt

## 6.4 Thread Features (MVP)

- Create thread with title + body + category + tags.
- Edit/delete own thread within a grace window (for example 10 minutes).
- Pin/lock by moderators.
- Sort options:
  - latest activity (default)
  - newest
  - most replies (phase 2)
- Simple search by title/body/tags.
- Filter by category/tag.

## 6.5 Reply Features (MVP)

- Rich text-lite replies (basic formatting only).
- Edit own reply within grace window.
- Soft delete (content removed, stub marker retained for audit).
- Mention support (`@username`) phase 1.5.

## 6.6 Moderation Specs

- Expect **political, inflammatory, and conspiracy-adjacent** threads; design workflows for fast takedown, locking, and explanation to members where appropriate.
- Report flow:
  - user reports thread/reply
  - goes to moderation queue
  - moderator resolves with action + note
- Actions:
  - hide/unhide content
  - lock/unlock thread
  - warning to user
  - temporary mute (phase 2)
  - ban (admin only)
- Full moderation log visible to admins (who did what, when, why).
- Auto protections (**ship in v1**):
  - rate limits on posting/replying/reporting
  - profanity / keyword filter (iterate on wordlists)
  - **strict link limits for new/low-trust accounts** (relax with age or positive history)
  - repeated link throttling and duplicate-post detection (simple heuristics first)

## 6.7 Privacy and Safety

- Private forum content is visible only to authenticated members.
- Minimize personally identifiable data in public profile by default.
- Never expose email/phone in thread UI.
- Store IP/user-agent for abuse mitigation with retention policy.

## 6.8 Notifications

- In-app notifications for:
  - replies to your thread
  - mentions
  - moderation actions on your content
- Email digest optional in phase 2.

## 6.9 Forum API Surface (suggested)

- `GET /api/forum/categories`
- `GET /api/forum/threads`
- `POST /api/forum/threads`
- `GET /api/forum/threads/:id`
- `POST /api/forum/threads/:id/replies`
- `POST /api/forum/reports`
- `POST /api/forum/moderation/actions` (mod/admin only)

## 7) Content System Scope (Phased)

**Now (Phase 1):**

- Guides: MDX/markdown + frontmatter in `content/guides/`
- Shared types/helpers to list guides, resolve by slug, compute read times if needed
- Homepage/section copy can stay in components or small MDX snippets until pain appears

**When CMS is adopted (Phase 1b):**

- Guides collection mirroring frontmatter + rich blocks
- Optional: static pages, SEO bundles, non-dev editorial workflow
- draft → review → published, scheduled publish, revision history

## 8) Auth Specs (Detailed)

- Signup:
  - name, email, password
  - send email OTP/verification link
- Login:
  - credentials login
  - social login (Google)
- Security:
  - hashed passwords (Argon2/bcrypt)
  - email verification required for forum posting + checkout completion
  - optional step-up OTP for sensitive actions (phase 2); prefer **email** until SMS is justified
- Account:
  - profile editing
  - password reset
  - session management

## 9) Checkout Specs (v1 Manual Payments)

- Payment methods:
  - bank transfer
  - cash on delivery
- For bank transfer:
  - show transfer instructions + order reference
  - upload payment proof (image/pdf) optional phase 1.5
  - order remains `awaiting_verification` until admin confirms
- COD:
  - order directly goes to fulfillment queue with confirmation step
- Fraud/risk:
  - phone verification and order confirmation for high-value COD orders

## 10) Brand Voice Guardrail File

Create and maintain: `docs/VOICE_GUARDRAILS.md`

Must include:

- Tone examples (good vs bad)
- Pakistan context references to use naturally
- Words/phrases to avoid (tacticool style)
- Channel-specific style (guides vs product cards vs forum announcements)
- Editorial checklist before publish

## 11) Suggested Immediate Next Steps

1. Confirm this doc reflects your latest stack/content choices (decision log below).
2. Phase 0: PostgreSQL + Prisma + Auth.js **plus** minimal PWA “save guide offline” loop (week 1–2 in parallel, not deferred).
3. Phase 1: MDX/markdown guides pipeline; retire hardcoded guide stubs.
4. Phase 2: checkout v1 (bank transfer + COD + admin order board).
5. Phase 3: forum MVP with **full v1 moderation toolkit** before growth features.
6. Phase 1b: CMS only when editorial bottleneck is real.

## 12) Decision Log (Update As We Go)

- 2026-03-24: Public repo approved.
- 2026-03-24: Single-repo approach approved.
- 2026-03-24: Manual bank transfer + COD approved for checkout v1.
- 2026-03-24: Auth requires both credentials+OTP and social login.
- 2026-03-25: **Guides = markdown/MDX in-repo first**; CMS (Payload/Sanity) is an upgrade when editorial load demands it—not week-one default (avoids hosting/operating a second heavy app too early).
- 2026-03-25: **Postgres from day one** locked in (forum FTS, no SQLite migration pain); Neon/Supabase noted for Vercel.
- 2026-03-25: **Auth:** email/password primary; email OTP first; **SMS OTP deferred** until justified + local provider story exists.
- 2026-03-25: **PWA/offline for saved guides** pulled into Phase 0 (week 1–2 alongside DB), not left only to Phase 4.
- 2026-03-25: **Forum:** moderation-first v1—report queue, audit log, keyword filter, new-user link limits, rate limits—before growth polish.
- 2026-03-25: **Payments:** manual flows first aligns with real PK e‑commerce; automate JazzCash/EasyPaisa after manual path is proven (API/sandbox pain acknowledged).
