'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { resetPassword } from '@/lib/actions/auth';

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await resetPassword(token, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/admin/login'), 2000);
  }

  if (success) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="text-success mx-auto mb-4" size={32} />
        <h3 className="mb-2">Password updated</h3>
        <p className="mb-0">Redirecting you to sign in&hellip;</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-5" noValidate>
      <div>
        <label htmlFor="password" className="field-label">New password</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />
      </div>
      <div>
        <label htmlFor="confirm" className="field-label">Confirm new password</label>
        <input
          id="confirm"
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="field-input"
          autoComplete="new-password"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 text-danger text-sm rounded-md p-3.5">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Reset Password'}
      </button>
      <p className="text-center text-xs text-gray-medium">
        <Link href="/admin/forgot-password" className="hover:text-midnight">Request a new link</Link>
      </p>
    </form>
  );
}
