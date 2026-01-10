import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import WhyUsSection from '@/components/WhyUsSection';
import ProcessSection from '@/components/ProcessSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import MaterialsSection from '@/components/MaterialsSection';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <WhyUsSection />
        <ProcessSection />
        <MaterialsSection />
        <TestimonialsSection />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
