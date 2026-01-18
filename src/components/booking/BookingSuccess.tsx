import { CheckCircle2, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingSuccessProps {
  appointment: {
    date: string;
    time: string;
  };
  contactName: string;
  onClose: () => void;
}

const BookingSuccess = ({ appointment, contactName, onClose }: BookingSuccessProps) => {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 animate-fade-in">
      <div className="animate-scale-in">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-medium text-foreground">
          Appointment Confirmed!
        </h2>
        <p className="text-muted-foreground">
          Thank you, {contactName.split(' ')[0]}! We look forward to seeing you.
        </p>
      </div>

      <div className="mt-6 w-full max-w-sm bg-accent/30 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-3 text-left">
          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="font-medium">{appointment.date}</span>
        </div>
        <div className="flex items-center gap-3 text-left">
          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="font-medium">{appointment.time}</span>
        </div>
        <div className="flex items-start gap-3 text-left">
          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Stoneworks of Colorado</p>
            <p className="text-sm text-muted-foreground">
              4008 S Taft Hill Rd, Fort Collins, CO 80526
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>A confirmation email has been sent to your inbox.</p>
        <p className="mt-2">
          Need to reschedule?{' '}
          <a 
            href="tel:+19704931992" 
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            (970) 493-1992
          </a>
        </p>
      </div>

      <div className="mt-8">
        <Button onClick={onClose} size="lg">
          Done
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccess;
