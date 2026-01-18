import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import ContactForm from '@/components/ContactForm';
import { getAllMaterials } from '@/data/materials';

import heroKitchen from '@/assets/hero-kitchen.jpg';

const ServicesPage = () => {
  const materials = getAllMaterials();

  const serviceTypes = [
    {
      title: 'Kitchen Countertops',
      description: 'Transform your kitchen with premium stone surfaces. From elegant islands to functional prep areas, we create the heart of your home.',
      features: ['Custom Edge Profiles', 'Integrated Sinks', 'Waterfall Edges', 'Backsplash Integration']
    },
    {
      title: 'Bathroom Vanities',
      description: 'Elevate your bathroom with luxurious stone vanity tops. Perfect for master suites, guest baths, and powder rooms.',
      features: ['Undermount Sinks', 'Custom Cutouts', 'Matching Shower Thresholds', 'Tub Surrounds']
    },
    {
      title: 'Outdoor Kitchens',
      description: 'Bring your outdoor entertaining to the next level with weather-resistant stone surfaces built for Colorado climates.',
      features: ['UV Resistant Materials', 'Freeze-Thaw Durability', 'Grill Surrounds', 'Bar Tops']
    },
    {
      title: 'Commercial Projects',
      description: 'From restaurants to office lobbies, we deliver commercial-grade fabrication with attention to every detail.',
      features: ['ADA Compliance', 'High-Volume Capacity', 'Project Management', 'Flexible Scheduling']
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badge="Our Services"
        title="Expert Stone Fabrication"
        titleAccent="& Installation"
        description="From material selection to final installation, we handle every step of your countertop project with precision and care."
        backgroundImage={heroKitchen}
        size="large"
      />

      {/* Materials Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Materials"
            title="Premium Stone"
            titleAccent="Selection"
            description="We source the finest materials from quarries around the world. Each stone is hand-selected for quality and beauty."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((material) => (
              <Link
                key={material.slug}
                to={`/services/${material.slug}-countertops`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-square">
                  <img
                    src={material.heroImage}
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex flex-wrap gap-2">
                      {material.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                  {material.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {material.tagline}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="What We Do"
            title="Complete Countertop"
            titleAccent="Services"
            description="From residential kitchens to commercial spaces, we have the expertise to bring your vision to life."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {serviceTypes.map((service, index) => (
              <div key={index} className="bg-card p-8 lg:p-10 rounded-lg shadow-soft hover:shadow-medium transition-all duration-500">
                <h3 className="font-serif text-2xl font-medium text-foreground mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <SectionHeader
                badge="Get Started"
                title="Ready to Transform"
                titleAccent="Your Space?"
                description="Contact us today for a free consultation and quote. We'll help you choose the perfect material for your project and provide a detailed estimate."
                centered={false}
              />
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="label-caps text-primary">01</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Free Consultation</span>
                    <p className="text-sm text-muted-foreground">We discuss your vision and take measurements</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="label-caps text-primary">02</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Material Selection</span>
                    <p className="text-sm text-muted-foreground">Hand-pick your slab from our extensive inventory</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <span className="label-caps text-primary">03</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Expert Installation</span>
                    <p className="text-sm text-muted-foreground">Our master installers bring your vision to life</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm
              title="Request a Free Quote"
              description="Fill out the form below and we'll get back to you within 24 hours."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
