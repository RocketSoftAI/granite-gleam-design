import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

interface InfoCard {
  title: string;
  description: string;
  pageUrl: string;
}

interface InfoCardsProps {
  cards: InfoCard[];
}

const InfoCards = ({ cards }: InfoCardsProps) => {
  return (
    <StaggerContainer
      className="grid md:grid-cols-3 gap-6 mb-12"
      staggerDelay={0.1}
    >
      {cards.map((card) => (
        <StaggerItem key={card.title}>
          <Link
            to={card.pageUrl}
            className="group block h-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Title */}
            <div className="px-6 py-4 text-center border-b border-primary-foreground/20">
              <h3 className="font-serif text-xl font-medium flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 flex-shrink-0" />
                {card.title}
              </h3>
            </div>

            {/* Description - flex-grow to fill space */}
            <div className="px-6 py-4 flex-grow">
              <p className="text-sm leading-relaxed text-primary-foreground/90">
                {card.description}
              </p>
            </div>

            {/* Click indicator */}
            <div className="px-6 pb-4">
              <span className="text-xs uppercase tracking-wider text-primary-foreground/70 group-hover:text-primary-foreground transition-colors">
                View Details →
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default InfoCards;
