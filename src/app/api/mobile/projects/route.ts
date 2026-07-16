import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

/**
 * Returns the logged-in client's projects and their updates as JSON.
 *
 * NOTE: this uses the same cookie-based session as the web app, so it only
 * works for callers that share that cookie jar (e.g. a webview-based mobile
 * shell). A native mobile app talking to this API directly will need
 * token-based auth instead (e.g. NextAuth's JWT strategy issuing a bearer
 * token, or a separate API-key scheme) — cookie sessions don't carry over to
 * a native HTTP client. Left as a follow-up since it depends on which mobile
 * approach (webview vs. native) the team goes with.
 */
export async function GET() {
  const session = await auth();

  if (!session || session.user.role !== 'CLIENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { clientId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    include: { updates: { orderBy: { createdAt: 'desc' } } }
  });

  return NextResponse.json({ projects });
}
