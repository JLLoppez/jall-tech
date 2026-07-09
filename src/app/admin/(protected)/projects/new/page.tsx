import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { createProject } from '@/lib/actions/admin';

export const metadata = { title: 'New Project' };
export const dynamic = 'force-dynamic';

export default async function NewProjectPage() {
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="max-w-lg">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="mb-8">New Project</h1>

      {clients.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="mb-4">You need at least one client account before creating a project.</p>
          <Link href="/admin/clients/new" className="btn-primary">Create a Client First</Link>
        </div>
      ) : (
        <form action={createProject} className="card p-8 space-y-5">
          <div>
            <label htmlFor="clientId" className="field-label">Client</label>
            <select id="clientId" name="clientId" required className="field-input">
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} &mdash; {c.email}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="field-label">Project name</label>
            <input id="name" name="name" type="text" required className="field-input" />
          </div>
          <div>
            <label htmlFor="description" className="field-label">
              Description <span className="text-gray-medium font-normal">(optional)</span>
            </label>
            <textarea id="description" name="description" rows={3} className="field-input resize-y" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="status" className="field-label">Status</label>
              <select id="status" name="status" className="field-input" defaultValue="PLANNING">
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVIEW">Review</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div>
              <label htmlFor="progress" className="field-label">Progress (%)</label>
              <input id="progress" name="progress" type="number" min={0} max={100} defaultValue={0} className="field-input" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary">Create Project</button>
            <Link href="/admin/projects" className="btn-ghost">Cancel</Link>
          </div>
        </form>
      )}
    </div>
  );
}
