# SEO & AEO Implementation Checklist

## ✅ Completed Outputs

### 1. Metadata Control (SEO)
- **Location**: `src/config/seo.ts`
- Per-page SEO config with title, description, canonical, OG tags
- `<SEOHead>` component dynamically updates meta tags per route
- Twitter Card tags included

### 2. Sitemap + Robots (SEO)
- **Sitemap**: `/sitemap.xml` (public/sitemap.xml)
- **Robots**: `/robots.txt` (public/robots.txt) - references sitemap
- Canonical domain: `https://stoneworksco.com` (no www, no trailing slash)

### 3. Redirect Control (SEO)
- **Location**: `src/config/redirects.ts`
- Client-side redirects via `<RedirectHandler>` component
- Export functions for Vercel/Netlify conversion
- **Note**: For true 301s, apply at hosting layer (see file comments)

### 4. Schema Markup - SEO (JSON-LD)
- **LocalBusiness**: Homepage (`src/pages/Index.tsx`)
- **Product**: Each material page (`src/pages/services/MaterialPage.tsx`)
- **FAQPage**: FAQ page + material page FAQ sections
- **BlogPosting**: Each blog post (`src/pages/blog/BlogPost.tsx`)
- **BreadcrumbList**: Material pages, blog posts, process page

### 5. Schema Markup - AEO (Answer Engine Optimization)
- **HowTo**: Process page (optimized for featured snippets)
- **Service**: Available for service pages
- **WebPage with Speakable**: Available for voice search
- **Organization**: Enhanced org schema for knowledge panels

### 6. Performance Levers
- Font preloading in `index.html` with `font-display: swap`
- DNS prefetch for Google Tag Manager
- GA4 lazy-loaded with 2-second delay
- Images use responsive sizing patterns

### 7. Measurement Hooks
- **GA4**: `src/components/Analytics.tsx`
- Replace `G-XXXXXXXXXX` with your Measurement ID
- Form tracking helpers: `trackHeroFormSubmit()`, `trackQuoteFormSubmit()`, etc.

---

## AEO (Answer Engine Optimization) Features

| Feature | Implementation | Purpose |
|---------|---------------|---------|
| FAQPage Schema | FAQ + Material pages | Google FAQ snippets, AI answers |
| HowTo Schema | Process page | Step-by-step featured snippets |
| Product Schema | Material pages | Product knowledge panels |
| BlogPosting Schema | Blog posts | Article rich results |
| Speakable Schema | Available via `generateWebPageSchema` | Voice search optimization |
| Breadcrumbs | All deep pages | Navigation context for AI |
| Q&A Content Structure | FAQ accordions | Direct answer extraction |

---

## Quick Reference: Where Things Live

| What | Location |
|------|----------|
| Page metadata | `src/config/seo.ts` → `PAGE_SEO` |
| Site-wide config | `src/config/seo.ts` → `SITE_CONFIG` |
| Schema generators | `src/config/seo.ts` |
| Redirects | `src/config/redirects.ts` → `REDIRECTS` |
| Sitemap | `public/sitemap.xml` |
| Robots.txt | `public/robots.txt` |
| GA4 setup | `src/components/Analytics.tsx` |
| Layout (auto-SEO) | `src/components/Layout.tsx` |

---

## Creating New Pages - SEO/AEO Contract

When creating any new page, follow this pattern:

```tsx
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { generateFAQSchema, generateBreadcrumbSchema, PAGE_SEO } from '@/config/seo';

const NewPage = () => {
  // 1. Generate appropriate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'New Page', url: '/new-page' },
  ]);

  // 2. Add page to PAGE_SEO in src/config/seo.ts
  // 3. Add page to sitemap.xml

  return (
    <Layout>
      <SEOHead schema={breadcrumbSchema} />
      {/* Page content */}
    </Layout>
  );
};
```

**Required for each new page:**
1. ✅ Add entry to `PAGE_SEO` in `src/config/seo.ts`
2. ✅ Add URL to `public/sitemap.xml`
3. ✅ Include `<SEOHead>` with appropriate schema
4. ✅ Use semantic HTML (single H1, proper heading hierarchy)
5. ✅ Add breadcrumb schema for deep pages
6. ✅ For FAQ content, use FAQPage schema
7. ✅ For instructional content, use HowTo schema

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
- [ ] Add social media URLs to Organization schema
