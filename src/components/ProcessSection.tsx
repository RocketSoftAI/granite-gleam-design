import { MessageSquare, Palette, Ruler, Hammer, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Consultation',
    description: 'Free in-home or showroom consultation to understand your vision and take initial measurements.',
    duration: '1-2 days',
  },
  {
    icon: Palette,
    step: '02',
    title: 'Material Selection',
    description: 'Visit our slab yard to hand-select your exact piece. We guide you through colors, patterns, and finishes.',
    duration: '1 day',
  },
  {
    icon: Ruler,
    step: '03',
    title: 'Digital Templating',
    description: 'Precision laser templating captures every angle and measurement for a perfect fit.',
    duration: '2-3 hours',
  },
  {
    icon: Hammer,
    step: '04',
    title: 'Expert Fabrication',
    description: 'Your stone is cut, polished, and finished in our state-of-the-art fabrication facility.',
    duration: '5-7 days',
  },
  {
    icon: CheckCircle,
    step: '05',
    title: 'Installation',
    description: 'Our master installers bring your countertops to life with seamless, professional installation.',
    duration: '1 day',
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-20">
          <span className="label-caps text-muted-foreground mb-4 block">Our Process</span>
          <h2 className="heading-section text-foreground mb-6">
            From Vision to
            <br />
            <span className="italic font-normal text-muted-foreground">Reality in 5 Steps</span>
          </h2>
          <p className="body-large text-muted-foreground">
            We've refined our process over 20 years to make your experience seamless. 
            Most projects are completed within 2-3 weeks.
          </p>
        </ScrollAnimation>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-border hidden lg:block" />
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6" staggerDelay={0.15}>
            {steps.map((item, index) => (
              <StaggerItem key={item.step}>
                <div className="relative group">
                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-6 flex justify-center lg:justify-start">
                    <div 
                      className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 active:scale-95 transition-all duration-500 shadow-soft"
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center lg:text-left">
                    <span className="label-caps text-primary mb-2 block">{item.step}</span>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary/80">
                      <span className="w-4 h-px bg-primary/40" />
                      {item.duration}
                    </span>
                  </div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-3 w-6 h-0.5">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-primary/30 absolute -right-2 -top-[5px]" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Learn More Link */}
        <ScrollAnimation variant="fadeUp" delay={0.4} className="text-center mt-16">
          <Link 
            to="/process" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            Learn More About Our Process
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ProcessSection;
