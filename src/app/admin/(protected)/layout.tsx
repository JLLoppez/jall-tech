import type { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/auth';
import Logo from '@/components/Logo';
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

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Defense in depth: middleware already blocks this route for non-admins,
  // but the layout checks again in case middleware config ever changes.
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-light flex">
      <aside className="w-64 bg-midnight text-white shrink-0 hidden md:flex md:flex-col">
        <Link href="/admin" className="flex items-center gap-3 px-6 h-[76px] border-b border-white/10">
          <Logo className="h-9 w-9" variant="dark" />
          <span className="font-heading font-bold leading-none text-sm">
            JALL <span className="block text-[9px] tracking-[0.2em] text-gold">ADMIN</span>
          </span>
        </Link>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/50 px-3 mb-2 truncate">{session.user.email}</p>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors w-full"
            >
              <LogOut size={17} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="md:hidden bg-midnight text-white flex items-center justify-between px-4 h-16">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo className="h-8 w-8" variant="dark" />
            <span className="font-heading font-bold text-sm">Admin</span>
          </Link>
        </header>
        <main className="p-6 md:p-10 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
