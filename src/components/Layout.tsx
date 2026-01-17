import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PromoBanner from '@/components/PromoBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';

interface LayoutProps {
  children: React.ReactNode;
  /** Custom SEO overrides for dynamic pages */
  customSEO?: {
    title?: string;
    description?: string;
    canonicalPath?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    noIndex?: boolean;
  };
  /** JSON-LD schema(s) for the page */
  schema?: object | object[];
  /** Hide promo banner (e.g., on contact page) */
  hidePromoBanner?: boolean;
  /** Hide sticky mobile CTA */
  hideStickyMobileCTA?: boolean;
}

/**
 * Layout Component - Wraps all pages with consistent structure
 * 
 * SEO CONTRACT: All pages using Layout automatically get:
 * - Dynamic meta tags from SEOHead (based on route + optional overrides)
 * - Canonical URLs
 * - OpenGraph tags
 * - Twitter Card tags
 * 
 * CONVERSION OPTIMIZATION:
 * - Promo banner (urgency/scarcity)
 * - Sticky mobile CTA (persistent access to contact)
 * - Exit intent popup (lead capture)
 * 
 * For schema markup, pass the `schema` prop with appropriate JSON-LD.
 */
const Layout = ({ children, customSEO, schema, hidePromoBanner, hideStickyMobileCTA }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead customSEO={customSEO} schema={schema} />
      {!hidePromoBanner && <PromoBanner />}
      <Navbar />
      <main>{children}</main>
      <Footer />
      {!hideStickyMobileCTA && <StickyMobileCTA />}
      <ExitIntentPopup />
    </div>
  );
};

export default Layout;
