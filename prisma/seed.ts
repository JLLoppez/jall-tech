import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- Admin account -----------------------------------------------------
  // CHANGE THIS PASSWORD immediately after your first login in production.
  const adminPasswordHash = await bcrypt.hash('ChangeMe123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@jalltechnologies.com' },
    update: {},
    create: {
      email: 'admin@jalltechnologies.com',
      name: 'Jall Admin',
      passwordHash: adminPasswordHash,
      role: 'ADMIN'
    }
  });

  // --- Demo client + project (so the portal isn't empty on first run) ----
  const clientPasswordHash = await bcrypt.hash('ClientDemo123!', 12);
  const demoClient = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      name: 'Demo Client',
      passwordHash: clientPasswordHash,
      role: 'CLIENT'
    }
  });

  const existingProject = await prisma.project.findFirst({
    where: { clientId: demoClient.id, name: 'Website Redesign' }
  });

  if (!existingProject) {
    await prisma.project.create({
      data: {
        clientId: demoClient.id,
        name: 'Website Redesign',
        description: 'Full rebuild of the marketing site on Next.js, migrating from the old template.',
        status: 'IN_PROGRESS',
        progress: 65,
        updates: {
          create: [
            {
              title: 'Homepage and navigation complete',
              body: 'Hero, services overview, and product showcase sections are built and responsive.'
            },
            {
              title: 'Contact form wired to backend',
              body: 'Form now validates and saves submissions to the database, with spam protection in place.'
            }
          ]
        }
      }
    });
  }

  // --- Sample content ------------------------------------------------------
  await prisma.jobPosting.upsert({
    where: { id: 'seed-fullstack-dev' },
    update: {},
    create: {
      id: 'seed-fullstack-dev',
      title: 'Full-Stack Developer',
      department: 'Engineering',
      location: 'Cape Town / Remote',
      employment: 'Full-time',
      remote: true,
      description:
        'Work across our client projects and in-house products (JourneyBook, Capeverse, Voices of Africa) using Next.js, Node.js, and PostgreSQL.',
      requirements: [
        '3+ years with React/Next.js and Node.js',
        'Comfortable with PostgreSQL and an ORM (Prisma preferred)',
        'Experience shipping production apps end to end',
        'Bonus: experience integrating LLM APIs (OpenAI, Gemini)'
      ]
    }
  });

  await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-jall-technologies' },
    update: {},
    create: {
      slug: 'welcome-to-jall-technologies',
      title: 'Welcome to Jall Technologies',
      excerpt:
        'Why we started Jall Technologies, and what we\u2019re building across software, AI, and fintech.',
      content: 'Full post content goes here.',
      author: 'Jall Technologies Team',
      category: 'Company',
      published: true,
      publishedAt: new Date()
    }
  });

  console.log('Seed complete.');
  console.log('  Admin login:  admin@jalltechnologies.com / ChangeMe123!');
  console.log('  Client login: client@example.com / ClientDemo123!');
  console.log('  CHANGE BOTH PASSWORDS before deploying to production.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
