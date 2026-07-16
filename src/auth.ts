import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/schemas';
import { authConfig } from '@/auth.config';

// A pre-computed bcrypt hash of a value nobody will ever type, used only so
// that a login with an unknown email still pays the cost of a bcrypt compare.
// Without this, "unknown email" responds faster than "wrong password", which
// lets an attacker enumerate valid admin/client emails by timing the API.
const DUMMY_HASH = '$2a$12$CwTycUXWue0Thq9StjUM0uJ8fJvW/oq9AVpEHK.rwvEV1CtDcIu5W';

// This file (unlike auth.config.ts) pulls in Prisma and bcrypt, so it must
// only ever be imported from Node.js-runtime code — API routes, Server
// Components, and Server Actions. Middleware imports auth.config.ts instead;
// see the comment there for why.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
  secret: process.env.AUTH_SECRET
});
