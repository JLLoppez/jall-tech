import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createJobPosting } from '@/lib/actions/admin';

export const metadata = { title: 'New Job Posting' };

export default function NewJobPage() {
  return (
    <div className="max-w-2xl">
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>
      <h1 className="mb-8">New Job Posting</h1>

      <form action={createJobPosting} className="card p-8 space-y-5">
        <div>
          <label htmlFor="title" className="field-label">Job title</label>
          <input id="title" name="title" type="text" required className="field-input" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="department" className="field-label">Department</label>
            <input id="department" name="department" type="text" required placeholder="Engineering" className="field-input" />
          </div>
          <div>
            <label htmlFor="employment" className="field-label">Employment type</label>
            <input id="employment" name="employment" type="text" required placeholder="Full-time" className="field-input" />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="field-label">Location</label>
          <input id="location" name="location" type="text" required placeholder="Cape Town / Remote" className="field-input" />
        </div>

        <div>
          <label htmlFor="description" className="field-label">Description</label>
          <textarea id="description" name="description" rows={4} required className="field-input resize-y" />
        </div>

        <div>
          <label htmlFor="requirements" className="field-label">
            Requirements <span className="text-gray-medium font-normal">(one per line)</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={5}
            className="field-input resize-y"
            placeholder={'3+ years with React/Next.js\nExperience with PostgreSQL'}
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-dark">
          <input type="checkbox" name="remote" defaultChecked className="h-4 w-4 rounded border-gray-300" />
          Remote-friendly
        </label>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">Save Job</button>
          <Link href="/admin/jobs" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
