import { prisma } from '@/lib/prisma';
import SubmissionStatusSelect from '@/components/admin/SubmissionStatusSelect';

export const metadata = { title: 'Messages' };
export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="mb-1">Messages</h1>
      <p className="mb-8">Contact form submissions from the website.</p>

      {submissions.length === 0 ? (
        <div className="card p-10 text-center text-gray-medium">No messages yet.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Type</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <p className="font-heading font-semibold text-midnight mb-0.5">{s.name}</p>
                    <a href={`mailto:${s.email}`} className="text-xs text-sky hover:underline">
                      {s.email}
                    </a>
                    {s.company && <p className="text-xs text-gray-medium mt-0.5 mb-0">{s.company}</p>}
                  </td>
                  <td>
                    <span className="badge bg-gray-light text-gray-dark">
                      {s.inquiryType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="max-w-xs">
                    <p className="text-sm text-gray-dark mb-0 line-clamp-2">{s.message}</p>
                  </td>
                  <td className="text-xs text-gray-medium whitespace-nowrap">
                    {s.createdAt.toLocaleDateString('en-ZA', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td>
                    <SubmissionStatusSelect id={s.id} status={s.status} />
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
