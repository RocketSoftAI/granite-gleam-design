import { useParams, Navigate } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import FormPlaceholder from '@/components/FormPlaceholder';
import { getMaterialBySlug, getAllMaterials } from '@/data/materials';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import portfolio images for gallery
import portfolioBathroom from '@/assets/portfolio-bathroom.jpg';
import portfolioIsland from '@/assets/portfolio-island.jpg';
import portfolioOutdoor from '@/assets/portfolio-outdoor.jpg';
import portfolioGourmet from '@/assets/portfolio-gourmet.jpg';
import portfolioSpa from '@/assets/portfolio-spa.jpg';
import portfolioPantry from '@/assets/portfolio-pantry.jpg';

const galleryImages = [
  portfolioIsland,
  portfolioBathroom,
  portfolioGourmet,
  portfolioOutdoor,
  portfolioSpa,
  portfolioPantry,
];

const MaterialPage = () => {
  const { material } = useParams<{ material: string }>();
  const materialSlug = material?.replace('-countertops', '');
  const materialData = materialSlug ? getMaterialBySlug(materialSlug) : undefined;

  if (!materialData) {
    return <Navigate to="/services" replace />;
  }

  const allMaterials = getAllMaterials().filter(m => m.slug !== materialSlug);

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        badge={`${materialData.name} Countertops`}
        title={materialData.tagline.split(' ').slice(0, 3).join(' ')}
        titleAccent={materialData.tagline.split(' ').slice(3).join(' ')}
        description={materialData.description}
        backgroundImage={materialData.heroImage}
        size="large"
      />

      {/* Overview Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <SectionHeader
                badge="Overview"
                title={`Why Choose ${materialData.name}`}
                titleAccent="for Your Home"
                centered={false}
              />
              <div className="prose prose-lg text-muted-foreground">
                {materialData.overview.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-8">
              <div className="bg-muted p-8 rounded-lg">
                <h3 className="font-serif text-xl font-medium text-foreground mb-6 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Advantages
                </h3>
                <ul className="space-y-3">
                  {materialData.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-muted p-8 rounded-lg">
                <h3 className="font-serif text-xl font-medium text-foreground mb-6 flex items-center gap-2">
                  <X className="w-5 h-5 text-amber-600" />
                  Considerations
                </h3>
                <ul className="space-y-3">
                  {materialData.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <X className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Applications"
            title={`Perfect Uses for`}
            titleAccent={materialData.name}
            description={`Discover how ${materialData.name.toLowerCase()} can transform different areas of your home.`}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialData.applications.map((app, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-soft hover:shadow-medium transition-all duration-500">
                <h3 className="font-serif text-xl font-medium text-foreground mb-4">{app.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Care & Maintenance"
            title={`Caring for Your`}
            titleAccent={`${materialData.name} Countertops`}
            description="Follow these simple guidelines to keep your countertops looking beautiful for years to come."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materialData.maintenance.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
                  <span className="label-caps text-primary">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="label-caps text-muted-foreground mb-4 block">Investment</span>
            <h2 className="heading-section text-foreground mb-6">
              {materialData.name} Pricing
            </h2>
            <div className="bg-card p-10 rounded-lg shadow-soft">
              <div className="font-serif text-4xl font-medium text-primary mb-4">
                {materialData.priceRange}
              </div>
              <p className="text-muted-foreground mb-8">
                {materialData.priceNote}
              </p>
              <p className="text-sm text-muted-foreground">
                * Prices include fabrication and professional installation. Actual cost depends on 
                edge profiles, cutouts, and project complexity. Contact us for a detailed quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Gallery"
            title={`${materialData.name} Projects`}
            titleAccent="We've Completed"
            description={`See how Northern Colorado homeowners have transformed their spaces with ${materialData.name.toLowerCase()}.`}
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={image}
                  alt={`${materialData.name} project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
            >
              View Complete Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <SectionHeader
                badge="FAQs"
                title={`Common Questions`}
                titleAccent={`About ${materialData.name}`}
                centered={false}
              />
              
              <Accordion type="single" collapsible className="w-full">
                {materialData.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-serif text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Quote Form */}
            <div>
              <FormPlaceholder
                formId={`${materialData.slug}-quote-form`}
                title={`Get Your ${materialData.name} Quote`}
                description="Tell us about your project and we'll provide a detailed estimate within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Materials Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <SectionHeader
            badge="Explore More"
            title="Other Materials"
            titleAccent="to Consider"
            description="Not sure if this is the right material? Explore our other premium options."
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            {allMaterials.slice(0, 3).map((mat) => (
              <Link
                key={mat.slug}
                to={`/services/${mat.slug}-countertops`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                  <img
                    src={mat.heroImage}
                    alt={mat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                  {mat.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {mat.tagline}
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
    </Layout>
  );
};

export default MaterialPage;
