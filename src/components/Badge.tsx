import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'info' | 'gold';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-light text-gray-dark',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-blue-50 text-blue-700',
  gold: 'bg-gold-50 text-gold-600 border border-gold-100'
};

export default function Badge({
  children,
  variant = 'default'
}: {
  children: ReactNode;
  variant?: BadgeVariant;
}) {
  return <span className={`badge ${variants[variant]}`}>{children}</span>;
}
