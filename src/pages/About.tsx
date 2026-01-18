import { useState } from 'react';
import { Shield, Award, Users, Mountain, Heart, Truck, Wrench, Star, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/BookingModal';

import heroKitchen from '@/assets/hero-kitchen.jpg';

const AboutPage = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const values = [
    {
      icon: Shield,
      title: 'Quality Without Compromise',
      description: 'We never cut corners. From the stones we source to the final polish, quality is non-negotiable.'
    },
    {
      icon: Heart,
      title: 'Customer-First Approach',
      description: 'Your satisfaction drives everything we do. We listen, we adapt, and we deliver beyond expectations.'
    },
    {
      icon: Award,
      title: 'Master Craftsmanship',
      description: 'Our team combines decades of experience with state-of-the-art technology for flawless results.'
    },
    {
      icon: Mountain,
      title: 'Colorado Pride',
      description: 'Born and raised in Northern Colorado, we understand our community and climate like no one else.'
    }
  ];

  const stats = [
    { number: '20+', label: 'Years in Business' },
    { number: '2,500+', label: 'Projects Completed' },
    { number: '500+', label: 'Happy Clients This Year' },
    { number: '4.9', label: 'Google Rating' }
  ];

  const team = [
    {
      name: 'Rob Abrahamson',
      role: 'Founder & President',
      bio: 'Rob founded Stoneworks of Colorado in 2003 after 15 years in the stone industry. His passion for quality and customer service has shaped our company culture.'
    },
    {
      name: 'Sarah Chen',
      role: 'Design Director',
      bio: 'With a background in interior design, Sarah helps clients navigate material selection and ensures every project achieves its aesthetic potential.'
    },
    {
      name: 'Carlos Martinez',
      role: 'Lead Fabricator',
      bio: 'Carlos brings 18 years of stone fabrication expertise to our shop. His precision and attention to detail set the standard for our team.'
    },
    {
      name: 'Lori Westrum',
      role: 'Operations Manager',
      bio: 'Lori ensures every project runs smoothly from first consultation to final installation, coordinating all aspects of our customer experience.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badge="About Us"
        title="Three Generations"
        titleAccent="of Stone Expertise"
        description="Since 2003, Stoneworks of Colorado has been crafting exceptional countertops for Northern Colorado homeowners. We're not just fabricators—we're craftsmen, neighbors, and partners in transforming your home."
        backgroundImage={heroKitchen}
        size="large"
      />

      {/* Story Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionHeader
                badge="Our Story"
                title="From Humble Beginnings"
                titleAccent="to Industry Leaders"
                centered={false}
              />
              
              <div className="space-y-6 text-muted-foreground">
                <p className="body-large">
                  Stoneworks of Colorado was born from a simple belief: every homeowner deserves 
                  access to exceptional craftsmanship and premium materials, delivered with 
                  integrity and care.
                </p>
                <p>
                  When Rob Abrahamson opened our first shop in Loveland in 2003, he had 
                  one fabrication table and a vision. Today, we operate a state-of-the-art 
                  15,000 square foot facility with CNC technology, water jet cutting, and a 
                  team of 25 dedicated professionals.
                </p>
                <p>
                  But some things haven't changed. We still hand-select every slab. We still 
                  treat every home like our own. And we still believe that the relationships 
                  we build with our clients are more valuable than any transaction.
                </p>
                <p>
                  Today, Stoneworks of Colorado is Northern Colorado's most trusted name in 
                  custom stone fabrication. We've completed over 2,500 projects and earned a 
                  4.9-star Google rating from the homeowners who've trusted us with their visions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-muted p-8 rounded-lg text-center">
                  <div className="font-serif text-5xl font-medium text-foreground mb-2">
                    {stat.number}
                  </div>
                  <span className="label-caps text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Our Values"
            title="What Drives Us"
            titleAccent="Every Day"
            description="These principles guide every decision we make, from the stones we source to the service we provide."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="heading-card text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Our Team"
            title="Meet the Experts"
            titleAccent="Behind the Craft"
            description="Our team combines decades of experience with a passion for excellence."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
                  <span className="font-serif text-3xl text-muted-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-1">{member.name}</h3>
                <p className="label-caps text-primary mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionHeader
                badge="Our Facility"
                title="State-of-the-Art"
                titleAccent="Fabrication"
                centered={false}
              />
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Our 15,000 square foot fabrication facility in Loveland houses the most 
                  advanced stone processing equipment in Northern Colorado.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground block">CNC Fabrication</span>
                      <span className="text-sm">Computer-controlled precision cutting for perfect fits every time.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Truck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground block">Indoor Slab Storage</span>
                      <span className="text-sm">Climate-controlled warehouse protecting hundreds of premium slabs.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground block">Design Showroom</span>
                      <span className="text-sm">Full displays, samples, and design consultation space.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <img
                src={heroKitchen}
                alt="Our fabrication facility"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <span className="label-caps text-primary-foreground/60 mb-4 block">Visit Us</span>
          <h2 className="heading-section text-primary-foreground mb-6">
            Come See Us
            <br />
            <span className="italic font-normal opacity-80">in Person</span>
          </h2>
          <p className="body-large text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            Visit our showroom to browse hundreds of slabs, feel different finishes, 
            and discuss your project with our design team.
          </p>
          <Button 
            variant="hero" 
            size="heroLg" 
            onClick={() => setIsCalendarOpen(true)}
            className="mb-8"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book an Appointment
          </Button>
          <div className="text-primary-foreground/80">
            <p className="font-medium text-lg mb-2">3555 S Lincoln Ave, Loveland, CO 80537</p>
            <p>Mon - Fri: 8am - 4pm (Closed 12pm - 1pm for lunch)</p>
          </div>
        </div>
      </section>

      <BookingModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </Layout>
  );
};

export default AboutPage;
