'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { requestPasswordReset } from '@/lib/actions/auth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="text-success mx-auto mb-4" size={32} />
        <h3 className="mb-2">Check your email</h3>
        <p className="mb-5">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a link to reset
          your password. It expires in 1 hour.
        </p>
        <Link href="/admin/login" className="btn-outline">Back to Sign In</Link>
      </div>
    );
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
      <button type="submit" disabled={loading || !email} className="btn-primary w-full justify-center">
        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Send Reset Link'}
      </button>
    </form>
  );
}
