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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-smooth disabled:opacity-50 hover:ring-2 hover:ring-offset-1 ${
        checked ? 'bg-success hover:ring-success/30' : 'bg-gray-medium/40 hover:ring-gray-medium/20'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-smooth ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
