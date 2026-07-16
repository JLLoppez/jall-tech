import { describe, it, expect } from 'vitest';
import { contactSchema, loginSchema, newPasswordSchema } from './schemas';

describe('contactSchema', () => {
  const valid = {
    name: 'Jose Lopes',
    email: 'jose@example.com',
    inquiryType: 'GENERAL' as const,
    message: 'This is a long enough message to pass validation.'
  };

  it('accepts a valid submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a missing/invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a message that is too short', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'short' });
    expect(result.success).toBe(false);
  });

  it('parses successfully even with a filled honeypot field (the route decides what to do with it)', () => {
    const result = contactSchema.safeParse({ ...valid, website: 'http://spam.example.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('http://spam.example.com');
    }
  });

  it('accepts an empty honeypot field', () => {
    const result = contactSchema.safeParse({ ...valid, website: '' });
    expect(result.success).toBe(true);
  });
});

describe('loginSchema', () => {
  it('accepts a valid email and non-empty password', () => {
    expect(loginSchema.safeParse({ email: 'a@b.com', password: 'x' }).success).toBe(true);
  });

  it('rejects an empty password', () => {
    expect(loginSchema.safeParse({ email: 'a@b.com', password: '' }).success).toBe(false);
  });
});

describe('newPasswordSchema', () => {
  it('rejects passwords under 8 characters', () => {
    expect(newPasswordSchema.safeParse('Ab1').success).toBe(false);
  });

  it('rejects passwords without a number', () => {
    expect(newPasswordSchema.safeParse('onlyletters').success).toBe(false);
  });

  it('accepts a password with letters and numbers, 8+ chars', () => {
    expect(newPasswordSchema.safeParse('Password123').success).toBe(true);
  });
});
