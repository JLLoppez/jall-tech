import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Jall Technologies \u2014 open roles across engineering, design, and product.'
};

export const revalidate = 3600;

async function getJobs() {
  try {
    return await prisma.jobPosting.findMany({
      where: { active: true },
      orderBy: { postedAt: 'desc' }
    });
  } catch {
    return [];
  }
}

const perks = [
  'Remote-first, Cape Town-anchored team',
  'Work across real products, not just client tickets',
  'Modern stack \u2014 no legacy PHP archaeology',
  'Direct ownership of features end to end'
];

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow">Careers</span>
          <h1 className="text-white mb-6">Build the products, not just the backlog</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            We&apos;re a small, senior team building real products alongside client work.
            If that sounds better than another sprint of tickets, take a look below.
          </p>
        </div>
      </section>

      <section className="section-tight bg-gray-light">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk) => (
            <div key={perk} className="card p-5 text-sm font-medium text-gray-dark">
              {perk}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Open Roles</span>
            <h2>Current openings</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="card p-10 text-center max-w-xl">
              <Briefcase className="text-gray-medium mx-auto mb-4" size={26} />
              <h3 className="mb-2">No open roles right now</h3>
              <p className="mb-5">
                We&apos;re not actively hiring at the moment, but we always want to hear from
                strong engineers and designers. Send an open application and we&apos;ll reach
                out when something opens up.
              </p>
              <Link href="/contact" className="btn-primary">
                Send Open Application <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="card p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div>
                    <h3 className="mb-1.5">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-medium">
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} /> {job.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {job.employment}
                      </span>
                    </div>
                  </div>
                  <Link href="/contact" className="btn-outline whitespace-nowrap">
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
