import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing the use of the Jall Technologies website and services.'
};

const lastUpdated = 'July 2026';

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <span className="eyebrow">Legal</span>
        <h1 className="mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-medium mb-10">Last updated: {lastUpdated}</p>

        <div className="prose-content space-y-8">
          <div>
            <h3 className="mb-3">1. Acceptance of terms</h3>
            <p>
              By accessing or using the Jall Technologies website (&ldquo;the Site&rdquo;),
              you agree to be bound by these Terms of Service. If you do not agree, please do
              not use the Site.
            </p>
          </div>

          <div>
            <h3 className="mb-3">2. About this website</h3>
            <p>
              This Site provides information about Jall Technologies, our services, and our
              products, and allows visitors to submit inquiries via our contact form. It does
              not itself provide the software products described (JourneyBook, Capeverse,
              Voices of Africa, Blom, and others), which are separate products governed by
              their own terms where applicable.
            </p>
          </div>

          <div>
            <h3 className="mb-3">3. Use of the Site</h3>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-medium">
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Submit false, misleading, or spam content through our forms</li>
              <li>Interfere with the normal operation of the Site</li>
              <li>Scrape, harvest, or bulk-collect data from the Site</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3">4. Intellectual property</h3>
            <p>
              All content on this Site &mdash; including text, graphics, logos, and the Jall
              Technologies brand assets &mdash; is owned by or licensed to Jall Technologies
              and protected by applicable intellectual property laws. You may not reproduce,
              distribute, or create derivative works without our prior written consent.
            </p>
          </div>

          <div>
            <h3 className="mb-3">5. Submitted content</h3>
            <p>
              Information you submit through our contact or careers forms (such as messages,
              cover letters, or resumes) is used solely to respond to your inquiry or
              application, as described in our{' '}
              <a href="/privacy" className="text-sky underline">Privacy Policy</a>.
            </p>
          </div>

          <div>
            <h3 className="mb-3">6. No warranty</h3>
            <p>
              The Site and its content are provided &ldquo;as is&rdquo; without warranties of
              any kind, express or implied. We do not guarantee that the Site will be
              error-free, uninterrupted, or free of harmful components.
            </p>
          </div>

          <div>
            <h3 className="mb-3">7. Limitation of liability</h3>
            <p>
              To the maximum extent permitted by law, Jall Technologies shall not be liable
              for any indirect, incidental, or consequential damages arising from your use of
              the Site.
            </p>
          </div>

          <div>
            <h3 className="mb-3">8. Third-party links</h3>
            <p>
              The Site may contain links to third-party websites. We are not responsible for
              the content or practices of any linked third-party sites.
            </p>
          </div>

          <div>
            <h3 className="mb-3">9. Governing law</h3>
            <p>
              These Terms are governed by the laws of the Republic of South Africa, without
              regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h3 className="mb-3">10. Changes to these terms</h3>
            <p>
              We may update these Terms from time to time. Continued use of the Site after
              changes constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h3 className="mb-3">11. Contact</h3>
            <p>
              Questions about these Terms can be sent to{' '}
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
