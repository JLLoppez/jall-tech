import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import type { Role } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/schemas';

// A pre-computed bcrypt hash of a value nobody will ever type, used only so
// that a login with an unknown email still pays the cost of a bcrypt compare.
// Without this, "unknown email" responds faster than "wrong password", which
// lets an attacker enumerate valid admin/client emails by timing the API.
const DUMMY_HASH = '$2a$12$CwTycUXWue0Thq9StjUM0uJ8fJvW/oq9AVpEHK.rwvEV1CtDcIu5W';

// NOTE: prior to Next.js 16, this file could not be imported from
// middleware.ts (Edge Runtime, no Prisma support), so the config was split
// into an Edge-safe auth.config.ts plus this full version. Next.js 16
// renamed middleware.ts to proxy.ts and moved it to the Node.js runtime by
// default, so that split is no longer necessary — proxy.ts now imports this
// file directly. See src/proxy.ts.
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 }, // 8 hour sessions
  pages: { signIn: '/admin/login' },
  trustHost: true,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = parsed.data.email.toLowerCase().trim();
        const user = await prisma.user.findUnique({ where: { email } });

        const isValid = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !isValid) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      // `src/types/next-auth.d.ts` declares `id`/`role` on the JWT
      // interface via `declare module 'next-auth/jwt'`, but that
      // augmentation doesn't merge cleanly against every next-auth beta's
      // own base JWT type (a known pain point — Auth.js v5's types have
      // shifted structure repeatedly during its long beta, and at least
      // one shape includes a catch-all `[key: string]: unknown` index
      // signature that custom fields fall through to when the merge
      // fails). When that happens, `token.id`/`token.role` type as
      // `unknown`: assigning INTO them (see the jwt callback above) still
      // type-checks fine, because anything is assignable to `unknown`, but
      // reading them back OUT and assigning into the strictly-typed
      // `session.user.id: string` does not — even though the runtime value
      // is correct, set two lines up. Cast explicitly here so this doesn't
      // depend on the augmentation succeeding.
      const typedToken = token as typeof token & { id: string; role: Role };
      if (session.user) {
        session.user.id = typedToken.id;
        session.user.role = typedToken.role;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET
});
