import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FolderKanban, Clock } from 'lucide-react';

export const metadata = { title: 'My Projects' };
export const dynamic = 'force-dynamic';

const statusColor: Record<string, string> = {
  PLANNING: 'bg-gray-light text-gray-dark',
  IN_PROGRESS: 'bg-blue-50 text-blue-700',
  REVIEW: 'bg-amber-50 text-amber-700',
  COMPLETED: 'bg-green-50 text-green-700',
  ON_HOLD: 'bg-red-50 text-danger'
};

export default async function PortalPage() {
  const session = await auth();
  if (!session) return null; // layout already redirects; this satisfies TS

  const projects = await prisma.project.findMany({
    where: { clientId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    include: { updates: { orderBy: { createdAt: 'desc' }, take: 5 } }
  });

  return (
    <div>
      <h1 className="mb-1">Welcome back, {session.user.name?.split(' ')[0]}</h1>
      <p className="mb-10">Here&apos;s where things stand on your project{projects.length === 1 ? '' : 's'}.</p>

      {projects.length === 0 ? (
        <div className="card p-10 text-center max-w-lg">
          <FolderKanban className="text-gray-medium mx-auto mb-4" size={26} />
          <h3 className="mb-2">No projects yet</h3>
          <p className="mb-0">
            Your project dashboard will appear here once we kick things off. Reach out if you
            were expecting to see something already.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="card p-7">
              <div className="flex items-start justify-between mb-4 gap-4">
                <div>
                  <h3 className="mb-1">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-gray-medium mb-0">{project.description}</p>
                  )}
                </div>
                <span className={`badge shrink-0 ${statusColor[project.status]}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-heading font-semibold uppercase tracking-wide text-gray-medium">
                    Progress
                  </span>
                  <span className="text-xs font-heading font-semibold text-midnight">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-light rounded-full overflow-hidden">
                  <div className="h-full bg-gold transition-all" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              {project.updates.length > 0 && (
                <div>
                  <p className="text-xs font-heading font-semibold uppercase tracking-wide text-gray-medium mb-3">
                    Recent updates
                  </p>
                  <div className="space-y-3">
                    {project.updates.map((u) => (
                      <div key={u.id} className="flex gap-3 border-l-2 border-gold-100 pl-4">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-heading font-semibold text-sm text-midnight mb-0">{u.title}</p>
                            <span className="flex items-center gap-1 text-xs text-gray-medium">
                              <Clock size={11} />
                              {u.createdAt.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-medium mb-0">{u.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
