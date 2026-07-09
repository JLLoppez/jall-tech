import type { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jall Technologies to start your next software or AI project.'
};

const details = [
  { icon: MapPin, label: 'Location', value: 'Cape Town, South Africa' },
  { icon: Mail, label: 'Email', value: 'hello@jalltechnologies.com' },
  { icon: Clock, label: 'Response time', value: 'Within 1 business day' }
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow">Contact</span>
          <h1 className="text-white mb-6">Let&apos;s build something</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Whether it&apos;s a full product build, an AI integration, or a technical
            second opinion \u2014 tell us what you need.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <h2 className="mb-6">Get in touch</h2>
            <div className="space-y-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-3.5">
                  <div className="h-10 w-10 rounded-lg bg-gray-light flex items-center justify-center shrink-0">
                    <d.icon size={18} className="text-midnight" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wide text-gray-medium mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-sm text-gray-dark mb-0">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
