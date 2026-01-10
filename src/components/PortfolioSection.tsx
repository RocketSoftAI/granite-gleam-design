import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

// Import portfolio images
import portfolioBathroom from '@/assets/portfolio-bathroom.jpg';
import portfolioIsland from '@/assets/portfolio-island.jpg';
import portfolioOutdoor from '@/assets/portfolio-outdoor.jpg';
import portfolioGourmet from '@/assets/portfolio-gourmet.jpg';
import portfolioSpa from '@/assets/portfolio-spa.jpg';
import portfolioPantry from '@/assets/portfolio-pantry.jpg';

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
        <div className="max-w-3xl mb-16">
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
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid - Masonry-like layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer card-stone ${
                index === 0 || index === 3 ? 'md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 || index === 3 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="label-caps text-primary-foreground/70 mb-1">{item.material}</span>
                  <h3 className="heading-card text-primary-foreground mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <span className="text-sm">View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Material Badge - Always Visible */}
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-xs font-medium text-foreground">{item.material}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all duration-300"
          >
            View Complete Portfolio
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
