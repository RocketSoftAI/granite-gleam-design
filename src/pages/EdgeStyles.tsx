import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EdgeStyles = () => {
  const customSEO = {
    title: 'Edge Styles - Countertop Edge Profiles | Stoneworks of Colorado',
    description:
      'Explore our variety of countertop edge styles including standard and custom edge profiles. Find the perfect edge detail for your granite or quartz countertops.',
    canonicalPath: '/edge-styles',
  };

  return (
    <Layout>
      <SEOHead customSEO={customSEO} />

      {/* Compact Header */}
      <section className="bg-charcoal pt-24 pb-6">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/stock-program"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stock Program
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary-foreground mb-2">
                Edge Styles
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Stoneworks of Colorado offers a variety of edging styles for your next renovation or new home project.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-fit">
              <a href="/documents/edge-styles.pdf" download className="inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Display */}
      <section className="bg-muted py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-background rounded-lg overflow-hidden shadow-lg">
            <img
              src="/images/documents/edge-styles.jpg"
              alt="Edge Styles - Standard and Custom Edge Profiles for Countertops"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EdgeStyles;
