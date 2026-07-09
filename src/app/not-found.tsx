import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section min-h-[60vh] flex items-center">
      <div className="container text-center max-w-lg">
        <p className="font-heading font-bold text-gold text-sm tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="mb-4">Page not found</h1>
        <p className="mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Back to Home
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
