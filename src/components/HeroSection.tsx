import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-kitchen.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury kitchen with custom stone countertops"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/40 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-24">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-bronze rounded-full animate-pulse" />
            <span className="label-caps text-primary-foreground/90">
              Northern Colorado's Premier Stone Fabricators
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-hero text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Transform Your Home
            <br />
            <span className="italic font-normal opacity-90">with Timeless Stone</span>
          </h1>

          {/* Subheadline */}
          <p className="body-large text-primary-foreground/80 max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Over 20 years of expert craftsmanship. From selection to installation, 
            we create custom countertops that elevate your kitchen and bath to works of art.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="heroLg" className="group" asChild>
              <Link to="/contact">
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="heroLg" asChild>
              <Link to="/portfolio">
                View Our Work
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-primary-foreground/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <span className="block font-serif text-4xl text-primary-foreground font-medium">20+</span>
              <span className="label-caps text-primary-foreground/60">Years Experience</span>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <span className="block font-serif text-4xl text-primary-foreground font-medium">2,500+</span>
              <span className="label-caps text-primary-foreground/60">Projects Completed</span>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <span className="block font-serif text-4xl text-primary-foreground font-medium">4.9</span>
              <span className="label-caps text-primary-foreground/60">★ Google Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
