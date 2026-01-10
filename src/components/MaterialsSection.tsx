import { ArrowRight } from 'lucide-react';

// Import material images
import marbleDetail from '@/assets/marble-detail.jpg';
import graniteDetail from '@/assets/granite-detail.jpg';
import quartzDetail from '@/assets/quartz-detail.jpg';
import quartziteDetail from '@/assets/quartzite-detail.jpg';

const materials = [
  {
    name: 'Granite',
    image: graniteDetail,
    description: 'Natural beauty meets durability. Each slab is uniquely formed over millions of years, offering unmatched heat and scratch resistance.',
    features: ['100% Natural Stone', 'Heat Resistant', 'Unique Patterns'],
  },
  {
    name: 'Quartz',
    image: quartzDetail,
    description: 'Engineered for perfection. Consistent patterns with the look of natural stone and virtually maintenance-free performance.',
    features: ['Non-Porous', 'Low Maintenance', 'Consistent Color'],
  },
  {
    name: 'Marble',
    image: marbleDetail,
    description: 'Timeless elegance for discerning homeowners. The classic choice for those who appreciate true luxury and sophistication.',
    features: ['Classic Beauty', 'Cool Surface', 'Unique Veining'],
  },
  {
    name: 'Quartzite',
    image: quartziteDetail,
    description: 'Nature\'s hardest stone. The durability of granite with the flowing patterns of marble—the best of both worlds.',
    features: ['Extremely Durable', 'Natural Stone', 'Exotic Patterns'],
  },
];

const MaterialsSection = () => {
  return (
    <section id="materials" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-caps text-muted-foreground mb-4 block">Materials</span>
          <h2 className="heading-section text-foreground mb-6">
            Discover Your
            <br />
            <span className="italic font-normal text-muted-foreground">Perfect Stone</span>
          </h2>
          <p className="body-large text-muted-foreground">
            We source premium materials from quarries around the world. 
            Visit our showroom to see and touch hundreds of slabs.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material) => (
            <div
              key={material.name}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg mb-6 aspect-square">
                <img
                  src={material.image}
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

              {/* Content */}
              <h3 className="font-serif text-2xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                {material.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {material.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
