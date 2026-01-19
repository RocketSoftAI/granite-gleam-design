import { useState, useCallback } from 'react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';
import StoneLightbox from '@/components/StoneLightbox';
import type { StoneCategory, StoneItem } from '@/data/stockProgram';

interface StoneGalleryProps {
  categories: StoneCategory[];
}

const StoneGallery = ({ categories }: StoneGalleryProps) => {
  const [selectedStone, setSelectedStone] = useState<StoneItem | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Get all stones in order for navigation
  const allStones = categories.flatMap((cat) =>
    cat.stones.map((stone) => ({ ...stone, category: cat.name }))
  );

  const handleStoneClick = (stone: StoneItem, categoryName: string) => {
    setSelectedStone(stone);
    setCurrentCategory(categoryName);
    const index = allStones.findIndex(
      (s) => s.name === stone.name && s.category === categoryName
    );
    setCurrentIndex(index);
  };

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevStone = allStones[currentIndex - 1];
      setSelectedStone(prevStone);
      setCurrentCategory(prevStone.category);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, allStones]);

  const handleNext = useCallback(() => {
    if (currentIndex < allStones.length - 1) {
      const nextStone = allStones[currentIndex + 1];
      setSelectedStone(nextStone);
      setCurrentCategory(nextStone.category);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, allStones]);

  const handleClose = () => {
    setSelectedStone(null);
  };

  return (
    <>
      {categories.map((category) => (
        <section key={category.name} className="mb-16">
          <ScrollAnimation variant="fadeUp" className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground">
              {category.name}
            </h2>
          </ScrollAnimation>

          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            staggerDelay={0.05}
          >
            {category.stones.map((stone) => (
              <StaggerItem key={stone.name}>
                <button
                  onClick={() => handleStoneClick(stone, category.name)}
                  className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  {/* Stone Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-3 bg-muted">
                    <img
                      src={stone.image}
                      alt={stone.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                    
                    {/* Click indicator */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                      <svg
                        className="w-4 h-4 text-charcoal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Stone Name */}
                  <div className="bg-charcoal text-white px-3 py-2 text-center rounded">
                    <span className="text-sm font-medium">{stone.name}</span>
                  </div>
                </button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      ))}

      {/* Lightbox */}
      <StoneLightbox
        stone={selectedStone}
        isOpen={!!selectedStone}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < allStones.length - 1}
      />
    </>
  );
};

export default StoneGallery;
