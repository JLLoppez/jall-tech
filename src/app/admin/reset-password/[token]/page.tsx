import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import Logo from '@/components/Logo';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { validateResetToken } from '@/lib/actions/auth';

export const metadata = { title: 'Reset Password' };
export const dynamic = 'force-dynamic';

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const result = await validateResetToken(params.token);

  return (
    <div className="min-h-screen bg-gray-light flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fade-in-up">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-8 transition-opacity duration-200 hover:opacity-80"
        >
          <Logo className="h-11 w-11" />
          <span className="font-heading font-bold text-midnight leading-none">
            JALL
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold-600">
              TECHNOLOGIES
            </span>
          </span>
        </Link>

        {result.valid ? (
          <>
            <h1 className="text-center text-xl mb-6">Choose a new password</h1>
            <ResetPasswordForm token={params.token} />
          </>
        ) : (
          <div className="card p-8 text-center">
            <AlertCircle className="text-danger mx-auto mb-4" size={32} />
            <h3 className="mb-2">Link no longer valid</h3>
            <p className="mb-5">{result.reason}</p>
            <Link href="/admin/forgot-password" className="btn-primary">Request a New Link</Link>
          </div>
        )}
      </div>
    </div>
  );
}
