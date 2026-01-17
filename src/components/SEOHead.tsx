import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_SEO, SITE_CONFIG, PageSEO } from '@/config/seo';

interface SEOHeadProps {
  // Override default SEO for dynamic pages (blog posts, material pages)
  customSEO?: Partial<PageSEO>;
  // JSON-LD schema to inject
  schema?: object | object[];
}

const SEOHead = ({ customSEO, schema }: SEOHeadProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Get base SEO from config, fallback to homepage
  const baseSEO = PAGE_SEO[pathname] || PAGE_SEO['/'];

  // Merge with custom overrides
  const seo: PageSEO = {
    ...baseSEO,
    ...customSEO,
  };

  const fullCanonicalUrl = `${SITE_CONFIG.domain}${seo.canonicalPath}`;
  const ogImage = seo.ogImage || SITE_CONFIG.defaultOgImage;

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    setMetaTag('description', seo.description);
    setMetaTag('robots', seo.noIndex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    setLinkTag('canonical', fullCanonicalUrl);

    // Open Graph tags
    setMetaTag('og:title', seo.title, true);
    setMetaTag('og:description', seo.description, true);
    setMetaTag('og:url', fullCanonicalUrl, true);
    setMetaTag('og:type', seo.ogType || 'website', true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', SITE_CONFIG.name, true);

    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', SITE_CONFIG.twitterHandle);
    setMetaTag('twitter:title', seo.title);
    setMetaTag('twitter:description', seo.description);
    setMetaTag('twitter:image', ogImage);

    // Handle JSON-LD schema
    const existingSchemas = document.querySelectorAll('script[data-seo-schema]');
    existingSchemas.forEach((el) => el.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-schema', `schema-${index}`);
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    // Cleanup function
    return () => {
      const schemaScripts = document.querySelectorAll('script[data-seo-schema]');
      schemaScripts.forEach((el) => el.remove());
    };
  }, [pathname, seo, schema, fullCanonicalUrl, ogImage]);

  return null; // This component only manages document.head
};

export default SEOHead;
