// JSON-LD builders. Everything references the single business node (#business)
// so search engines see one consistent entity across the whole site.
import { site } from '../data/site';

const abs = (path: string) => new URL(path, site.url).href;
export const BUSINESS_ID = `${site.url}/#business`;
export const CHEF_ID = `${site.url}/#chef`;

export function businessSchema(imageUrl?: string, logoUrl?: string) {
  return {
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: ['BabyBlue Catering', 'Baby Blue Catering'],
    description:
      'Modern catering and private chef experiences in McKinney, Texas: in-home dinner parties, sushi parties, weddings, corporate events and personal chef services.',
    url: site.url + '/',
    telephone: site.phoneE164,
    email: site.email,
    image: imageUrl,
    logo: logoUrl,
    priceRange: site.priceRange,
    servesCuisine: ['American', 'Modern American', 'Japanese', 'Sushi', 'Seasonal'],
    foundingDate: String(site.foundingYear),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: site.serviceArea.map((name) => ({
      '@type': 'City',
      name: `${name}, ${site.region}`,
    })),
    founder: { '@id': CHEF_ID },
    sameAs: Object.values(site.social),
    acceptsReservations: 'True',
  };
}

export function chefSchema(imageUrl?: string) {
  return {
    '@type': 'Person',
    '@id': CHEF_ID,
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    worksFor: { '@id': BUSINESS_ID },
    image: imageUrl,
    knowsAbout: ['Catering', 'Private chef services', 'Sushi', 'Event planning', 'Seasonal cuisine'],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url + '/',
    name: site.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

type MenuLike = {
  title: string;
  style: string;
  courses: { name: string; items: { name: string; description?: string }[] }[];
};

export function menuSchema(menu: MenuLike) {
  return {
    '@type': 'Menu',
    name: `${menu.title} (${menu.style})`,
    hasMenuSection: menu.courses.map((c) => ({
      '@type': 'MenuSection',
      name: c.name,
      hasMenuItem: c.items.map((i) => ({
        '@type': 'MenuItem',
        name: i.name,
        description: i.description,
      })),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
  category: string;
  price?: { from?: number; unit?: string };
  menus?: MenuLike[];
}) {
  const { price } = opts;
  return {
    '@type': 'Service',
    '@id': abs(opts.path) + '#service',
    name: opts.name,
    serviceType: opts.category,
    description: opts.description,
    url: abs(opts.path),
    image: opts.image,
    provider: { '@id': BUSINESS_ID },
    areaServed: site.serviceArea.map((name) => ({ '@type': 'City', name: `${name}, ${site.region}` })),
    offers:
      price?.from != null
        ? {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: price.from,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              priceCurrency: 'USD',
              minPrice: price.from,
              unitText: price.unit,
            },
            availability: 'https://schema.org/InStock',
            url: abs(opts.path),
          }
        : undefined,
    hasMenu: opts.menus?.length ? opts.menus.map(menuSchema) : undefined,
  };
}

export function graph(...nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
