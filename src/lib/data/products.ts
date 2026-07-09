export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  industry: string;
  status: 'Live' | 'In Development' | 'Beta';
  color: string; // accent hex used for this product's badge
  icon: string;
};

export const products: Product[] = [
  {
    slug: 'journeybook',
    name: 'JourneyBook',
    tagline: 'Travel Intelligently',
    summary: 'Smart travel planning and booking platform with real-time flight search and itinerary management.',
    industry: 'Tourism',
    status: 'In Development',
    color: '#2563EB',
    icon: 'Plane'
  },
  {
    slug: 'capeverse',
    name: 'Capeverse',
    tagline: 'Explore Limitlessly',
    summary: 'Destination discovery and luxury tourism ecosystem for Cape Town and beyond, with AI-powered recommendations.',
    industry: 'Tourism',
    status: 'In Development',
    color: '#0EA5A5',
    icon: 'Compass'
  },
  {
    slug: 'voices-of-africa',
    name: 'Voices of Africa',
    tagline: 'Our Stories. Our Heritage.',
    summary: 'A platform preserving African oral history, languages, and heritage through AI-assisted transcription and storytelling.',
    industry: 'Culture & Heritage',
    status: 'In Development',
    color: '#7C3AED',
    icon: 'Mic'
  },
  {
    slug: 'blom',
    name: 'Blom',
    tagline: 'Nature. Nurture. Life.',
    summary: 'A hydration and wellness companion app that helps households build healthier daily habits.',
    industry: 'Health & Wellness',
    status: 'Beta',
    color: '#22C55E',
    icon: 'Droplet'
  },
  {
    slug: 'family-finance-platform',
    name: 'Family Finance Platform',
    tagline: 'Plan Together. Grow Together.',
    summary: 'Family budgeting, saving, and financial management tools built for shared household goals.',
    industry: 'Finance',
    status: 'In Development',
    color: '#D4A017',
    icon: 'PiggyBank'
  },
  {
    slug: 'jall-technologies-services',
    name: 'Jall Technologies Services',
    tagline: 'Custom Solutions, Built Right',
    summary: 'Our custom software and technology consulting arm — for clients who need a dedicated build, not a product.',
    industry: 'Cross-industry',
    status: 'Live',
    color: '#0B2346',
    icon: 'Building2'
  }
];
