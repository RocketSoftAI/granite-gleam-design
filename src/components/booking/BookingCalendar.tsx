import { useState, useEffect, useMemo, useCallback } from 'react';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { supabase } from '@/integrations/supabase/client';
import TimeSlotPicker from './TimeSlotPicker';
import BookingForm from './BookingForm';
import BookingSuccess from './BookingSuccess';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayTime: string;
}

interface DaySlots {
  date: string;
  slots: TimeSlot[];
}

type BookingStep = 'select-date' | 'select-time' | 'enter-info' | 'success';

interface BookingCalendarProps {
  onClose?: () => void;
}

const BookingCalendar = ({ onClose }: BookingCalendarProps) => {
  const [step, setStep] = useState<BookingStep>('select-date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availability, setAvailability] = useState<DaySlots[]>([]);
  const [calendarId, setCalendarId] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    appointment: { date: string; time: string };
    contactName: string;
  } | null>(null);

  // Fetch availability when component mounts
  useEffect(() => {
    let mounted = true;
    
    const fetchAvailability = async () => {
      setIsLoadingSlots(true);
      try {
        const startDate = format(startOfDay(new Date()), 'yyyy-MM-dd');
        const endDate = format(addDays(new Date(), 30), 'yyyy-MM-dd');

        const { data, error } = await supabase.functions.invoke('get-calendar-slots', {
          body: {
            startDate,
            endDate,
            timezone: 'America/Denver',
          },
        });

        if (!mounted) return;

        if (error) {
          console.error('Error fetching slots:', error);
          toast.error('Failed to load available times');
          return;
        }

        if (data?.availability) {
          setAvailability(data.availability);
          setCalendarId(data.calendarId);
        }
      } catch (err) {
        if (!mounted) return;
        console.error('Failed to fetch availability:', err);
        toast.error('Failed to load calendar');
      } finally {
        if (mounted) {
          setIsLoadingSlots(false);
        }
      }
    };

    fetchAvailability();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Memoize available dates to prevent re-renders
  const availableDates = useMemo(() => {
    return availability.map(day => new Date(day.date + 'T12:00:00'));
  }, [availability]);

  // Memoize the date set for faster lookups
  const availableDateStrings = useMemo(() => {
    return new Set(availability.map(day => day.date));
  }, [availability]);

  // Get slots for selected date - memoized
  const currentSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const daySlots = availability.find(day => day.date === dateStr);
    return daySlots?.slots || [];
  }, [selectedDate, availability]);

  const handleDateSelect = useCallback((date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    if (date) {
      setStep('select-time');
    }
  }, []);

  const handleSlotSelect = useCallback((slot: TimeSlot) => {
    setSelectedSlot(slot);
    setStep('enter-info');
  }, []);

  const handleFormSubmit = useCallback(async (contactData: { 
    name: string; 
    email: string; 
    phone?: string; 
    notes?: string;
  }) => {
    if (!selectedDate || !selectedSlot || !calendarId) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-appointment', {
        body: {
          calendarId,
          selectedSlot: {
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
          },
          contact: {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
          },
          notes: contactData.notes,
          timezone: 'America/Denver',
        },
      });

      if (error) {
        console.error('Error creating appointment:', error);
        toast.error('Failed to book appointment. Please try again.');
        return;
      }

      if (data?.success) {
        setSuccessData({
          appointment: data.appointment,
          contactName: data.contact.name,
        });
        setStep('success');
        toast.success('Appointment booked successfully!');
      } else {
        toast.error(data?.error || 'Failed to book appointment');
      }
    } catch (err) {
      console.error('Failed to create appointment:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedDate, selectedSlot, calendarId]);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setStep('select-date');
      setSelectedDate(undefined);
      setSelectedSlot(null);
      setSuccessData(null);
    }
  }, [onClose]);

  const handleBack = useCallback(() => {
    if (step === 'enter-info') {
      setStep('select-time');
    } else if (step === 'select-time') {
      setStep('select-date');
      setSelectedSlot(null);
    }
  }, [step]);

  // Memoized date disabled function
  const isDateDisabled = useCallback((date: Date) => {
    if (date < startOfDay(new Date())) return true;
    const dateStr = format(date, 'yyyy-MM-dd');
    return !availableDateStrings.has(dateStr);
  }, [availableDateStrings]);

  // Success step
  if (step === 'success' && successData) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <BookingSuccess
          appointment={successData.appointment}
          contactName={successData.contactName}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2">
          {['Date', 'Time', 'Details'].map((label, index) => {
            const stepIndex = ['select-date', 'select-time', 'enter-info'].indexOf(step);
            const isActive = index <= stepIndex;
            const isCurrent = index === stepIndex;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${isCurrent ? 'bg-primary text-primary-foreground' : 
                    isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                `}>
                  {index + 1}
                </div>
                <span className={`text-sm hidden sm:inline ${isCurrent ? 'font-medium' : 'text-muted-foreground'}`}>
                  {label}
                </span>
                {index < 2 && (
                  <div className={`w-8 h-0.5 ${isActive && index < stepIndex ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        {step === 'select-date' && (
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">Select a Date</h3>
            {isLoadingSlots ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-md border"
              />
            )}
            {!isLoadingSlots && availability.length === 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                No availability found. Please call us at (970) 493-1992.
              </p>
            )}
          </div>
        )}

        {step === 'select-time' && selectedDate && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBack}
                className="text-sm text-primary hover:underline"
              >
                ← Change date
              </button>
              <span className="text-sm font-medium">
                {format(selectedDate, 'EEEE, MMMM d')}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-4">Select a Time</h3>
            <TimeSlotPicker
              slots={currentSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSlotSelect}
              isLoading={false}
              selectedDate={selectedDate}
            />
          </div>
        )}

        {step === 'enter-info' && selectedDate && selectedSlot && (
          <div>
            <h3 className="text-lg font-medium mb-4">Your Information</h3>
            <BookingForm
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSubmit={handleFormSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
