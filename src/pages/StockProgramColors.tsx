import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StockProgramColors = () => {
  const customSEO = {
    title: 'Stock Program Colors - Current Specials | Stoneworks of Colorado',
    description:
      'View our current stock program color specials for granite and quartz countertops. Contact us for pricing and availability.',
    canonicalPath: '/stock-program-colors',
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
                Stock Program Colors
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Stoneworks of Colorado has a variety of stock in selection. Contact us today to learn more about our current specials.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-fit">
              <a href="/documents/stock-program-colors.pdf" download className="inline-flex items-center gap-2">
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
              src="/images/documents/stock-program-colors.jpg"
              alt="Stock Program Colors - Granite and Quartz Specials"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StockProgramColors;
