import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data/services';
import DynamicIcon from '@/components/DynamicIcon';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom software development, AI & automation, cloud & infrastructure, fintech, and digital transformation services from Jall Technologies.'
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow animate-fade-in-up">Services</span>
          <h1 className="text-white mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            Everything your product needs, under one roof
          </h1>
          <p className="text-white/70 text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            We work as an extension of your team — from the first architecture whiteboard to
            the on-call rotation after launch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container flex flex-col gap-6">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={Math.min(i * 40, 240)}>
              <div
                id={service.slug}
                className="card card-hover group p-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-center scroll-mt-24"
              >
                <div className="flex items-center gap-4 md:contents">
                  <span className="font-heading font-bold text-gold-100 text-4xl md:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="hidden md:flex h-14 w-14 rounded-xl bg-midnight items-center justify-center shrink-0 transition-transform duration-300 ease-smooth group-hover:scale-110 group-hover:rotate-3">
                    <DynamicIcon name={service.icon} size={24} color="#D4A017" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 transition-colors duration-200 group-hover:text-gold-600">{service.name}</h3>
                  <p className="mb-0 text-sm">{service.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="btn-ghost justify-self-start md:justify-self-end whitespace-nowrap"
                >
                  Discuss a project <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-midnight">
        <Reveal className="container text-center">
          <h2 className="text-white mb-4">Not sure which service you need?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Tell us the problem, not the tech stack. We&apos;ll help you figure out the right
            scope.
          </p>
          <Link href="/contact" className="btn-secondary">
            Talk to Us <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
