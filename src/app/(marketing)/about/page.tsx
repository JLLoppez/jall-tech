import type { Metadata } from 'next';
import Image from 'next/image';
import { Target, Eye, Lightbulb, ShieldCheck, Award, Users, Rocket } from 'lucide-react';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Jall Technologies is a technology company building digital products and custom software across Africa and beyond.'
};

const values = [
  { icon: Lightbulb, name: 'Innovation', desc: 'We look for the better way, not just the familiar one.' },
  { icon: ShieldCheck, name: 'Integrity', desc: 'We say what we mean and deliver what we promise.' },
  { icon: Award, name: 'Excellence', desc: 'Good enough isn’t. We hold our own bar high.' },
  { icon: Users, name: 'Collaboration', desc: 'The best products come from real partnership with clients.' },
  { icon: Target, name: 'Customer Success', desc: 'Your outcome is the measure of our work, not the code shipped.' },
  { icon: Rocket, name: 'Impact', desc: 'We build things that move the needle, not just things that work.' }
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-midnight">
        <div className="container py-20 max-w-3xl">
          <span className="eyebrow animate-fade-in-up">About Jall Technologies</span>
          <h1 className="text-white mb-6 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            Software built with intent, not shortcuts
          </h1>
          <p className="text-white/70 text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: '160ms' }}>
            Jall Technologies is a software development and technology company focused on
            building innovative digital products and custom software solutions that solve
            real-world problems. We help startups, businesses, governments, NGOs, and
            enterprises transform ideas into scalable digital solutions across Africa and
            beyond.
          </p>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100">
        <div className="container py-12 flex justify-center">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Jall Technologies — Innovate. Build. Empower."
            width={391}
            height={158}
            className="h-16 w-auto sm:h-20"
          />
        </div>
      </div>

      <section className="section">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal className="card p-8 group">
            <Target className="text-gold mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" size={28} />
            <h3 className="mb-2">Our Mission</h3>
            <p className="mb-0">
              To empower people and organizations through innovative technology that creates
              opportunities, drives sustainable growth, and accelerates Africa&apos;s digital
              future.
            </p>
          </Reveal>
          <Reveal delay={100} className="card p-8 group">
            <Eye className="text-gold mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" size={28} />
            <h3 className="mb-2">Our Vision</h3>
            <p className="mb-0">
              To become one of Africa&apos;s leading technology companies, recognized globally
              for building impactful digital products.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-gray-light">
        <div className="container">
          <Reveal className="section-head center mx-auto text-center">
            <span className="eyebrow">What We Stand For</span>
            <h2>Our Core Values</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.name} delay={i * 60}>
                <div className="card card-hover group p-6">
                  <v.icon className="text-midnight mb-3 transition-transform duration-300 group-hover:scale-110" size={24} />
                  <h4 className="mb-1.5 transition-colors duration-200 group-hover:text-gold-600">{v.name}</h4>
                  <p className="text-sm mb-0">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <span className="eyebrow">Who We Work With</span>
            <h2 className="mb-4">Industries we serve</h2>
            <p className="mb-6">
              We work across sectors where good software has an outsized impact — often where
              off-the-shelf tools fall short of what the problem actually needs.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Tourism', 'Finance', 'Healthcare', 'Education', 'Logistics',
                'Government', 'NGOs', 'Retail', 'Startups', 'Enterprises'
              ].map((tag) => (
                <span
                  key={tag}
                  className="badge bg-gray-light text-gray-dark hover:bg-midnight hover:text-white cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">How We Build</span>
            <h2 className="mb-4">Our technology stack</h2>
            <p className="mb-6">
              We favor modern, well-supported tools that scale — not the newest framework for
              its own sake.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Next.js', 'React', 'React Native', 'Node.js / NestJS',
                'PostgreSQL', 'Prisma', 'Docker', 'Cloudflare / Vercel',
                'GitHub Actions', 'AI Integrations (Gemini, OpenAI)'
              ].map((tech) => (
                <div
                  key={tech}
                  className="text-sm font-mono bg-midnight text-white/90 rounded-md px-3 py-2 text-center transition-all duration-200 hover:bg-deep-navy hover:scale-[1.03]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
