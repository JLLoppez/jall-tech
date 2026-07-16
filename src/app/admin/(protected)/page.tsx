import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Mail, Newspaper, Briefcase, FolderKanban, Users, ArrowUpRight } from 'lucide-react';

export const metadata = { title: 'Admin Dashboard' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [newMessages, totalMessages, blogPosts, caseStudies, jobs, projects, clients] =
    await Promise.all([
      prisma.contactSubmission.count({ where: { status: 'NEW' } }),
      prisma.contactSubmission.count(),
      prisma.blogPost.count(),
      prisma.caseStudy.count(),
      prisma.jobPosting.count({ where: { active: true } }),
      prisma.project.count(),
      prisma.user.count({ where: { role: 'CLIENT' } })
    ]);

  const stats = [
    { label: 'New Messages', value: newMessages, sub: `${totalMessages} total`, icon: Mail, href: '/admin/messages' },
    { label: 'Blog Posts', value: blogPosts, sub: 'manage content', icon: Newspaper, href: '/admin/blog' },
    { label: 'Case Studies', value: caseStudies, sub: 'manage content', icon: Briefcase, href: '/admin/case-studies' },
    { label: 'Active Jobs', value: jobs, sub: 'open roles', icon: Briefcase, href: '/admin/jobs' },
    { label: 'Client Projects', value: projects, sub: 'in the portal', icon: FolderKanban, href: '/admin/projects' },
    { label: 'Client Accounts', value: clients, sub: 'portal logins', icon: Users, href: '/admin/clients' }
  ];

  return (
    <div>
      <h1 className="mb-1">Dashboard</h1>
      <p className="mb-8">Overview of everything happening on the platform.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card card-hover group p-6 animate-fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-gray-light flex items-center justify-center transition-colors duration-200 group-hover:bg-midnight">
                <stat.icon size={18} className="text-midnight transition-colors duration-200 group-hover:text-gold" />
              </div>
              <ArrowUpRight
                size={16}
                className="text-gray-medium group-hover:text-midnight transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="font-heading font-bold text-3xl text-midnight mb-0.5">{stat.value}</p>
            <p className="text-sm font-medium text-gray-dark mb-0.5">{stat.label}</p>
            <p className="text-xs text-gray-medium mb-0">{stat.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
