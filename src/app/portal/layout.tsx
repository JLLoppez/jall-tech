import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import Logo from '@/components/Logo';
import { LogOut } from 'lucide-react';

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect('/admin/login?callbackUrl=/portal');

  return (
    <div className="min-h-screen bg-gray-light">
      <header className="bg-midnight text-white">
        <div className="container flex items-center justify-between h-[76px]">
          <Link href="/portal" className="flex items-center gap-3">
            <Logo className="h-10 w-10" variant="dark" />
            <span className="font-heading font-bold leading-none">
              JALL
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold">
                CLIENT PORTAL
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70 hidden sm:inline">{session.user.name}</span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
}
