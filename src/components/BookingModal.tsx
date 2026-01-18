import { X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/7VbijpcAi4BpIyKbMJHa';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Reset iframe loaded state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen]);

  // On mobile, open booking URL directly and close modal
  useEffect(() => {
    if (isOpen && isMobile) {
      window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
      onClose();
    }
  }, [isOpen, isMobile, onClose]);

  // Prevent body scroll when modal is open (desktop only)
  useEffect(() => {
    if (isOpen && !isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  // Don't render modal on mobile - we redirect instead
  if (isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-card rounded-2xl shadow-elevated overflow-hidden max-h-[95vh] flex flex-col"
              >
                <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                  <h3 className="font-serif text-xl font-medium text-foreground">Book a Showroom Appointment</h3>
                  <div className="flex items-center gap-2">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                      aria-label="Close calendar"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden relative">
                  {/* Loading state */}
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">Loading calendar...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={BOOKING_URL}
                    width="100%"
                    height="100%"
                    style={{ 
                      border: 'none', 
                      minHeight: '600px',
                      height: 'calc(95vh - 70px)',
                    }}
                    title="Book an Appointment"
                    allow="geolocation"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;