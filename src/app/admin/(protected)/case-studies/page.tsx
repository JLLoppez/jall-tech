import Link from 'next/link';
import { Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton';
import { deleteCaseStudy } from '@/lib/actions/admin';

export const metadata = { title: 'Case Studies' };
export const dynamic = 'force-dynamic';

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-1">Case Studies</h1>
          <p className="mb-0">{caseStudies.length} case stud{caseStudies.length === 1 ? 'y' : 'ies'} total.</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn-primary">
          <Plus size={16} /> New Case Study
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">No case studies yet.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Industry</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {caseStudies.map((cs) => (
                <tr key={cs.id}>
                  <td className="font-heading font-semibold text-midnight">{cs.title}</td>
                  <td className="text-sm text-gray-medium">{cs.clientName}</td>
                  <td>
                    <span className="badge bg-gray-light text-gray-dark">{cs.industry}</span>
                  </td>
                  <td>
                    <span className={`badge ${cs.published ? 'bg-green-50 text-green-700' : 'bg-gray-light text-gray-dark'}`}>
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <ConfirmDeleteButton
                      confirmMessage={`Delete "${cs.title}"?`}
                      action={async () => {
                        'use server';
                        await deleteCaseStudy(cs.id);
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
