import { useState, useEffect, useRef } from 'react';
import { X, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { emailSchema } from '@/lib/validations';
import { toast } from 'sonner';

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Check if popup was already shown
    const shown = sessionStorage.getItem('exit-popup-shown');
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasTriggered.current) {
        hasTriggered.current = true;
        setIsOpen(true);
        sessionStorage.setItem('exit-popup-shown', 'true');
      }
    };

    // Also trigger after 45 seconds on page (engagement-based)
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
    setEmailError('');
    
    // Validate email
    const result = emailSchema.safeParse({ email });
    
    if (!result.success) {
      setEmailError(result.error.errors[0]?.message || 'Please enter a valid email');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In production, this would send to your email service
      setIsSubmitted(true);
      toast.success('Check your inbox for the guide!');
      setTimeout(() => setIsOpen(false), 3000);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100]"
          />

          {/* Scrollable container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-md"
              >
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

                    <ul className="space-y-2 mb-6">
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
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`h-12 bg-background ${emailError ? 'border-destructive' : ''}`}
                          maxLength={255}
                        />
                        {emailError && (
                          <p className="text-xs text-destructive mt-1">{emailError}</p>
                        )}
                      </div>
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

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      No spam. Unsubscribe anytime. Your info is safe.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </motion.div>
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
          </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
