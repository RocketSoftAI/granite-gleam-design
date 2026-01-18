// SEO Configuration - Centralized metadata management for all routes
// Update this file to change page metadata, OG tags, and schema markup

export interface PageSEO {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  image: string;
  areaServed: string[];
}

// ============================================
// SITE-WIDE CONFIGURATION
// ============================================

export const SITE_CONFIG = {
  name: 'Stoneworks of Colorado',
  domain: 'https://stoneworksco.com',
  defaultOgImage: 'https://stoneworksco.com/og-image.jpg',
  twitterHandle: '@StoneworksCO',
  phone: '(970) 493-1992',
  email: 'office@stoneworksofcolorado.com',
  address: {
    street: '3555 S Lincoln Ave',
    city: 'Loveland',
    state: 'CO',
    zip: '80537',
    country: 'US',
  },
  coordinates: {
    lat: 40.3641,
    lng: -105.0750,
  },
  hours: ['Mo-Fr 08:00-12:00', 'Mo-Fr 13:00-16:00'],
  priceRange: '$$',
  serviceAreas: [
    'Fort Collins',
    'Loveland',
    'Windsor',
    'Greeley',
    'Longmont',
    'Boulder',
    'Estes Park',
    'Wellington',
    'Timnath',
    'Johnstown',
  ],
};

// ============================================
// PER-PAGE SEO CONFIGURATION
// ============================================

export const PAGE_SEO: Record<string, PageSEO> = {
  '/': {
    title: 'Stoneworks of Colorado | Custom Stone & Granite Countertops',
    description: "Northern Colorado's premier custom stone fabricator. 20+ years crafting granite, quartz, marble & quartzite countertops. Free consultation. Lifetime warranty.",
    canonicalPath: '/',
    ogType: 'website',
  },
  '/services': {
    title: 'Countertop Materials | Granite, Quartz, Quartzite | Stoneworks CO',
    description: 'Explore our premium countertop materials: granite, quartz, quartzite, and porcelain. Expert fabrication and installation in Northern Colorado.',
    canonicalPath: '/services',
  },
  '/services/granite-countertops': {
    title: 'Granite Countertops Fort Collins | Natural Stone | Stoneworks CO',
    description: 'Premium granite countertops in Fort Collins & Northern Colorado. Heat-resistant, unique patterns, lifetime durability. Free estimate & professional installation.',
    canonicalPath: '/services/granite-countertops',
    ogType: 'product',
  },
  '/services/quartz-countertops': {
    title: 'Quartz Countertops Fort Collins | Low Maintenance | Stoneworks CO',
    description: 'Engineered quartz countertops in Fort Collins. Non-porous, stain-resistant, zero maintenance. Wide color selection. Free consultation.',
    canonicalPath: '/services/quartz-countertops',
    ogType: 'product',
  },
  '/services/quartzite-countertops': {
    title: 'Quartzite Countertops Fort Collins | Premium Stone | Stoneworks CO',
    description: "Nature's hardest stone with marble-like beauty. Quartzite countertops in Northern Colorado. Heat & scratch resistant. Expert installation.",
    canonicalPath: '/services/quartzite-countertops',
    ogType: 'product',
  },
  '/services/porcelain-countertops': {
    title: 'Porcelain Countertops Fort Collins | Ultra-Thin Luxury | Stoneworks',
    description: 'Modern porcelain slab countertops. Extreme heat resistance, zero maintenance, UV stable. Perfect for indoor & outdoor kitchens in Colorado.',
    canonicalPath: '/services/porcelain-countertops',
    ogType: 'product',
  },
  '/about': {
    title: 'About Stoneworks of Colorado | 20+ Years of Excellence',
    description: 'Family-owned stone fabricator since 2003. Meet our expert team, explore our state-of-the-art facility, and learn what sets Stoneworks apart.',
    canonicalPath: '/about',
  },
  '/process': {
    title: 'Our Process | From Selection to Installation | Stoneworks CO',
    description: 'Learn about our 5-step countertop process: consultation, material selection, templating, fabrication, and professional installation.',
    canonicalPath: '/process',
  },
  '/contact': {
    title: 'Contact Stoneworks of Colorado | Free Consultation',
    description: 'Get a free countertop consultation. Visit our Fort Collins showroom, call (970) 555-0123, or request a quote online. Same-day response.',
    canonicalPath: '/contact',
  },
  '/reviews': {
    title: 'Customer Reviews | 5-Star Rated | Stoneworks of Colorado',
    description: 'Read verified reviews from Northern Colorado homeowners. 4.9/5 rating from 200+ customers. See why clients choose Stoneworks.',
    canonicalPath: '/reviews',
  },
  '/faq': {
    title: 'FAQ | Countertop Questions Answered | Stoneworks of Colorado',
    description: 'Find answers about granite vs quartz, pricing, installation timeline, maintenance, and more. Expert countertop guidance.',
    canonicalPath: '/faq',
  },
  '/portfolio': {
    title: 'Portfolio | Countertop Projects | Stoneworks of Colorado',
    description: 'Browse our gallery of completed kitchen and bathroom countertop projects across Northern Colorado. Granite, quartz, quartzite installations.',
    canonicalPath: '/portfolio',
  },
  '/service-area': {
    title: 'Service Area | Northern Colorado | Stoneworks of Colorado',
    description: 'Serving Fort Collins, Loveland, Windsor, Greeley, Longmont, Boulder & beyond. Professional countertop installation across Northern Colorado.',
    canonicalPath: '/service-area',
  },
  '/blog': {
    title: 'Countertop Blog | Tips & Guides | Stoneworks of Colorado',
    description: 'Expert advice on countertop materials, care, design trends, and kitchen remodeling. Learn from Northern Colorado stone specialists.',
    canonicalPath: '/blog',
  },
};

