import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

// Deliberately built from the Edge-safe authConfig (no providers, no
// Prisma/bcrypt) rather than importing `auth` from '@/auth' — see the
// comment in auth.config.ts. This instance can only read/validate the JWT
// session cookie, which is all middleware needs to do.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const publicAdminPaths = ['/admin/login', '/admin/forgot-password', '/admin/reset-password'];
  const isPublicAdminPath = publicAdminPaths.some(
    (p) => nextUrl.pathname === p || nextUrl.pathname.startsWith(`${p}/`)
  );
  const isLoginPage = nextUrl.pathname === '/admin/login';
  const isAdminRoute = nextUrl.pathname.startsWith('/admin') && !isPublicAdminPath;
  const isPortalRoute = nextUrl.pathname.startsWith('/portal');

  // Already logged in — visiting the login page should bounce to the right home.
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(role === 'ADMIN' ? '/admin' : '/portal', nextUrl));
  }

  if (isAdminRoute && (!isLoggedIn || role !== 'ADMIN')) {
    const loginUrl = new URL('/admin/login', nextUrl);
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPortalRoute && !isLoggedIn) {
    const loginUrl = new URL('/admin/login', nextUrl);
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*']
};
