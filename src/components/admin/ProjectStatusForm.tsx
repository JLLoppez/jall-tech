'use client';

import { useState, useTransition } from 'react';
import { updateProjectStatus } from '@/lib/actions/admin';
import type { ProjectStatus } from '@prisma/client';
import { Loader2, Check } from 'lucide-react';

const statuses: ProjectStatus[] = ['PLANNING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ON_HOLD'];

export default function ProjectStatusForm({
  id,
  initialStatus,
  initialProgress
}: {
  id: string;
  initialStatus: ProjectStatus;
  initialProgress: number;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateProjectStatus(id, status, progress);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="card p-6 flex flex-col sm:flex-row sm:items-end gap-4">
      <div className="flex-1">
        <label htmlFor="status" className="field-label">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          className="field-input"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>
      <div className="w-32">
        <label htmlFor="progress" className="field-label">Progress %</label>
        <input
          id="progress"
          type="number"
          min={0}
          max={100}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="field-input"
        />
      </div>
      <button type="button" onClick={handleSave} disabled={isPending} className="btn-primary shrink-0">
        {isPending ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : 'Save'}
      </button>
    </div>
  );
}
