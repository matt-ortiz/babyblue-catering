// Single source of truth for business details (NAP), used by every page,
// the footer, and all structured data. Change it here, it changes everywhere.

export const site = {
  name: 'BabyBlue Modern Catering',
  shortName: 'BabyBlue',
  legalName: 'BabyBlue Modern Catering, LLC',
  tagline: 'Modern ideas, modern service, social atmosphere.',
  url: 'https://babybluecatering.com',
  // TODO(confirm): still the 814 number from the old site — confirm it's current.
  phone: '814-566-5797',
  phoneE164: '+18145665797',
  email: 'jake@babybluecatering.com',
  city: 'McKinney',
  region: 'TX',
  regionName: 'Texas',
  country: 'US',
  // TODO(confirm): service-area cities are an assumption based on McKinney + Collin County.
  serviceArea: [
    'McKinney',
    'Frisco',
    'Allen',
    'Plano',
    'Prosper',
    'Celina',
    'Fairview',
    'Lucas',
    'Melissa',
    'Anna',
    'Richardson',
    'Dallas',
  ],
  priceRange: '$$$',
  founder: {
    name: 'Jacob Thaller Ritenour',
    shortName: 'Chef Jacob',
    jobTitle: 'Owner & Executive Chef',
  },
  social: {
    facebook: 'https://www.facebook.com/babybluecatering',
    instagram: 'https://www.instagram.com/babybluecatering',
  },
  // Formspark form ID — create the form at https://formspark.io and paste its ID here.
  formsparkId: 'REPLACE_WITH_FORMSPARK_ID',
  foundingYear: 2014,
  // Shows "update requested" tags and placeholder briefs on photo slots.
  // Set to false before launch (see src/data/photos.ts and /photo-shot-list/).
  showPhotoNotes: true,
};

export const nav = [
  { label: 'In-Home', href: '/in-home-catering/' },
  { label: 'Weddings & Events', href: '/wedding-event-catering/' },
  { label: 'Chef Services', href: '/chef-services/' },
  { label: 'Corporate', href: '/corporate-catering/' },
  { label: 'About', href: '/about/' },
];

export const categories = {
  'in-home': {
    label: 'In-Home Experiences',
    href: '/in-home-catering/',
    blurb: 'Dinner parties, sushi nights and romantic evenings, cooked and served in your own home.',
  },
  events: {
    label: 'Weddings & Events',
    href: '/wedding-event-catering/',
    blurb: 'Buffet, family-style, seated and reception catering for weddings and milestone celebrations.',
  },
  chef: {
    label: 'Chef Services',
    href: '/chef-services/',
    blurb: 'Weekly personal chef meals, vacation private chefs and our behind-the-scenes Invisible Chef.',
  },
  corporate: {
    label: 'Corporate Catering',
    href: '/corporate-catering/',
    blurb: 'Luncheons, client dinners and networking events that make a lasting impression.',
  },
} as const;

export type CategoryKey = keyof typeof categories;

export const fineprint =
  'All packages are subject to sales tax and a 25% gratuity. Every menu is designed in collaboration with you, and prices reflect starting points.';
