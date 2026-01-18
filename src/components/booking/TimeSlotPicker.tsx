import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayTime: string;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  isLoading?: boolean;
  selectedDate: Date | null;
}

const TimeSlotPicker = ({ 
  slots, 
  selectedSlot, 
  onSelectSlot, 
  isLoading,
  selectedDate 
}: TimeSlotPickerProps) => {
  if (!selectedDate) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <p>Select a date to see available times</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-10 rounded-md" />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground text-center px-4">
        <p>No available times for this date. Please select another date.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.map((slot, index) => (
        <motion.button
          key={slot.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          onClick={() => onSelectSlot(slot)}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            "border border-border hover:border-primary/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            selectedSlot?.id === slot.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card hover:bg-accent/50"
          )}
        >
          {slot.displayTime}
        </motion.button>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
