import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SEOHead from '@/components/SEOHead';
import { SectionLoadingSkeleton } from '@/components/LoadingSkeleton';
import { generateLocalBusinessSchema } from '@/config/seo';

// Lazy load ALL below-the-fold sections for faster LCP
const PromoBanner = lazy(() => import('@/components/PromoBanner'));
const MaterialsSection = lazy(() => import('@/components/MaterialsSection'));
const MidPageCTA = lazy(() => import('@/components/MidPageCTA'));
const WhyUsSection = lazy(() => import('@/components/WhyUsSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const QuoteSection = lazy(() => import('@/components/QuoteSection'));
const Footer = lazy(() => import('@/components/Footer'));
const StickyMobileCTA = lazy(() => import('@/components/StickyMobileCTA'));
const ExitIntentPopup = lazy(() => import('@/components/ExitIntentPopup'));

const Index = () => {
  const schema = generateLocalBusinessSchema();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead schema={schema} />
      {/* Navbar renders first for proper structure matching pre-rendered HTML */}
      <Navbar />
      <main>
        <HeroSection />
        {/* PromoBanner deferred to after hero to avoid hydration conflicts */}
        <Suspense fallback={null}>
          <PromoBanner />
        </Suspense>
        
        {/* Lazy load materials - below fold */}
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <MaterialsSection />
        </Suspense>
        
        {/* Mid-page CTA #1 */}
        <Suspense fallback={null}>
          <section className="py-12 lg:py-16 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
              <MidPageCTA 
                variant="primary"
                heading="Love What You See?"
                subheading="Let's make your dream kitchen a reality. Schedule a free showroom visit today."
              />
            </div>
          </section>
        </Suspense>
        
        {/* Lazy-loaded sections with Suspense */}
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <WhyUsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <ProcessSection />
        </Suspense>
        
        {/* Mid-page CTA #2 */}
        <Suspense fallback={null}>
          <section className="py-12 lg:py-16 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
              <MidPageCTA 
                variant="secondary"
                heading="Questions About Materials?"
                subheading="Our stone experts are here to help. Call or visit our showroom."
              />
            </div>
          </section>
        </Suspense>
        
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
      
      <Suspense fallback={null}>
        <StickyMobileCTA />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </div>
  );
};

export default Index;
