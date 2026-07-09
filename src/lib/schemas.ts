import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  company: z.string().trim().optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
  inquiryType: z.enum(['GENERAL', 'SERVICES', 'PARTNERSHIP', 'CAREERS', 'SUPPORT']),
  message: z.string().trim().min(10, 'Tell us a little more \u2014 at least 10 characters'),
  // Honeypot: a hidden field real users never see or fill. Bots that auto-fill every
  // input on the page will populate this. It's intentionally unconstrained here so
  // requests with it filled in pass validation and reach the API route, which then
  // silently no-ops instead of exposing a rejection reason to whatever filled it in.
  website: z.string().optional().or(z.literal(''))
});

export type ContactFormValues = z.infer<typeof contactSchema>;
