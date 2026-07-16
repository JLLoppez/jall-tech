import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const statusColor: Record<string, string> = {
  PLANNING: 'bg-gray-light text-gray-dark',
  IN_PROGRESS: 'bg-blue-50 text-blue-700',
  REVIEW: 'bg-amber-50 text-amber-700',
  COMPLETED: 'bg-green-50 text-green-700',
  ON_HOLD: 'bg-red-50 text-danger'
};

export default async function PortalProjectDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const clientId = session!.user.id;

  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { updates: { orderBy: { createdAt: 'desc' } } }
  });

  // Not just "does this project exist" — it must belong to the logged-in
  // client. Without this check, any client could view any other client's
  // project by guessing/incrementing IDs in the URL. A missing project and
  // someone else's project both 404, so this can't be used to probe for
  // valid IDs either.
  if (!project || project.clientId !== clientId) {
    notFound();
  }

  return (
    <div>
      <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to My Projects
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <h1 className="mb-0">{project.name}</h1>
        <span className={`badge ${statusColor[project.status]}`}>{project.status.replace('_', ' ')}</span>
      </div>
      {project.description && <p className="mb-6 max-w-2xl">{project.description}</p>}

      <div className="card p-6 mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="field-label mb-0">Progress</span>
          <span className="text-sm font-heading font-semibold text-midnight">{project.progress}%</span>
        </div>
        <div className="h-2 bg-gray-light rounded-full overflow-hidden">
          <div className="h-full bg-gold transition-[width] duration-700 ease-smooth" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <h3 className="mb-4">Updates</h3>
      {project.updates.length === 0 ? (
        <div className="card p-8 text-center text-gray-medium">No updates posted yet.</div>
      ) : (
        <div className="space-y-3">
          {project.updates.map((u) => (
            <div key={u.id} className="card p-5">
              <div className="flex items-center justify-between mb-1.5 gap-3">
                <p className="font-heading font-semibold text-midnight mb-0">{u.title}</p>
                <p className="text-xs text-gray-medium mb-0 shrink-0">
                  {u.createdAt.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <p className="text-sm text-gray-medium mb-0 whitespace-pre-wrap">{u.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
