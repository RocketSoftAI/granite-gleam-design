// ============================================
// REDIRECT CONFIGURATION
// ============================================
// 
// This file defines URL redirects for the site rebuild.
// 
// HOW TO USE:
// 1. Add entries to the REDIRECTS array below
// 2. Each entry needs: from (old path), to (new path), statusCode (301 or 302)
// 
// IMPORTANT:
// - Lovable/Vite hosting does not natively support server-side redirects
// - This file serves as documentation and is used by the <RedirectHandler> component
//   for client-side redirects
// - For production 301 redirects, export this config and apply it at your hosting layer
//   (Vercel, Netlify, Cloudflare, etc.)
// 
// EXPORT FOR HOSTING PLATFORMS:
// - Vercel: Convert to vercel.json "redirects" array
// - Netlify: Convert to _redirects file
// - Cloudflare: Convert to _redirects or Page Rules
// 
// Example conversion for Vercel (vercel.json):
// {
//   "redirects": [
//     { "source": "/old-path", "destination": "/new-path", "permanent": true }
//   ]
// }
// 
// Example conversion for Netlify (_redirects):
// /old-path /new-path 301
// 

export interface Redirect {
  from: string;
  to: string;
  statusCode: 301 | 302;
}

// ============================================
// ADD YOUR REDIRECTS HERE
// ============================================

export const REDIRECTS: Redirect[] = [
  // Legacy URL patterns from old site
  // Example: { from: '/granite-countertops', to: '/services/granite-countertops', statusCode: 301 },
  // Example: { from: '/countertops/quartz', to: '/services/quartz-countertops', statusCode: 301 },
  
  // Common legacy patterns to handle:
  { from: '/granite', to: '/services/granite-countertops', statusCode: 301 },
  { from: '/quartz', to: '/services/quartz-countertops', statusCode: 301 },
  { from: '/quartzite', to: '/services/quartzite-countertops', statusCode: 301 },
  { from: '/porcelain', to: '/services/porcelain-countertops', statusCode: 301 },
  { from: '/marble', to: '/services', statusCode: 301 },
  { from: '/materials', to: '/services', statusCode: 301 },
  { from: '/countertops', to: '/services', statusCode: 301 },
  { from: '/gallery', to: '/portfolio', statusCode: 301 },
  { from: '/projects', to: '/portfolio', statusCode: 301 },
  { from: '/work', to: '/portfolio', statusCode: 301 },
  { from: '/our-work', to: '/portfolio', statusCode: 301 },
  { from: '/testimonials', to: '/reviews', statusCode: 301 },
  { from: '/faqs', to: '/faq', statusCode: 301 },
  { from: '/questions', to: '/faq', statusCode: 301 },
  { from: '/locations', to: '/service-area', statusCode: 301 },
  { from: '/areas-served', to: '/service-area', statusCode: 301 },
  { from: '/get-quote', to: '/contact', statusCode: 301 },
  { from: '/quote', to: '/contact', statusCode: 301 },
  { from: '/free-estimate', to: '/contact', statusCode: 301 },
  { from: '/about-us', to: '/about', statusCode: 301 },
  { from: '/our-process', to: '/process', statusCode: 301 },
  { from: '/how-it-works', to: '/process', statusCode: 301 },
  { from: '/articles', to: '/blog', statusCode: 301 },
  { from: '/news', to: '/blog', statusCode: 301 },
  
  // Add more redirects as needed during migration:
  // { from: '/old-path', to: '/new-path', statusCode: 301 },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export const findRedirect = (currentPath: string): Redirect | undefined => {
  return REDIRECTS.find((r) => r.from === currentPath);
};

// Export for hosting platform conversion
export const getVercelRedirects = () => {
  return REDIRECTS.map((r) => ({
    source: r.from,
    destination: r.to,
    permanent: r.statusCode === 301,
  }));
};

export const getNetlifyRedirects = (): string => {
  return REDIRECTS.map((r) => `${r.from} ${r.to} ${r.statusCode}`).join('\n');
};
