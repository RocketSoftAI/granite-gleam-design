import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

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
 * For schema markup, pass the `schema` prop with appropriate JSON-LD.
 */
const Layout = ({ children, customSEO, schema }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead customSEO={customSEO} schema={schema} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
