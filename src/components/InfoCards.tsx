import { FileText } from 'lucide-react';
import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ui/scroll-animation';

interface InfoCard {
  title: string;
  description: string;
  pdfUrl: string;
}

interface InfoCardsProps {
  cards: InfoCard[];
}

const InfoCards = ({ cards }: InfoCardsProps) => {
  return (
    <StaggerContainer
      className="grid md:grid-cols-3 gap-6 mb-16"
      staggerDelay={0.1}
    >
      {cards.map((card) => (
        <StaggerItem key={card.title}>
          <a
            href={card.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Title */}
            <div className="px-6 py-4 text-center border-b border-primary-foreground/20">
              <h3 className="font-serif text-xl font-medium flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-primary-foreground/90">
                {card.description}
              </p>
            </div>

            {/* Click indicator */}
            <div className="px-6 pb-4 pt-0">
              <span className="text-xs uppercase tracking-wider text-primary-foreground/70 group-hover:text-primary-foreground transition-colors">
                Click to view PDF →
              </span>
            </div>
          </a>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default InfoCards;
