# RUGGED.PK Forum PRD

Last updated: 2026-03-25
Status: draft for implementation
Owner: product + engineering + moderation

## 1) Product Summary

The forum is Rugged's retention engine: a private, practical, Pakistan-first preparedness community. It must prioritize trust, signal quality, and moderation from day one.

**Moderation-first:** growth features (reputation, discovery tricks) ship only after reporting, audit logs, rate limits, and new-account protections are trustworthy. A preparedness forum in Pakistan will attract political debate, conspiracy content, and coordinated trouble—inaction or weak tooling early will drive away the audience we want.

## 2) Goals and Non-Goals

## Goals

- Build a high-signal private discussion space for preparedness.
- Help members make practical household plans.
- Enable healthy peer learning with strong moderation.
- Integrate naturally with guides and shop content.

## Non-Goals (MVP)

- No public anonymous posting.
- No complex gamification.
- No live chat feature at launch.
- No advanced reputation system at launch.

## 3) User Types and Permissions

- Guest
  - Can view teaser/landing only.
  - Cannot view full threads or member profiles.
- Member
  - Can read threads, post, reply, react, report.
  - Can edit own content within grace period.
- Moderator
  - Can pin/lock/hide threads.
  - Can hide replies, resolve reports, issue warnings.
- Admin
  - Full moderator powers + role management + settings + audit access.

## 4) User Stories (MVP)

- As a member, I can create a thread in a category with tags.
- As a member, I can reply and get notified when someone replies to me.
- As a member, I can report abusive or unsafe content.
- As a moderator, I can resolve reports and take action quickly.
- As an admin, I can review moderation history for accountability.

## 5) Functional Requirements

## Threading

- Create thread: title, body, category, up to N tags.
- Edit/delete own thread in a short grace window (recommended: 10 min).
- Moderator controls: pin, unpin, lock, unlock, hide, unhide.
- Listing sorts:
  - latest activity (default)
  - newest
  - most replies (phase 2)
- Filtering by category and tag.
- Search by title/body/tag.

## Replies

- Add reply to thread.
- Basic formatting (bold, italic, lists, links), no heavy rich editor at launch.
- Edit/delete own reply in grace window.
- Soft delete with moderation-safe audit trail.

## Reporting and Moderation

- Report thread/reply with reason + optional note.
- Moderation queue with statuses:
  - open
  - in_review
  - resolved
  - dismissed
- Actions:
  - hide/unhide content
  - lock/unlock thread
  - warning
  - temporary mute (phase 2)
  - ban (admin)
- Each action creates immutable moderation log entry (actor, target, reason, timestamp, reversible where safe).
- **MVP bar:** moderators can clear the queue, document why, and prove what happened in an audit trail. No launch without this.

## Notifications

- In-app notifications for:
  - replies on your thread
  - replies to your reply (if nesting enabled)
  - mentions
  - moderation actions affecting your content
- Optional email digest in later phase.

## 6) Safety and Abuse Controls

- Rate limits:
  - thread creation per hour/day
  - replies per minute/hour
  - reports per day
- Spam checks:
  - repeated links threshold
  - blocked keyword / **profanity filter** (tunable list; expand Urdu/English terms as patterns emerge)
  - **stricter link limits for new or low-trust accounts** (raise caps with account age or clean history)
  - duplicate text throttling
- Sensitive data guard:
  - discourage posting phone/address publicly
  - moderator workflow for doxxing removal
- Store IP and user agent for abuse investigation with retention policy.

## 7) Privacy Requirements

- Forum content visible to authenticated members only.
- Public profile is minimal by default.
- Never show email/phone in UI.
- Clear data retention and deletion policy for account/content requests.

## 8) Suggested Information Architecture

Starter categories:

- Getting Started
- Family Plans
- Food and Water
- Medical Readiness
- Communication and Power
- Karachi Local Intel
- Gear and Reviews

Tag examples:

- planning
- comms
- water
- medical
- family
- karachi
- rotation

## 9) Data Model (Prisma-Oriented)

Core entities:

- `ForumCategory`
- `ForumThread`
- `ForumReply`
- `ForumReaction`
- `ForumReport`
- `ModerationAction`
- `ForumNotification`
- `User`, `UserRole` (shared auth domain)

Key fields:

- Thread: `title`, `body`, `authorId`, `categoryId`, `tags`, `isPinned`, `isLocked`, `isHidden`, `replyCount`, `lastActivityAt`
- Reply: `threadId`, `authorId`, `body`, `parentReplyId`, `isHidden`
- Report: `targetType`, `targetId`, `reason`, `notes`, `status`, `reporterId`, `resolverId`
- ModerationAction: `actorId`, `actionType`, `targetType`, `targetId`, `reason`, `metadata`

## 10) API Plan (Next.js Route Handlers)

- `GET /api/forum/categories`
- `GET /api/forum/threads`
- `POST /api/forum/threads`
- `GET /api/forum/threads/:id`
- `PATCH /api/forum/threads/:id`
- `POST /api/forum/threads/:id/replies`
- `PATCH /api/forum/replies/:id`
- `POST /api/forum/reports`
- `GET /api/forum/mod/reports`
- `POST /api/forum/mod/actions`
- `GET /api/forum/notifications`
- `POST /api/forum/notifications/read`

## 11) UX Notes

- Keep thread composer fast and low-friction.
- Show clear lock/hidden states and reasons.
- Keep moderation actions explicit and reversible where safe.
- Default sort by latest activity to keep conversations alive.
- Mobile readability is mandatory, not optional.

## 12) Analytics and Success Metrics

Primary:

- Weekly active members
- Threads created per week
- Reply rate per thread
- 7-day returning member rate

Safety:

- Report resolution time
- % reports resolved < 24h
- Repeat offender rate

Quality:

- Threads with accepted practical answer (phase 2)
- Member satisfaction pulse in-app (phase 2)

## 13) Rollout Plan

## Stage A - Internal Alpha

- Admin + selected testers only.
- Validate moderation workflows and abuse controls.

## Stage B - Invite-Only Beta

- Controlled member onboarding.
- Weekly moderation review.

## Stage C - Private General Availability

- Open membership with enforced safety policies.
- Add scaled moderation tools based on queue volume.

## 14) Open Decisions

- Whether reply nesting should be enabled at MVP or phase 2.
- Exact grace window duration for user edits/deletes.
- Notification delivery mix (in-app only vs in-app + email).
- Whether category-specific moderators are needed in phase 1.

## 15) Engineering Acceptance Criteria (MVP)

- Authenticated member can create thread and reply successfully.
- Category/tag filters and search are functional.
- Reports flow into moderator queue with actionable controls.
- Moderator actions are logged and auditable.
- Private visibility enforced across all forum routes.
- Rate limits block obvious spam behaviors.
