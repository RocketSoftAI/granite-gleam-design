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

  const quartzBrands = [
    'Q Quartz by MSI',
    'Hanstone by ESI',
    'Nustone by Dorado',
    'Cambria',
    'Cosmos',
    'Pental',
    'Sharpstone',
  ];

  return (
    <Layout>
      <SEOHead customSEO={customSEO} />

      {/* Compact Header */}
      <section className="bg-charcoal pt-24 pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/stock-program"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Stock Program
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary-foreground mb-4">
            Stock Program Colors
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Stoneworks of Colorado has a variety of stock in selection. Contact us today to learn more about our current specials.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Important Notes */}
          <div className="bg-muted/50 rounded-lg p-6 mb-10 border border-border">
            <h2 className="font-medium text-foreground mb-3">Important Information</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Colors above and samples provided are for visual reference only; actual product may vary.</li>
              <li>• Slab selection is not permitted with stock material; client is encouraged to view front slab of current bundle(s) approx. 7-10 business days before install.</li>
              <li>• Leathered/matte materials are more susceptible to oily markings and blemishes; additional client maintenance is necessary.</li>
              <li>• Please ask Stoneworks' salesperson for more information on your selected product.</li>
            </ul>
          </div>

          {/* Quartz Brands */}
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              Quartz Brands Available
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {quartzBrands.map((brand) => (
                <div
                  key={brand}
                  className="bg-muted/50 rounded-lg p-5 border border-border text-center"
                >
                  <span className="font-medium text-foreground">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* View Colors CTA */}
          <div className="bg-primary/10 rounded-lg p-8 text-center mb-10">
            <h3 className="font-serif text-xl font-medium text-foreground mb-3">
              View All Available Colors
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse our complete selection of in-stock granite and quartz colors with photos.
            </p>
            <Button asChild>
              <Link to="/stock-program#granite">View Color Gallery</Link>
            </Button>
          </div>

          {/* Download PDF */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a
                href="/documents/stock-program-colors.pdf"
                download
                className="inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Stock Program PDF
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StockProgramColors;
