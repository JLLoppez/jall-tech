'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, type LucideIcon } from 'lucide-react';

type NavItem = { href: string; label: string; icon: LucideIcon };

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="admin-mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="p-2 -mr-2 text-white"
      >
        <span className="relative block h-6 w-6">
          <Menu size={24} className={`absolute inset-0 transition-all duration-200 ${open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100'}`} />
          <X size={24} className={`absolute inset-0 transition-all duration-200 ${open ? 'opacity-100' : 'opacity-0 -rotate-90 scale-75'}`} />
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-midnight/40 animate-fade-in md:hidden"
          />
          <nav
            id="admin-mobile-nav"
            aria-label="Admin mobile"
            className="fixed top-16 left-0 right-0 z-40 bg-midnight border-t border-white/10 animate-fade-in-down origin-top md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="p-3 space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-150 ${
                      active ? 'text-white bg-white/10' : 'text-white/70 active:bg-white/10'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
