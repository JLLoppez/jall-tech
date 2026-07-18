import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { addProjectUpdate } from '@/lib/actions/admin';
import ProjectStatusForm from '@/components/admin/ProjectStatusForm';

export const dynamic = 'force-dynamic';

export default async function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { client: true, updates: { orderBy: { createdAt: 'desc' } } }
  });

  if (!project) notFound();

  return (
    <div className="max-w-2xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="mb-1">{project.name}</h1>
      <p className="mb-8">{project.client.name} &middot; {project.client.email}</p>

      <ProjectStatusForm
        id={project.id}
        initialStatus={project.status}
        initialProgress={project.progress}
      />

      <div className="mt-10">
        <h3 className="mb-4">Post an update</h3>
        <form action={addProjectUpdate} className="card p-6 space-y-4">
          <input type="hidden" name="projectId" value={project.id} />
          <div>
            <label htmlFor="title" className="field-label">Update title</label>
            <input id="title" name="title" type="text" required className="field-input" placeholder="Sprint 4 complete" />
          </div>
          <div>
            <label htmlFor="body" className="field-label">Details</label>
            <textarea id="body" name="body" rows={3} required className="field-input resize-y" />
          </div>
          <button type="submit" className="btn-primary">Post Update</button>
        </form>
      </div>

      <div className="mt-10">
        <h3 className="mb-4">Update history</h3>
        {project.updates.length === 0 ? (
          <p className="text-gray-medium text-sm">No updates posted yet.</p>
        ) : (
          <div className="space-y-3">
            {project.updates.map((u) => (
              <div key={u.id} className="card p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-heading font-semibold text-midnight mb-0">{u.title}</p>
                  <p className="text-xs text-gray-medium mb-0">
                    {u.createdAt.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <p className="text-sm text-gray-medium mb-0">{u.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
