import { PrismaClient } from '@prisma/client';

// Reuse a single PrismaClient across hot reloads in development, and across
// serverless invocations that share a warm container. Without this, dev mode
// creates a new client (and a new connection pool) on every file save, and
// serverless platforms can exhaust the database's connection limit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
