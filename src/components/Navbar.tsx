import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Materials', href: '#materials' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className={`transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-primary-foreground'}`}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="14" height="14" fill="currentColor" opacity="0.8"/>
                <rect x="22" y="4" width="14" height="14" fill="currentColor" opacity="0.4"/>
                <rect x="4" y="22" width="14" height="14" fill="currentColor" opacity="0.4"/>
                <rect x="22" y="22" width="14" height="14" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            <div className={`transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`}>
              <span className="font-serif text-xl font-medium tracking-tight">Stoneworks</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] opacity-70 -mt-0.5">of Colorado</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+19705551234"
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              <Phone className="w-4 h-4" />
              (970) 555-1234
            </a>
            <Button variant={isScrolled ? 'premium' : 'heroOutline'} size="lg">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-foreground' : 'text-primary-foreground'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border shadow-medium animate-fade-in">
            <div className="container mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium text-foreground py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:+19705551234"
                  className="flex items-center gap-2 text-foreground"
                >
                  <Phone className="w-4 h-4" />
                  (970) 555-1234
                </a>
                <Button variant="premium" size="lg" className="w-full">
                  Get a Quote
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
