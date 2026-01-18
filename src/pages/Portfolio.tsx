import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
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

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filteredItems = activeFilter === 'All' ? portfolioItems : portfolioItems.filter(item => item.material === activeFilter);

  return (
    <Layout>
      <PageHero badge="Portfolio" title="Our Work" titleAccent="Speaks for Itself" description="Browse our recent installations across Northern Colorado. Each project showcases our commitment to quality and craftsmanship." />
      
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 mb-12 justify-center" role="group" aria-label="Filter by material">
            {filters.map((filter) => (
              <button 
                key={filter} 
                onClick={() => setActiveFilter(filter)} 
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${activeFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'}`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg cursor-pointer card-stone">
                <div className="relative aspect-[4/3]">
                  <img src={item.image} alt={`${item.title} - ${item.material} countertop in ${item.category.toLowerCase()}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="label-caps text-primary-foreground/70 mb-1">{item.material}</span>
                    <h3 className="heading-card text-primary-foreground mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-primary-foreground/80"><span className="text-sm">View Project</span><ArrowUpRight className="w-4 h-4" /></div>
                  </div>
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full"><span className="text-xs font-medium text-foreground">{item.material}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;
