import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Defense in depth: middleware already blocks this route for non-admins,
  // but the layout checks again in case middleware config ever changes.
  // This stays a Server Component specifically so this check runs before
  // any client-side rendering — the interactive sidebar/nav is a separate
  // Client Component that receives only what it needs (the email to show).
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <AdminLayoutClient userEmail={session.user.email ?? ''}>
      {children}
    </AdminLayoutClient>
  );
}
