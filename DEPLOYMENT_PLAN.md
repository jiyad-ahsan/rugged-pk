# Deployment Plan: rugged.pk

## Context
The rugged-pk project is a Next.js 14 app with a complete frontend (5 pages, design system, dark mode) but no backend yet. You own the domain rugged.pk with DNS controlled at the registrar. cPanel hosting was purchased but doesn't support Next.js natively — deploying to Vercel (free tier) instead.

## Lock-in Mitigation Strategy
Vercel is the deployment layer only — all services stay external and portable:
- **Database:** Supabase (not Vercel Postgres) — works with any host
- **Auth:** Auth.js — framework-level, runs anywhere Next.js runs
- **Images:** Cloudinary (not Vercel Blob) — host-independent
- **Email:** Resend — host-independent
- If you ever want to leave Vercel, you only change the deployment target. Code, DB, and auth stay the same.
- Current site is pure frontend with zero lock-in.

**Alternative hosts if you don't want Vercel at all:**
- VPS (DigitalOcean/Hetzner, ~$6/mo) + Coolify (free, self-hosted PaaS) = Vercel-like DX, zero lock-in
- Plain VPS with nginx + PM2 = full manual control
- Railway = low lock-in PaaS with free tier

---

## Step 1: Initialize Git Repository
- `git init` in the project root
- Create `.gitignore` (Node.js + Next.js standard)
- Initial commit of all project files

## Step 2: Push to GitHub
- Create a GitHub repo (public, per BUILD_PLAN.md: "Public repo is fine")
- Push the initial commit
- Requires: `gh` CLI or manual GitHub repo creation

## Step 3: Deploy to Vercel
- Sign up / log in to Vercel (free Hobby plan)
- Import the GitHub repo — Vercel auto-detects Next.js settings
- First deploy happens automatically
- Site goes live at `rugged-pk.vercel.app` (or similar)

## Step 4: Connect Custom Domain
- In Vercel dashboard: Settings → Domains → Add `rugged.pk`
- Vercel will provide DNS records (typically an A record pointing to `76.76.21.21` and/or a CNAME)
- At your domain registrar: update DNS records to point to Vercel
- Vercel handles SSL certificate automatically
- Also add `www.rugged.pk` with redirect to apex domain

## Step 5: Pre-deployment Prep (things to fix in code)
- Create `.gitignore` file
- Create `public/` directory with favicon/basic assets (optional but recommended)
- Verify build works locally: `npm install && npm run build`
- No `.env` needed yet (no backend features)

## Step 6: Post-deployment
- Verify site loads at rugged.pk
- Test all pages and dark mode
- Check mobile responsiveness on live URL

## About the cPanel Hosting
- **Keep it** if it includes email hosting (you may want info@rugged.pk later)
- **Cancel it** if you don't need email — Vercel + domain registrar DNS is sufficient
- Do NOT change nameservers to cPanel — keep DNS at registrar so you can point to Vercel

## Verification Checklist
1. `npm run build` locally — should complete without errors
2. After Vercel deploy: visit the `.vercel.app` URL
3. After DNS propagation (can take up to 48 hours): visit `rugged.pk` and `www.rugged.pk`
4. Check HTTPS certificate is active
5. Test all 5 pages + dark mode toggle on live site
