import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { motion } from 'framer-motion';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import quoteBackground from '@/assets/quote-background.jpg';

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

const QuoteSection = () => {
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
    
    // Validate form data
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
          source: 'quote_form',
        },
      });

      if (error) {
        console.error('Error submitting lead:', error);
        toast.error('Something went wrong. Please try again.');
        return;
      }

      console.log('Lead submitted successfully:', data);
      toast.success('Thank you! We will contact you within 24 hours.');
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
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={quoteBackground}
          alt="Beautiful stone installation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/85 to-charcoal/75" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Content */}
          <ScrollAnimation variant="slideLeft">
            <span className="label-caps text-primary-foreground/60 mb-4 block">Start Your Project</span>
            <h2 className="heading-section text-primary-foreground mb-6">
              Ready to Transform
              <br />
              <span className="italic font-normal opacity-80">Your Space?</span>
            </h2>
            <p className="body-large text-primary-foreground/70 mb-10">
              Whether you're dreaming of a show-stopping kitchen island or an elegant 
              bathroom retreat, we're here to bring your vision to life. Get your free 
              consultation and quote today.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.a
                href="tel:+19705551234"
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-primary-foreground transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Call Us</span>
                  <span className="font-medium">(970) 555-1234</span>
                </div>
              </motion.a>
              <motion.a
                href="mailto:info@stoneworksco.com"
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-primary-foreground transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Email</span>
                  <span className="font-medium">info@stoneworksco.com</span>
                </div>
              </motion.a>
              <motion.div 
                className="flex items-center gap-4 text-primary-foreground/90"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Showroom</span>
                  <span className="font-medium">123 Craftsman Way, Fort Collins, CO</span>
                </div>
              </motion.div>
            </div>
          </ScrollAnimation>

          {/* Right Column - Form */}
          <ScrollAnimation variant="slideRight" delay={0.2}>
            <motion.div 
              className="bg-card/95 backdrop-blur-sm p-8 lg:p-10 rounded-lg shadow-elevated"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
                Request a Free Quote
              </h3>
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
                    Tell Us About Your Project
                  </label>
                  <Textarea
                    placeholder="Describe your vision and any specific materials you're interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`min-h-[100px] bg-background resize-none ${errors.message ? 'border-destructive' : ''}`}
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

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="premium" 
                    size="xl" 
                    type="submit" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Get Your Free Quote'}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <p className="text-center text-xs text-muted-foreground">
                  We typically respond within 24 hours. No spam, ever.
                </p>
              </form>
            </motion.div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;