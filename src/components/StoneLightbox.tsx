import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { StoneItem } from '@/data/stockProgram';

interface StoneLightboxProps {
  stone: StoneItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const StoneLightbox = ({
  stone,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: StoneLightboxProps) => {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          if (hasPrevious && onPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext && onNext) onNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    },
    [isOpen, hasPrevious, hasNext, onPrevious, onNext, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!stone) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-background/95 backdrop-blur-sm border-border overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{stone.name}</DialogTitle>
        </VisuallyHidden>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Navigation arrows */}
        {hasPrevious && onPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-background/80 hover:bg-background rounded-full transition-colors"
            aria-label="Previous stone"
          >
            <ChevronLeft className="w-8 h-8 text-foreground" />
          </button>
        )}

        {hasNext && onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-background/80 hover:bg-background rounded-full transition-colors"
            aria-label="Next stone"
          >
            <ChevronRight className="w-8 h-8 text-foreground" />
          </button>
        )}

        {/* Image container */}
        <div className="flex flex-col items-center justify-center h-full p-6">
          <div className="flex-1 flex items-center justify-center w-full max-h-[calc(100%-80px)]">
            <img
              src={stone.image}
              alt={stone.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Stone name */}
          <div className="mt-4 py-4 px-8 bg-charcoal text-white text-center">
            <h3 className="font-serif text-xl font-medium">{stone.name}</h3>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoneLightbox;
