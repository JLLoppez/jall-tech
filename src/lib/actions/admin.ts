'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import type { ProjectStatus, InquiryStatus } from '@prisma/client';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail, projectUpdateEmail } from '@/lib/email';

/**
 * Defense in depth: middleware already blocks non-admins from reaching any
 * /admin route (including the POST requests these server actions run as),
 * but a server action can in principle be called directly, so every action
 * re-checks the session itself rather than trusting the caller's UI.
 */
async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return session;
}

function parseStringList(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== 'string') return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------

export async function createClient(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!name || !email || password.length < 8) {
    throw new Error('Name, email, and an 8+ character password are required.');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash, role: 'CLIENT' }
  });

  revalidatePath('/admin/clients');
  redirect('/admin/clients');
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function createProject(formData: FormData) {
  await requireAdmin();

  const clientId = String(formData.get('clientId') || '');
  const name = String(formData.get('name') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const status = String(formData.get('status') || 'PLANNING') as ProjectStatus;
  const progress = Math.min(100, Math.max(0, Number(formData.get('progress')) || 0));

  if (!clientId || !name) {
    throw new Error('Client and project name are required.');
  }

  const project = await prisma.project.create({
    data: { clientId, name, description: description || null, status, progress }
  });

  revalidatePath('/admin/projects');
  redirect(`/admin/projects/${project.id}`);
}

export async function updateProjectStatus(id: string, status: ProjectStatus, progress: number) {
  await requireAdmin();

  const clamped = Math.min(100, Math.max(0, Math.round(Number(progress) || 0)));

  await prisma.project.update({
    where: { id },
    data: { status, progress: clamped }
  });

  revalidatePath(`/admin/projects/${id}`);
  revalidatePath('/admin/projects');
  revalidatePath(`/portal/projects/${id}`);
  revalidatePath('/portal');
}

export async function addProjectUpdate(formData: FormData) {
  await requireAdmin();

  const projectId = String(formData.get('projectId') || '');
  const title = String(formData.get('title') || '').trim();
  const body = String(formData.get('body') || '').trim();

  if (!projectId || !title || !body) {
    throw new Error('Title and details are required.');
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { updates: { create: { title, body } } },
    include: { client: true }
  });

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  await sendEmail({
    to: project.client.email,
    subject: `Update on ${project.name}`,
    html: projectUpdateEmail({
      projectName: project.name,
      updateTitle: title,
      updateBody: body,
      portalUrl: `${baseUrl}/portal/projects/${project.id}`
    })
  }).catch((err) => console.error('[addProjectUpdate] failed to notify client', err));

  revalidatePath(`/admin/projects/${projectId}`);
  revalidatePath(`/portal/projects/${projectId}`);
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
// Blog
// ---------------------------------------------------------------------------

export async function createBlogPost(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get('title') || '').trim();
  const author = String(formData.get('author') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const excerpt = String(formData.get('excerpt') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const published = formData.get('published') === 'on';

  if (!title || !author || !category || !excerpt || !content) {
    throw new Error('All fields are required.');
  }

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.blogPost.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++suffix}`;
  }

  await prisma.blogPost.create({
    data: {
      slug,
      title,
      author,
      category,
      excerpt,
      content,
      published,
      publishedAt: published ? new Date() : null
    }
  });

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function togglePostPublished(id: string, next: boolean) {
  await requireAdmin();
  await prisma.blogPost.update({
    where: { id },
    data: { published: next, publishedAt: next ? new Date() : null }
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
  const industry = String(formData.get('industry') || '').trim();
  const productTag = String(formData.get('productTag') || '').trim();
  const summary = String(formData.get('summary') || '').trim();
  const published = formData.get('published') === 'on';

  if (!title || !clientName || !industry || !summary) {
    throw new Error('Title, client name, industry, and summary are required.');
  }

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Case study titles are more likely to collide ("Acme Corp Website
  // Redesign" style titles repeat across clients) than blog post titles, so
  // disambiguate rather than letting the unique constraint throw.
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.caseStudy.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++suffix}`;
  }

  await prisma.caseStudy.create({
    data: { slug, title, clientName, industry, productTag: productTag || null, summary, published }
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
// Jobs
// ---------------------------------------------------------------------------

export async function createJobPosting(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get('title') || '').trim();
  const department = String(formData.get('department') || '').trim();
  const employment = String(formData.get('employment') || '').trim();
  const location = String(formData.get('location') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const requirements = parseStringList(formData.get('requirements'));
  const remote = formData.get('remote') === 'on';

  if (!title || !department || !employment || !location || !description) {
    throw new Error('All fields are required.');
  }

  await prisma.jobPosting.create({
    data: { title, department, employment, location, description, requirements, remote, active: true }
  });

  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
  redirect('/admin/jobs');
}

export async function toggleJobActive(id: string, next: boolean) {
  await requireAdmin();
  await prisma.jobPosting.update({ where: { id }, data: { active: next } });
  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
}

export async function deleteJobPosting(id: string) {
  await requireAdmin();
  await prisma.jobPosting.delete({ where: { id } });
  revalidatePath('/admin/jobs');
  revalidatePath('/careers');
}
