# SEO & Performance Implementation Checklist

## ✅ Completed Outputs

### 1. Metadata Control
- **Location**: `src/config/seo.ts`
- Per-page SEO config with title, description, canonical, OG tags
- `<SEOHead>` component dynamically updates meta tags per route
- Twitter Card tags included

### 2. Sitemap + Robots
- **Sitemap**: `/sitemap.xml` (public/sitemap.xml)
- **Robots**: `/robots.txt` (public/robots.txt) - references sitemap
- Canonical domain: `https://stoneworksco.com` (no www, no trailing slash)

### 3. Redirect Control
- **Location**: `src/config/redirects.ts`
- Client-side redirects via `<RedirectHandler>` component
- Export functions for Vercel/Netlify conversion
- **Note**: For true 301s, apply at hosting layer (see file comments)

### 4. Schema Markup (JSON-LD)
- **LocalBusiness**: Homepage (`src/pages/Index.tsx`)
- **Product**: Each material page (`src/pages/services/MaterialPage.tsx`)
- **FAQPage**: FAQ page + material page FAQ sections
- **BlogPosting**: Each blog post (`src/pages/blog/BlogPost.tsx`)
- **BreadcrumbList**: Material pages, blog posts

### 5. Performance Levers
- Font preloading in `index.html` with `font-display: swap`
- DNS prefetch for Google Tag Manager
- GA4 lazy-loaded with 2-second delay
- Images use responsive sizing patterns

### 6. Measurement Hooks
- **GA4**: `src/components/Analytics.tsx`
- Replace `G-XXXXXXXXXX` with your Measurement ID
- Form tracking helpers: `trackHeroFormSubmit()`, `trackQuoteFormSubmit()`, etc.

---

## Quick Reference: Where Things Live

| What | Location |
|------|----------|
| Page metadata | `src/config/seo.ts` → `PAGE_SEO` |
| Site-wide config | `src/config/seo.ts` → `SITE_CONFIG` |
| Redirects | `src/config/redirects.ts` → `REDIRECTS` |
| Sitemap | `public/sitemap.xml` |
| Robots.txt | `public/robots.txt` |
| GA4 setup | `src/components/Analytics.tsx` |
| Schema generators | `src/config/seo.ts` |

---

## Before Launch Checklist

- [ ] Update `SITE_CONFIG.domain` if different from `stoneworksco.com`
- [ ] Replace GA4 ID (`G-XXXXXXXXXX`) with real Measurement ID
- [ ] Create and add `/og-image.jpg` to public folder
- [ ] Add logo at `/logo.png` for schema
- [ ] Verify redirects match old site structure
- [ ] Test JSON-LD in [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Compress hero images to ~150KB target
- [ ] Configure 301 redirects at hosting layer for production
