import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/schemas';
import { sendEmail, contactNotificationEmail } from '@/lib/email';
import { isRateLimited } from '@/lib/rate-limit';

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`, WINDOW_MS, MAX_REQUESTS_PER_WINDOW)) {
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

    // Notify the team. Best-effort: a failed/unconfigured email never fails
    // the request — the submission is already safely in the database and
    // visible in /admin/messages either way. Awaited (not fire-and-forget)
    // because serverless functions can be frozen/terminated before an
    // un-awaited promise resolves.
    const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL || 'hello@jalltechnologies.com';
    try {
      await sendEmail({
        to: notifyTo,
        subject: `New ${inquiryType.toLowerCase()} inquiry from ${name}`,
        html: contactNotificationEmail({ name, email, company, inquiryType, message })
      });
    } catch (err) {
      console.error('[contact] notification email failed:', err);
    }

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (err) {
    console.error('Failed to save contact submission:', err);
    return NextResponse.json(
      { error: 'We could not save your message. Please try again shortly.' },
      { status: 500 }
    );
  }
}
