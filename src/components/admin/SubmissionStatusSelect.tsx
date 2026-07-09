'use client';

import { useTransition } from 'react';
import { updateSubmissionStatus } from '@/lib/actions/admin';
import type { InquiryStatus } from '@prisma/client';

const options: InquiryStatus[] = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'];

export default function SubmissionStatusSelect({
  id,
  status
}: {
  id: string;
  status: InquiryStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) =>
        startTransition(() => {
          updateSubmissionStatus(id, e.target.value as InquiryStatus);
        })
      }
      className="text-xs font-heading font-semibold border border-gray-200 rounded-md px-2 py-1.5 bg-white disabled:opacity-50"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replace('_', ' ')}
        </option>
      ))}
    </select>
  );
}
