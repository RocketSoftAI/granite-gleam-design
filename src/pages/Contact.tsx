import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

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
      {/* Compact Hero + Form Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Hero Content + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-caps text-primary-foreground/60 mb-4 block">Contact Us</span>
              <h1 className="font-serif text-4xl lg:text-5xl font-medium text-primary-foreground mb-4">
                Let's Talk About
                <br />
                <span className="italic font-normal opacity-80">Your Project</span>
              </h1>
              <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">
                Ready to transform your space? Get in touch for a free consultation and quote.
              </p>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-primary-foreground/5 backdrop-blur-sm p-4 rounded-lg border border-primary-foreground/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-3">
                      <item.icon className="w-4 h-4 text-primary-foreground/80" />
                    </div>
                    <h3 className="text-sm font-medium text-primary-foreground mb-1">{item.title}</h3>
                    {item.action ? (
                      <a 
                        href={item.action}
                        className="block text-sm font-medium text-primary-foreground/90 hover:text-primary transition-colors"
                        target={item.action.startsWith('http') ? '_blank' : undefined}
                        rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.primary}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-primary-foreground/90">{item.primary}</p>
                    )}
                    <p className="text-xs text-primary-foreground/50 mt-0.5">{item.secondary}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showroom Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Map */}
            <motion.div 
              className="aspect-[4/3] bg-muted rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full h-full flex items-center justify-center">
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
            </motion.div>

            {/* Right: Showroom Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="label-caps text-muted-foreground mb-4 block">Visit Us</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-foreground mb-4">
                Our Showroom
                <br />
                <span className="italic font-normal text-muted-foreground">& Slab Yard</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                See hundreds of slabs in person, touch different finishes, and work with our design team to find your perfect stone.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-foreground">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Slab Selection</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse our extensive inventory of granite, quartz, quartzite, marble, and porcelain slabs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-foreground">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Design Consultation</h4>
                    <p className="text-sm text-muted-foreground">
                      Our design team helps coordinate your stone with cabinets, flooring, and overall aesthetic.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-foreground">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Edge Samples</h4>
                    <p className="text-sm text-muted-foreground">
                      View our complete edge profile collection and see how different finishes complement various stones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">No appointment necessary</p>
                <p className="font-medium text-foreground">123 Craftsman Way, Fort Collins, CO 80524</p>
                <p className="text-sm text-muted-foreground mt-1">Just off I-25, Exit 268 • Ample parking available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
