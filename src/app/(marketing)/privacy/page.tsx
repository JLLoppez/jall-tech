import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Jall Technologies collects, uses, and protects your personal information.'
};

const lastUpdated = 'July 2026';

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-medium mb-10">Last updated: {lastUpdated}</p>

        <div className="prose-content space-y-8">
          <div>
            <h3 className="mb-3">1. Who we are</h3>
            <p>
              Jall Technologies (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a
              software development company based in Cape Town, South Africa. This policy
              explains how we collect, use, store, and protect personal information in
              accordance with the Protection of Personal Information Act 4 of 2013
              (&ldquo;POPIA&rdquo;) and, where applicable to visitors outside South Africa,
              other relevant data protection regulations.
            </p>
          </div>

          <div>
            <h3 className="mb-3">2. Information we collect</h3>
            <p className="mb-3">We collect personal information you provide directly to us, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-medium">
              <li>Contact form submissions: name, email address, phone number, company, and message content</li>
              <li>Job applications: name, email, phone, LinkedIn/portfolio links, cover letter, and resume</li>
              <li>Newsletter subscriptions: email address</li>
            </ul>
            <p className="mt-3">
              We do not knowingly collect information from children, and our services are not
              directed at children.
            </p>
          </div>

          <div>
            <h3 className="mb-3">3. How we use your information</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-medium">
              <li>To respond to inquiries submitted through our contact form</li>
              <li>To evaluate job applications</li>
              <li>To send newsletter updates, only to subscribers who have opted in</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3">4. Legal basis for processing</h3>
            <p>
              We process personal information on the basis of your consent (e.g. submitting a
              form), the necessity to take steps toward a contract at your request (e.g. a
              project inquiry), or our legitimate business interests, in each case in a manner
              that does not override your rights as a data subject under POPIA.
            </p>
          </div>

          <div>
            <h3 className="mb-3">5. Data retention</h3>
            <p>
              We retain contact and application submissions only as long as necessary for the
              purpose they were collected for, or as required by law. You may request deletion
              at any time (see Section 7).
            </p>
          </div>

          <div>
            <h3 className="mb-3">6. Data sharing</h3>
            <p>
              We do not sell personal information. We may share information with service
              providers who process data on our behalf (e.g. our hosting and database
              providers), bound by confidentiality obligations, or where required by law.
            </p>
          </div>

          <div>
            <h3 className="mb-3">7. Your rights</h3>
            <p className="mb-3">Under POPIA, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-medium">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Object to the processing of your personal information</li>
              <li>Withdraw consent at any time, where processing is based on consent</li>
              <li>Lodge a complaint with the Information Regulator of South Africa</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@jalltechnologies.com" className="text-sky underline">
                hello@jalltechnologies.com
              </a>.
            </p>
          </div>

          <div>
            <h3 className="mb-3">8. Security</h3>
            <p>
              We apply reasonable technical and organizational measures to protect personal
              information against loss, unauthorized access, and disclosure. No system is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h3 className="mb-3">9. Cookies</h3>
            <p>
              This website may use essential cookies required for basic functionality. We do
              not currently use third-party advertising or tracking cookies.
            </p>
          </div>

          <div>
            <h3 className="mb-3">10. Changes to this policy</h3>
            <p>
              We may update this policy from time to time. Material changes will be reflected
              by updating the &ldquo;Last updated&rdquo; date above.
            </p>
          </div>

          <div>
            <h3 className="mb-3">11. Contact</h3>
            <p>
              For any questions about this policy or how we handle your personal information,
              contact us at{' '}
              <a href="mailto:hello@jalltechnologies.com" className="text-sky underline">
                hello@jalltechnologies.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
