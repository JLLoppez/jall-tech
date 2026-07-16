'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Logo from '@/components/Logo';

export default function PortalHeader({ userName }: { userName: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="container flex items-center justify-between h-[76px]">
        <Link href="/portal" className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
          <Logo className="h-10 w-10" />
          <span className="font-heading font-bold text-midnight leading-none">
            JALL
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold-600">
              CLIENT PORTAL
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-gray-medium">{userName}</span>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn-ghost text-sm"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
