import { useState } from 'react';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import BookingModal from '@/components/BookingModal';

interface MidPageCTAProps {
  variant?: 'primary' | 'secondary';
  heading?: string;
  subheading?: string;
}

const MidPageCTA = ({ 
  variant = 'primary',
  heading = "Ready to Start Your Project?",
  subheading = "Get a free consultation and quote. Most projects completed in 2-3 weeks."
}: MidPageCTAProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  if (variant === 'secondary') {
    return (
      <>
        <ScrollAnimation variant="fadeUp">
          <div className="bg-muted rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium text-foreground mb-2">
                  {heading}
                </h3>
                <p className="text-muted-foreground">
                  {subheading}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <a
                  href="tel:+19704931992"
                  className="flex items-center justify-center gap-2 h-12 px-6 bg-charcoal text-primary-foreground rounded-lg font-medium hover:bg-charcoal/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (970) 493-1992
                </a>
                <Button 
                  variant="premium" 
                  size="lg" 
                  className="group h-12"
                  onClick={() => setIsCalendarOpen(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </ScrollAnimation>
        <BookingModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
      </>
    );
  }

  return (
    <>
      <ScrollAnimation variant="fadeUp">
        <div className="relative overflow-hidden bg-gradient-to-r from-charcoal via-charcoal to-charcoal/95 rounded-2xl p-8 lg:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-bronze/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-primary-foreground/60 uppercase tracking-wider mb-3">
                <Calendar className="w-4 h-4" />
                Free Consultation
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-medium text-primary-foreground mb-2">
                {heading}
              </h3>
              <p className="text-primary-foreground/70 max-w-md">
                {subheading}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="tel:+19704931992"
                className="flex items-center justify-center gap-2 h-14 px-8 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Button 
                variant="hero" 
                size="heroLg" 
                className="group"
                onClick={() => setIsCalendarOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollAnimation>
      <BookingModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  );
};

export default MidPageCTA;