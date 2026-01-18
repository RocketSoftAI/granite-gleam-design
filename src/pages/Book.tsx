import { ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/7VbijpcAi4BpIyKbMJHa';

const Book = () => {
  return (
    <>
      <SEOHead
        customSEO={{
          title: "Book a Showroom Appointment | Stoneworks of Colorado",
          description: "Schedule your visit to the Stoneworks of Colorado showroom. See our granite, quartz, and quartzite countertop selections in person.",
          canonicalPath: "/book",
        }}
      />
      
      <div className="min-h-screen bg-background flex flex-col">
        {/* Simple header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-card flex-shrink-0">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif text-lg">Stoneworks</span>
          </Link>
          <a 
            href="tel:+19704931992" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">(970) 493-1992</span>
          </a>
        </header>

        {/* Full-height calendar embed */}
        <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 65px)' }}>
          <iframe
            src={BOOKING_URL}
            width="100%"
            height="100%"
            style={{ 
              border: 'none',
              flex: 1,
              minHeight: '700px',
            }}
            title="Book an Appointment"
            allow="geolocation"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
};

export default Book;
