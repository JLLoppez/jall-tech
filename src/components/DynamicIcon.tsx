import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

/**
 * Lucide's own docs recommend `import { icons } from 'lucide-react'` for
 * name-based lookup rather than `import * as Icons from 'lucide-react'` —
 * the namespace-import form also picks up non-icon internal exports (base
 * component, prop types, etc.), which can make an invalid `name` type-check
 * successfully and then crash at render. `icons` is a plain map of just the
 * icon components, keyed by their component name (e.g. `icons.MapPinned`),
 * so an unknown name safely resolves to `undefined` instead.
 */
type IconName = keyof typeof icons;

export default function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const IconComponent = icons[name as IconName];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
