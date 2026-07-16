import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight } from 'lucide-react';

export const metadata = { title: 'My Projects' };
export const dynamic = 'force-dynamic';

const statusColor: Record<string, string> = {
  PLANNING: 'bg-gray-light text-gray-dark',
  IN_PROGRESS: 'bg-blue-50 text-blue-700',
  REVIEW: 'bg-amber-50 text-amber-700',
  COMPLETED: 'bg-green-50 text-green-700',
  ON_HOLD: 'bg-red-50 text-danger'
};

export default async function PortalDashboard() {
  const session = await auth();
  // Layout already guarantees a CLIENT session exists before this renders.
  const clientId = session!.user.id;

  const projects = await prisma.project.findMany({
    where: { clientId },
    orderBy: { updatedAt: 'desc' },
    include: { updates: { orderBy: { createdAt: 'desc' }, take: 1 } }
  });

  return (
    <div>
      <h1 className="mb-1">My Projects</h1>
      <p className="mb-8">Track progress and updates on your projects with Jall Technologies.</p>

      {projects.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">
          No projects yet. Once we kick off work together, it will show up here.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Link
              key={p.id}
              href={`/portal/projects/${p.id}`}
              className="card card-hover p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3 gap-3">
                <h3 className="mb-0">{p.name}</h3>
                <ArrowUpRight size={16} className="text-gray-medium shrink-0" />
              </div>
              <span className={`badge mb-4 ${statusColor[p.status]}`}>{p.status.replace('_', ' ')}</span>
              <div className="h-1.5 bg-gray-light rounded-full overflow-hidden">
                <div className="h-full bg-gold transition-[width] duration-700 ease-smooth" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="text-xs text-gray-medium mt-1.5 mb-0">{p.progress}% complete</p>
              {p.updates[0] && (
                <p className="text-xs text-gray-medium mt-3 mb-0 line-clamp-1">
                  Latest: {p.updates[0].title}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
