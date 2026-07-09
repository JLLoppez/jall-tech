'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <section className="section min-h-[60vh] flex items-center">
      <div className="container text-center max-w-lg">
        <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-danger" size={28} />
        </div>
        <h1 className="mb-4">Something went wrong</h1>
        <p className="mb-8">This page hit an unexpected error. Try again, or go back home.</p>
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
  );
}