// ============================================
// SCHEMA GENERATORS
// ============================================

export const generateLocalBusinessSchema = (): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_CONFIG.name,
  description: "Northern Colorado's premier custom stone fabricator specializing in granite, quartz, marble, and quartzite countertops.",
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.zip,
    addressCountry: SITE_CONFIG.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.coordinates.lat,
    longitude: SITE_CONFIG.coordinates.lng,
  },
  openingHours: SITE_CONFIG.hours,
  priceRange: SITE_CONFIG.priceRange,
  image: SITE_CONFIG.defaultOgImage,
  areaServed: SITE_CONFIG.serviceAreas,
});

export const generateProductSchema = (material: {
  name: string;
  description: string;
  priceRange: string;
  image: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${material.name} Countertops`,
  description: material.description,
  image: `${SITE_CONFIG.domain}${material.image}`,
  brand: {
    '@type': 'Brand',
    name: SITE_CONFIG.name,
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: material.priceRange,
      priceCurrency: 'USD',
    },
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
    },
  },
  url: `${SITE_CONFIG.domain}/services/${material.slug}-countertops`,
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBlogPostSchema = (post: {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: `${SITE_CONFIG.domain}${post.image}`,
  author: {
    '@type': 'Person',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.domain}/logo.png`,
    },
  },
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_CONFIG.domain}/blog/${post.slug}`,
  },
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_CONFIG.domain}${item.url}`,
  })),
});

// ============================================
// AEO (Answer Engine Optimization) SCHEMAS
// ============================================

/**
 * HowTo Schema - For process/instructional content
 * Optimized for Google Featured Snippets & AI answer engines
 */
export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format, e.g., "P21D" for 21 days
  estimatedCost?: { currency: string; value: string };
  steps: { name: string; text: string; image?: string }[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: howTo.name,
  description: howTo.description,
  ...(howTo.totalTime && { totalTime: howTo.totalTime }),
  ...(howTo.estimatedCost && {
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: howTo.estimatedCost.currency,
      value: howTo.estimatedCost.value,
    },
  }),
  step: howTo.steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
    ...(step.image && { image: `${SITE_CONFIG.domain}${step.image}` }),
  })),
});

/**
 * Service Schema - For service pages
 * Helps AI engines understand service offerings
 */
export const generateServiceSchema = (service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string[];
  serviceType?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'LocalBusiness',
    name: service.provider || SITE_CONFIG.name,
  },
  areaServed: (service.areaServed || SITE_CONFIG.serviceAreas).map((area) => ({
    '@type': 'City',
    name: area,
  })),
  ...(service.serviceType && { serviceType: service.serviceType }),
});

/**
 * WebPage Schema with speakable - For voice search optimization
 * Marks content that's suitable for text-to-speech by AI assistants
 */
export const generateWebPageSchema = (page: {
  name: string;
  description: string;
  url: string;
  speakableSelectors?: string[]; // CSS selectors for speakable content
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: page.name,
  description: page.description,
  url: `${SITE_CONFIG.domain}${page.url}`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.domain,
  },
  ...(page.speakableSelectors && {
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: page.speakableSelectors,
    },
  }),
});

/**
 * Organization Schema with enhanced details
 * Comprehensive org data for knowledge panels
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.domain,
  logo: `${SITE_CONFIG.domain}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'customer service',
    areaServed: 'US',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.zip,
    addressCountry: SITE_CONFIG.address.country,
  },
  sameAs: [
    // Add social media URLs here
    // 'https://www.facebook.com/stoneworksco',
    // 'https://www.instagram.com/stoneworksco',
  ],
});
