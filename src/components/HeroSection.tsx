import { useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';

const HeroSection = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          // CSS gradient placeholder - shows immediately while image loads
          // This provides instant visual feedback and improves perceived LCP
          backgroundColor: 'hsl(30, 10%, 18%)',
          backgroundImage: 'linear-gradient(to bottom, hsl(30, 10%, 15%) 0%, hsl(30, 10%, 20%) 50%, hsl(30, 10%, 12%) 100%)'
        }}
      >
        {/* Background Image with Overlay - Optimized Responsive WebP */}
        <div className="absolute inset-0">
          <picture>
            {/* Mobile: Optimized WebP */}
            <source
              media="(max-width: 640px)"
              srcSet="/images/hero-mobile-opt.webp"
              type="image/webp"
            />
            {/* Tablet: Optimized WebP */}
            <source
              media="(max-width: 1024px)"
              srcSet="/images/hero-tablet-opt.webp"
              type="image/webp"
            />
            {/* Desktop: Optimized WebP */}
            <source
              srcSet="/images/hero-desktop-opt.webp"
              type="image/webp"
            />
            {/* Fallback with sizes attribute for browser optimization */}
            <img
              src="/images/hero-desktop-opt.webp"
              alt="Luxury kitchen with custom stone countertops"
              className="w-full h-full object-cover"
              fetchPriority="high"
              loading="eager"
              width="1920"
              height="1080"
              decoding="sync"
              sizes="100vw"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/40 to-charcoal/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-primary-foreground/80 font-medium">
                Northern Colorado's Premier Stone Fabricator
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground mb-6 animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
              Timeless Stone,
              <br />
              <span className="italic font-normal opacity-90">Crafted for You</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              With over 20 years of expertise in granite, quartz, marble, and quartzite, 
              we create custom countertops that elevate your kitchen and bath to works of art.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                variant="hero" 
                size="heroLg" 
                className="group"
                onClick={() => setIsCalendarOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline" size="heroLg" asChild>
                <Link to="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <span className="block text-3xl font-serif font-medium text-primary-foreground">20+</span>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
              <div className="text-center">
                <span className="block text-3xl font-serif font-medium text-primary-foreground">2,500+</span>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Projects Completed</span>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20 hidden sm:block" />
              <div className="text-center">
                <span className="block text-3xl font-serif font-medium text-primary-foreground">1 Year</span>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/60">Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
};

export default HeroSection;
