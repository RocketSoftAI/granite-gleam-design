import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ArrowRight, MapPin, Star, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [mobileMaterialsOpen, setMobileMaterialsOpen] = useState(false);
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
    setMobileMaterialsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio', icon: null },
    { label: 'Process', href: '/process', icon: null },
    { label: 'About', href: '/about', icon: null },
    { label: 'Blog', href: '/blog', icon: null },
  ];

  const materialLinks = [
    { label: 'Granite Countertops', href: '/services/granite-countertops' },
    { label: 'Quartz Countertops', href: '/services/quartz-countertops' },
    { label: 'Quartzite Countertops', href: '/services/quartzite-countertops' },
    { label: 'Porcelain Countertops', href: '/services/porcelain-countertops' },
  ];

  const secondaryLinks = [
    { label: 'Reviews', href: '/reviews', icon: Star },
    { label: 'FAQ', href: '/faq', icon: HelpCircle },
    { label: 'Service Area', href: '/service-area', icon: MapPin },
  ];

  // Determine header style based on scroll and page
  const showTransparent = isHomepage && !isScrolled && !isMobileMenuOpen;

  return (
    <>
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
            <Link to="/" className="flex items-center gap-3 group relative z-[60]">
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
                      <div className="border-t border-border mt-2 pt-2">
                        <Link
                          to="/services"
                          className="block px-4 py-2 text-sm font-medium text-primary hover:bg-muted transition-colors"
                        >
                          View All Materials
                        </Link>
                      </div>
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
              className={`lg:hidden p-2 relative z-[60] transition-colors ${
                isMobileMenuOpen ? 'text-foreground' : showTransparent ? 'text-primary-foreground' : 'text-foreground'
              }`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-[11px] rotate-45' : 'top-1'
                }`} />
                <span className={`absolute left-0 top-[11px] block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`} />
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? 'top-[11px] -rotate-45' : 'top-[19px]'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative h-full overflow-y-auto transition-all duration-500 delay-100 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="container mx-auto px-6 pt-24 pb-8">
            
            {/* Materials Accordion */}
            <div className="mb-6">
              <button
                onClick={() => setMobileMaterialsOpen(!mobileMaterialsOpen)}
                className="flex items-center justify-between w-full py-4 border-b border-border group"
              >
                <span className="label-caps text-muted-foreground">Materials</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  mobileMaterialsOpen ? 'rotate-180' : ''
                }`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-400 ease-out ${
                mobileMaterialsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="py-4 space-y-1">
                  {materialLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted transition-colors group"
                      style={{ 
                        transitionDelay: mobileMaterialsOpen ? `${index * 50}ms` : '0ms',
                        opacity: mobileMaterialsOpen ? 1 : 0,
                        transform: mobileMaterialsOpen ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'all 0.3s ease-out'
                      }}
                    >
                      <span className="text-lg text-foreground font-medium">{link.label}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    className="flex items-center justify-between py-3 px-4 rounded-lg bg-muted hover:bg-accent transition-colors group mt-2"
                  >
                    <span className="text-lg text-primary font-medium">View All Materials</span>
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Navigation Links */}
            <div className="space-y-1 mb-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block py-4 border-b border-border transition-all duration-300 ${
                    location.pathname === link.href ? 'text-primary' : 'text-foreground'
                  }`}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${(index + 1) * 75}ms` : '0ms',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  }}
                >
                  <span className="font-serif text-2xl md:text-3xl">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Secondary Links */}
            <div className="flex flex-wrap gap-3 mb-10">
              {secondaryLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center gap-2 py-2 px-4 rounded-full bg-muted hover:bg-accent text-foreground transition-all duration-300"
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${(index + 5) * 75}ms` : '0ms',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
                  }}
                >
                  <link.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Contact Section */}
            <div 
              className="pt-6 border-t border-border space-y-5"
              style={{
                transitionDelay: isMobileMenuOpen ? '500ms' : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.4s ease-out'
              }}
            >
              <a
                href="tel:+19705551234"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider">Call Us</span>
                  <span className="text-lg font-medium">(970) 555-1234</span>
                </div>
              </a>
              
              <Button variant="premium" size="lg" className="w-full h-14 text-base" asChild>
                <Link to="/contact">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
