import Link from 'next/link';
import Logo from '@/components/Logo';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';

export const metadata = { title: 'Forgot Password' };

export default function ForgotPasswordPage() {
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
        <h1 className="text-center text-xl mb-2">Reset your password</h1>
        <p className="text-center text-sm text-gray-medium mb-6">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
        <ForgotPasswordForm />
        <p className="text-center text-xs text-gray-medium mt-6">
          <Link href="/admin/login" className="hover:text-midnight transition-colors duration-150">&larr; Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
