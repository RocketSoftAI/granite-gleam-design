import { useState, useEffect, useRef } from 'react';
import { X, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { exitPopupSchema } from '@/lib/validations';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import SmsConsentCheckbox from '@/components/SmsConsentCheckbox';

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; smsConsent?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const shown = sessionStorage.getItem('exit-popup-shown');
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsOpen(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    };

    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        setIsOpen(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!smsConsent) {
      setErrors({ smsConsent: 'You must agree to receive communications to submit this form' });
      return;
    }
    
    const result = exitPopupSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string; phone?: string } = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as 'name' | 'email' | 'phone';
        if (field) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || undefined,
          source: 'exit_popup',
          tags: ['Buyer Guide Download'],
          smsConsent: true,
          smsConsentDate: new Date().toISOString(),
        },
      });

      if (error) {
        console.error('Error submitting lead:', error);
        toast.error('Something went wrong. Please try again.');
        return;
      }

      console.log('Lead submitted successfully:', data);
      setIsSubmitted(true);
      toast.success('Check your inbox for the guide!');
      setTimeout(() => setIsOpen(false), 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] animate-fade-in"
      />

      {/* Scrollable container */}
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          {/* Popup */}
          <div className="w-full max-w-md animate-scale-in">
            <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-primary to-bronze p-6 text-primary-foreground relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider opacity-80">Before You Go!</p>
                    <h3 className="font-serif text-xl font-medium">Wait, Don't Miss This</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    <h4 className="font-serif text-lg font-medium text-foreground mb-2">
                      Get Our Free Countertop Buyer's Guide
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the insider secrets to choosing the perfect stone. Plus, get{' '}
                      <span className="font-semibold text-foreground">$200 off</span> your project!
                    </p>

                    <ul className="space-y-2 mb-4">
                      {[
                        'Material comparison chart',
                        'Cost calculator worksheet',
                        'Maintenance checklist',
                        '$200 exclusive discount code',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`h-12 bg-background ${errors.name ? 'border-destructive' : ''}`}
                          maxLength={100}
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`h-12 bg-background ${errors.email ? 'border-destructive' : ''}`}
                          maxLength={255}
                        />
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          type="tel"
                          placeholder="Phone number (optional)"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`h-12 bg-background ${errors.phone ? 'border-destructive' : ''}`}
                          maxLength={20}
                        />
                        {errors.phone && (
                          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                        )}
                      </div>
                      
                      <SmsConsentCheckbox
                        checked={smsConsent}
                        onCheckedChange={setSmsConsent}
                        error={errors.smsConsent}
                      />
                      
                      <Button 
                        variant="premium" 
                        size="xl" 
                        type="submit" 
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Get Free Guide + $200 Off'}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-serif text-xl font-medium text-foreground mb-2">
                      You're All Set!
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Check your inbox for the guide and your $200 discount code.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExitIntentPopup;
