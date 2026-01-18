import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
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
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-card rounded-2xl shadow-elevated overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-serif text-xl font-medium text-foreground">Book a Showroom Appointment</h3>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close calendar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <iframe
                    src="https://api.leadconnectorhq.com/widget/booking/7VbijpcAi4BpIyKbMJHa"
                    style={{ width: '100%', height: '700px', border: 'none', overflow: 'auto' }}
                    title="Book an Appointment"
                    allow="geolocation"
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