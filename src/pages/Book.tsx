import { ArrowLeft, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import BookingCalendar from '@/components/booking/BookingCalendar';

const Book = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <>
      <SEOHead
        customSEO={{
          title: "Book a Showroom Appointment | Stoneworks of Colorado",
          description: "Schedule your visit to the Stoneworks of Colorado showroom. See our granite, quartz, and quartzite countertop selections in person.",
          canonicalPath: "/book",
        }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Simple header */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card">
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

        {/* Booking content - uses natural document scrolling */}
        <div className="py-6 px-4 pb-24">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-serif font-medium text-center mb-2">
              Book a Showroom Visit
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              See our stunning countertop selections in person
            </p>
            <BookingCalendar onClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
