import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Renamed from middleware.ts: as of Next.js 16, this file is named
// proxy.ts and runs on the Node.js runtime by default (previously,
// middleware.ts always ran on the Edge Runtime). That's why this can now
// import the full `auth` from '@/auth' directly — the one that pulls in
// Prisma and bcrypt via the Credentials provider's authorize() callback.
// On Next.js <16, that same import would fail to build (Prisma's binary
// query engine can't run on Edge). If you ever downgrade Next.js, or
// explicitly opt this file into the edge runtime, reintroduce the
// Edge-safe/full-config split this repo used previously.
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
