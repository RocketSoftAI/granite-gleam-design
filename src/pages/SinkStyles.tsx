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

  const stockSinks = [
    { model: 'LB1100', dimensions: '31-1/4" x 18" x 16-1/2"', type: 'Double Bowl' },
    { model: 'LB1200', dimensions: '31-1/4" x 20-1/2" x 8"', type: 'Double Bowl' },
    { model: 'LB1300', dimensions: '29-1/2" x 18" x 16-1/2"', type: 'Single Bowl' },
    { model: 'LB1400', dimensions: '18-1/8" x 10-5/8"', type: 'Bar Sink' },
    { model: 'LS1714', dimensions: '17" x 14"', type: 'Lavatory' },
    { model: 'LS1916', dimensions: '19" x 16"', type: 'Lavatory' },
    { model: 'ESI-VCR60', dimensions: 'Vanity', type: 'Vanity Combo' },
  ];

  const esiSinks = [
    { model: 'ESI-S265-1816', description: 'Single bowl undermount sink' },
    { model: 'ESI-SAP3320-16', description: 'Double bowl undermount sink' },
    { model: 'ESI-S210-18', description: 'Large single bowl undermount' },
    { model: 'ESI-SAP3620-16', description: 'Farmhouse style sink' },
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
            Sink Styles
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Stoneworks of Colorado offers a variety of sink styles for your next countertop installation.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Stock Sinks */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              Stock Sinks
            </h2>
            <p className="text-muted-foreground mb-6">
              All sinks are 18 gauge stainless steel undermount style.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stockSinks.map((sink) => (
                <div
                  key={sink.model}
                  className="bg-muted/50 rounded-lg p-5 border border-border"
                >
                  <span className="inline-block bg-primary text-primary-foreground text-xs px-2 py-1 rounded mb-3">
                    STOCK
                  </span>
                  <h3 className="font-medium text-foreground mb-2">{sink.model}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{sink.dimensions}</p>
                  <p className="text-sm text-muted-foreground">{sink.type}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ESI Sinks */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              ESI Premium Sinks
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {esiSinks.map((sink) => (
                <div
                  key={sink.model}
                  className="bg-muted/50 rounded-lg p-5 border border-border"
                >
                  <h3 className="font-medium text-foreground mb-2">{sink.model}</h3>
                  <p className="text-sm text-muted-foreground">{sink.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download PDF */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a
                href="/documents/sink-styles.pdf"
                download
                className="inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Sink Styles PDF
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SinkStyles;
