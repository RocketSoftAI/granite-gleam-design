import { useState, useEffect } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 80vh)
      const heroHeight = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-elevated safe-area-bottom"
        >
          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-8 right-4 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Click-to-Call */}
              <a
                href="tel:+19705551234"
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-charcoal text-primary-foreground rounded-lg font-medium text-sm hover:bg-charcoal/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              {/* Get Quote CTA */}
              <Link
                to="/contact"
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Free Quote</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
