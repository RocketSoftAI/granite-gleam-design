import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
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

      <PageHero
        title="Stock Program"
        description="Browse our extensive in-stock selection of premium granite and quartz countertop colors. Available for quick turnaround at competitive prices."
      />

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Intro text */}
          <ScrollAnimation variant="fadeUp" className="max-w-3xl mb-12">
            <p className="text-muted-foreground leading-relaxed">
              Click the following links to get more detailed information on the items listed. 
              Colors and samples provided are for visual reference only; actual product may vary. 
              Slab selection is not permitted with stock material; client is encouraged to view 
              front slab of current bundle(s) approximately 7-10 business days before install.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4 text-sm italic">
              Note: Leathered/matte materials are more susceptible to oily markings and blemishes; 
              additional client maintenance is necessary.
            </p>
          </ScrollAnimation>

          {/* Info Cards */}
          <InfoCards cards={infoCards} />

          {/* Stone Galleries */}
          <StoneGallery categories={stoneCategories} />

          {/* Bottom CTA */}
          <ScrollAnimation variant="fadeUp" className="mt-16 text-center">
            <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-medium text-foreground mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact us today to learn more about our stock program and current specials.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
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
