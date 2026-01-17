import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const location = useLocation();

  // Check if we're on homepage (for transparent header behavior)
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Process', href: '/process' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];

  const materialLinks = [
    { label: 'Granite Countertops', href: '/services/granite-countertops' },
    { label: 'Quartz Countertops', href: '/services/quartz-countertops' },
    { label: 'Quartzite Countertops', href: '/services/quartzite-countertops' },
    { label: 'Porcelain Countertops', href: '/services/porcelain-countertops' },
    { label: 'All Materials', href: '/services' },
  ];

  // Determine header style based on scroll and page
  const showTransparent = isHomepage && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showTransparent
          ? 'bg-transparent py-6'
          : 'bg-background/95 backdrop-blur-md shadow-soft py-4'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`transition-colors duration-300 ${showTransparent ? 'text-primary-foreground' : 'text-primary'}`}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="14" height="14" fill="currentColor" opacity="0.8"/>
                <rect x="22" y="4" width="14" height="14" fill="currentColor" opacity="0.4"/>
                <rect x="4" y="22" width="14" height="14" fill="currentColor" opacity="0.4"/>
                <rect x="22" y="22" width="14" height="14" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            <div className={`transition-colors duration-300 ${showTransparent ? 'text-primary-foreground' : 'text-foreground'}`}>
              <span className="font-serif text-xl font-medium tracking-tight">Stoneworks</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70 -mt-0.5">of Colorado</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Materials Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMaterialsOpen(true)}
              onMouseLeave={() => setIsMaterialsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  showTransparent ? 'text-primary-foreground' : 'text-foreground'
                }`}
              >
                Materials
                <ChevronDown className={`w-4 h-4 transition-transform ${isMaterialsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMaterialsOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="bg-background rounded-lg shadow-elevated border border-border py-2 min-w-[220px]">
                    {materialLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  showTransparent ? 'text-primary-foreground' : 'text-foreground'
                } ${location.pathname === link.href ? 'opacity-70' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+19705551234"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                showTransparent ? 'text-primary-foreground' : 'text-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              (970) 555-1234
            </a>
            <Button 
              variant={showTransparent ? 'heroOutline' : 'premium'} 
              size="lg" 
              asChild
            >
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              showTransparent ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border shadow-medium animate-fade-in">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {/* Materials Section */}
              <div className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Materials</p>
                {materialLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-base text-foreground py-2 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Main Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block text-lg font-medium text-foreground py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Additional Links */}
              <div className="border-t border-border pt-4 space-y-2">
                <Link to="/reviews" className="block text-foreground py-2 hover:text-primary">Reviews</Link>
                <Link to="/faq" className="block text-foreground py-2 hover:text-primary">FAQ</Link>
                <Link to="/service-area" className="block text-foreground py-2 hover:text-primary">Service Area</Link>
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href="tel:+19705551234"
                  className="flex items-center gap-2 text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  (970) 555-1234
                </a>
                <Button variant="premium" size="lg" className="w-full" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
