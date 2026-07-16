import { Resend } from 'resend';

const FROM_ADDRESS = process.env.EMAIL_FROM || 'Jall Technologies <notifications@jalltechnologies.com>';

let resend: Resend | null = null;
function getClient(): Resend | null {
  if (resend) return resend;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend = new Resend(apiKey);
  return resend;
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const client = getClient();
  if (!client) {
    // No email provider configured. Log instead of throwing so callers that
    // treat email as best-effort (e.g. the contact route) aren't broken in
    // local/dev environments that haven't set RESEND_API_KEY yet.
    console.warn(`[email] RESEND_API_KEY not set — skipping send of "${subject}" to ${to}`);
    return;
  }

  const { error } = await client.emails.send({ from: FROM_ADDRESS, to, subject, html });
  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function baseTemplate(title: string, bodyHtml: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #3C4353;">
      <div style="background: #0B1B33; padding: 24px 32px; border-radius: 10px 10px 0 0;">
        <span style="color: #D4A017; font-weight: 700; font-size: 13px; letter-spacing: 0.1em;">JALL TECHNOLOGIES</span>
      </div>
      <div style="border: 1px solid #F5F6F8; border-top: none; border-radius: 0 0 10px 10px; padding: 32px;">
        <h1 style="font-size: 18px; color: #0B1B33; margin: 0 0 16px;">${title}</h1>
        ${bodyHtml}
      </div>
    </div>
  `;
}

export function contactNotificationEmail({
  name,
  email,
  company,
  inquiryType,
  message
}: {
  name: string;
  email: string;
  company?: string | null;
  inquiryType: string;
  message: string;
}): string {
  return baseTemplate(
    'New contact form submission',
    `
      <p style="margin: 0 0 8px;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${company ? `<p style="margin: 0 0 8px;"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
      <p style="margin: 0 0 8px;"><strong>Type:</strong> ${escapeHtml(inquiryType)}</p>
      <p style="margin: 16px 0 0; white-space: pre-wrap; background: #F5F6F8; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</p>
    `
  );
}

export function passwordResetEmail({ resetUrl }: { resetUrl: string }): string {
  return baseTemplate(
    'Reset your password',
    `
      <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6;">
        We received a request to reset your password. This link expires in 1 hour.
        If you didn't request this, you can safely ignore this email.
      </p>
      <a href="${resetUrl}" style="display: inline-block; background: #0B1B33; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Reset Password
      </a>
    `
  );
}

export function projectUpdateEmail({
  projectName,
  updateTitle,
  updateBody,
  portalUrl
}: {
  projectName: string;
  updateTitle: string;
  updateBody: string;
  portalUrl: string;
}): string {
  return baseTemplate(
    `New update on ${escapeHtml(projectName)}`,
    `
      <p style="margin: 0 0 8px; font-weight: 600;">${escapeHtml(updateTitle)}</p>
      <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(updateBody)}</p>
      <a href="${portalUrl}" style="display: inline-block; background: #0B1B33; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
        View in Client Portal
      </a>
    `
  );
}
