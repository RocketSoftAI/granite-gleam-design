import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import InfoCards from '@/components/InfoCards';
import StoneGallery from '@/components/StoneGallery';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { stoneCategories, infoCards } from '@/data/stockProgram';

const StockProgram = () => {
  const customSEO = {
    title: 'Stock Program - In-Stock Granite & Quartz Colors | Stoneworks of Colorado',
    description:
      'Browse our extensive inventory of in-stock granite and quartz countertop colors. Quick turnaround times and competitive pricing on premium stone materials.',
    canonicalPath: '/stock-program',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stoneworks.lovable.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stock Program',
        item: 'https://stoneworks.lovable.app/stock-program',
      },
    ],
  };

  return (
    <Layout>
      <SEOHead
        customSEO={customSEO}
        schema={breadcrumbSchema}
      />

      {/* Compact Header - minimal spacing */}
      <section className="bg-charcoal pt-24 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary-foreground mb-3">
            Stock Program
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl text-sm md:text-base">
            Browse our extensive in-stock selection of premium granite and quartz countertop colors. 
            Available for quick turnaround at competitive prices.
          </p>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Intro text - more compact */}
          <div className="max-w-3xl mb-8">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Click the cards below for detailed information. Colors and samples are for visual reference only; 
              actual product may vary. Client is encouraged to view front slab 7-10 business days before install.
            </p>
          </div>

          {/* Info Cards */}
          <InfoCards cards={infoCards} />

          {/* Stone Galleries */}
          <StoneGallery categories={stoneCategories} />

          {/* Bottom CTA */}
          <ScrollAnimation variant="fadeUp" className="mt-12 text-center">
            <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Contact us today to learn more about our stock program and current specials.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
};

export default StockProgram;
