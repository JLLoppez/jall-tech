'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, wire this up to your error tracking service (e.g. Sentry).
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <section className="section min-h-screen flex items-center">
          <div className="container text-center max-w-lg">
            <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-danger" size={28} />
            </div>
            <h1 className="mb-4">Something went wrong</h1>
            <p className="mb-8">
              We hit an unexpected error. Try again, or head back to the homepage.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button type="button" onClick={() => reset()} className="btn-primary">
                <RotateCcw size={16} /> Try Again
              </button>
              <Link href="/" className="btn-outline">
                <Home size={16} /> Back to Home
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
