import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe half of the NextAuth config.
 *
 * Middleware runs on the Edge Runtime, which cannot run Prisma's binary
 * query engine (or anything else that touches Node.js-only APIs). If
 * middleware imports the full config in `src/auth.ts` — which pulls in
 * `bcryptjs` and, more importantly, `@/lib/prisma` via the Credentials
 * provider's `authorize()` callback — the build fails, or at best silently
 * misbehaves depending on the deploy target.
 *
 * The fix is the standard Auth.js split: this file holds everything
 * middleware actually needs (session/JWT shape, pages, callbacks), and
 * `src/auth.ts` extends it with the Credentials provider that needs
 * database access. Middleware only ever needs to *read* the already-issued
 * JWT from the session cookie — it never runs `authorize()` itself (that
 * only executes during an actual sign-in POST to the NextAuth route, which
 * runs in the normal Node.js runtime, not in middleware).
 */
export const authConfig = {
  pages: { signIn: '/admin/login' },
  trustHost: true,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  providers: [], // Real providers are added in src/auth.ts (Node runtime only).
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
