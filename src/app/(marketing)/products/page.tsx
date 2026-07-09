import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'JourneyBook, Capeverse, Voices of Africa, Blom, Family Finance Platform \u2014 the products Jall Technologies builds in-house.'
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow">Our Products</span>
          <h1 className="text-white mb-6">We build our own products too</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Client work sharpens our engineering. Our own products are where we test ideas,
            take design risks, and prove out our AI integrations before they reach client
            work.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section bg-gray-light">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <span className="eyebrow">Interested in a product?</span>
            <h2 className="mb-4">Partner, invest, or pilot with us</h2>
            <p className="mb-6">
              Several of our products are open to early pilot partners and strategic
              investors. Get in touch and tell us which one caught your interest.
            </p>
            <Link href="/contact" className="btn-primary">
              Start the Conversation <ArrowRight size={16} />
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
                className="card p-5 flex items-center justify-between"
              >
                <span className="font-heading font-semibold text-midnight">{p.name}</span>
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: p.color }}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
