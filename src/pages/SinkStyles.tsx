import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SinkStyles = () => {
  const customSEO = {
    title: 'Sink Styles - Undermount & Drop-in Sinks | Stoneworks of Colorado',
    description:
      'Browse our selection of sink styles including undermount stainless steel sinks. Find the perfect sink for your granite or quartz countertop installation.',
    canonicalPath: '/sink-styles',
  };

  const pages = [
    '/images/documents/sink-styles-1.jpg',
    '/images/documents/sink-styles-2-fixed.jpg',
    '/images/documents/sink-styles-3.jpg',
  ];

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
                Sink Styles
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Stoneworks of Colorado offers a variety of sink styles for your next countertop installation.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-fit">
              <a href="/documents/sink-styles.pdf" download className="inline-flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-8">
        <div className="container mx-auto px-6 lg:px-12 space-y-6">
          {pages.map((page, index) => (
            <div key={index} className="bg-background rounded-lg overflow-hidden shadow-lg">
              <img
                src={page}
                alt={`Sink Styles Brochure - Page ${index + 1}`}
                className="w-full h-auto"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default SinkStyles;
