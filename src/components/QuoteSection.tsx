import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import quoteBackground from '@/assets/quote-background.jpg';

const QuoteSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
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
              <a
                href="tel:+19705551234"
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Call Us</span>
                  <span className="font-medium">(970) 555-1234</span>
                </div>
              </a>
              <a
                href="mailto:info@stoneworksco.com"
                className="flex items-center gap-4 text-primary-foreground/90 hover:text-primary-foreground transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Email</span>
                  <span className="font-medium">info@stoneworksco.com</span>
                </div>
              </a>
              <div className="flex items-center gap-4 text-primary-foreground/90">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-sm text-primary-foreground/60">Showroom</span>
                  <span className="font-medium">123 Craftsman Way, Fort Collins, CO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card/95 backdrop-blur-sm p-8 lg:p-10 rounded-lg shadow-elevated">
            <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
              Request a Free Quote
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="h-12 bg-background"
                  />
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
                    className="h-12 bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type
                </label>
                <Select onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                  <SelectTrigger className="h-12 bg-background">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="kitchen">Kitchen Countertops</SelectItem>
                    <SelectItem value="bathroom">Bathroom Vanity</SelectItem>
                    <SelectItem value="outdoor">Outdoor Kitchen</SelectItem>
                    <SelectItem value="fireplace">Fireplace Surround</SelectItem>
                    <SelectItem value="commercial">Commercial Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tell Us About Your Project
                </label>
                <Textarea
                  placeholder="Describe your vision, timeline, and any specific materials you're interested in..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px] bg-background resize-none"
                />
              </div>
              <Button variant="premium" size="xl" type="submit" className="w-full group">
                Get Your Free Quote
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                We typically respond within 24 hours. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
