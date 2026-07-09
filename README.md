# Jall Technologies — Platform

Corporate platform for Jall Technologies: public marketing site, an admin CMS, and a client
portal — built on Next.js, TypeScript, Tailwind CSS, and Prisma/PostgreSQL, with Auth.js
(NextAuth v5) handling login for both staff and clients.

> **Note on how this was built:** this project was written by hand in an offline sandbox
> with no package registry access, so `npm install` / `npm run build` could not be run to
> verify it here. Every file was checked manually for import correctness, type-import
> mistakes, and dependency completeness — but please run `npm run typecheck` and
> `npm run build` as your first step, and treat the CI workflow as the real verification.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**, configured from your brand tokens
- **Prisma + PostgreSQL**
- **Auth.js (NextAuth v5)** — credentials login, JWT sessions, role-based access (`ADMIN` / `CLIENT`)
- **React Hook Form + Zod** — the public contact form
- **Vitest + React Testing Library** — unit tests
- **GitHub Actions** — CI (lint, typecheck, test, build) on every push/PR to `main`

## What's actually in here now

| Area | Status |
|---|---|
| Marketing site (8 pages) | Built |
| Contact form → database, with honeypot + rate limiting | Built |
| Privacy Policy / Terms (POPIA-aware) | Built |
| **Admin CMS** at `/admin` | Built — messages, blog, case studies, jobs, projects, clients |
| **Client portal** at `/portal` | Built — clients see their own projects, progress %, and update feed |
| Auth (login, sessions, route protection) | Built — `middleware.ts` guards `/admin/*` and `/portal/*` |
| Custom 404 / error / global-error pages | Built |
| Analytics | Built — Vercel Analytics + Speed Insights (auto-active once deployed to Vercel) |
| CI (lint/typecheck/test/build) | Built — `.github/workflows/ci.yml` |
| Unit tests | Built — schema validation, data integrity, one component test |
| **Real logo** | Built — extracted and cleaned from your actual brand guideline sheets (not a redraw). Full favicon/app-icon/manifest set generated from it. |
| **Photography** | **Not real photography** — see note below |
| End-to-end tests, email notifications on new messages | **Not done** |

### About the logo

The header, footer, admin sidebar, portal header, and every favicon/app-icon size were
regenerated from the actual brand sheets you uploaded, not hand-approximated:

- `public/brand/icon-color.png` — the navy/gold mark, transparent background, for light
  surfaces (Header, login screen)
