'use server';

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendEmail, passwordResetEmail } from '@/lib/email';
import { newPasswordSchema } from '@/lib/schemas';
import { isRateLimited } from '@/lib/rate-limit';

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Requests a password reset email. Always resolves the same way regardless
 * of whether the email exists, so this can't be used to enumerate accounts.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();

  // Rate limit by email to slow down abuse (mass reset-email spam against
  // one address) independent of the caller's IP.
  if (isRateLimited(`reset:${normalizedEmail}`, 15 * 60 * 1000, 3)) {
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (!user) {
    // Deliberately silent: don't reveal whether the account exists.
    return;
  }

  // Invalidate any previous outstanding tokens for this user before issuing a
  // new one, so an old, possibly-leaked reset link stops working.
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS)
    }
  });

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${baseUrl}/admin/reset-password/${rawToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Reset your Jall Technologies password',
    html: passwordResetEmail({ resetUrl })
  }).catch((err) => {
    // Don't let an email-provider outage surface as an error to the caller —
    // it would leak account existence via a differently-timed/shaped failure.
    console.error('[requestPasswordReset] failed to send email', err);
  });
}

async function findValidToken(rawToken: string) {
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true }
  });

  if (!record || record.expiresAt < new Date()) {
    return null;
  }
  return record;
}

export async function validateResetToken(
  rawToken: string
): Promise<{ valid: true } | { valid: false; reason: string }> {
  const record = await findValidToken(rawToken);
  if (!record) {
    return {
      valid: false,
      reason: 'This link is invalid or has expired. Reset links are only valid for 1 hour.'
    };
  }
  return { valid: true };
}

export async function resetPassword(
  rawToken: string,
  newPassword: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = newPasswordSchema.safeParse(newPassword);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid password.' };
  }

  const record = await findValidToken(rawToken);
  if (!record) {
    return { ok: false, error: 'This reset link is invalid or has expired. Please request a new one.' };
  }

  const passwordHash = await bcrypt.hash(parsed.data, 12);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    // One-time use: consume every outstanding token for this user, not just
    // the one that was used, so old links can't be replayed.
    prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } })
  ]);

  return { ok: true };
}
