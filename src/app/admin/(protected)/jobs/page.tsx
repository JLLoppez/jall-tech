import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ToggleSwitch from '@/components/admin/ToggleSwitch';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { toggleJobActive, deleteJobPosting } from '@/lib/actions/admin';

export const metadata = { title: 'Jobs' };
export const dynamic = 'force-dynamic';

export default async function AdminJobsPage() {
  const jobs = await prisma.jobPosting.findMany({ orderBy: { postedAt: 'desc' } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="mb-1">Job Postings</h1>
          <p className="mb-0">{jobs.length} posting{jobs.length === 1 ? '' : 's'} total.</p>
        </div>
        <Link href="/admin/jobs/new" className="btn-primary">
          <Plus size={16} /> New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">No job postings yet.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Location</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="font-heading font-semibold text-midnight">{job.title}</td>
                  <td className="text-sm text-gray-medium">{job.department}</td>
                  <td className="text-sm text-gray-medium">{job.location}</td>
                  <td>
                    <ToggleSwitch
                      checked={job.active}
                      label={`Active: ${job.title}`}
                      onToggle={async (next) => {
                        'use server';
                        await toggleJobActive(job.id, next);
                      }}
                    />
                  </td>
                  <td>
                    <ConfirmDeleteButton
                      confirmMessage={`Delete "${job.title}"?`}
                      action={async () => {
                        'use server';
                        await deleteJobPosting(job.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