- `public/brand/icon-dark.png` — the reversed mark on its navy tile, for dark surfaces
  (Footer, admin sidebar, portal header) — the tile color was color-sampled and matches
  `--jt-midnight` (#0B2346) closely enough to blend with zero visible seam
- `public/brand/logo-horizontal.png` — the full icon+wordmark lockup, used on the About page
- `public/favicon.ico`, `icon-16/32/192/512.png`, `apple-touch-icon.png`,
  `icon-maskable-*.png`, `site.webmanifest` — a complete real favicon/PWA icon set

One honest limitation: these are raster crops from your poster images (1536\u00d71024
source), not the original vector file. The small sizes (favicon, header logo) are crisp;
the 512px app icon is upscaled from a smaller source and is slightly soft under close
inspection. If you have the original Illustrator/Figma/AI file, swapping in a true vector
export would sharpen the large sizes \u2014 everything is wired to expect PNGs at these exact
paths, so it's a drop-in replacement.

### About "photography"

There is no real photography in this build, and I want to be direct about why: I don't
have your photos, and pulling images off the web into a client's production codebase
without checking licensing isn't something I'll do on your behalf \u2014 that's a real legal
exposure for a business, not a shortcut worth taking.

What's there instead is `src/components/AbstractSkyline.tsx` \u2014 an original vector
illustration (Table Mountain + city silhouette) built from scratch in your brand colors,
used as a background accent on the homepage hero. It's genuinely license-free since it's
original vector artwork, not a photo or a scrape. It's a placeholder for visual richness,
not a stand-in for real photography \u2014 replace it (or supplement it) with licensed stock
photography or a commissioned shoot when you're ready.


## 1. Install

```bash
npm install
```

## 2. Set up the database

```bash
cp .env.example .env
# edit .env: set DATABASE_URL and AUTH_SECRET
#   generate AUTH_SECRET with: npx auth secret   (or: openssl rand -base64 32)

npx prisma migrate dev --name init
npx prisma db seed
```

The seed creates:
- **Admin login:** `admin@jalltechnologies.com` / `ChangeMe123!`
- **Demo client login:** `client@example.com` / `ClientDemo123!`
- One demo project with two updates, so `/portal` isn't empty on first run
- One sample job posting and one sample blog post

**Change both seeded passwords before deploying anywhere real** — they're intentionally
generic placeholders, not secrets.

## 3. Run it

```bash
npm run dev
```

- Public site: `http://localhost:3000`
- Admin CMS: `http://localhost:3000/admin/login`
- Client portal: same login screen, redirects `CLIENT`-role users to `/portal`

## 4. Run the tests

```bash
npm run test        # run once
npm run test:watch  # watch mode
npm run typecheck   # tsc --noEmit
npm run lint         # next lint
```

## 5. First things to check once it's running

- [ ] `npm run build` completes with no type errors
- [ ] Log into `/admin/login` with the seeded admin account, then immediately change the password (there's no "change password" UI yet — do it via `npx prisma studio` by generating a new bcrypt hash, or add that screen next)
- [ ] Log into the same screen with the seeded client account and confirm `/portal` shows the demo project
- [ ] Create a blog post via `/admin/blog/new` and confirm it appears on `/blog`
- [ ] Submit the public contact form and confirm it shows up in `/admin/messages`

## Project structure

```
src/
  app/
    (marketing)/          Public site — Header/Footer layout, all 8 marketing pages
    admin/
      login/               Public login screen (outside the protected group)
      (protected)/          Everything requiring an ADMIN session
        page.tsx            Dashboard
        messages/           Contact submissions
        blog/, case-studies/, jobs/   Content CRUD (list + /new form)
        projects/           Client project management + update feed
        clients/            Create client portal logins
    portal/                 Client-facing dashboard (requires any logged-in session)
    api/contact/route.ts    Contact form endpoint (honeypot + rate limiting)
    api/auth/[...nextauth]/route.ts   Auth.js handler
    not-found.tsx, error.tsx, global-error.tsx
  components/
    admin/                 Small client components (toggles, delete buttons, status selects)
  lib/
    actions/admin.ts       All admin server actions (create/update/delete), each re-checks
                            the session server-side as defense in depth
    data/                  Services and products — edit these, every page updates
    schemas.ts             Zod schema shared by the contact form and its API route
    prisma.ts              Prisma client singleton
  auth.ts                  Auth.js config (credentials provider, JWT callbacks)
  middleware.ts             Route protection for /admin/* and /portal/*
  types/next-auth.d.ts      Session/JWT type augmentation (adds id + role)
prisma/
  schema.prisma             User, Project, ProjectUpdate, ContactSubmission, BlogPost,
                             CaseStudy, JobPosting, JobApplication, NewsletterSubscriber
  seed.ts                   Admin + demo client + demo project + sample content
.github/workflows/ci.yml    Lint → typecheck → test → migrate → build, on every push/PR
```

## Deploying

**Vercel** (recommended):
1. Push to GitHub — CI runs automatically.
2. Import the repo in Vercel.
3. Add `DATABASE_URL` and `AUTH_SECRET` as environment variables.
4. Vercel runs `npm run build`; `postinstall` runs `prisma generate` for you.
5. Run `npx prisma migrate deploy` against your production database before first traffic
   (Vercel doesn't do this automatically).

## Not included yet (scoped out of this pass)

- **Admin "change password" / "forgot password" flow** — right now, resetting a password
  means generating a new bcrypt hash and updating it via Prisma Studio.
- **Email notifications** on new contact submissions or project updates — marked with a
  comment in `src/app/api/contact/route.ts` for where to add it.
- **Real logo asset** — done (see above). **Real photography** — still not done, and
  won't be faked with unlicensed web images.
- **End-to-end tests** (Playwright) — only unit tests exist today.
- **File uploads** (resumes on job applications, project attachments in the portal).

Happy to build any of these next — just say which one.

# jall-tech
# jall-tech
