import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { products } from '@/lib/data/products';
import { Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'How Jall Technologies has helped clients turn ideas into scalable digital solutions.'
};

export const revalidate = 3600;

async function getCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    // DATABASE_URL not configured yet in this environment \u2014 fall back to an empty state.
    return [];
  }
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow">Case Studies</span>
          <h1 className="text-white mb-6">Real problems, real builds</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Detailed write-ups of client and product work are added here as engagements wrap
            and clients approve publication.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {caseStudies.length === 0 ? (
            <div className="text-center max-w-lg mx-auto py-12">
              <div className="h-16 w-16 rounded-full bg-gray-light flex items-center justify-center mx-auto mb-5">
                <Briefcase className="text-gray-medium" size={26} />
              </div>
              <h3 className="mb-2">Case studies are on their way</h3>
              <p className="mb-0">
                We&apos;re finishing up our first published case studies across
                {' '}
                {products.map((p) => p.name).join(', ')}. Check back soon, or{' '}
                <a href="/contact" className="text-sky underline">
                  get in touch
                </a>{' '}
                if you&apos;d like references in the meantime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((cs) => (
                <article key={cs.id} className="card p-7">
                  <span className="badge bg-gray-light text-gray-dark mb-4">{cs.industry}</span>
                  <h3 className="mb-2">{cs.title}</h3>
                  <p className="text-sm text-gray-medium mb-3">{cs.summary}</p>
                  <p className="text-xs font-heading font-semibold text-midnight mb-0">
                    {cs.clientName}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
