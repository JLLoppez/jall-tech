import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import { products } from '@/lib/data/products';
import { LinkedInIcon, XIcon, GitHubIcon, FacebookIcon } from './BrandIcons';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Logo className="h-10 w-10" variant="dark" />
            <span className="font-heading font-bold leading-none">
              JALL
              <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold">
                TECHNOLOGIES
              </span>
            </span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed">
            Building innovative software, AI, cloud, and digital solutions that empower
            businesses across Africa and beyond.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {[
              { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: XIcon, href: 'https://twitter.com', label: 'X (Twitter)' },
              { icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
              { icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' }
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-midnight hover:-translate-y-0.5 hover:scale-110 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-heading text-sm tracking-wide uppercase mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm text-white/65">
            <li><Link href="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
            <li><Link href="/blog" className="hover:text-gold transition-colors">Blog</Link></li>
            <li><Link href="/case-studies" className="hover:text-gold transition-colors">Case Studies</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading text-sm tracking-wide uppercase mb-4">Products</h3>
          <ul className="space-y-2.5 text-sm text-white/65">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products#${p.slug}`} className="hover:text-gold transition-colors">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-heading text-sm tracking-wide uppercase mb-4">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Cape Town, South Africa</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href="mailto:hello@jalltechnologies.com" className="hover:text-gold transition-colors">
                hello@jalltechnologies.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {year} Jall Technologies. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="/admin/login" className="hover:text-gold transition-colors">Client Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
