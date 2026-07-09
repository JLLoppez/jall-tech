import { describe, it, expect } from 'vitest';
import { contactSchema } from './schemas';

const validPayload = {
  name: 'Jose Lopes',
  email: 'jose@example.com',
  company: 'Jall Technologies',
  phone: '',
  inquiryType: 'GENERAL' as const,
  message: 'I would like to discuss a new project.'
};

describe('contactSchema', () => {
  it('accepts a valid payload', () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects a name that is too short', () => {
    const result = contactSchema.safeParse({ ...validPayload, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email address', () => {
    const result = contactSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a message under 10 characters', () => {
    const result = contactSchema.safeParse({ ...validPayload, message: 'too short' });
    expect(result.success).toBe(false);
  });

  it('rejects an inquiryType outside the allowed enum', () => {
    const result = contactSchema.safeParse({ ...validPayload, inquiryType: 'NOT_REAL' });
    expect(result.success).toBe(false);
  });

  it('allows the honeypot field to be empty (real users)', () => {
    const result = contactSchema.safeParse({ ...validPayload, website: '' });
    expect(result.success).toBe(true);
  });

  it('still parses successfully when the honeypot is filled \u2014 rejection happens at the route level, not schema level', () => {
    const result = contactSchema.safeParse({ ...validPayload, website: 'http://spam.example' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('http://spam.example');
    }
  });

  it('treats optional fields (company, phone) as optional', () => {
    const { company, phone, ...rest } = validPayload;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });
});
