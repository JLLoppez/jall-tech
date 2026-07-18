import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import './globals.css';

const heading = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap'
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap'
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jalltechnologies.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jall Technologies — Software, AI & Fintech Solutions',
    template: '%s | Jall Technologies'
  },
  description:
    'Jall Technologies builds custom software, AI & automation, cloud infrastructure, and fintech products for clients across Africa and beyond.',
  openGraph: {
    type: 'website',
    siteName: 'Jall Technologies',
    title: 'Jall Technologies',
    description:
      'Custom software, AI & automation, cloud infrastructure, and fintech solutions.'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-midnight focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
