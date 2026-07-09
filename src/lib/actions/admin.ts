'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import type { InquiryStatus, ProjectStatus } from '@prisma/client';

/**
 * Every action re-checks the session server-side even though middleware
 * already blocks unauthenticated access to /admin/*. Server actions are
 * just POSTs to their originating route, so the same middleware matcher
 * covers them \u2014 this check is defense in depth, not the only guard.
 */
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized');
  }
  return session;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ---------------------------------------------------------------------------
// Contact submissions
// ---------------------------------------------------------------------------

export async function updateSubmissionStatus(id: string, status: InquiryStatus) {
  await requireAdmin();
  await prisma.contactSubmission.update({ where: { id }, data: { status } });
  revalidatePath('/admin/messages');
}

// ---------------------------------------------------------------------------
// Blog posts
// ---------------------------------------------------------------------------

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const author = String(formData.get('author') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const published = formData.get('published') === 'on';

  if (!title || !excerpt || !content || !author || !category) {
    throw new Error('All fields are required');
  }

  await prisma.blogPost.create({
    data: {
      slug: `${slugify(title)}-${Date.now().toString(36)}`,
      title,
      excerpt,
      content,
      author,
      category,
      published,
      publishedAt: published ? new Date() : null
    }
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function togglePostPublished(id: string, published: boolean) {
  await requireAdmin();
  await prisma.blogPost.update({
    where: { id },
    data: { published, publishedAt: published ? new Date() : null }
  });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export async function createCaseStudy(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const clientName = String(formData.get('clientName') || '').trim();
  const summary = String(formData.get('summary') || '').trim();
  const industry = String(formData.get('industry') || '').trim();
  const productTag = String(formData.get('productTag') || '').trim();
  const published = formData.get('published') === 'on';

  if (!title || !clientName || !summary || !industry) {
    throw new Error('Title, client name, summary, and industry are required');
  }

  await prisma.caseStudy.create({
    data: {
      slug: `${slugify(title)}-${Date.now().toString(36)}`,
      title,
      clientName,
      summary,
      industry,
      productTag: productTag || null,
      published
    }
  });

  revalidatePath('/admin/case-studies');
  revalidatePath('/case-studies');
  redirect('/admin/case-studies');
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath('/admin/case-studies');
  revalidatePath('/case-studies');
}

// ---------------------------------------------------------------------------
// Job postings
// ---------------------------------------------------------------------------

export async function createJobPosting(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const department = String(formData.get('department') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const employment = String(formData.get('employment') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const requirementsRaw = String(formData.get('requirements') || '');
  const remote = formData.get('remote') === 'on';

  if (!title || !department || !location || !employment || !description) {
    throw new Error('All fields are required');
  }

  const requirements = requirementsRaw
    .split('\n')
    .map((r) => r.trim())
    .filter(Boolean);

  await prisma.jobPosting.create({
    data: { title, department, location, employment, description, requirements, remote }
  });

  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
  redirect('/admin/jobs');
}

export async function toggleJobActive(id: string, active: boolean) {
  await requireAdmin();
  await prisma.jobPosting.update({ where: { id }, data: { active } });
  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
}

export async function deleteJobPosting(id: string) {
  await requireAdmin();
  await prisma.jobPosting.delete({ where: { id } });
  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
}

// ---------------------------------------------------------------------------
// Clients (User accounts with role CLIENT)
// ---------------------------------------------------------------------------

export async function createClient(formData: FormData) {
  await requireAdmin();
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!name || !email || password.length < 8) {
    throw new Error('Name, email, and an 8+ character password are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('A user with that email already exists');

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, passwordHash, role: 'CLIENT' }
  });

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

// ---------------------------------------------------------------------------
// Projects (client portal content)
// ---------------------------------------------------------------------------

export async function createProject(formData: FormData) {
  await requireAdmin();
  const clientId = String(formData.get('clientId') || '');
  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const status = String(formData.get('status') || 'PLANNING') as ProjectStatus;
  const progress = Number(formData.get('progress') || 0);

  if (!clientId || !name) throw new Error('Client and project name are required');

  await prisma.project.create({
    data: { clientId, name, description: description || null, status, progress }
  });

  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProjectStatus(
  id: string,
  status: ProjectStatus,
  progress: number
) {
  await requireAdmin();
  await prisma.project.update({ where: { id }, data: { status, progress } });
  revalidatePath('/admin/projects');
  revalidatePath('/portal');
}

export async function addProjectUpdate(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get('projectId') || '');
  const title = String(formData.get('title') || '').trim();
  const body = String(formData.get('body') || '').trim();

  if (!projectId || !title || !body) throw new Error('Title and update body are required');

  await prisma.projectUpdate.create({ data: { projectId, title, body } });

  revalidatePath('/admin/projects');
  revalidatePath('/portal');
}
