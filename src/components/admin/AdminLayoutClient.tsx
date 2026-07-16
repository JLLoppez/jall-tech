'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import MobileNav from '@/components/admin/MobileNav';
import {
  LayoutDashboard,
  Mail,
  Newspaper,
  Briefcase,
  Users,
  FolderKanban,
  LogOut
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/case-studies', label: 'Case Studies', icon: Briefcase },
  { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/clients', label: 'Clients', icon: Users }
];

export default function AdminLayoutClient({
  children,
  userEmail
}: {
  children: ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-light flex">
      <aside className="w-64 bg-midnight text-white shrink-0 hidden md:flex md:flex-col">
        <Link href="/admin" className="flex items-center gap-3 px-6 h-[76px] border-b border-white/10 transition-opacity duration-200 hover:opacity-90">
          <Logo className="h-9 w-9" variant="dark" />
          <span className="font-heading font-bold leading-none text-sm">
            JALL <span className="block text-[9px] tracking-[0.2em] text-gold">ADMIN</span>
          </span>
        </Link>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:translate-x-0.5'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-gold animate-scale-in" />
                )}
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 px-3 mb-2 truncate">{userEmail}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200 w-full"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden bg-midnight text-white flex items-center justify-between px-4 h-16 sticky top-0 z-40">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo className="h-8 w-8" variant="dark" />
            <span className="font-heading font-bold text-sm">Admin</span>
          </Link>
          <MobileNav navItems={navItems} />
        </header>
        <main className="p-6 md:p-10 max-w-6xl mx-auto animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
