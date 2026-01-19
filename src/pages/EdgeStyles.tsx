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

  const standardEdges = [
    { name: '¼ Bevel', description: 'A subtle 45-degree angle cut on the top edge' },
    { name: 'Demi Bullnose', description: 'A half-round edge profile on the top' },
    { name: 'Ease/Polish', description: 'Slightly rounded corners for comfort and safety' },
    { name: '¼ Round', description: 'A quarter-circle radius on the top edge' },
    { name: 'Half Bullnose', description: 'A full half-circle curve on the top edge' },
    { name: 'Half Bevel', description: 'A larger 45-degree angle for more visual impact' },
  ];

  const customEdges = [
    { name: 'Cove', description: 'A concave curved edge for elegant look' },
    { name: 'Ogee', description: 'An S-curve profile for classic elegance' },
    { name: 'Dupont', description: 'A sophisticated curved step design' },
    { name: 'Ogee Bull', description: 'Combines ogee curve with a bullnose finish' },
    { name: '¼ Round Top & Bottom', description: 'Rounded edges on both top and bottom' },
    { name: 'Full Bullnose', description: 'A complete half-circle on the entire edge' },
    { name: 'Platner', description: 'A distinctive stepped edge profile' },
    { name: 'Stair Tread', description: 'Specialized profile for stair applications' },
    { name: 'Your Custom Design', description: 'We can create custom edge profiles to your specifications' },
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
            Edge Styles
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Stoneworks of Colorado offers a variety of edging styles for your next renovation or new home project.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Standard Edges */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              Standard Edges
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {standardEdges.map((edge) => (
                <div
                  key={edge.name}
                  className="bg-muted/50 rounded-lg p-5 border border-border"
                >
                  <h3 className="font-medium text-foreground mb-2">{edge.name}</h3>
                  <p className="text-sm text-muted-foreground">{edge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Edges */}
          <div className="mb-12">
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              Custom Edge Designs
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customEdges.map((edge) => (
                <div
                  key={edge.name}
                  className="bg-muted/50 rounded-lg p-5 border border-border"
                >
                  <h3 className="font-medium text-foreground mb-2">{edge.name}</h3>
                  <p className="text-sm text-muted-foreground">{edge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download PDF */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a
                href="/documents/edge-styles.pdf"
                download
                className="inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Edge Styles PDF
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EdgeStyles;
