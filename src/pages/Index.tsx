import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MaterialsSection from '@/components/MaterialsSection';
import MidPageCTA from '@/components/MidPageCTA';
import SEOHead from '@/components/SEOHead';
import PromoBanner from '@/components/PromoBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import { SectionLoadingSkeleton } from '@/components/LoadingSkeleton';
import { generateLocalBusinessSchema } from '@/config/seo';

// Lazy load below-the-fold sections for faster initial render
const WhyUsSection = lazy(() => import('@/components/WhyUsSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const QuoteSection = lazy(() => import('@/components/QuoteSection'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const schema = generateLocalBusinessSchema();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead schema={schema} />
      <PromoBanner />
      <Navbar />
      <main>
        <HeroSection />
        <MaterialsSection />
        
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
        
        {/* Lazy-loaded sections with Suspense */}
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <WhyUsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <ProcessSection />
        </Suspense>
        
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
        
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <QuoteSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-64 bg-muted/30" />}>
        <Footer />
      </Suspense>
      
      <StickyMobileCTA />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
