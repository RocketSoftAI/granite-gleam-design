import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import FormPlaceholder from '@/components/FormPlaceholder';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '(970) 555-1234',
      secondary: 'Mon-Fri 8am-5pm, Sat 9am-2pm',
      action: 'tel:+19705551234'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'info@stoneworksco.com',
      secondary: 'We respond within 24 hours',
      action: 'mailto:info@stoneworksco.com'
    },
    {
      icon: MapPin,
      title: 'Showroom',
      primary: '123 Craftsman Way',
      secondary: 'Fort Collins, CO 80524',
      action: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      primary: 'Mon-Fri: 8am-5pm',
      secondary: 'Sat: 9am-2pm | Sun: Closed',
      action: null
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badge="Contact Us"
        title="Let's Talk About"
        titleAccent="Your Project"
        description="Whether you're ready to start or just exploring options, we're here to help. Reach out today for a free consultation."
        size="default"
      />

      {/* Contact Info + Form Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Information */}
            <div>
              <SectionHeader
                badge="Get in Touch"
                title="We're Here"
                titleAccent="to Help"
                description="Visit our showroom, give us a call, or send us a message. We love meeting new clients and discussing their countertop dreams."
                centered={false}
              />

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="bg-muted p-6 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-2">{item.title}</h3>
                    {item.action ? (
                      <a 
                        href={item.action}
                        className="block font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.primary}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{item.primary}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{item.secondary}</p>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="font-medium mb-2">Interactive Map</p>
                  <p className="text-sm">123 Craftsman Way, Fort Collins, CO</p>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary text-sm font-medium hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <FormPlaceholder
                formId="contact-form"
                title="Send Us a Message"
                description="Fill out the form below and we'll get back to you within 24 hours."
              />

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h4 className="font-serif text-lg font-medium text-foreground mb-3">Prefer to Call?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Our team is available Monday through Friday, 8am to 5pm, and Saturday 9am to 2pm. 
                  We're happy to answer questions, schedule consultations, or provide quick estimates.
                </p>
                <a 
                  href="tel:+19705551234"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  (970) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Visit Us"
            title="Our Showroom"
            titleAccent="& Slab Yard"
            description="See hundreds of slabs in person, touch different finishes, and work with our design team to find your perfect stone."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-soft text-center">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Slab Selection</h3>
              <p className="text-muted-foreground text-sm">
                Browse our extensive inventory of granite, quartz, quartzite, marble, and porcelain slabs. 
                See the full pattern before you buy.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-soft text-center">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Design Consultation</h3>
              <p className="text-muted-foreground text-sm">
                Our design team can help you coordinate your stone selection with your cabinets, 
                flooring, and overall aesthetic.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-soft text-center">
              <h3 className="font-serif text-xl font-medium text-foreground mb-4">Edge Samples</h3>
              <p className="text-muted-foreground text-sm">
                View our complete edge profile collection and see how different finishes 
                complement various stone types.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">No appointment necessary, but we recommend calling ahead for large projects.</p>
            <div className="text-foreground">
              <p className="font-medium">123 Craftsman Way, Fort Collins, CO 80524</p>
              <p className="text-sm text-muted-foreground mt-1">Just off I-25, Exit 268 • Ample parking available</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
