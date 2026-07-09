import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  const isLoginPage = nextUrl.pathname === '/admin/login';
  const isAdminRoute = nextUrl.pathname.startsWith('/admin') && !isLoginPage;
  const isPortalRoute = nextUrl.pathname.startsWith('/portal');

  // Already logged in as admin, visiting the login page \u2014 send them to the dashboard.
  if (isLoginPage && isLoggedIn && role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', nextUrl));
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
