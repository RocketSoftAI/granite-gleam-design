import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/7VbijpcAi4BpIyKbMJHa';

const Book = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

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
        <header className="flex items-center justify-between p-4 border-b border-border bg-card">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-serif text-lg">Stoneworks</span>
          </Link>
          <span className="text-sm text-muted-foreground">Book an Appointment</span>
        </header>

        {/* Full-height calendar embed */}
        <div className="flex-1 relative">
          {/* Loading state */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">Loading calendar...</p>
              </div>
            </div>
          )}
          <iframe
            src={BOOKING_URL}
            className="w-full h-full"
            style={{ 
              border: 'none',
              minHeight: 'calc(100vh - 65px)',
            }}
            title="Book an Appointment"
            allow="geolocation"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Book;
