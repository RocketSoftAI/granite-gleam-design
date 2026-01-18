import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('promo-banner-dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('promo-banner-dismissed', 'true');
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className="bg-gradient-to-r from-primary via-bronze to-primary text-primary-foreground overflow-hidden relative z-[60] animate-fade-in"
    >
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-center gap-3 text-center">
          <Gift className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <p className="text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">🎉 January Special: </span>
            <span className="font-bold">Free Upgraded Edge Profile</span>
            <span className="hidden sm:inline"> ($300 value)</span>
            {' '}on all projects booked this month
          </p>
          <Link
            to="/special-offer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            Claim Offer
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={handleDismiss}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
