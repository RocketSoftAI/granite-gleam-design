import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyUsSection from '@/components/WhyUsSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MaterialsSection from '@/components/MaterialsSection';
import QuoteSection from '@/components/QuoteSection';
import MidPageCTA from '@/components/MidPageCTA';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PromoBanner from '@/components/PromoBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { generateLocalBusinessSchema } from '@/config/seo';

const Index = () => {
  const schema = generateLocalBusinessSchema();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead schema={schema} />
      <PromoBanner />
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        
        {/* Mid-page CTA #1 */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <MidPageCTA 
              variant="primary"
              heading="Love What You See?"
              subheading="Let's make your dream kitchen a reality. Schedule a free showroom visit today."
            />
          </div>
        </section>
        
        <WhyUsSection />
        <ProcessSection />
        <MaterialsSection />
        
        {/* Mid-page CTA #2 */}
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <MidPageCTA 
              variant="secondary"
              heading="Questions About Materials?"
              subheading="Our stone experts are here to help. Call or visit our showroom."
            />
          </div>
        </section>
        
        <TestimonialsSection />
        <QuoteSection />
      </main>
      <Footer />
      <StickyMobileCTA />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
