import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Projects' };
export const dynamic = 'force-dynamic';

const statusColor: Record<string, string> = {
  PLANNING: 'bg-gray-light text-gray-dark',
  IN_PROGRESS: 'bg-blue-50 text-blue-700',
  REVIEW: 'bg-amber-50 text-amber-700',
  COMPLETED: 'bg-green-50 text-green-700',
  ON_HOLD: 'bg-red-50 text-danger'
};

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { client: true }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">Projects</h1>
          <p className="mb-0">{projects.length} project{projects.length === 1 ? '' : 's'} across all clients.</p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">
          No projects yet. Create a client first, then a project for them.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}`} className="card p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="mb-0">{p.name}</h3>
                <span className={`badge ${statusColor[p.status]}`}>{p.status.replace('_', ' ')}</span>
              </div>
              <p className="text-sm text-gray-medium mb-4">{p.client.name} &middot; {p.client.email}</p>
              <div className="h-1.5 bg-gray-light rounded-full overflow-hidden">
                <div className="h-full bg-gold" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="text-xs text-gray-medium mt-1.5 mb-0">{p.progress}% complete</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
