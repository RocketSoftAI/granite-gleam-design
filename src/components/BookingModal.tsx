import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from '@/components/booking/BookingCalendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

  // Don't render modal on mobile - we redirect instead
  if (isMobile) {
    return null;
  }

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      onClose();
    }
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-medium">
            Book a Showroom Visit
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4">
          <BookingCalendar onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
