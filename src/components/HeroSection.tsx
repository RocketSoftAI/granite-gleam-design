import { useState, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';

const HeroSection = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: 'hsl(30, 10%, 18%)',
          backgroundImage: 'linear-gradient(to bottom, hsl(30, 10%, 15%) 0%, hsl(30, 10%, 20%) 50%, hsl(30, 10%, 12%) 100%)'
        }}
      >
        {/* Background Image with Overlay - matches pre-rendered structure */}
        <div className="absolute inset-0">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/images/hero-mobile-opt.webp?v=2"
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/images/hero-tablet-opt.webp?v=2"
              type="image/webp"
            />
            <source
              srcSet="/images/hero-desktop-opt.webp?v=2"
              type="image/webp"
            />
            <img
              src="/images/hero-desktop-opt.webp?v=2"
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

        {/* Content - matches pre-rendered structure for hydration */}
        <div className="relative z-10 w-full container mx-auto px-6 lg:px-12 pt-24">
          <div className="max-w-3xl">
            {/* Badge - no animation delay for LCP */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-primary-foreground/80 font-medium">
                Northern Colorado's Premier Stone Fabricator
              </span>
            </div>

            {/* Main Heading - no animation delay for LCP */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-primary-foreground mb-6 leading-tight">
              Timeless Stone,
              <br />
              <span className="italic font-normal opacity-90">Crafted for You</span>
            </h1>

            {/* Subheading - no animation delay for LCP */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl">
              With over 20 years of expertise in granite, quartz, marble, and quartzite, 
              we create custom countertops that elevate your kitchen and bath to works of art.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
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
                <Link to="/contact">
                  Request a Quote
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-primary-foreground/20">
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
