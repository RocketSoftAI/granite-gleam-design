import { Shield, Award, Users, Mountain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const differentiators = [
  {
    icon: Shield,
    title: '1 Year Warranty',
    description: 'Our craftsmanship stands the test of time. We back every installation with our comprehensive 1 year warranty.',
  },
  {
    icon: Award,
    title: 'Master Fabrication',
    description: 'State-of-the-art CNC technology paired with artisan finishing techniques for flawless results every time.',
  },
  {
    icon: Users,
    title: 'Family Owned',
    description: 'Three generations of stone expertise. When you work with us, you work directly with the owners.',
  },
  {
    icon: Mountain,
    title: 'Colorado Proud',
    description: 'Born and raised in Northern Colorado, serving our neighbors with installations that complement our mountain lifestyle.',
  },
];

const WhyUsSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <ScrollAnimation variant="slideLeft">
            <span className="label-caps text-muted-foreground mb-4 block">Why Stoneworks</span>
            <h2 className="heading-section text-foreground mb-6">
              Where Precision
              <br />
              <span className="italic font-normal text-muted-foreground">Meets Passion</span>
            </h2>
            <p className="body-large text-muted-foreground mb-8">
              For over two decades, we've built our reputation on one simple promise: 
              deliver exceptional quality without compromise. Every slab is hand-selected, 
              every edge is precision-crafted, and every installation is treated like our own home.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-secondary border-4 border-muted flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {['JD', 'SM', 'AK', 'BR'][i - 1]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <span className="font-serif text-2xl font-medium text-foreground">500+</span>
                <span className="block text-sm text-muted-foreground">Happy Homeowners This Year</span>
              </div>
            </div>
            
            {/* CTA Link */}
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mt-8"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollAnimation>

          {/* Right Column - Cards */}
          <StaggerContainer className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {differentiators.map((item) => (
              <StaggerItem key={item.title}>
                <div className="bg-card p-6 lg:p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-500 group h-full">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="heading-card text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
