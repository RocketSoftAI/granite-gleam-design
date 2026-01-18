import { useState, useEffect, useRef } from 'react';
import { X, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SpecialOfferExitPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('special-offer-exit-shown');
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsOpen(true);
        sessionStorage.setItem('special-offer-exit-shown', 'true');
      }
    };

    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setIsOpen(true);
        sessionStorage.setItem('special-offer-exit-shown', 'true');
      }
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const scrollToForm = () => {
    setIsOpen(false);
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formElement.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 500);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-[100] animate-fade-in"
      />

      {/* Scrollable container */}
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          {/* Popup */}
          <div className="w-full max-w-lg animate-scale-in">
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden border-2 border-primary/20">
              {/* Animated border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-bronze/20 to-primary/20 opacity-50 blur-xl" />
              
              {/* Header */}
              <div className="bg-gradient-to-r from-destructive/90 to-destructive p-6 text-destructive-foreground relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1.5 hover:bg-destructive-foreground/10 rounded-full transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 bg-destructive-foreground/20 rounded-full flex items-center justify-center animate-pulse"
                  >
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-80 font-medium">Wait!</p>
                    <h3 className="font-serif text-2xl font-medium">Don't Miss Out!</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-bold">$300 Value - FREE</span>
                  </div>
                  
                  <h4 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-3">
                    Your Free Edge Profile Upgrade<br />
                    is Still Available!
                  </h4>
                  
                  <p className="text-muted-foreground">
                    This exclusive January offer won't last forever. Complete the form now 
                    to lock in your <span className="font-semibold text-foreground">free $300 upgrade</span> before it expires.
                  </p>
                </div>

                {/* Urgency indicators */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">14</p>
                      <p className="text-xs text-muted-foreground uppercase">Days Left</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">$300</p>
                      <p className="text-xs text-muted-foreground uppercase">Free Value</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">0</p>
                      <p className="text-xs text-muted-foreground uppercase">Obligation</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="premium" 
                    size="xl" 
                    className="w-full group"
                    onClick={scrollToForm}
                  >
                    Yes! Claim My Free Upgrade
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    No thanks, I'll pay full price
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOfferExitPopup;
