import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '@/components/booking/BookingCalendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // On mobile, navigate to dedicated booking page
  useEffect(() => {
    if (isOpen && isMobile) {
      navigate('/book');
      onClose();
    }
  }, [isOpen, isMobile, onClose, navigate]);

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
                className="w-full max-w-lg bg-card rounded-2xl shadow-elevated overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    Book a Showroom Visit
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                  <BookingCalendar onClose={onClose} />
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
