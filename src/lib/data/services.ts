export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: string; // lucide-react icon name
};

export const services: Service[] = [
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    summary: 'Web applications, mobile apps, enterprise systems, SaaS platforms, and APIs.',
    description:
      'We design and build production software end to end — from architecture through deployment — for startups, enterprises, and government bodies that need something no template can give them.',
    icon: 'Code2'
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    summary: 'AI assistants, workflow automation, analytics, and machine learning solutions.',
    description:
      'We integrate large language models and automation pipelines into real workflows — support assistants, content generation, document processing, and predictive analytics that save teams hours every week.',
    icon: 'Sparkles'
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    summary: 'Cloud architecture, DevOps, cybersecurity, databases, and scalable infrastructure.',
    description:
      'From CI/CD pipelines to zero-downtime deployments, we build infrastructure that scales with you — hardened, monitored, and cost-efficient from day one.',
    icon: 'Cloud'
  },
  {
    slug: 'fintech',
    name: 'Financial Technology',
    summary: 'Digital wallets, payment platforms, money transfer systems, and virtual cards.',
    description:
      'We build compliant, secure financial products — from payment rails to full digital wallets — designed for financial inclusion across African markets.',
    icon: 'Wallet'
  },
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation',
    summary: 'Modernizing organizations with software, automation, and cloud technologies.',
    description:
      'We help established organizations replace manual processes and legacy systems with modern, maintainable platforms — without disrupting the business while we do it.',
    icon: 'RefreshCw'
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    summary: 'User-centered interfaces and digital experiences.',
    description:
      'Every product we ship starts with research and a design system, not a template — interfaces that are usable on day one and consistent as the product grows.',
    icon: 'PenTool'
  },
  {
    slug: 'maintenance-support',
    name: 'Maintenance & Support',
    summary: 'Ongoing optimization, monitoring, and technical support.',
    description:
      'Software needs upkeep. We offer ongoing SLAs for monitoring, patching, performance tuning, and incident response so your platform stays healthy after launch.',
    icon: 'LifeBuoy'
  },
  {
    slug: 'consulting',
    name: 'Consulting',
    summary: 'Technology strategy, architecture, and product development guidance.',
    description:
      'Sometimes the highest-leverage work is the plan, not the code. We advise on architecture decisions, build-vs-buy calls, and technology roadmaps before you commit budget.',
    icon: 'Compass'
  },
  {
    slug: 'api-integration',
    name: 'API Integration',
    summary: 'Connecting your systems, platforms, and third-party services.',
    description:
      'From payment gateways to travel APIs to CRM systems, we integrate the third-party services your product depends on — reliably, and with proper error handling.',
    icon: 'Plug'
  }
];
