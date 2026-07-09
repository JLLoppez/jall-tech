import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/schemas';

// --- Basic in-memory rate limiting -----------------------------------------
// Limits repeat submissions per IP within a rolling window. This is a
// best-effort guard, not a hard security boundary: on serverless platforms
// (Vercel) each function instance has its own memory, so a determined bot
// distributed across instances could get around it. For real production
// traffic, swap this for Upstash Redis or Vercel KV-backed rate limiting.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
// -----------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot tripped: silently pretend success so bots don't learn to adapt,
  // but never write the submission to the database.
  if (parsed.data.website) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  const { name, email, company, phone, inquiryType, message } = parsed.data;

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        phone: phone || null,
        inquiryType,
        message
      }
    });

    // Optional: trigger an email notification here (e.g. via Resend, SendGrid, or Nodemailer)
    // using process.env credentials configured in .env.

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error('Failed to save contact submission:', err);
    return NextResponse.json(
      { error: 'We could not save your message. Please try again shortly.' },
      { status: 500 }
    );
  }
}
