'use client';

import { useTransition } from 'react';

export default function ToggleSwitch({
  checked,
  onToggle,
  label
}: {
  checked: boolean;
  onToggle: (next: boolean) => Promise<void>;
  label: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={isPending}
      onClick={() => startTransition(() => onToggle(!checked))}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
        checked ? 'bg-success' : 'bg-gray-medium/40'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
