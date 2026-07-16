import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import PortalHeader from '@/components/portal/PortalHeader';

export default async function PortalLayout({ children }: { children: ReactNode }) {
  // Defense in depth: middleware already requires a logged-in session for
  // /portal/:path*, but it doesn't distinguish CLIENT from ADMIN — admins
  // don't have projects of their own, so send them back to the admin panel
  // where they manage client projects rather than viewing an empty portal.
  const session = await auth();
  if (!session) {
    redirect('/admin/login?callbackUrl=/portal');
  }
  if (session.user.role !== 'CLIENT') {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-light flex flex-col">
      <PortalHeader userName={session.user.name ?? session.user.email ?? ''} />
      <main className="flex-1 container py-10 max-w-4xl">{children}</main>
    </div>
  );
}
