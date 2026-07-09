import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/data/services';
import { products } from '@/lib/data/products';
import ServiceCard from '@/components/ServiceCard';
import ProductCard from '@/components/ProductCard';
import StatCard from '@/components/StatCard';
import AbstractSkyline from '@/components/AbstractSkyline';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px'
          }}
          aria-hidden="true"
        />
        <AbstractSkyline className="absolute bottom-0 left-0 w-full h-32 sm:h-44 text-deep-navy/60 pointer-events-none" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow">Software · AI · Cloud · FinTech</span>
            <h1 className="text-white mb-6">
              Innovate. Build. <span className="text-gold">Empower.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
              Jall Technologies designs and builds custom software, AI-powered products, and
              cloud platforms for startups, enterprises, governments, and NGOs across Africa
              and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-secondary">
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link href="/products" className="btn-outline !border-white/30 !text-white hover:!bg-white hover:!text-midnight">
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-deep-navy">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="9" label="Core Service Lines" />
          <StatCard value="6" label="Products in Build" />
          <StatCard value="10+" label="Industries Served" />
          <StatCard value="100%" label="African-Rooted, Globally Minded" />
        </div>
      </section>

      {/* Services overview */}
      <section className="section">
        <div className="container">
          <div className="section-head center mx-auto text-center">
            <span className="eyebrow">What We Do</span>
            <h2>Full-stack technology, end to end</h2>
            <p className="lead">
              From first architecture decision to production monitoring, we cover the whole
              lifecycle — so you work with one accountable partner, not a chain of vendors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Products showcase */}
      <section className="section bg-gray-light">
        <div className="container">
          <div className="section-head center mx-auto text-center">
            <span className="eyebrow">Our Products</span>
            <h2>Platforms we&apos;re building in-house</h2>
            <p className="lead">
              Alongside client work, we build our own products — proof that we build what we
              preach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow">Why Jall Technologies</span>
            <h2 className="mb-6">Built for teams who need it done right, not just done fast</h2>
            <ul className="space-y-4">
              {[
                'One team across product, design, and engineering — no handoff gaps',
                'Modern stack: Next.js, React, Node.js/NestJS, PostgreSQL, Prisma',
                'AI integration experience, not just AI marketing',
                'African market context paired with global engineering standards'
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-gray-dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-midnight rounded-2xl p-10 text-white">
            <p className="font-heading text-xl mb-6 leading-snug">
              &ldquo;We help startups, businesses, governments, NGOs, and enterprises transform
              ideas into scalable digital solutions across Africa and beyond.&rdquo;
            </p>
            <div className="h-px bg-white/15 mb-6" />
            <p className="text-white/60 text-sm mb-1">Our mission</p>
            <p className="text-white text-sm mb-0">
              To empower people and organizations through innovative technology that creates
              opportunities and drives sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section bg-midnight">
        <div className="container text-center">
          <h2 className="text-white mb-4">Have a project in mind?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Tell us what you&apos;re building. We&apos;ll reply with next steps within one
            business day.
          </p>
          <Link href="/contact" className="btn-secondary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
