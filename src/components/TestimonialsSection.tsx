import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

const testimonials = [
  {
    name: 'Sarah & Michael Thompson',
    location: 'Fort Collins, CO',
    project: 'Kitchen Remodel',
    rating: 5,
    text: 'From start to finish, Stoneworks exceeded our expectations. The team helped us select the perfect quartzite slab and the installation was flawless. Our kitchen is now the heart of our home.',
  },
  {
    name: 'David Chen',
    location: 'Loveland, CO',
    project: 'Master Bathroom',
    rating: 5,
    text: 'I interviewed several fabricators and Stoneworks stood out for their attention to detail. The marble vanity they created is stunning - everyone who visits asks about it.',
  },
  {
    name: 'Jennifer Martinez',
    location: 'Windsor, CO',
    project: 'Outdoor Kitchen',
    rating: 5,
    text: 'We were nervous about outdoor stone, but the team at Stoneworks guided us to the perfect granite that handles Colorado weather beautifully. Two years later, it still looks brand new.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-caps text-muted-foreground mb-4 block">Testimonials</span>
          <h2 className="heading-section text-foreground mb-6">
            Words from
            <br />
            <span className="italic font-normal text-muted-foreground">Our Clients</span>
          </h2>
        </ScrollAnimation>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div
                className="bg-card p-8 lg:p-10 rounded-lg shadow-soft relative group hover:shadow-medium hover:-translate-y-1 transition-all duration-500 h-full"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 right-8 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-foreground leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-6">
                  <div className="font-serif text-lg font-medium text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {testimonial.project} • {testimonial.location}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Reviews Link */}
        <ScrollAnimation variant="fadeUp" delay={0.3} className="text-center mt-12">
          <Link 
            to="/reviews" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            Read All Reviews
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ScrollAnimation>

        {/* Trust Badges */}
        <ScrollAnimation variant="fadeUp" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 mt-16 pt-16 border-t border-border">
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="font-serif text-5xl font-medium text-foreground mb-2">4.9</div>
              <div className="flex justify-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />
                ))}
              </div>
              <span className="label-caps text-muted-foreground">Google Reviews</span>
            </div>
            <div className="w-px h-16 bg-border hidden sm:block" />
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="font-serif text-5xl font-medium text-foreground mb-2">A+</div>
              <span className="label-caps text-muted-foreground">BBB Rating</span>
            </div>
            <div className="w-px h-16 bg-border hidden sm:block" />
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <div className="font-serif text-5xl font-medium text-foreground mb-2">20+</div>
              <span className="label-caps text-muted-foreground">Years in Business</span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default TestimonialsSection;
