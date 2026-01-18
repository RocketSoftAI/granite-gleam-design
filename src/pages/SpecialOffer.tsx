import { useState } from 'react';
import { ArrowRight, Gift, Check, Clock, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const PROJECT_AREAS_OPTIONS = [
  { value: 'kitchen_only', label: 'Kitchen only' },
  { value: 'master_bathroom', label: 'Master bathroom' },
  { value: 'guest_bathroom', label: 'Guest bathroom' },
  { value: 'multiple_bathrooms', label: 'Multiple bathrooms' },
  { value: 'kitchen_bathrooms', label: 'Kitchen + bathrooms' },
  { value: 'outdoor_kitchen', label: 'Outdoor kitchen' },
  { value: 'other', label: 'Other' },
];

const PROPERTY_TYPE_OPTIONS = [
  { value: 'primary_residence', label: 'Primary residence' },
  { value: 'second_home', label: 'Second home' },
  { value: 'rental_property', label: 'Rental property' },
  { value: 'commercial_property', label: 'Commercial property' },
  { value: 'other_property', label: 'Other property' },
];

const PROJECT_TIMELINE_OPTIONS = [
  { value: 'this_month', label: 'This month' },
  { value: '1_3_months', label: '1-3 months' },
  { value: '3_6_months', label: '3-6 months' },
  { value: '6_plus_months', label: '6+ months' },
  { value: 'just_exploring', label: 'Just exploring' },
];

const DECISION_STAGE_OPTIONS = [
  { value: 'just_starting_research', label: 'Just starting research' },
  { value: 'comparing_materials', label: 'Comparing materials' },
  { value: 'getting_quotes', label: 'Getting quotes' },
  { value: 'ready_to_schedule', label: 'Ready to schedule' },
  { value: 'emergency_replacement', label: 'Emergency replacement' },
];

const BUDGET_RANGE_OPTIONS = [
  { value: 'under_3000', label: 'Under $3,000' },
  { value: '3000_6000', label: '$3,000 - $6,000' },
  { value: '6000_10000', label: '$6,000 - $10,000' },
  { value: '10000_15000', label: '$10,000 - $15,000' },
  { value: '15000_plus', label: '$15,000+' },
  { value: 'not_sure', label: 'Not sure yet' },
];

const SpecialOffer = () => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    projectAreas: '',
    propertyType: '',
    projectTimeline: '',
    decisionStage: '',
    budgetRange: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = quoteFormSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof QuoteFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = error.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          projectAreas: result.data.projectAreas,
          propertyType: result.data.propertyType,
          projectTimeline: result.data.projectTimeline,
          decisionStage: result.data.decisionStage,
          budgetRange: result.data.budgetRange,
          message: result.data.message,
          source: 'stoneworks-january-special-offer',
          specialOffer: 'free-upgraded-edge-profile-january',
        },
      });

      if (error) {
        console.error('Error submitting lead:', error);
        toast.error('Something went wrong. Please try again.');
        return;
      }

      console.log('Lead submitted successfully:', data);
      toast.success('🎉 Your offer has been reserved! We\'ll contact you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectAreas: '',
        propertyType: '',
        projectTimeline: '',
        decisionStage: '',
        budgetRange: '',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        customSEO={{
          title: "January Special Offer - Free Upgraded Edge Profile | Stoneworks of Colorado",
          description: "Claim your January special: Free upgraded edge profile ($300 value) on all countertop projects booked this month. Limited time offer from Stoneworks of Colorado.",
          canonicalPath: "/special-offer",
        }}
      />
      <Navbar />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section with Offer */}
        <section className="relative bg-gradient-to-br from-primary/10 via-bronze/5 to-background py-16 lg:py-20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-bronze/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Offer Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Offer Badge */}
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-6">
                  <Gift className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wide">January Exclusive</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                  Free Upgraded<br />
                  <span className="text-primary">Edge Profile</span>
                </h1>
                
                <div className="bg-card border-2 border-primary/30 rounded-xl p-6 mb-8 shadow-elevated">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">$300 Value</p>
                      <p className="text-muted-foreground">Included FREE with your project</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    Upgrade to a premium edge profile at no additional cost. Choose from ogee, bullnose, 
                    beveled, or waterfall edges—normally a $300 upgrade, now included free when you 
                    book your project this January.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-foreground">Premium edge profiles that elevate your countertop's elegance</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-foreground">No hidden fees—the upgrade is completely on us</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <p className="text-foreground">Available on all materials: granite, quartz, quartzite & more</p>
                  </div>
                </div>

                {/* Urgency */}
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-bronze" />
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">Limited time offer</span> — Ends January 31st
                  </p>
                </div>
              </motion.div>

              {/* Right: Quote Form */}
              <motion.div 
                className="bg-card p-8 lg:p-10 rounded-xl shadow-elevated border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Form Header with Offer Applied */}
                <div className="bg-gradient-to-r from-primary/10 to-bronze/10 -mx-8 lg:-mx-10 -mt-8 lg:-mt-10 px-8 lg:px-10 py-5 rounded-t-xl mb-6 border-b border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Your Offer is Reserved</p>
                      <p className="text-sm text-muted-foreground">Free edge profile upgrade locked in</p>
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
                  Claim Your Free Upgrade
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Complete the form below and we'll contact you within 24 hours to finalize your offer.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Smith"
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
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        placeholder="(970) 555-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`h-12 bg-background ${errors.phone ? 'border-destructive' : ''}`}
                        maxLength={20}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`h-12 bg-background ${errors.email ? 'border-destructive' : ''}`}
                      maxLength={255}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Project Areas & Property Type Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Project Areas
                      </label>
                      <Select 
                        value={formData.projectAreas}
                        onValueChange={(value) => setFormData({ ...formData, projectAreas: value })}
                      >
                        <SelectTrigger className={`h-12 bg-background ${errors.projectAreas ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {PROJECT_AREAS_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectAreas && (
                        <p className="text-xs text-destructive mt-1">{errors.projectAreas}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Property Type
                      </label>
                      <Select 
                        value={formData.propertyType}
                        onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      >
                        <SelectTrigger className={`h-12 bg-background ${errors.propertyType ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {PROPERTY_TYPE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.propertyType && (
                        <p className="text-xs text-destructive mt-1">{errors.propertyType}</p>
                      )}
                    </div>
                  </div>

                  {/* Timeline & Decision Stage Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Project Timeline
                      </label>
                      <Select 
                        value={formData.projectTimeline}
                        onValueChange={(value) => setFormData({ ...formData, projectTimeline: value })}
                      >
                        <SelectTrigger className={`h-12 bg-background ${errors.projectTimeline ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="When do you need it?" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {PROJECT_TIMELINE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectTimeline && (
                        <p className="text-xs text-destructive mt-1">{errors.projectTimeline}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Decision Stage
                      </label>
                      <Select 
                        value={formData.decisionStage}
                        onValueChange={(value) => setFormData({ ...formData, decisionStage: value })}
                      >
                        <SelectTrigger className={`h-12 bg-background ${errors.decisionStage ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder="Where are you in the process?" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {DECISION_STAGE_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.decisionStage && (
                        <p className="text-xs text-destructive mt-1">{errors.decisionStage}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Budget Range
                    </label>
                    <Select 
                      value={formData.budgetRange}
                      onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                    >
                      <SelectTrigger className={`h-12 bg-background ${errors.budgetRange ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {BUDGET_RANGE_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.budgetRange && (
                      <p className="text-xs text-destructive mt-1">{errors.budgetRange}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tell Us About Your Project (Optional)
                    </label>
                    <Textarea
                      placeholder="Describe your vision and any specific materials you're interested in..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`min-h-[80px] bg-background resize-none ${errors.message ? 'border-destructive' : ''}`}
                      maxLength={1000}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground ml-auto">
                        {formData.message.length}/1000
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Reserving Your Offer...' : 'Claim My Free Upgrade'}
                    {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to be contacted about your project. No spam, ever.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SpecialOffer;
