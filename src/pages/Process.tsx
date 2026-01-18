import { MessageSquare, Palette, Ruler, Hammer, CheckCircle, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';
import SEOHead from '@/components/SEOHead';
import { generateHowToSchema, generateBreadcrumbSchema } from '@/config/seo';

import heroKitchen from '@/assets/hero-kitchen.jpg';

const ProcessPage = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: '01',
      title: 'Initial Consultation',
      duration: '1-2 days',
      description: 'Every project begins with a conversation. We meet at your home or our showroom to understand your vision, discuss materials, and take preliminary measurements.',
      details: [
        'Review your project goals and design preferences',
        'Discuss budget expectations and timelines',
        'Explain material options and their characteristics',
        'Take preliminary measurements if visiting your home',
        'Provide an initial estimate range'
      ]
    },
    {
      icon: Palette,
      step: '02',
      title: 'Material Selection',
      duration: '1 day',
      description: 'Visit our slab yard to hand-select the exact stone for your project. We guide you through colors, patterns, veining, and help you find the perfect match.',
      details: [
        'Browse our extensive slab inventory',
        'View full slabs, not just samples',
        'Get expert guidance on material characteristics',
        'See how different stones look in various lighting',
        'Reserve your selected slab(s)'
      ]
    },
    {
      icon: Ruler,
      step: '03',
      title: 'Digital Templating',
      duration: '2-3 hours',
      description: 'Our team visits your home with laser templating technology to capture every angle and measurement with sub-millimeter precision.',
      details: [
        'Laser measurement technology for perfect accuracy',
        'Capture all angles, corners, and cutouts',
        'Determine optimal seam placement',
        'Confirm edge profile selections',
        'Finalize sink and cooktop cutout positions'
      ]
    },
    {
      icon: Hammer,
      step: '04',
      title: 'Expert Fabrication',
      duration: '5-7 days',
      description: 'Your stone is cut, polished, and finished in our state-of-the-art fabrication facility. CNC precision meets artisan finishing for flawless results.',
      details: [
        'CNC cutting for precise dimensions',
        'Expert edge profiling and polishing',
        'Quality inspection at every stage',
        'Sink and cooktop cutout fabrication',
        'Final polish and preparation for installation'
      ]
    },
    {
      icon: CheckCircle,
      step: '05',
      title: 'Professional Installation',
      duration: '1 day',
      description: 'Our master installers bring your countertops to life with seamless, professional installation. We leave your space clean and ready to enjoy.',
      details: [
        'Careful removal of existing countertops (if applicable)',
        'Precision placement and leveling',
        'Seam alignment and finishing',
        'Caulking and sealing',
        'Complete cleanup and walkthrough'
      ]
    }
  ];

  const timeline = {
    kitchen: '2-3 weeks',
    bathroom: '1-2 weeks',
    outdoor: '2-4 weeks',
    commercial: '3-6 weeks'
  };

  // HowTo Schema for AEO - optimized for featured snippets and AI answers
  const howToSchema = generateHowToSchema({
    name: 'How to Get Custom Stone Countertops Installed',
    description: 'Complete guide to getting custom granite, quartz, or quartzite countertops installed in your home. From initial consultation through professional installation, typically completed in 2-3 weeks.',
    totalTime: 'P21D', // 21 days in ISO 8601
    estimatedCost: { currency: 'USD', value: '3000-15000' },
    steps: steps.map((step) => ({
      name: step.title,
      text: step.description,
    })),
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Our Process', url: '/process' },
  ]);

  return (
    <Layout>
      <SEOHead schema={[howToSchema, breadcrumbSchema]} />
      
      {/* Hero Section */}
      <PageHero
        badge="Our Process"
        title="From Vision to Reality"
        titleAccent="in 5 Simple Steps"
        description="We've refined our process over 20 years to make your experience seamless. Most residential projects are completed within 2-3 weeks from material selection to installation."
        backgroundImage={heroKitchen}
        size="large"
      />

      {/* Timeline Overview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                <strong>Kitchen:</strong> {timeline.kitchen}
              </span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                <strong>Bathroom:</strong> {timeline.bathroom}
              </span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                <strong>Outdoor:</strong> {timeline.outdoor}
              </span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-foreground">
                <strong>Commercial:</strong> {timeline.commercial}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Step by Step"
            title="Your Journey"
            titleAccent="with Stoneworks"
            description="Here's exactly what to expect at each stage of your countertop project."
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div 
                key={step.step}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <span className="label-caps text-primary">{step.step}</span>
                      <h3 className="font-serif text-2xl font-medium text-foreground">{step.title}</h3>
                    </div>
                  </div>
                  
                  <p className="body-large text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Typical Duration: {step.duration}</span>
                  </div>

                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`bg-muted rounded-lg aspect-[4/3] flex items-center justify-center ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <div className="text-center text-muted-foreground">
                    <step.icon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">Step {step.step} Illustration</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Good to Know"
            title="What to Expect"
            titleAccent="During Your Project"
            description="A few helpful things to keep in mind as we work together on your countertops."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-soft">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Before Templating</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Have your cabinets installed and level</li>
                <li>• Know your sink and cooktop models</li>
                <li>• Clear countertop areas for access</li>
                <li>• Have someone home who can make decisions</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Installation Day</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Clear pathways for our team</li>
                <li>• Turn off water to kitchen/bath area</li>
                <li>• Remove items from under counters</li>
                <li>• Plan for 4-6 hours of work time</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">After Installation</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Wait 24 hours before using sinks</li>
                <li>• Avoid heavy items on seams initially</li>
                <li>• We provide care instructions</li>
                <li>• Call us with any questions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionHeader
                badge="Get Started"
                title="Ready to Begin"
                titleAccent="Your Project?"
                description="Contact us today to schedule your free consultation. We'll discuss your vision, answer your questions, and provide an estimate for your countertop project."
                centered={false}
              />
            </div>

            <ContactForm
              title="Schedule Your Consultation"
              description="Tell us about your project and we'll reach out within 24 hours to schedule your free consultation."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessPage;
