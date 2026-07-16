import { Suspense } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';

export const metadata = { title: 'Sign In' };

export default function AdminLoginPage() {
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
        <h1 className="text-center text-xl mb-6">Sign in</h1>
        <Suspense fallback={<div className="card p-8 h-72 animate-pulse" />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-xs text-gray-medium mt-6">
          <Link href="/" className="hover:text-midnight transition-colors duration-150">&larr; Back to the website</Link>
        </p>
      </div>
    </div>
  );
}
