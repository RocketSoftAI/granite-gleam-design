import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

interface SmsConsentCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

const SmsConsentCheckbox = ({ checked, onCheckedChange, error }: SmsConsentCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <Checkbox
          id="sms-consent"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked === true)}
          className={`mt-0.5 flex-shrink-0 ${error ? 'border-destructive' : ''}`}
        />
        <label 
          htmlFor="sms-consent" 
          className="text-[10px] leading-tight text-muted-foreground cursor-pointer"
        >
          By submitting this form, I agree to receive phone calls and text messages from Stoneworks of Colorado regarding my inquiry, project estimates, scheduling, services, and related offers. I understand that communications may be transactional or marketing in nature and may be sent using automated technology, prerecorded messages, or AI-powered voice or messaging systems, even if my number is listed on a state or federal Do Not Call registry. Message frequency may vary. Message and data rates may apply. I understand that I may opt out at any time by replying STOP to any text message or by following the opt-out instructions provided during a call. I may reply HELP for additional information. My consent is not a condition of purchasing services.
        </label>
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      <p className="text-[10px] text-muted-foreground text-center">
        <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
        {' | '}
        <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
      </p>
    </div>
  );
};

export default SmsConsentCheckbox;
