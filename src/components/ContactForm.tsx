'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormValues } from '@/lib/schemas';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const inquiryOptions: { value: ContactFormValues['inquiryType']; label: string }[] = [
  { value: 'GENERAL', label: 'General Inquiry' },
  { value: 'SERVICES', label: 'Project / Services' },
  { value: 'PARTNERSHIP', label: 'Partnership' },
  { value: 'CAREERS', label: 'Careers' },
  { value: 'SUPPORT', label: 'Support' }
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { inquiryType: 'GENERAL' }
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Something went wrong. Please try again.');
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="text-success mx-auto mb-4" size={36} />
        <h3 className="mb-2">Message sent</h3>
        <p className="mb-5">
          Thanks for reaching out. We reply to every inquiry within one business day.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-5" noValidate>
      {/* Honeypot field: hidden from real users via CSS, but visible to bots that
          auto-fill every form field. Left blank by humans, filled by bots. */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
            Full name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm focus:border-sky"
            placeholder="Jose Lopes"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-danger text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm focus:border-sky"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-danger text-xs mt-1.5">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
            Company <span className="text-gray-medium font-normal">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            {...register('company')}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm focus:border-sky"
            placeholder="Your company"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
            Phone <span className="text-gray-medium font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm focus:border-sky"
            placeholder="+27 00 000 0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="inquiryType" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
          What&apos;s this about?
        </label>
        <select
          id="inquiryType"
          {...register('inquiryType')}
          className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm bg-white focus:border-sky"
        >
          {inquiryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-heading font-semibold text-midnight mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full border border-gray-200 rounded-md px-3.5 py-2.5 text-sm focus:border-sky resize-y"
          placeholder="Tell us about your project, timeline, and goals..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-danger text-xs mt-1.5">{errors.message.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2.5 bg-red-50 text-danger text-sm rounded-md p-3.5">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
