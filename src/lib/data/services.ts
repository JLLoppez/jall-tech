export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    summary: 'Web and mobile apps built and shipped by a senior team.',
    description:
      'From product discovery through launch and beyond, we design, build, and maintain web and mobile applications end to end — no handoffs to a junior offshore team once the contract is signed.',
    icon: 'Code2'
  },
  {
    slug: 'ai-automation',
    name: 'AI & Automation',
    summary: 'LLM integrations and workflow automation that hold up in production.',
    description:
      'We integrate LLM APIs, build retrieval pipelines, and automate manual workflows — with the evaluation, guardrails, and monitoring needed to run them reliably, not just a demo.',
    icon: 'BrainCircuit'
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infrastructure',
    summary: 'Architecture, CI/CD, and DevOps that scale with you.',
    description:
      'We design cloud infrastructure on AWS, GCP, or Azure, set up CI/CD pipelines, and put monitoring and on-call practices in place so growth doesn\u2019t mean firefighting.',
    icon: 'Cloud'
  },
  {
    slug: 'fintech',
    name: 'Fintech Solutions',
    summary: 'Payments, ledgers, and compliance-aware financial products.',
    description:
      'We\u2019ve built budgeting tools, payment integrations, and ledger systems, with an understanding of the compliance and security bar fintech products need to clear.',
    icon: 'Landmark'
  },
  {
    slug: 'digital-transformation',
    name: 'Digital Transformation',
    summary: 'Modernizing legacy systems without stopping the business.',
    description:
      'We help teams move off legacy platforms in stages — migrating data, rebuilding critical paths first, and keeping the business running throughout the transition.',
    icon: 'Workflow'
  },
  {
    slug: 'mobile-development',
    name: 'Mobile App Development',
    summary: 'Native and cross-platform apps for iOS and Android.',
    description:
      'We build React Native and native mobile apps end to end — from onboarding flows to push notifications and app store submission.',
    icon: 'Smartphone'
  },
  {
    slug: 'product-design',
    name: 'Product Design',
    summary: 'UX research and interface design grounded in real user behavior.',
    description:
      'We design interfaces backed by user research and usability testing, not just visual polish — so what ships actually gets used.',
    icon: 'PenTool'
  },
  {
    slug: 'data-engineering',
    name: 'Data Engineering & Analytics',
    summary: 'Pipelines and dashboards that turn raw data into decisions.',
    description:
      'We build ETL pipelines, data warehouses, and analytics dashboards so teams can make decisions on real numbers instead of gut feel.',
    icon: 'BarChart3'
  },
  {
    slug: 'devops-support',
    name: 'DevOps & Ongoing Support',
    summary: 'SLAs, on-call rotations, and maintenance after launch.',
    description:
      'Launch day isn\u2019t the finish line. We offer ongoing support contracts, SLAs, and on-call coverage so what we ship keeps running well after handoff.',
    icon: 'LifeBuoy'
  }
];
