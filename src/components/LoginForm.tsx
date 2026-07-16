'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Only honor an explicit callbackUrl (set by middleware when it bounced
  // someone off a protected route). Without one, the destination depends on
  // *who* just logged in — an admin belongs on /admin, a client on /portal —
  // so it can't be a single fixed default the way it was before.
  const explicitCallbackUrl = searchParams.get('callbackUrl');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Incorrect email or password.');
        setLoading(false);
        return;
      }

      const session = await getSession();
      const destination = explicitCallbackUrl || (session?.user.role === 'CLIENT' ? '/portal' : '/admin');

      router.push(destination);
      router.refresh();
    } catch {
      setError('Something went wrong signing you in. Please try again.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-5" noValidate>
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field-input"
          placeholder="you@jalltechnologies.com"
          autoComplete="email"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="field-label mb-0">Password</label>
          <Link href="/admin/forgot-password" className="text-xs text-sky hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="field-input"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 text-danger text-sm rounded-md p-3.5">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
      </button>
    </form>
  );
}
