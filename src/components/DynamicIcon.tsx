import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

type IconName = keyof typeof Icons;

export default function DynamicIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const IconComponent = Icons[name as IconName] as ComponentType<LucideProps> | undefined;
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
