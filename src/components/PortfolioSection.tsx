import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

// Import portfolio images
import portfolioBathroom from '@/assets/portfolio-bathroom.jpg';
import portfolioIsland from '@/assets/portfolio-island.jpg';
import portfolioOutdoor from '@/assets/portfolio-outdoor.jpg';
import portfolioGourmet from '@/assets/portfolio-gourmet.jpg';
import portfolioSpa from '@/assets/portfolio-spa.jpg';
import portfolioPantry from '@/assets/portfolio-pantry.jpg';

// Map material names to their service page slugs
const materialToSlug: Record<string, string> = {
  'Quartz': 'quartz-countertops',
  'Marble': 'marble-countertops',
  'Granite': 'granite-countertops',
  'Quartzite': 'quartzite-countertops',
};

const portfolioItems = [
  { id: 1, image: portfolioIsland, title: 'Modern Waterfall Island', material: 'Quartz', category: 'Kitchen' },
  { id: 2, image: portfolioBathroom, title: 'Marble Vanity Suite', material: 'Marble', category: 'Bathroom' },
  { id: 3, image: portfolioOutdoor, title: 'Mountain Outdoor Kitchen', material: 'Granite', category: 'Outdoor' },
  { id: 4, image: portfolioGourmet, title: 'Classic Gourmet Kitchen', material: 'Granite', category: 'Kitchen' },
  { id: 5, image: portfolioSpa, title: 'Spa-Inspired Double Vanity', material: 'Quartzite', category: 'Bathroom' },
  { id: 6, image: portfolioPantry, title: 'Elegant Butler\'s Pantry', material: 'Marble', category: 'Kitchen' },
];

const filters = ['All', 'Granite', 'Quartz', 'Marble', 'Quartzite'];

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.material === activeFilter);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollAnimation variant="fadeUp" className="max-w-3xl mb-16">
          <span className="label-caps text-muted-foreground mb-4 block">Our Portfolio</span>
          <h2 className="heading-section text-foreground mb-6">
            Craftsmanship
            <br />
            <span className="italic font-normal text-muted-foreground">You Can See & Feel</span>
          </h2>
          <p className="body-large text-muted-foreground">
            Every project tells a story of meticulous attention to detail. 
            Browse our recent installations across Northern Colorado.
          </p>
        </ScrollAnimation>

        {/* Filter Tabs */}
        <ScrollAnimation variant="fadeUp" delay={0.2} className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </ScrollAnimation>

        {/* Portfolio Grid - Masonry-like layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={index === 0 || index === 3 ? 'md:row-span-2' : ''}
              >
                <Link
                  to={`/services/${materialToSlug[item.material]}`}
                  className="group relative overflow-hidden rounded-lg block card-stone h-full"
                >
                  <div className={`relative h-full ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                    <img
                      src={item.image}
                      alt={`${item.title} - ${item.material} countertop project`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay - always visible on mobile for tap feedback */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content - always visible on mobile */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-y-4 lg:group-hover:translate-y-0">
                      <span className="label-caps text-primary-foreground/70 mb-1">{item.material}</span>
                      <h3 className="heading-card text-primary-foreground mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2 text-primary-foreground/80">
                        <span className="text-sm">View {item.material} Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Material Badge - Always Visible */}
                    <Link 
                      to={`/services/${materialToSlug[item.material]}`}
                      className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-xs font-medium">{item.material}</span>
                    </Link>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <ScrollAnimation variant="fadeUp" delay={0.3} className="text-center mt-12">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            View Complete Portfolio
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default PortfolioSection;
