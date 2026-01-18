import { MapPin, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import FormPlaceholder from '@/components/FormPlaceholder';

const ServiceAreaPage = () => {
  const primaryCities = [
    { name: 'Fort Collins', description: 'Our home base and showroom location. Full-service support for all project types.' },
    { name: 'Loveland', description: 'Just minutes from our facility. Quick turnaround times and easy showroom visits.' },
    { name: 'Greeley', description: 'Serving the Greeley area with complete fabrication and installation services.' },
    { name: 'Longmont', description: 'Regular installations throughout Longmont and surrounding communities.' },
    { name: 'Boulder', description: 'Bringing premium stone fabrication to Boulder County homeowners.' },
    { name: 'Windsor', description: 'Growing with Windsor—proud to serve this thriving community.' },
  ];

  const additionalAreas = [
    'Wellington', 'Timnath', 'Johnstown', 'Berthoud', 'Estes Park', 'Lyons',
    'Erie', 'Frederick', 'Firestone', 'Dacono', 'Mead', 'Milliken',
    'Severance', 'Eaton', 'Ault', 'Evans', 'Garden City', 'LaSalle',
    'Niwot', 'Louisville', 'Lafayette', 'Superior', 'Broomfield'
  ];

  const whyLocal = [
    { title: 'Fast Response Times', description: 'Same-week consultations for most Northern Colorado locations.' },
    { title: 'No Travel Fees', description: 'Free on-site visits and measurements within our service area.' },
    { title: 'Local Knowledge', description: 'We understand Colorado homes and climate considerations.' },
    { title: 'Quick Turnaround', description: 'Proximity to our shop means faster project completion.' },
  ];

  return (
    <Layout>
      <PageHero
        badge="Service Area"
        title="Serving Northern Colorado"
        titleAccent="with Pride"
        description="From Wellington to Boulder, and Estes Park to Greeley—we bring expert stone fabrication to communities across the I-25 corridor and beyond."
      />

      {/* Map Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeader
                badge="Coverage"
                title="Our Service"
                titleAccent="Territory"
                description="We proudly serve homeowners throughout Northern Colorado, with our shop centrally located in Fort Collins for maximum coverage."
                centered={false}
              />
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground block">I-25 Corridor</span>
                    <span className="text-sm text-muted-foreground">Wellington to Boulder and everywhere in between</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground block">West to the Mountains</span>
                    <span className="text-sm text-muted-foreground">Serving Estes Park and foothill communities</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground block">East to the Plains</span>
                    <span className="text-sm text-muted-foreground">Greeley, Evans, and surrounding areas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground p-8">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="font-medium mb-2">Interactive Service Area Map</p>
                <p className="text-sm">Showing coverage across Northern Colorado</p>
                <div className="mt-4 text-xs">
                  <p>Fort Collins • Loveland • Greeley</p>
                  <p>Longmont • Boulder • Windsor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Cities */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Primary Markets"
            title="Cities We Serve"
            titleAccent="Most Frequently"
            description="These communities represent the core of our service area, where we complete the majority of our installations."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryCities.map((city) => (
              <div key={city.name} className="bg-card p-8 rounded-lg shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-xl font-medium text-foreground">{city.name}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{city.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Areas */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Extended Coverage"
            title="Additional Communities"
            titleAccent="We Service"
            description="Beyond our primary markets, we regularly serve these Northern Colorado communities."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {additionalAreas.map((area) => (
              <div key={area} className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <p className="text-muted-foreground mb-2">
              Don't see your city listed? We may still be able to help!
            </p>
            <p className="text-sm text-muted-foreground">
              Contact us to discuss your project location. We consider projects outside our standard service area on a case-by-case basis.
            </p>
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Local Advantage"
            title="Why Choose a"
            titleAccent="Local Fabricator"
            description="Working with a Northern Colorado-based company means better service and faster results."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyLocal.map((item, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-soft text-center">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                  <span className="label-caps text-primary">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeader
                badge="Get Started"
                title="In Our Service Area?"
                titleAccent="Let's Talk!"
                description="Contact us today to schedule your free consultation. We'll come to you for measurements and design discussions."
                centered={false}
              />
              
              <div className="mt-8 space-y-4">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Showroom:</strong> 3555 S Lincoln Ave, Loveland, CO 80537
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Phone:</strong>{' '}
                  <a href="tel:+19704931992" className="text-primary hover:underline">(970) 493-1992</a>
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Hours:</strong> Mon-Fri 8am-5pm, Sat 9am-2pm
                </p>
              </div>
            </div>

            <FormPlaceholder
              formId="service-area-form"
              title="Request a Consultation"
              description="Tell us about your project and location—we'll confirm coverage and schedule your free consultation."
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceAreaPage;
