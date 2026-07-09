import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/actions/admin';

export const metadata = { title: 'New Client' };

export default function NewClientPage() {
  return (
    <div className="max-w-lg">
      <Link href="/admin/clients" className="inline-flex items-center gap-1.5 text-sm text-gray-medium hover:text-midnight mb-4">
        <ArrowLeft size={14} /> Back to Clients
      </Link>
      <h1 className="mb-2">New Client Account</h1>
      <p className="mb-8">
        Creates a portal login. Share the email and temporary password with your client
        directly &mdash; they aren&apos;t emailed automatically.
      </p>

      <form action={createClient} className="card p-8 space-y-5">
        <div>
          <label htmlFor="name" className="field-label">Full name</label>
          <input id="name" name="name" type="text" required className="field-input" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" name="email" type="email" required className="field-input" />
        </div>
        <div>
          <label htmlFor="password" className="field-label">Temporary password</label>
          <input
            id="password"
            name="password"
            type="text"
            required
            minLength={8}
            className="field-input font-mono"
            placeholder="At least 8 characters"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">Create Client</button>
          <Link href="/admin/clients" className="btn-ghost">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
