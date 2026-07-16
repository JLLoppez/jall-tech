# Jall Technologies Platform

Marketing site + admin dashboard + client portal, built on Next.js 14 (App Router), Prisma/PostgreSQL, and NextAuth v5.

## Stack

- **Framework:** Next.js 14 (App Router, Server Actions)
- **Database:** PostgreSQL via Prisma
- **Auth:** NextAuth v5 (Credentials provider, JWT sessions)
- **Email:** Resend
- **Styling:** Tailwind CSS
- **Tests:** Vitest + Testing Library

## Getting started

```bash
npm install
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
src/app/admin         Admin dashboard (protected by middleware + layout check)
src/app/portal        Client portal — clients view their own projects/updates
src/app/api           Contact form, mobile API, NextAuth handler
src/lib               Prisma client, auth actions, admin actions, email, schemas
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
