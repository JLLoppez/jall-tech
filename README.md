# Jall Technologies Platform

Marketing site + admin dashboard + client portal, built on Next.js 16 (App Router), Prisma/PostgreSQL, and Auth.js (next-auth v5).

## Stack

- **Framework:** Next.js 16 (App Router, Server Actions, Turbopack by default)
- **Database:** PostgreSQL via Prisma
- **Auth:** Auth.js / next-auth v5 (Credentials provider, JWT sessions)
- **Email:** Resend
- **Styling:** Tailwind CSS
- **Tests:** Vitest + Testing Library

## Upgrade notes (read this if `npm install` or `npm run build` misbehaves)

- **`next-auth` is pinned to the `beta` dist-tag**, not a specific version number. Auth.js v5 has been in beta for a long time and the exact version string changes frequently — pinning a specific number here would just go stale and silently resolve wrong later, which is exactly what caused a build failure in an earlier version of this project (npm couldn't find the pinned beta, fell back to next-auth v4, and v4's bundle isn't Edge-Runtime-safe). If you want a reproducible build, run `npm install` once, then commit the resulting lockfile — don't hand-edit this pin to a specific version unless you've confirmed it exists on npm.
- **You may need `npm install --legacy-peer-deps`.** next-auth's published `peerDependencies` range hasn't always been updated the same day a new Next.js major ships, so npm may report a peer conflict against Next 16 even though the two work together fine at runtime. If `npm install` fails on a peer dependency error mentioning `next-auth` and `next`, re-run with `--legacy-peer-deps`.
- **`middleware.ts` is now `src/proxy.ts`.** Next.js 16 renamed the file and — more importantly — moved it from the Edge Runtime to the Node.js runtime by default. That's why `proxy.ts` can import the full `@/auth` (Prisma + bcrypt) directly; on Next.js 14/15, that same import would fail to build, which is why earlier versions of this project split auth config into an Edge-safe half and a full half. If you ever downgrade below Next 16, or explicitly set `export const runtime = 'edge'` on this file, you'll need to reintroduce that split — see the git history for `src/auth.config.ts` if so.
- **React is on 19.x**, matching what Next 16's App Router expects internally.

## Getting started

```bash
npm install                 # add --legacy-peer-deps if it complains about next-auth/next
cp .env.example .env        # fill in DATABASE_URL and AUTH_SECRET at minimum
npx prisma migrate dev --name init
npm run prisma:seed         # creates an admin + demo client account
npm run dev
```

Seeded logins (change both before deploying anywhere real):

- Admin: `admin@jalltechnologies.com` / `ChangeMe123!` → `/admin`
- Client: `client@example.com` / `ClientDemo123!` → `/portal`

## Project structure

```
src/app/(marketing)   Public site — home, services, products, blog, careers, etc.
src/app/admin         Admin dashboard (protected by proxy.ts + layout check)
src/app/portal        Client portal — clients view their own projects/updates
src/app/api           Contact form, mobile API, NextAuth handler
src/lib               Prisma client, auth actions, admin actions, email, schemas
src/proxy.ts          Route protection (formerly middleware.ts — see Upgrade notes)
prisma/schema.prisma  Data model
```

## Testing

```bash
npm run test        # run once
npm run test:watch  # watch mode
npm run typecheck
npm run lint
```

## Production checklist

Things that matter before this goes live, roughly in order of how badly they'd hurt if skipped:

1. **Set real secrets.** `AUTH_SECRET` (generate with `openssl rand -base64 32`), `DATABASE_URL` (pooled connection — see below), `RESEND_API_KEY`, `NEXTAUTH_URL` / `NEXT_PUBLIC_APP_URL` set to your real domain.
2. **Change the seeded passwords**, or better, don't run the seed script against production at all — create the first admin account directly in the database instead.
3. **Database connection pooling.** Prisma opens a new connection per serverless invocation. On Vercel/serverless, use a pooled connection string (Neon, Supabase, or PgBouncer) — without it you'll exhaust Postgres's connection limit under real traffic.
4. **Rate limiting is single-instance.** `src/lib/rate-limit.ts` uses in-process memory. Fine for one long-running server; if you deploy multiple instances/serverless functions, swap it for Upstash Redis (the file has a drop-in example in its top comment) or the effective limit silently multiplies by instance count.
5. **File uploads aren't wired up.** The schema has `JobApplication.resumeUrl` and `BlogPost.coverImage` / `CaseStudy.coverImage`, but there's no upload flow yet — those fields exist for when you add one (e.g. via S3/Cloudflare R2 presigned URLs).
6. **Mobile API uses cookie sessions.** `api/mobile/projects` reuses the web session cookie, which only works for a webview-based mobile shell. A native app needs token-based auth instead — see the comment in that file.
7. **Replace the placeholder logo assets** in `public/brand/` with real brand files once available — they're programmatically generated placeholders, not final art.
8. **CSP note:** `next.config.mjs` includes `'unsafe-eval'` in `script-src`, which Next.js's dev mode (fast refresh) needs. Confirm production doesn't need it and drop it — check the browser console for CSP violations after a prod build before removing.
9. **Point DNS/email** so `RESEND_API_KEY`'s sending domain matches `EMAIL_FROM`, or Resend will reject sends.

## What's intentionally not built yet

- Blog post and case study **detail pages** (`/blog/[slug]`, `/case-studies/[slug]`) — listings currently show summaries only, by design, until real long-form content exists to publish.
- Job **application submission** flow — postings display, but there's no apply form wired to `JobApplication` yet.
