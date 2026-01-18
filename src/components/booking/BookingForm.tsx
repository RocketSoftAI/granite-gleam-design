import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Calendar, Clock } from 'lucide-react';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayTime: string;
}

interface BookingFormProps {
  selectedDate: Date;
  selectedSlot: TimeSlot;
  onSubmit: (data: { name: string; email: string; phone?: string; notes?: string; smsConsent: boolean; smsConsentDate: string }) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

const BookingForm = ({ 
  selectedDate, 
  selectedSlot, 
  onSubmit, 
  onBack,
  isSubmitting 
}: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!smsConsent) {
      newErrors.smsConsent = 'You must agree to receive communications to book an appointment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      notes: formData.notes.trim() || undefined,
      smsConsent: true,
      smsConsentDate: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Selected Date/Time Summary */}
      <div className="bg-accent/30 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-medium">{selectedSlot.displayTime}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            className={errors.name ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(970) 555-0123"
            className={errors.phone ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Tell us about your project (optional)"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {/* SMS Consent */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="sms-consent"
              checked={smsConsent}
              onCheckedChange={(checked) => setSmsConsent(checked === true)}
              className={`mt-0.5 flex-shrink-0 ${errors.smsConsent ? 'border-destructive' : ''}`}
              disabled={isSubmitting}
            />
            <label 
              htmlFor="sms-consent" 
              className="text-[10px] leading-tight text-muted-foreground cursor-pointer"
            >
              By submitting this form, I agree to receive phone calls and text messages from Stoneworks of Colorado regarding my inquiry, project estimates, scheduling, services, and related offers. I understand that communications may be transactional or marketing in nature and may be sent using automated technology, prerecorded messages, or AI-powered voice or messaging systems, even if my number is listed on a state or federal Do Not Call registry. Message frequency may vary. Message and data rates may apply. I understand that I may opt out at any time by replying STOP to any text message or by following the opt-out instructions provided during a call. I may reply HELP for additional information. My consent is not a condition of purchasing services.
            </label>
          </div>
          {errors.smsConsent && (
            <p className="text-xs text-destructive">{errors.smsConsent}</p>
          )}
          <p className="text-[10px] text-muted-foreground text-center">
            <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            {' | '}
            <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              'Confirm Appointment'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
