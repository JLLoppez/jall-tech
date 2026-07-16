import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Clients' };
export const dynamic = 'force-dynamic';

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    where: { role: 'CLIENT' },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { projects: true } } }
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="mb-1">Clients</h1>
          <p className="mb-0">{clients.length} client account{clients.length === 1 ? '' : 's'} with portal access.</p>
        </div>
        <Link href="/admin/clients/new" className="btn-primary">
          <Plus size={16} /> New Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">
          No client accounts yet. Create one so a client can log into the portal.
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Projects</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="font-heading font-semibold text-midnight">{c.name}</td>
                  <td className="text-sm text-gray-medium">{c.email}</td>
                  <td className="text-sm text-gray-medium">{c._count.projects}</td>
                  <td className="text-xs text-gray-medium whitespace-nowrap">
                    {c.createdAt.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
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
