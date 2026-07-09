'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/nav';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="container flex items-center justify-between h-[76px]">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Jall Technologies home">
          <Logo className="h-10 w-10" />
          <span className="font-heading font-bold text-midnight leading-none">
            JALL
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold-600">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`px-4 py-2 rounded-md text-sm font-heading font-medium transition-colors ${
                  active
                    ? 'text-midnight bg-gray-light'
                    : 'text-gray-medium hover:text-midnight hover:bg-gray-light'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-midnight"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-3 rounded-md text-base font-heading font-medium ${
                  pathname === link.href ? 'text-midnight bg-gray-light' : 'text-gray-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-primary mt-3 justify-center">
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
