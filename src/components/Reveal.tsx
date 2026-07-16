'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Fades + slides content up the first time it scrolls into view. Uses
 * IntersectionObserver rather than a mount-triggered CSS animation because
 * below-the-fold content mounted via SSR would otherwise finish animating
 * before the user ever scrolls to it.
 *
 * Respects prefers-reduced-motion automatically — the global CSS rule in
 * globals.css collapses all animation durations to ~0 for users who've
 * asked their OS for reduced motion, so no extra logic is needed here.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? 'animate-fade-in-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
