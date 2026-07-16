import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  company: z.string().trim().max(150).optional().or(z.literal('')),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  inquiryType: z.enum(['GENERAL', 'SERVICES', 'PARTNERSHIP', 'CAREERS', 'SUPPORT']),
  message: z.string().trim().min(10, 'Message must be at least 10 characters.').max(5000),
  // Honeypot: real users never see or fill this field (hidden via CSS in
  // the form). Left as a plain optional string — it must parse successfully
  // either way, since the contact route checks its value itself to decide
  // whether to silently no-op instead of rejecting outright.
  website: z.string().max(200).optional().or(z.literal(''))
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

export const newPasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .max(200)
  .refine((val) => /[a-zA-Z]/.test(val) && /[0-9]/.test(val), {
    message: 'Password must contain both letters and numbers.'
  });
