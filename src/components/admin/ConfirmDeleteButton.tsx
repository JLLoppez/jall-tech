'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';

export default function ConfirmDeleteButton({
  action,
  confirmMessage = 'Delete this item? This cannot be undone.'
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="text-danger hover:bg-red-50 p-1.5 rounded-md transition-colors disabled:opacity-50"
      aria-label="Delete"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
