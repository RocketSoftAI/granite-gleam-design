import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '(970) 493-1992',
      secondary: 'Mon-Fri 8am-5pm, Sat 9am-2pm',
      action: 'tel:+19704931992'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'office@stoneworksofcolorado.com',
      secondary: 'We respond within 24 hours',
      action: 'mailto:office@stoneworksofcolorado.com'
    },
    {
      icon: MapPin,
      title: 'Showroom',
      primary: '3555 S Lincoln Ave',
      secondary: 'Loveland, CO 80537',
      action: 'https://maps.google.com/?q=3555+S+Lincoln+Ave,+Loveland,+CO+80537'
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
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Hero Content + Contact Info */}
            <motion.div
              className="order-2 lg:order-1"
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
              className="order-1 lg:order-2"
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.5!2d-105.075!3d40.3641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876ea5c8e5fba5a7%3A0x0!2s3555%20S%20Lincoln%20Ave%2C%20Loveland%2C%20CO%2080537!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="StoneWorks Showroom Location"
                className="w-full h-full"
              />
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
                <p className="font-medium text-foreground">3555 S Lincoln Ave, Loveland, CO 80537</p>
                <p className="text-sm text-muted-foreground mt-1">Just off US-287 • Ample parking available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
