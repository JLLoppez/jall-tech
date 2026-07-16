export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  industry: string;
  icon: string;
  color: string;
  status: 'Live' | 'Beta' | 'In Development';
};

export const products: Product[] = [
  {
    slug: 'journeybook',
    name: 'JourneyBook',
    tagline: 'Travel planning, simplified',
    summary:
      'A collaborative trip-planning app that turns scattered links, bookings, and ideas into one shared itinerary.',
    industry: 'Travel & Consumer',
    icon: 'MapPinned',
    color: '#3B82F6',
    status: 'Live'
  },
  {
    slug: 'capeverse',
    name: 'Capeverse',
    tagline: 'Local discovery for Cape Town',
    summary:
      'A curated guide to events, restaurants, and experiences in Cape Town, built for both locals and visitors.',
    industry: 'Local Discovery',
    icon: 'Compass',
    color: '#D4A017',
    status: 'Beta'
  },
  {
    slug: 'voices-of-africa',
    name: 'Voices of Africa',
    tagline: 'Stories from across the continent',
    summary:
      'A publishing platform giving African writers and journalists a home for long-form storytelling.',
    industry: 'Media & Publishing',
    icon: 'Mic2',
    color: '#15803D',
    status: 'Beta'
  },
  {
    slug: 'blom',
    name: 'Blom',
    tagline: 'AI-assisted plant care',
    summary:
      'Computer-vision plant identification and care reminders for home gardeners, powered by our in-house vision models.',
    industry: 'Consumer / AI',
    icon: 'Sprout',
    color: '#16A34A',
    status: 'In Development'
  },
  {
    slug: 'family-finance-platform',
    name: 'Family Finance Platform',
    tagline: 'Household budgeting that fits real families',
    summary:
      'Shared budgeting and savings goals for households, with permissions built for parents, teens, and partners.',
    industry: 'Fintech',
    icon: 'PiggyBank',
    color: '#0B1B33',
    status: 'In Development'
  },
  {
    slug: 'lumo-pay',
    name: 'Lumo Pay',
    tagline: 'Payments infrastructure for small merchants',
    summary:
      'A lightweight payments and invoicing layer for small businesses, built to work reliably on patchy connectivity.',
    industry: 'Fintech',
    icon: 'CreditCard',
    color: '#B3830F',
    status: 'In Development'
  }
];
