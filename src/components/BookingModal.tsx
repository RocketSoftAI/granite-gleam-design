import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '@/components/booking/BookingCalendar';
import { cn } from '@/lib/utils';

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

  // Don't render at all if not open
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
      />
      
      {/* Modal container */}
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div
            className={cn(
              "w-full max-w-lg bg-card rounded-2xl shadow-elevated overflow-hidden",
              "animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
